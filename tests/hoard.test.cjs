const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const startup = source.lastIndexOf('\n  applyElapsedTime();');
assert.ok(startup > 0, 'App startup boundary must exist');
const instrumented = source.slice(0, startup) + '\n render = () => {}; closeModal = () => {}; showToast = () => {}; scheduleGardenGrowth = () => {}; globalThis.hoardTest = { state: () => state, save, refreshHoardMemories, rewardHoardVisit, endGame, curiosities, hoardGamePools, refreshGardenLife, rememberGardenCrop, gardenPlants, gardenVisitors, gardenSeason, plantBorder, visitGarden, setGardenSeason, makeGardenMoment, addGardenMemory, plantCrop, harvestReadyGarden, setBorderSlot: slot => { borderSlot = slot; } };\n})();';
const day = 86400000;

function sanctuary(overrides = {}) {
  let stored = JSON.stringify({
    version: 1,
    name: 'Luma',
    hatchedAt: Date.now(),
    timeSkipDays: 0,
    moments: 0,
    items: [],
    soundEnabled: false,
    lastFindAt: Date.now() - 10000,
    ...overrides
  });
  const element = {
    innerHTML: '',
    addEventListener() {},
    insertAdjacentHTML() {},
    classList: { add() {}, remove() {} }
  };
  const context = vm.createContext({
    console,
    Date,
    setTimeout,
    clearTimeout,
    cancelAnimationFrame() {},
    localStorage: { getItem: () => stored, setItem: (_key, value) => { stored = value; } },
    document: { addEventListener() {}, getElementById: () => element, querySelector: () => element }
  });
  vm.runInContext(instrumented, context);
  return { ...context.hoardTest, saved: () => JSON.parse(stored) };
}

test('legacy saves gain optional hoard fields without changing finds', () => {
  const at = Date.now() - day;
  const app = sanctuary({ items: [{ name: 'Cloud-shaped pebble', at }] });
  assert.deepEqual([...app.state().hoardShelf], [null, null, null]);
  assert.equal(app.state().items[0].at, at);
  assert.equal(app.state().items[0].chapters.length, 0);
  assert.equal(app.state().items[0].foundAtMoment, 0);
  assert.equal(app.state().lineageKeepsake, null);
});

test('invalid or repeated shelf entries are removed without consuming treasures', () => {
  const app = sanctuary({ items: [{ name: 'Firefly Lantern', at: Date.now() }], hoardShelf: ['Firefly Lantern', 'Firefly Lantern', 'Unknown'] });
  assert.deepEqual([...app.state().hoardShelf], ['Firefly Lantern', null, null]);
  assert.equal(app.state().items.length, 1);
});

test('each minigame grants related finds on first and fourth completed visits', () => {
  for (const type of ['glide', 'bounce', 'seek']) {
    const app = sanctuary();
    const clock = app.state().lastFindAt;
    const first = app.rewardHoardVisit(type);
    assert.ok(app.hoardGamePools[type].includes(first.name));
    assert.equal(first.origin, type);
    assert.equal(app.rewardHoardVisit(type), undefined);
    assert.equal(app.rewardHoardVisit(type), undefined);
    const fourth = app.rewardHoardVisit(type);
    assert.ok(app.hoardGamePools[type].includes(fourth.name));
    assert.notEqual(first.name, fourth.name);
    assert.equal(app.state().lastFindAt, clock);
  }
});

test('zero-score completed games still grant treasures through the reward flow', () => {
  for (const type of ['glide', 'bounce', 'seek']) {
    const app = sanctuary();
    app.endGame(type, 0);
    assert.equal(app.state().items.length, 1);
    assert.equal(app.state().items[0].origin, type);
    assert.equal(app.saved().hoardGameVisits[type], 1);
  }
});

test('an exhausted game pool creates neither duplicates nor passive-clock delays', () => {
  const app = sanctuary();
  for (const curio of app.curiosities) app.state().items.push({ name: curio.name, at: Date.now(), chapters: [] });
  const clock = app.state().lastFindAt;
  for (const type of ['glide', 'bounce', 'seek']) assert.equal(app.rewardHoardVisit(type), undefined);
  assert.equal(app.state().items.length, 24);
  assert.equal(new Set(app.state().items.map(item => item.name)).size, 24);
  assert.equal(app.state().lastFindAt, clock);
});

test('every treasure gains a later chapter after three days, only once', () => {
  const app = sanctuary();
  for (const curio of app.curiosities) app.state().items.push({ name: curio.name, at: Date.now() - 3 * day - 1000, foundAtMoment: 0, chapters: [] });
  app.refreshHoardMemories();
  for (const item of app.state().items) assert.equal(item.chapters.filter(chapter => chapter.id === 'later').length, 1, item.name);
  const journalCount = app.state().journal.length;
  app.refreshHoardMemories();
  assert.equal(app.state().journal.length, journalCount);
});

test('displayed finds evolve through care, including the flowering seed', () => {
  const app = sanctuary({ items: [{ name: 'Bellflower seed', at: Date.now() }], hoardShelf: ['Bellflower seed', null, null] });
  app.state().moments = 3;
  app.refreshHoardMemories();
  assert.ok(app.state().items[0].chapters.some(chapter => chapter.id === 'later'));
  assert.ok(!app.state().items[0].chapters.some(chapter => chapter.id === 'bloom'));
  assert.equal(app.state().hoardShelfNotice.name, 'Bellflower seed');
  app.state().moments = 5;
  app.refreshHoardMemories();
  assert.ok(app.state().items[0].chapters.some(chapter => chapter.id === 'bloom'));
});

test('pairings add a shared chapter and one journal entry, with nothing consumed', () => {
  const app = sanctuary({ items: ['Old paper star', 'Firefly Lantern'].map(name => ({ name, at: Date.now() })), hoardShelf: ['Old paper star', 'Firefly Lantern', null] });
  app.refreshHoardMemories();
  assert.deepEqual([...app.state().hoardPairings], ['night-light']);
  assert.equal(app.state().items.length, 2);
  for (const item of app.state().items) assert.equal(item.chapters.filter(chapter => chapter.id === 'pair-night-light').length, 1);
  app.state().hoardShelf = [null, null, null];
  app.refreshHoardMemories();
  app.state().hoardShelf = ['Firefly Lantern', 'Old paper star', null];
  app.refreshHoardMemories();
  assert.equal(app.state().journal.filter(entry => entry.title === 'A little night sky').length, 1);
});

test('lineage egg adds the compass chapter and saved memories survive reload', () => {
  const app = sanctuary({ name: 'Luma $&', lineageEgg: true, items: [{ name: 'Tiny brass compass', at: Date.now() }] });
  app.refreshHoardMemories();
  assert.ok(app.state().items[0].chapters.some(chapter => chapter.id === 'family-egg' && chapter.body.includes('Luma $&')));
  app.save();
  const reloaded = sanctuary(app.saved());
  reloaded.refreshHoardMemories();
  assert.equal(reloaded.state().items[0].chapters.length, 1);
});

test('older gardens gain a separate border without losing food or seeds', () => {
  const plot = { cropId: 'moon-berries', plantedAt: Date.now(), readyAt: Date.now() + day, ready: false };
  const app = sanctuary({ gardenSeeds: 2, gardenPlots: [plot], inventory: { 'moon-berries': 7 } });
  assert.deepEqual([...app.state().gardenLife.borders], [null, null, null]);
  assert.equal(app.state().gardenSeeds, 2);
  assert.equal(app.state().gardenPlots[0].cropId, plot.cropId);
  assert.equal(app.state().inventory['moon-berries'], 7);
  assert.equal(app.state().gardenLife.discovered.length, 4);
});

test('ornamental plants cost no food seeds and move rather than duplicate', () => {
  const app = sanctuary({ gardenSeeds: 0 });
  const inventory = JSON.stringify(app.state().inventory);
  app.plantBorder('reeds');
  app.setBorderSlot(1);
  app.plantBorder('bellflower');
  app.setBorderSlot(2);
  app.plantBorder('reeds');
  assert.deepEqual([...app.state().gardenLife.borders], [null, 'bellflower', 'reeds']);
  assert.equal(app.state().gardenSeeds, 0);
  assert.equal(JSON.stringify(app.state().inventory), inventory);
  assert.equal(app.state().gardenPlots.length, 0);
});

test('unripe crops do not unlock hybrids; ripe pollen unlocks all three once', () => {
  const app = sanctuary({ gardenPlots: ['moon-berries', 'mist-melons', 'sun-peppers', 'quartz-root'].map(cropId => ({ cropId, plantedAt: Date.now(), readyAt: Date.now() + day, ready: false })) });
  app.refreshGardenLife();
  assert.equal(app.state().gardenLife.discovered.length, 4);
  for (const plot of app.state().gardenPlots) plot.readyAt = Date.now() - day;
  app.refreshGardenLife();
  for (const id of ['moonmist', 'emberbell', 'crystalfern']) assert.ok(app.state().gardenLife.discovered.includes(id));
  assert.equal(app.state().gardenPlots.length, 4);
  const memories = app.state().gardenLife.scrapbook.length;
  app.refreshGardenLife();
  assert.equal(app.state().gardenLife.scrapbook.length, memories);
});

test('remembered pollen permits sequential discoveries in a one-bed garden', () => {
  const app = sanctuary();
  app.rememberGardenCrop('moon-berries');
  app.refreshGardenLife();
  assert.ok(!app.state().gardenLife.discovered.includes('moonmist'));
  app.rememberGardenCrop('mist-melons');
  app.refreshGardenLife();
  assert.ok(app.state().gardenLife.discovered.includes('moonmist'));
  app.plantBorder('moonmist');
  assert.equal(app.state().gardenLife.borders[0], 'moonmist');
});

test('food beds retain their one-seed cost, daily growth, and two-portion yield', () => {
  const app = sanctuary({ gardenSeeds: 1, inventory: { 'moon-berries': 4 }, harvests: 0 });
  app.plantCrop('moon-berries', 0);
  assert.equal(app.state().gardenSeeds, 0);
  assert.equal(app.state().gardenPlots[0].readyAt - app.state().gardenPlots[0].plantedAt, day);
  app.harvestReadyGarden();
  assert.equal(app.state().inventory['moon-berries'], 4);
  app.state().gardenPlots[0].readyAt = Date.now() - 30 * day;
  app.harvestReadyGarden();
  assert.equal(app.state().inventory['moon-berries'], 6);
  assert.equal(app.state().harvests, 1);
  assert.ok(app.state().gardenLife.scrapbook.some(entry => entry.id === 'first-harvest'));
  assert.ok(app.state().gardenLife.pollen.includes('moon-berries'));
  assert.equal(app.state().gardenLife.moment.title, 'A very proud inspection');
});

test('a varied border welcomes three visitors without capture or lost resources', () => {
  const app = sanctuary();
  app.state().gardenLife.borders = ['reeds', 'bellflower', 'moss'];
  app.state().gardenLife.season = 'winter';
  const inventory = JSON.stringify(app.state().inventory);
  const seeds = app.state().gardenSeeds;
  for (let visit = 0; visit < 10; visit++) app.visitGarden();
  assert.equal(app.state().gardenLife.visitors.length, 3);
  assert.equal(new Set(app.state().gardenLife.visitors.map(visitor => visitor.id)).size, 3);
  assert.equal(app.state().gardenLife.scrapbook.filter(entry => entry.id.startsWith('visitor-')).length, 3);
  assert.equal(JSON.stringify(app.state().inventory), inventory);
  assert.equal(app.state().gardenSeeds, seeds);
  assert.equal(app.state().gardenLife.scrapbook.filter(entry => entry.id === 'first-garden-moment').length, 1);
});

test('the visiting drake waits for hatching while garden life stays gentle', () => {
  const app = sanctuary({ hatchedAt: null });
  app.state().gardenLife.borders = ['moss', 'reeds', null];
  for (let visit = 0; visit < 7; visit++) app.visitGarden();
  assert.ok(!app.state().gardenLife.visitors.some(visitor => visitor.id === 'drake'));
  assert.ok(app.state().gardenLife.visitors.some(visitor => visitor.id === 'fireflies'));
  assert.equal(app.state().gardenLife.moment.title, 'A quiet garden');
});

test('keepsake gardens require ownership and never consume treasures or dates', () => {
  const app = sanctuary();
  app.plantBorder('cup-planter');
  assert.equal(app.state().gardenLife.borders[0], null);
  const at = Date.now() - day;
  for (const plant of app.gardenPlants.filter(entry => entry.treasure)) {
    app.state().items.push({ name: plant.treasure, at, chapters: [], foundAtMoment: 0 });
    app.plantBorder(plant.id);
    const item = app.state().items.find(entry => entry.name === plant.treasure);
    assert.equal(item.at, at);
    assert.equal(item.chapters.filter(chapter => chapter.id === `garden-${plant.id}`).length, 1);
    app.plantBorder(plant.id);
    assert.equal(item.chapters.filter(chapter => chapter.id === `garden-${plant.id}`).length, 1);
  }
  assert.equal(app.state().items.length, 3);
  assert.equal(app.state().gardenLife.keepsakes.length, 3);
});

test('all seasons remain available and keep plants and discoveries intact', () => {
  const app = sanctuary();
  app.state().gardenLife.borders = ['bellflower', 'reeds', 'moss'];
  for (const season of ['spring', 'summer', 'autumn', 'winter']) {
    app.setGardenSeason(season);
    assert.equal(app.gardenSeason().key, season);
    assert.equal(app.state().gardenLife.borders.filter(Boolean).length, 3);
  }
  assert.equal(app.state().gardenLife.scrapbook.filter(entry => entry.id.startsWith('season-')).length, 4);
  app.setGardenSeason('winter');
  assert.equal(app.state().gardenLife.scrapbook.filter(entry => entry.id === 'season-winter').length, 1);
  app.setGardenSeason('not-a-season');
  assert.equal(app.state().gardenLife.season, 'winter');
});

test('garden notes, sightings, discoveries and borders survive save reloads', () => {
  const app = sanctuary();
  app.plantBorder('reeds');
  app.state().gardenLife.names.reeds = 'Our quiet corner';
  app.state().gardenLife.notes.reeds = '<A note> & a little light';
  app.visitGarden();
  app.save();
  const reloaded = sanctuary(app.saved());
  assert.equal(reloaded.state().gardenLife.borders[0], 'reeds');
  assert.equal(reloaded.state().gardenLife.names.reeds, 'Our quiet corner');
  assert.equal(reloaded.state().gardenLife.notes.reeds, '<A note> & a little light');
  assert.equal(reloaded.state().gardenLife.visitors.length, 1);
  assert.equal(reloaded.state().gardenLife.scrapbook.length, app.state().gardenLife.scrapbook.length);
});

test('every plant and visitor has a local visual asset', () => {
  const app = sanctuary();
  for (const entry of [...app.gardenPlants, ...app.gardenVisitors]) assert.ok(fs.existsSync(path.join(__dirname, '..', entry.image)), entry.image);
});

test('later notes never push the first garden memories out of the scrapbook', () => {
  const app = sanctuary();
  app.addGardenMemory('first-harvest', 'Our first harvest', 'A little beginning.');
  for (let index = 0; index < 100; index++) app.addGardenMemory(`personal-${index}`, `Memory ${index}`, 'Another little moment.');
  app.save();
  const reloaded = sanctuary(app.saved());
  assert.equal(reloaded.state().gardenLife.scrapbook.length, 101);
  assert.ok(reloaded.state().gardenLife.scrapbook.some(entry => entry.id === 'first-harvest'));
  assert.equal(reloaded.addGardenMemory('first-harvest', 'Repeated', 'Not a new memory.'), false);
});

test('a slumbering dragon can enjoy the garden without being forced awake', () => {
  const app = sanctuary({ slumbering: true });
  app.visitGarden();
  assert.equal(app.state().gardenLife.moment.pose, 'sleeping');
  assert.equal(app.state().slumbering, true);
});