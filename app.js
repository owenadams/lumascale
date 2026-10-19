(() => {
  const SAVE_KEY = 'lumascale-sanctuary-v1';
  const DAY_MS = 24 * 60 * 60 * 1000;
  const GARDEN_GROWTH_MS = DAY_MS;
  const foodCatalog = [
    { id: 'moon-berries', name: 'Moon-berries', icon: '●', image: 'assets/food/moon-berries.webp', note: 'A little shine for the scales.', effect: 'Luster +8 · Fullness +12', fullness: 12, luster: 8, mood: 4, energy: 0, amount: 4 },
    { id: 'quartz-root', name: 'Quartz-root', icon: '◇', image: 'assets/food/quartz-root.webp', note: 'Keeps the pearly bits strong.', effect: 'Luster +10 · Fullness +10', fullness: 10, luster: 10, mood: 2, energy: 0, amount: 4 },
    { id: 'sun-peppers', name: 'Sun-peppers', icon: '✿', image: 'assets/food/sun-peppers.webp', note: 'A warm little burst of zoom.', effect: 'Energy +16 · Fullness +9', fullness: 9, luster: 1, mood: 3, energy: 16, amount: 4 },
    { id: 'mist-melons', name: 'Mist-melons', icon: '◉', image: 'assets/food/mist-melons.webp', note: 'For calm, balance, and hydration.', effect: 'Contentment +12 · Fullness +11', fullness: 11, luster: 2, mood: 12, energy: 4, amount: 4 },
    { id: 'sugar-crystal', name: 'Sugar-crystal treat', icon: '✧', image: 'assets/food/sugar-crystal.webp', note: 'A sweet sparkle, best in moderation.', effect: 'Joy +16 · Too many dim the shine', fullness: 14, luster: -9, mood: 16, energy: -5, amount: 2, treat: true }
  ];
  const curiosities = [
    { name: 'Sea-glass teardrop', icon: '◈', image: 'assets/hoard/sea-glass.webp', note: 'Smoothed by an old tide.', story: '{dragon} waited for a wave to finish telling its story before picking this up. The glass was cool and smooth, with not a single sharp edge left. Some things only need time and a gentle shore.' },
    { name: 'A feather of dawn', icon: '✦', image: 'assets/hoard/dawn-feather.webp', note: 'Still warm with sunrise.', story: 'This feather landed on {dragon}\'s nose just as the morning birds began to sing. Rather than sneeze, your dragon held very still until the song was over. A little of the morning seems to have stayed in it.' },
    { name: 'Tiny brass compass', icon: '⊙', image: 'assets/hoard/brass-compass.webp', note: 'It points toward somewhere nice.', story: '{dragon} followed its needle all afternoon, through fern tunnels and around the same pond twice. Eventually, it pointed straight back to you. Apparently, somewhere nice was home.' },
    { name: 'Cloud-shaped pebble', icon: '◌', image: 'assets/hoard/cloud-pebble.png', note: 'A perfect pocket-sized cloud.', story: '{dragon} found this beside a puddle reflecting a very similar cloud. Your dragon checked the sky, then the stone, then the sky again. Just in case a cloud had fallen, it came home on a cushion of leaves.' },
    { name: 'Bellflower seed', icon: '✿', image: 'assets/hoard/bellflower-seed.webp', note: 'It hums when the wind is kind.', story: 'A dried bellflower rattled softly whenever {dragon} passed. Inside was one seed, keeping time with the breeze. Your dragon carried it home so carefully that its little song never missed a beat.' },
    { name: 'Piece of moon-shell', icon: '☾', image: 'assets/hoard/moon-shell.webp', note: 'A little moon got lost here.', story: '{dragon} spotted a crescent shining between two tidepool stones. It was only a shell, but your dragon held it up to the evening sky anyway. The moon looked much too far away to mind sharing a little silver.' },
    { name: 'Old paper star', icon: '☆', image: 'assets/hoard/paper-star.webp', note: 'Folded by a very small hand.', story: 'The star was caught in a low branch, its paper corners softened by the weather. {dragon} eased it free without unfolding a single point. Whatever wish it was holding deserved to stay tucked safely inside.' },
    { name: 'Glasswing scale', icon: '✧', image: 'assets/hoard/glasswing-scale.webp', note: 'A gift from a passing drake.', story: 'A passing drake paused on the garden wall while {dragon} practiced a very dignified greeting. Before flying on, the visitor left a loose scale shimmering on the moss. Your dragon has been practicing that greeting ever since.' },
    { name: 'Pocket of soft sand', icon: '·', image: 'assets/hoard/soft-sand.webp', note: 'From a beach that only appears at dusk.', story: '{dragon} followed the low tide to a tiny beach, just wide enough for two footprints and a tail. The sand felt warm even as the first stars appeared. A little came home tucked inside a folded leaf.' },
    { name: 'Amber raindrop', icon: '◆', image: 'assets/hoard/amber-raindrop.webp', note: "A storm cloud's forgotten button.", story: 'After the rain, {dragon} found one golden drop that refused to soak into the earth. It was amber from an old branch, polished by the shower. Your dragon waited a moment for the cloud to come back for it, just in case.' },
    { name: 'Little green marble', icon: '●', image: 'assets/hoard/green-marble.webp', note: 'It catches the color of the garden.', story: 'Something green rolled out from under a root when {dragon} brushed past. Through the marble, every leaf looked like a tiny forest. Your dragon brought it home and spent a happy while looking at the garden all over again.' },
    { name: 'A note from the reeds', icon: '▤', image: 'assets/hoard/reeds-note.webp', note: 'The handwriting looks like tiny wings.', story: '{dragon} found this tucked between two reeds, safely above the water. Nobody can quite read the looping marks, but there is a small drawing of a warm nest at the bottom. Your dragon seems certain it says something kind.' },
    { name: 'Firefly Lantern', icon: '✦', image: 'assets/hoard/firefly-lantern.png', note: 'A little light with somewhere to rest.', story: 'A firefly had settled inside an old lantern when {dragon} found it beside the marsh path. Your dragon left the tiny door open all the way home. The firefly stayed anyway, apparently pleased with its new windows.' },
    { name: 'Reed-Woven Crown', icon: '✿', image: 'assets/hoard/reed-crown.png', note: 'For the quiet ruler of a very small pond.', story: '{dragon} discovered this crown resting on a flat stone beside the reeds. It fit neither horn, so your dragon wore it around one wrist instead. For an afternoon, every puddle received a very gracious royal visit.' },
    { name: 'Silver Lily Bell', icon: '♫', image: 'assets/hoard/lily-bell.png', note: 'A soft chime beneath a silver petal.', story: 'The lily bell made no sound until {dragon} stopped trying to ring it. Then a small breeze lifted its petals and released one clear note. Your dragon carried it home slowly, leaving plenty of room for the wind.' },
    { name: 'Echo Crystal', icon: '◇', image: 'assets/hoard/echo-crystal.png', note: 'It seems to remember a favourite tune.', story: '{dragon} hummed into a little cave and heard a softer answer from the stones. This crystal was tucked in a hollow, bright as a held note. Back home it is quiet, but your dragon still hums to it sometimes.' },
    { name: 'Fossil Fern', icon: '❋', image: 'assets/hoard/fossil-fern.png', note: 'A leaf the stone never forgot.', story: 'At first, {dragon} tried to brush the fern off this pebble. Finding it was part of the stone, your dragon settled down to study every little leaf. Some gardens, it turns out, have been waiting a very long time to be noticed.' },
    { name: 'Geode Thimble', icon: '◈', image: 'assets/hoard/geode-thimble.png', note: 'A tiny room full of rose-coloured stars.', story: 'The little stone looked ordinary until {dragon} turned it over. Inside was a whole sparkling hollow, much too small for a dragon but just right for a secret. Your dragon brought it home with the bright side facing up.' },
    { name: 'Wind-Knot Ribbon', icon: '⌁', image: 'assets/hoard/wind-ribbon.png', note: 'The breeze tied it and forgot the trick.', story: 'A ribbon danced on the end of a branch while {dragon} watched from below. When it finally came loose, it landed in an impossible little knot. Your dragon decided not to undo what the wind had worked so hard to make.' },
    { name: "Starling's Button", icon: '⊙', image: 'assets/hoard/starling-button.png', note: 'A golden bird and a little blue thread.', story: '{dragon} found the button beneath a fence where starlings liked to gather. Your dragon held it up for inspection, but none of the birds claimed it. One sang a short song instead, which seemed like permission to take it home.' },
    { name: 'Rainbow Sundial Shard', icon: '◒', image: 'assets/hoard/sundial-shard.png', note: 'A little piece of a slower afternoon.', story: 'Sunlight slipped through this shard and painted a rainbow across {dragon}\'s paw. Your dragon sat so still that a beetle wandered through every colour. The old dial no longer tells the time, but it still knows how to spend it.' },
    { name: 'Copper Acorn', icon: '●', image: 'assets/hoard/copper-acorn.png', note: 'An autumn keepsake in copper and green.', story: '{dragon} offered this acorn to a squirrel, who turned it over and politely declined. It was much too shiny for lunch. Your dragon brought it home instead, where it can be admired without anyone trying to bury it.' },
    { name: 'Tidepool Cup', icon: '◡', image: 'assets/hoard/tidepool-cup.png', note: 'A chipped little cup with a wave inside.', story: 'The cup was nestled in a tidepool, serving as a very grand bath for a tiny crab. {dragon} waited until the crab was finished before lifting it out. A rinse and a bed of moss have made it feel at home again.' },
    { name: 'Sleeping Snail Shell', icon: '◌', image: 'assets/hoard/snail-shell.png', note: 'An empty spiral with a little moss garden.', story: '{dragon} whispered hello to this shell and waited patiently for an answer. It was empty, with a soft patch of moss taking care of the roof. Your dragon carried it home as gently as if someone might still be napping inside.' }
  ];
  const seasons = [
    { name: 'First bloom', label: 'Spring', icon: '✿', weather: 'Soft sunshine', meta: 'A lovely day to be here', scene: 'The garden is stretching toward the light.' },
    { name: 'Long light', label: 'Summer', icon: '☀', weather: 'Warm and bright', meta: 'The air is full of gold', scene: 'The greenhouse hums in the long light.' },
    { name: 'Amber hush', label: 'Autumn', icon: '◒', weather: 'A mellow breeze', meta: 'Leaves are turning slowly', scene: 'The garden is gathering its colors.' },
    { name: 'Quiet frost', label: 'Winter', icon: '❄', weather: 'Still and silvery', meta: 'A good day for a warm nest', scene: 'A little frost softens the garden edges.' }
  ];
  const dragonPoseAssets = {
    Hatchling: {
      idle: 'assets/characters/whelp/idle.webp',
      bond: 'assets/characters/whelp/petting.webp',
      wake: 'assets/characters/whelp/happy.webp',
      snack: 'assets/characters/whelp/eating.webp',
      sleeping: 'assets/characters/whelp/sleeping.webp',
      play: 'assets/characters/whelp/hop.webp'
    },
    'Sky-Drifter': {
      idle: 'assets/characters/sky-drifter/skydrifter-idle.webp',
      bond: 'assets/characters/sky-drifter/skydrifter-happy.webp',
      wake: 'assets/characters/sky-drifter/skydrifter-happy.webp',
      snack: 'assets/characters/sky-drifter/skydrifter-eating.webp',
      sleeping: 'assets/characters/sky-drifter/skydrifter-sleeping.webp',
      play: 'assets/characters/sky-drifter/skydrifter-flying.webp',
      landing: 'assets/characters/sky-drifter/skydrifter-landing.webp'
    },
    'Prism Drake': { idle: 'assets/characters/prism-drake/adult-idle.webp' },
    'Sovereign Elder': { idle: 'assets/characters/prism-drake/adult-idle.webp' }
  };
  const gardenPlants = [
    { id: 'bellflower', name: 'Bellflowers', image: 'assets/greenhouse/decorations/bellflower.png', note: 'Little bells listening for the breeze.' },
    { id: 'reeds', name: 'Luminous reeds', image: 'assets/game/hide-and-seek/reeds.png', note: 'A soft green glow beside the water.' },
    { id: 'moss', name: 'Velvet moss', image: 'assets/greenhouse/decorations/moss.png', note: 'A soft place for small feet and sleepy dragons.' },
    { id: 'vine', name: 'Starlace vine', image: 'assets/greenhouse/decorations/vine.png', note: 'Leaves finding their own gentle way upward.' },
    { id: 'moonmist', name: 'Moonmist Blossoms', image: 'assets/greenhouse/decorations/moonmist.png', note: 'Moon-berry pollen meets the cool mist of melons.', crops: ['moon-berries', 'mist-melons'] },
    { id: 'emberbell', name: 'Ember Bells', image: 'assets/greenhouse/decorations/emberbell.png', note: 'Sun-pepper warmth and a little moon-berry sweetness.', crops: ['sun-peppers', 'moon-berries'] },
    { id: 'crystalfern', name: 'Crystal Fern', image: 'assets/greenhouse/decorations/crystalfern.png', note: 'Quartz-root sparkle in a mist-melon garden.', crops: ['quartz-root', 'mist-melons'] },
    { id: 'keepsake-flower', name: 'The keepsake bellflower', image: 'assets/greenhouse/decorations/bellflower.png', note: 'A hoard seed with a new story to tell.', treasure: 'Bellflower seed' },
    { id: 'cup-planter', name: 'Tidepool cup planter', image: 'assets/greenhouse/decorations/cup-planter.png', note: 'A chipped cup, a little moss, a place to grow.', treasure: 'Tidepool Cup' },
    { id: 'fern-corner', name: 'Fern remembering fern', image: 'assets/greenhouse/decorations/fern-corner.png', note: 'A living fern beside its ancient likeness.', treasure: 'Fossil Fern' }
  ];
  const gardenVisitors = [
    { id: 'fireflies', name: 'Lantern fireflies', image: 'assets/greenhouse/decorations/fireflies.png', plants: ['reeds', 'moonmist', 'keepsake-flower'], story: 'Little lights settled among the leaves. Nobody tried to catch them, and they stayed until the garden felt like a very small evening sky.' },
    { id: 'butterfly', name: 'Glasswing butterfly', image: 'assets/greenhouse/decorations/butterfly.svg', plants: ['bellflower', 'vine', 'emberbell', 'keepsake-flower'], story: 'A butterfly paused on a petal, opening and closing its wings as if testing the light. After a while it lifted away, leaving the flower exactly as it found it.' },
    { id: 'drake', name: 'A visiting little drake', image: 'assets/characters/prism-drake/adult-idle.webp', plants: ['moss', 'crystalfern', 'cup-planter', 'fern-corner'], story: 'A little drake landed beside the soft leaves and exchanged a quiet greeting. There was room to rest, and no particular hurry to leave.' }
  ];
  const defaultState = () => ({
    version: 1,
    createdAt: Date.now(),
    lastVisitAt: Date.now(),
    hatchedAt: null,
    hatchProgress: 0,
    timeSkipDays: 0,
    name: 'Luma',
    temperament: 'curious',
    stats: { fullness: 72, energy: 78, mood: 82, luster: 68 },
    inventory: Object.fromEntries(foodCatalog.map(food => [food.id, food.amount])),
    gardenSeeds: 1,
    lastSeedRefreshAt: Date.now(),
    lastGardenCapacity: 1,
    pearlDust: 12,
    moments: 0,
    harvests: 0,
    gardenPlots: [],
    gardenLife: { borders: [null, null, null], discovered: ['bellflower', 'reeds', 'moss', 'vine'], pollen: [], names: {}, notes: {}, visitors: [], scrapbook: [], keepsakes: [], season: 'auto', visits: 0, moment: null, currentVisitor: null },
    items: [],
    hoardShelf: [null, null, null],
    hoardNotes: {},
    hoardPairings: [],
    hoardGameVisits: { glide: 0, bounce: 0, seek: 0 },
    hoardShelfNotice: null,
    lineageKeepsake: null,
    journal: [{ type: 'arrival', title: 'A little light arrives', body: 'An opal egg found a place among the garden embers. Something inside is dreaming.', at: Date.now() }],
    lastDailyAt: Date.now(),
    lastFindAt: Date.now(),
    lastGameAt: null,
    lineageEgg: false,
    lineageHatched: false,
    lineageName: 'Pip',
    lineageReady: false,
    checks: { bond: false, nourish: false, play: false },
    slumbering: false,
    soundEnabled: true
  });
  let state = loadState();
  let gameFrame = 0;
  let gameTimer = null;
  let audioContext = null;
  let sortNewest = true;
  let dragonAnimationTimer = null;
  let dragonPose = 'idle';
  let gardenGrowthTimer = null;
  let seekGame = null;
  let shelfSlot = 0;
  let shelfReaction = '';
  let borderSlot = 0;

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (saved && saved.version === 1) {
        const defaults = defaultState();
        const loaded = { ...defaults, ...saved, stats: { ...defaults.stats, ...saved.stats }, inventory: { ...defaults.inventory, ...saved.inventory }, checks: { ...defaults.checks, ...saved.checks } };
        if (!Array.isArray(saved.gardenPlots)) {
          loaded.gardenPlots = saved.plantedAt ? [{ cropId: 'moon-berries', plantedAt: saved.plantedAt, readyAt: saved.gardenReady ? saved.plantedAt : saved.plantedAt + GARDEN_GROWTH_MS }] : [];
        }
        loaded.gardenSeeds = Number.isInteger(saved.gardenSeeds) ? saved.gardenSeeds : Number.isInteger(saved.moonSeeds) ? saved.moonSeeds : 1;
        loaded.lastSeedRefreshAt = saved.lastSeedRefreshAt || saved.lastDailyAt || Date.now();
        loaded.lastGardenCapacity = Number.isInteger(saved.lastGardenCapacity) ? saved.lastGardenCapacity : 1;
        const garden = { ...defaults.gardenLife, ...saved.gardenLife };
        garden.discovered = [...new Set(['bellflower', 'reeds', 'moss', 'vine', ...(Array.isArray(garden.discovered) ? garden.discovered : [])])].filter(id => gardenPlants.some(plant => plant.id === id));
        garden.borders = Array.from({ length: 3 }, (_, index) => {
          const id = Array.isArray(saved.gardenLife?.borders) ? saved.gardenLife.borders[index] : null;
          const plant = gardenPlants.find(entry => entry.id === id);
          return plant && garden.discovered.includes(id) && (!plant.treasure || loaded.items.some(item => item.name === plant.treasure)) && saved.gardenLife.borders.indexOf(id) === index ? id : null;
        });
        garden.pollen = [...new Set(Array.isArray(garden.pollen) ? garden.pollen : [])].filter(id => foodCatalog.some(food => food.id === id && !food.treat));
        garden.visitors = Array.isArray(garden.visitors) ? garden.visitors.filter(visitor => gardenVisitors.some(entry => entry.id === visitor.id)) : [];
        garden.scrapbook = Array.isArray(garden.scrapbook) ? garden.scrapbook : [];
        garden.keepsakes = Array.isArray(garden.keepsakes) ? garden.keepsakes.filter(id => gardenPlants.some(plant => plant.id === id && plant.treasure)) : [];
        garden.names = Object.fromEntries(Object.entries(garden.names || {}).filter(([id, name]) => gardenPlants.some(plant => plant.id === id) && typeof name === 'string').map(([id, name]) => [id, name.slice(0, 30)]));
        garden.notes = Object.fromEntries(Object.entries(garden.notes || {}).filter(([id, note]) => gardenPlants.some(plant => plant.id === id) && typeof note === 'string').map(([id, note]) => [id, note.slice(0, 240)]));
        garden.visits = Math.max(0, Math.floor(Number(garden.visits) || 0));
        if (!['auto', 'spring', 'summer', 'autumn', 'winter'].includes(garden.season)) garden.season = 'auto';
        loaded.gardenLife = garden;
        loaded.hoardShelf = Array.from({ length: 3 }, (_, index) => {
          const name = Array.isArray(saved.hoardShelf) ? saved.hoardShelf[index] : null;
          return loaded.items.some(item => item.name === name) && saved.hoardShelf.indexOf(name) === index ? name : null;
        });
        loaded.hoardNotes = Object.fromEntries(Object.entries(saved.hoardNotes || {}).filter(([name, note]) => loaded.items.some(item => item.name === name) && typeof note === 'string').map(([name, note]) => [name, note.slice(0, 240)]));
        loaded.hoardPairings = Array.isArray(saved.hoardPairings) ? saved.hoardPairings : [];
        loaded.hoardGameVisits = Object.fromEntries(['glide', 'bounce', 'seek'].map(type => [type, Math.max(0, Math.floor(Number(saved.hoardGameVisits?.[type]) || 0))]));
        loaded.items.forEach(item => {
          if (!Array.isArray(item.chapters)) item.chapters = [];
          if (!Number.isFinite(item.foundAtMoment)) item.foundAtMoment = loaded.moments;
        });
        delete loaded.plantedAt;
        delete loaded.gardenReady;
        return loaded;
      }
    } catch (error) {
      console.warn('Could not load LumaScale save.', error);
    }
    return defaultState();
  }

  function save() {
    state.lastVisitAt = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  }

  function clamp(value) { return Math.max(0, Math.min(100, Math.round(value))); }
  function addJournal(type, title, body) {
    state.journal.unshift({ type, title, body, at: Date.now() + state.timeSkipDays * DAY_MS });
    state.journal = state.journal.slice(0, 80);
  }
  function ageDays() {
    if (!state.hatchedAt) return 0;
    return Math.max(0, Math.floor((Date.now() + state.timeSkipDays * DAY_MS - state.hatchedAt) / DAY_MS));
  }
  const hoardLaterStories = {
    'Sea-glass teardrop': ['An indoor tide', '{dragon} set the glass where morning light reaches it. A small green patch travels across the floor each day, like a tide that always comes back.'],
    'A feather of dawn': ['A softer morning', '{dragon} tucked the feather beside the nest. On quiet mornings it brushes against one sleepy cheek, a much gentler wake-up than the birds outside.'],
    'Tiny brass compass': ['The familiar direction', '{dragon} has stopped following the needle out into the garden. These days, turning it toward the warm nest seems to be quite enough of an adventure.'],
    'Cloud-shaped pebble': ['A place to land', '{dragon} arranged a little cushion of moss for the pebble. Even a pocket-sized cloud, apparently, deserves somewhere soft to rest.'],
    'Bellflower seed': ['A patient little song', '{dragon} checks the seed each morning and hums a very short tune. Nothing has sprouted yet, but the little ritual seems worth keeping.'],
    'Piece of moon-shell': ['Moon watching', '{dragon} holds the shell up whenever the moon is a crescent. The two shapes never quite match, which is a fine reason to check again another evening.'],
    'Old paper star': ['A wish kept safe', '{dragon} carefully flattened one bent point without unfolding the star. Whatever wish is inside has a patient guardian now.'],
    'Glasswing scale': ['Practising the greeting', '{dragon} has perfected the dignified nod learned from the visiting drake. The scale catches the light each time your dragon bows to it.'],
    'Pocket of soft sand': ['The little shore', '{dragon} drew a tiny winding path through the sand with one claw. By morning it was smooth again, ready for a different journey.'],
    'Amber raindrop': ['Rain at the window', 'During a soft shower, {dragon} placed the amber beside the window. It stayed warm and golden while the real raindrops hurried past.'],
    'Little green marble': ['A garden in miniature', '{dragon} rolled the marble into a patch of sunshine. For a moment, every leaf in the garden fitted inside one small green world.'],
    'A note from the reeds': ['A reply of sorts', '{dragon} left a small drawing of the sanctuary beside the note. It is not quite a letter, but it looks very much like thank you.'],
    'Firefly Lantern': ['A regular visitor', 'The little lantern door is still open. Some evenings a firefly rests inside, and {dragon} sits close by until the tiny guest is ready to leave.'],
    'Reed-Woven Crown': ['A smaller kingdom', '{dragon} placed the crown around a pot of moss. Its little kingdom now has one hill, three dew drops, and a very attentive visitor.'],
    'Silver Lily Bell': ['An evening note', '{dragon} discovered that a slow breath makes the bell sing. One soft note has become a favourite way to settle the garden for the night.'],
    'Echo Crystal': ['A tune remembered', '{dragon} hummed the cave tune again. Nothing answered aloud, but a little gold shimmer inside the crystal seemed to hold the last note.'],
    'Fossil Fern': ['Two gardens', '{dragon} laid a fresh fern beside the stone and compared the leaves. One garden is growing, one is remembering, and both seem happy here.'],
    'Geode Thimble': ['Room for a secret', '{dragon} slipped a very small leaf into the sparkling hollow. There is still plenty of room for all the secrets that might follow.'],
    'Wind-Knot Ribbon': ['A breeze indoors', 'The ribbon stirs whenever the sanctuary door opens. {dragon} still refuses to undo the knot; a little of the wind appears to live there.'],
    "Starling's Button": ['A song at the window', 'A starling paused outside while {dragon} was studying the button. The short song sounded familiar, though neither visitor seemed in any hurry to claim it.'],
    'Rainbow Sundial Shard': ['An unhurried hour', '{dragon} waited for the rainbow to reach the edge of the shelf. There was no prize for being patient, only a very pleasant patch of colour.'],
    'Copper Acorn': ['Not for planting', '{dragon} tried the acorn in a little moss nest instead of a flowerpot. It may never become a tree, but it has found a good place to stay.'],
    'Tidepool Cup': ['A cup of weather', '{dragon} caught a little rain in the chipped cup. Afterwards, a garden bird stopped for a drink, which felt like the cup finding a new purpose.'],
    'Sleeping Snail Shell': ['A garden on the roof', 'The moss on the shell has grown a tiny new frond. {dragon} checks it carefully, still speaking softly in case someone is sleeping inside.']
  };
  const hoardArrangements = [
    { id: 'night-light', names: ['Old paper star', 'Firefly Lantern'], title: 'A little night sky', body: '{dragon} placed the paper star beside the lantern. Its soft shadow became a second star on the wall, and the shelf turned into a tiny night sky.' },
    { id: 'breeze', names: ['Tiny brass compass', 'Wind-Knot Ribbon'], title: 'A wandering breeze', body: 'The ribbon fluttered against the compass, nudging its needle toward the garden. {dragon} watched for a while, then settled down beside both. Not every invitation needs an answer today.' },
    { id: 'garden-song', names: ['Bellflower seed', 'Silver Lily Bell'], title: 'A song for the garden', body: 'The seed rustled when the bell gave one quiet note. {dragon} answered with a hum, and for a moment the whole shelf seemed to be listening.' },
    { id: 'tidepool', names: ['Sea-glass teardrop', 'Piece of moon-shell'], title: 'A tidepool moon', body: '{dragon} nestled the shell against the sea glass. Together they caught a pale green light, like a small moon resting in a very still tidepool.' }
  ];
  const hoardGamePools = {
    seek: ['Firefly Lantern', 'Reed-Woven Crown', 'Silver Lily Bell', 'A note from the reeds', 'Bellflower seed', 'Little green marble', 'Tidepool Cup', 'Sleeping Snail Shell'],
    bounce: ['Echo Crystal', 'Fossil Fern', 'Geode Thimble', 'Cloud-shaped pebble', 'Sea-glass teardrop', 'Piece of moon-shell', 'Amber raindrop', 'Copper Acorn'],
    glide: ['Wind-Knot Ribbon', "Starling's Button", 'Rainbow Sundial Shard', 'A feather of dawn', 'Tiny brass compass', 'Old paper star', 'Glasswing scale', 'Pocket of soft sand']
  };
  function hoardNow() { return Date.now() + state.timeSkipDays * DAY_MS; }
  function hoardText(text) { return text.replaceAll('{dragon}', () => state.name); }
  function addHoardChapter(item, id, title, body, recordJournal = true) {
    if (!Array.isArray(item.chapters)) item.chapters = [];
    if (item.chapters.some(chapter => chapter.id === id)) return false;
    item.chapters.push({ id, title, body: hoardText(body), at: hoardNow() });
    if (recordJournal) addJournal('find', title, hoardText(body));
    return true;
  }
  function refreshHoardMemories() {
    state.items.forEach(item => {
      const displayed = state.hoardShelf.includes(item.name);
      const later = hoardLaterStories[item.name];
      const elapsed = hoardNow() - item.at;
      if (later && (elapsed >= 3 * DAY_MS || displayed && state.moments - item.foundAtMoment >= 3)) addHoardChapter(item, 'later', later[0], later[1]);
      if (item.name === 'Bellflower seed' && (elapsed >= 7 * DAY_MS || displayed && state.moments - item.foundAtMoment >= 5)) addHoardChapter(item, 'bloom', 'A bellflower, at last', 'A tiny green shoot unfolded beside the seed. {dragon} hummed the familiar tune, and this time there was a flower to listen.');
      if (item.name === 'Tiny brass compass' && (state.lineageEgg || state.lineageHatched)) addHoardChapter(item, 'family-egg', 'A new direction', 'The compass needle came to rest beside the little lineage nest. {dragon} stayed there for a long while. Somewhere nice had room for one more.');
    });
    hoardArrangements.forEach(arrangement => {
      if (!arrangement.names.every(name => state.hoardShelf.includes(name)) || state.hoardPairings.includes(arrangement.id)) return;
      state.hoardPairings.push(arrangement.id);
      arrangement.names.forEach(name => addHoardChapter(state.items.find(item => item.name === name), `pair-${arrangement.id}`, arrangement.title, arrangement.body, false));
      addJournal('find', arrangement.title, hoardText(arrangement.body));
      shelfReaction = hoardText(arrangement.body);
    });
    const favourites = state.hoardShelf.filter(Boolean);
    if (favourites.length && state.moments - (state.hoardShelfNotice?.moment || 0) >= 3) {
      const name = favourites[state.moments % favourites.length];
      const reactions = [`${state.name} nudges the ${name.toLowerCase()} into a warm patch of light.`, `${state.name} pauses to inspect the ${name.toLowerCase()}, head tilted just so.`, `${state.name} curls up beside the ${name.toLowerCase()}. Some treasures are good company.`];
      state.hoardShelfNotice = { name, text: reactions[Math.floor(state.moments / 3) % reactions.length], moment: state.moments };
      shelfReaction = state.hoardShelfNotice.text;
    }
  }
  function growthSummary() {
    if (!state.hatchedAt) return { stage: 'OPAL EGG', age: 'Hatching journey', progress: state.hatchProgress, next: 'Hatchling', detail: 'Warm the shell with gentle care to welcome your dragon.' };
    const days = ageDays();
    if (days < 28) return { stage: 'HATCHLING', age: `Day ${days + 1} together`, progress: days / 28 * 100, next: 'Sky-Drifter', detail: `In ${28 - days} days · unlocks your second garden bed.` };
    if (days < 180) return { stage: 'SKY-DRIFTER', age: `Day ${days + 1} together`, progress: (days - 28) / (180 - 28) * 100, next: 'Prism Drake', detail: `In ${180 - days} days · unlocks your third garden bed.` };
    if (days < 365) return { stage: 'PRISM DRAKE', age: `Day ${days + 1} together`, progress: (days - 180) / (365 - 180) * 100, next: 'Sovereign Elder', detail: `In ${365 - days} days · unlocks a fourth bed and lineage egg.` };
    if (state.lineageReady) return { stage: 'SOVEREIGN ELDER', age: `Day ${days + 1} together`, progress: 100, next: 'Lineage egg ready', detail: 'Welcome another little dragon through the Curiosity Hoard.' };
    if (state.lineageEgg) return { stage: 'SOVEREIGN ELDER', age: `Day ${days + 1} together`, progress: 100, next: 'A new egg is in the nest', detail: 'Your family’s next little story is beginning.' };
    if (state.lineageHatched) return { stage: 'SOVEREIGN ELDER', age: `Day ${days + 1} together`, progress: 100, next: `Guardian to ${state.lineageName}`, detail: 'Your dragon is watching over the next generation.' };
    return { stage: 'SOVEREIGN ELDER', age: `Day ${days + 1} together`, progress: 100, next: 'Sovereign Elder', detail: 'Your sanctuary now has four garden beds.' };
  }
  function stageName() {
    const days = ageDays();
    if (!state.hatchedAt) return 'Opal Egg';
    if (days < 28) return 'Hatchling';
    if (days < 180) return 'Sky-Drifter';
    if (days < 365) return 'Prism Drake';
    return 'Sovereign Elder';
  }
  function gardenPlotCapacity() {
    return ({ 'Opal Egg': 1, Hatchling: 1, 'Sky-Drifter': 2, 'Prism Drake': 3, 'Sovereign Elder': 4 })[stageName()] || 1;
  }
  function refreshGardenSeeds(now = Date.now()) {
    const capacity = gardenPlotCapacity();
    const newlyUnlocked = Math.max(0, capacity - state.lastGardenCapacity);
    if (newlyUnlocked) state.gardenSeeds = Math.min(capacity, state.gardenSeeds + newlyUnlocked);
    state.lastGardenCapacity = capacity;
    const elapsedSeedDays = Math.floor((now - state.lastSeedRefreshAt) / DAY_MS);
    if (elapsedSeedDays > 0) {
      state.gardenSeeds = capacity;
      state.lastSeedRefreshAt += elapsedSeedDays * DAY_MS;
    }
  }
  function updateGardenPlots(now = Date.now()) {
    let changed = false;
    state.gardenPlots.forEach(plot => {
      if (!plot.ready && now >= plot.readyAt) {
        plot.ready = true;
        changed = true;
      }
    });
    return changed;
  }
  function gardenNow() { return Date.now() + state.timeSkipDays * DAY_MS; }
  function gardenSeason() {
    const index = state.gardenLife.season === 'auto' ? seasons.indexOf(seasonData()) : ['spring', 'summer', 'autumn', 'winter'].indexOf(state.gardenLife.season);
    return { ...seasons[index], key: ['spring', 'summer', 'autumn', 'winter'][index], description: ['New leaves and little hopeful bells.', 'Long light rests on the petals.', 'Soft copper colours gather among the leaves.', 'Frost-bright leaves and a warm place to rest.'][index] };
  }
  function addGardenMemory(id, title, body) {
    if (state.gardenLife.scrapbook.some(entry => entry.id === id)) return false;
    state.gardenLife.scrapbook.unshift({ id, title, body, at: gardenNow() });
    addJournal('food', title, body);
    return true;
  }
  function rememberGardenCrop(cropId) {
    if (!state.gardenLife.pollen.includes(cropId)) state.gardenLife.pollen.push(cropId);
  }
  function refreshGardenLife() {
    const visitor = gardenVisitors.find(entry => entry.id === state.gardenLife.currentVisitor);
    if (visitor && !visitor.plants.some(id => state.gardenLife.borders.includes(id))) state.gardenLife.currentVisitor = null;
    state.gardenPlots.forEach(plot => { if (plot.ready || Date.now() >= plot.readyAt) rememberGardenCrop(plot.cropId); });
    gardenPlants.filter(plant => plant.crops).forEach(plant => {
      if (state.gardenLife.discovered.includes(plant.id) || !plant.crops.every(id => state.gardenLife.pollen.includes(id))) return;
      state.gardenLife.discovered.push(plant.id);
      addGardenMemory(`hybrid-${plant.id}`, `${plant.name}, a little discovery`, `${plant.note} A new ornamental seed has found its place in the garden. The original crops are still yours.`);
    });
    if (state.harvests > 0 && !state.gardenLife.scrapbook.some(entry => entry.id === 'first-harvest' || entry.id === 'earlier-harvests')) addGardenMemory('earlier-harvests', 'A garden with a history', 'Before this scrapbook began, the garden had already shared its first harvest. There will be more small moments to keep.');
  }
  function makeGardenMoment(kind = 'visit') {
    const growing = state.gardenPlots.some(plot => !plot.ready && Date.now() < plot.readyAt);
    const ripe = state.gardenPlots.some(plot => plot.ready || Date.now() >= plot.readyAt);
    const phase = kind === 'harvest' ? 2 : kind === 'plant' ? 1 : state.gardenLife.visits % 4;
    const moments = [
      { title: 'A soft place to settle', pose: 'sleeping', body: `${state.name} curls up beside ${growing ? 'the seedlings' : 'the soft leaves'}, quite content to let the garden take its time.` },
      { title: 'A little help with the dew', pose: 'bond', body: `${state.name} gently nudges a broad, dew-covered leaf toward a garden bed. A few bright drops find their way to the roots.` },
      { title: ripe ? 'A very proud inspection' : 'Watching little things grow', pose: 'idle', body: `${state.name} inspects ${ripe ? 'the ripe crop' : 'each small leaf'} with great care, then looks back at you as if to share the good news.` },
      { title: 'Among the flowers', pose: 'bond', body: `${state.name} pauses among the flowers. For a while, there is nothing to do but enjoy being here together.` }
    ];
    const moment = !state.hatchedAt
      ? { title: 'A quiet garden', pose: 'idle', body: 'The leaves stir softly while a little dragon dreams inside its shell.' }
      : state.slumbering
        ? { title: 'A nap among the leaves', pose: 'sleeping', body: `${state.name} rests in a soft garden corner. The leaves can do the growing for a while.` }
        : moments[phase];
    state.gardenLife.moment = { ...moment, kind, at: gardenNow() };
  }
  function discoverGardenVisitor() {
    const eligible = gardenVisitors.filter(visitor => (visitor.id !== 'drake' || state.hatchedAt) && visitor.plants.some(id => state.gardenLife.borders.includes(id)));
    if (!eligible.length) { state.gardenLife.currentVisitor = null; return; }
    const visitor = eligible.find(entry => !state.gardenLife.visitors.some(seen => seen.id === entry.id)) || eligible[Math.floor(state.gardenLife.visits / 3) % eligible.length];
    state.gardenLife.currentVisitor = visitor.id;
    if (!state.gardenLife.visitors.some(seen => seen.id === visitor.id)) {
      state.gardenLife.visitors.push({ id: visitor.id, at: gardenNow() });
      addGardenMemory(`visitor-${visitor.id}`, visitor.name, visitor.story);
    }
  }
  function visitGarden() {
    state.gardenLife.visits += 1;
    makeGardenMoment();
    if ((state.gardenLife.visits - 1) % 3 === 0) discoverGardenVisitor();
    addGardenMemory('first-garden-moment', state.gardenLife.moment.title, state.gardenLife.moment.body);
    commit();
  }
  function stageLabel() {
    return ({ 'Opal Egg': 'OPAL EGG', 'Hatchling': 'HATCHLING', 'Sky-Drifter': 'SKY-DRIFTER', 'Prism Drake': 'PRISM DRAKE', 'Sovereign Elder': 'SOVEREIGN ELDER' })[stageName()];
  }
  function seasonData() {
    const month = new Date().getMonth();
    const index = month < 3 ? 3 : month < 6 ? 0 : month < 9 ? 1 : 2;
    return seasons[index];
  }
  function humanAge() {
    const days = ageDays();
    if (days === 0) return 'A brand-new beginning';
    if (days === 1) return 'One day together';
    if (days < 28) return `${days} days · growing gently`;
    if (days < 365) return `${Math.floor(days / 30)} months · growing at their own pace`;
    const years = Math.floor(days / 365);
    const remainder = Math.floor((days % 365) / 30);
    return `${years} ${years === 1 ? 'year' : 'years'}${remainder ? `, ${remainder} months` : ''} · a guardian now`;
  }
  function relativeDate(timestamp) {
    const days = Math.max(0, Math.floor((Date.now() + state.timeSkipDays * DAY_MS - timestamp) / DAY_MS));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }
  function capStat(key, amount) { state.stats[key] = clamp(state.stats[key] + amount); }
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]); }
  function showToast(message, icon = '✦') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span><div>${escapeHtml(message)}</div>`;
    document.getElementById('toastRegion').append(toast);
    setTimeout(() => { toast.classList.add('fade'); setTimeout(() => toast.remove(), 260); }, 2800);
  }
  function playTone(frequency = 460, duration = 0.1) {
    if (!state.soundEnabled) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gain.gain.setValueAtTime(0.055, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.info('Audio is unavailable in this browser.');
    }
  }
  function commit() { refreshGardenLife(); refreshHoardMemories(); save(); render(); }
  function animateDragon(motion) {
    const scene = document.getElementById('sceneArt');
    dragonPose = ({ bond: 'bond', wake: 'wake', snack: 'snack', play: 'play', landing: 'landing' })[motion] || 'idle';
    updateDragonArtwork();
    scene.dataset.motion = motion;
    scene.classList.remove('scene-reaction');
    void scene.offsetWidth;
    scene.classList.add('scene-reaction');
    clearTimeout(dragonAnimationTimer);
    dragonAnimationTimer = setTimeout(() => {
      scene.classList.remove('scene-reaction');
      delete scene.dataset.motion;
      dragonPose = 'idle';
      updateDragonArtwork();
    }, 1100);
  }
  function updateDragonArtwork() {
    const image = document.getElementById('stageDragonArtwork');
    if (!image) return;
    if (!state.hatchedAt || state.lineageHatched) {
      image.classList.add('hidden');
      return;
    }
    const stage = stageName();
    const poses = dragonPoseAssets[stage] || dragonPoseAssets['Prism Drake'];
    const pose = state.slumbering ? 'sleeping' : dragonPose;
    const source = poses[pose] || poses.idle;
    if (image.getAttribute('src') !== source) image.setAttribute('src', source);
    image.dataset.stage = stage;
    image.alt = `${state.name}, ${pose === 'idle' ? stage.toLowerCase() : pose}`;
    image.classList.remove('hidden');
  }
  function drawSceneImage(context, image, width, height, offsetX = 0, zoom = 1) {
    if (!image.complete || !image.naturalWidth) return false;
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight) * zoom;
    const imageWidth = image.naturalWidth * scale;
    const imageHeight = image.naturalHeight * scale;
    context.drawImage(image, (width - imageWidth) / 2 + offsetX, (height - imageHeight) / 2, imageWidth, imageHeight);
    return true;
  }

  function applyElapsedTime() {
    const now = Date.now();
    const awayDays = Math.floor((now - state.lastVisitAt) / DAY_MS);
    if (awayDays > 0 && state.hatchedAt) {
      state.stats.fullness = clamp(state.stats.fullness - Math.min(18, awayDays * 2));
      state.stats.energy = clamp(state.stats.energy - Math.min(12, awayDays));
      state.stats.mood = clamp(state.stats.mood - Math.min(12, awayDays));
      state.stats.luster = clamp(state.stats.luster - Math.min(8, awayDays));
      state.slumbering = awayDays >= 3;
      if (state.slumbering) addJournal('return', 'A quiet crystal slumber', 'The sanctuary stayed safe while you were away. A gentle hello is all it takes to wake again.');
    }
    const dailyGap = Math.floor((now - state.lastDailyAt) / DAY_MS);
    if (dailyGap > 0) {
      state.lastDailyAt = now;
      state.checks = { bond: false, nourish: false, play: false };
      state.pearlDust += 2;
    }
    refreshGardenSeeds(now + state.timeSkipDays * DAY_MS);
    const findGap = Math.floor((now - state.lastFindAt) / (8 * 60 * 60 * 1000));
    if (findGap > 0 && state.hatchedAt) {
      for (let index = 0; index < Math.min(findGap, 3); index += 1) findCuriosity(false);
    }
    if (updateGardenPlots(now)) {
      const readyCount = state.gardenPlots.filter(plot => plot.ready).length;
      addJournal('food', 'Garden beds are ready', `${readyCount} crop${readyCount === 1 ? '' : 's'} are ripe and waiting in the greenhouse.`);
    }
    refreshGardenLife();
    refreshHoardMemories();
    state.lastVisitAt = now;
    save();
  }

  function render() {
    const season = seasonData();
    const days = ageDays();
    const stage = stageName();
    const hatchlingStage = Boolean(state.hatchedAt && stage === 'Hatchling');
    const growth = growthSummary();
    document.getElementById('seasonSidebar').textContent = season.name;
    document.getElementById('weatherIcon').textContent = season.icon;
    document.getElementById('weatherName').textContent = season.weather;
    document.getElementById('weatherMeta').textContent = season.meta;
    document.getElementById('todayLabel').textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase();
    document.getElementById('footerYear').textContent = new Date().getFullYear();
    document.getElementById('dustCount').textContent = state.pearlDust;
    document.getElementById('hoardCount').textContent = state.items.length;
    document.getElementById('collectionCount').textContent = state.items.length;
    document.getElementById('stagePill').textContent = stageLabel();
    document.getElementById('dragonNameLabel').textContent = state.hatchedAt ? state.name : 'A little one, not yet named';
    document.getElementById('ageLabel').textContent = state.hatchedAt ? humanAge() : 'Your story starts here';
    document.getElementById('avatarInitial').textContent = state.hatchedAt ? state.name.slice(0, 1).toUpperCase() : '✧';
    document.getElementById('identityMark').textContent = state.hatchedAt ? '✧' : '✧';
    document.getElementById('growthStageLabel').textContent = growth.stage;
    document.getElementById('dragonAgeDisplay').textContent = growth.age;
    document.getElementById('growthProgressValue').textContent = `${clamp(growth.progress)}%`;
    document.getElementById('growthProgressBar').style.width = `${clamp(growth.progress)}%`;
    document.getElementById('nextMilestoneTitle').textContent = growth.next;
    document.getElementById('nextMilestoneDetail').textContent = growth.detail;
    document.getElementById('sceneCaption').textContent = !state.hatchedAt ? 'Something luminous is dreaming in there.' : state.slumbering ? `${state.name} is curled up in a safe, quiet slumber.` : hatchlingStage ? `${state.name} is curled up in a little nest of starlight.` : state.lineageHatched ? `${state.name} is keeping a gentle watch over ${state.lineageName}.` : `${state.name} is watching the light move through the leaves.`;
    document.getElementById('eggArtwork').classList.toggle('hidden', Boolean(state.hatchedAt));
    document.getElementById('dragonArtwork').classList.add('hidden');
    updateDragonArtwork();
    document.getElementById('familyArtwork').classList.toggle('hidden', !state.lineageHatched);
    document.getElementById('lineageEgg').classList.toggle('hidden', !state.lineageEgg);
    document.getElementById('lineageBabyMark').classList.toggle('hidden', !state.lineageHatched);
    document.getElementById('lineageButton').classList.toggle('hidden', !state.lineageReady || state.lineageEgg);
    document.getElementById('lineageHatchButton').classList.toggle('hidden', !state.lineageEgg);
    document.getElementById('lineageButton').disabled = !state.lineageReady || state.lineageEgg;
    document.getElementById('lineagePercent').textContent = `${Math.min(100, Math.round(days / 365 * 100))}%`;
    document.getElementById('lineageMeter').style.width = `${Math.min(100, days / 365 * 100)}%`;
    document.getElementById('lineageProgressLabel').textContent = state.lineageReady ? 'A new little life is ready' : `${Math.max(0, 365 - days)} days of shared moments to go`;
    document.getElementById('stagePill').textContent = stageLabel();
    document.getElementById('greenhouseSeason').textContent = `${season.name} · ${season.scene}`;
    document.getElementById('gardenHarvests').textContent = state.harvests;
    const readyGardenPlots = state.gardenPlots.filter(plot => plot.ready || Date.now() >= plot.readyAt).length;
    document.getElementById('greenhouseDot').classList.toggle('hidden', readyGardenPlots === 0);
    document.getElementById('pantryCount').textContent = `${Object.values(state.inventory).reduce((sum, value) => sum + value, 0)} portions`;
    const growingGardenPlots = state.gardenPlots.length - readyGardenPlots;
    const emptyGardenBeds = Math.max(0, gardenPlotCapacity() - state.gardenPlots.length);
    document.getElementById('gardenStatus').textContent = readyGardenPlots
      ? `${readyGardenPlots} crop${readyGardenPlots === 1 ? ' is' : 's are'} ready to harvest.`
      : growingGardenPlots
        ? `${growingGardenPlots} crop${growingGardenPlots === 1 ? ' is' : 's are'} growing. They never spoil.`
        : emptyGardenBeds
          ? 'Choose a crop for an empty bed. It will be ready in about a day.'
          : 'Every garden bed is growing. They will be ready in about a day.';
    document.getElementById('gardenSeedCount').textContent = `${state.gardenSeeds} Moon-seed${state.gardenSeeds === 1 ? '' : 's'} available`;
    const harvestButton = document.getElementById('harvestReadyGardenButton');
    harvestButton.classList.toggle('hidden', readyGardenPlots === 0);
    harvestButton.textContent = readyGardenPlots > 0 ? `Harvest ready (${readyGardenPlots}) ✿` : 'Harvest ready';
    renderGardenPlots();
    renderGardenLife();
    document.getElementById('sceneActions').innerHTML = state.hatchedAt
      ? `<button class="soft-button" data-action="pet"><span>♡</span> Gentle petting</button><button class="soft-button" data-action="polish"><span>✦</span> Polish scales</button><button class="soft-button" data-action="startGlide"><span>⌁</span> Go gliding</button>`
      : `<button class="soft-button" data-action="hum"><span>♫</span> Hum softly</button><button class="soft-button" data-action="warm"><span>☼</span> Tend embers</button><button class="soft-button" data-action="polishEgg"><span>✦</span> Polish shell</button>`;
    document.getElementById('hatchProgressBlock').classList.toggle('hidden', Boolean(state.hatchedAt));
    document.getElementById('dragonStats').classList.toggle('hidden', !state.hatchedAt);
    document.getElementById('careTitle').textContent = !state.hatchedAt ? 'Getting ready to hatch' : state.slumbering ? 'A gentle wake-up' : `${state.name} is doing well`;
    document.getElementById('careCopy').textContent = !state.hatchedAt ? 'Every little kindness helps the light find its way out.' : state.slumbering ? 'No apologies needed. Rest a hand nearby and let the sanctuary wake slowly.' : 'No rush. A little hello goes a long way.';
    document.getElementById('hatchPercent').textContent = `${state.hatchProgress}%`;
    document.getElementById('hatchMeter').style.width = `${state.hatchProgress}%`;
    document.getElementById('hatchHint').textContent = state.hatchProgress >= 75 ? 'A bright little crack runs through the shell.' : state.hatchProgress >= 35 ? 'A soft glow answers from within.' : 'The egg answers your touch.';
    document.getElementById('petButtonText').textContent = state.slumbering ? 'Wake with a gentle touch' : !state.hatchedAt ? 'Rest a hand on the shell' : 'Spend a quiet moment';
    document.getElementById('careStatus').textContent = !state.hatchedAt ? 'No rush. This little world will wait for you.' : state.slumbering ? 'Safe, warm, and ready when you are.' : 'Your dragon is safe here, even on quiet days.';
    document.getElementById('careButtons').classList.toggle('hatching-buttons', !state.hatchedAt);
    ['fullness', 'energy', 'mood', 'luster'].forEach(key => {
      document.getElementById(`${key}Value`).textContent = state.stats[key];
      document.getElementById(`${key}Meter`).style.width = `${state.stats[key]}%`;
    });
    document.getElementById('dailyProgressText').textContent = `${Object.values(state.checks).filter(Boolean).length} of 3 little moments`;
    document.querySelectorAll('.check-item').forEach(item => item.classList.toggle('done', Boolean(state.checks[item.dataset.check])));
    document.getElementById('hoardTeaserTitle').textContent = state.items.length ? `${state.items[0].name} found its way home` : 'Curiosities find their way home';
    document.getElementById('hoardTeaser').textContent = state.items.length ? state.items[0].note : 'Your dragon may bring back a tiny treasure while you are away.';
    document.getElementById('journalDays').textContent = days + 1 === 1 ? 'Day one' : `Day ${days + 1}`;
    document.getElementById('sanctuaryDays').textContent = days + 1;
    document.getElementById('sharedMoments').textContent = state.moments;
    document.getElementById('journalFinds').textContent = state.items.length;
    renderFood();
    renderHoard();
    renderHoardShelf();
    renderJournal();
    if (!state.hatchedAt) {
      document.getElementById('welcomeTitle').textContent = 'A little light, every day.';
      document.getElementById('welcomeSubtitle').textContent = 'Your sanctuary is right where you left it.';
    } else {
      document.getElementById('welcomeTitle').textContent = state.slumbering ? 'A soft hello is enough.' : `Good to see you, ${state.name}.`;
      document.getElementById('welcomeSubtitle').textContent = state.slumbering ? 'The garden kept a little warmth for your return.' : 'Your sanctuary is right where you left it.';
    }
  }

  function renderFood() {
    const grid = document.getElementById('foodGrid');
    grid.innerHTML = foodCatalog.map(food => `<article class="food-card"><div class="food-art" aria-hidden="true"><img src="${food.image}" alt="" loading="lazy"></div><h3>${food.name}</h3><p>${food.note}</p><div class="food-bottom"><span class="food-quantity">${state.inventory[food.id] || 0} portions</span><div class="food-actions"><button type="button" data-action="feed" data-food="${food.id}" ${!state.hatchedAt || !state.inventory[food.id] ? 'disabled' : ''}>Feed</button></div></div></article>`).join('');
  }
  function renderGardenPlots() {
    const grid = document.getElementById('gardenPlots');
    const now = Date.now();
    grid.innerHTML = Array.from({ length: gardenPlotCapacity() }, (_, index) => {
      const plot = state.gardenPlots[index];
      if (!plot) return `<article class="garden-plot garden-plot-empty"><span class="garden-plot-art"><img src="assets/greenhouse/moon-berries-seedling.webp" alt="" loading="lazy"></span><span class="garden-plot-copy"><strong>Bed ${index + 1}</strong><small>Ready for a crop</small></span><button class="garden-plot-button" data-action="chooseGardenCrop" data-plot-index="${index}" ${state.gardenSeeds < 1 ? 'disabled' : ''}>Plant</button></article>`;
      const crop = foodCatalog.find(food => food.id === plot.cropId) || foodCatalog[0];
      const ready = Boolean(plot.ready || now >= plot.readyAt);
      const elapsed = Math.max(0, now - plot.plantedAt);
      const plantImage = ready ? crop.image : crop.id === 'moon-berries' ? elapsed < GARDEN_GROWTH_MS / 2 ? 'assets/greenhouse/moon-berries-seedling.webp' : 'assets/greenhouse/moon-berries-growing.webp' : crop.image;
      const hoursLeft = Math.max(1, Math.ceil((plot.readyAt - now) / (60 * 60 * 1000)));
      const status = ready ? 'Ready to harvest' : `Growing · about ${hoursLeft}h left`;
      return `<article class="garden-plot${ready ? ' garden-plot-ready' : ''}"><span class="garden-plot-art"><img src="${plantImage}" alt="" loading="lazy"></span><span class="garden-plot-copy"><strong>Bed ${index + 1} · ${crop.name}</strong><small>${status}</small></span><span class="garden-plot-status">${ready ? '✿' : '·'}</span></article>`;
    }).join('');
  }
  function renderHoard() {
    const grid = document.getElementById('collectionGrid');
    const collection = state.items.map(item => ({ ...item, ...curiosities.find(curio => curio.name === item.name) }));
    const items = sortNewest ? collection : collection.reverse();
    if (!items.length) {
      grid.innerHTML = '<div class="empty-collection"><span>◈</span><h3>A space for the things you find</h3><p>Once your dragon hatches, it will start taking gentle strolls. The first little curiosity will arrive in time.</p></div>';
    } else {
      grid.innerHTML = items.map(item => `<article class="curio-card"><span class="curio-date">${relativeDate(item.at)}</span><div class="curio-art" aria-hidden="true">${item.image ? `<img src="${item.image}" alt="" loading="lazy">` : item.icon}</div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.note)}</p>${item.story ? `<button class="text-button curio-story-button" data-action="openCuriosity" data-curiosity="${escapeHtml(item.name)}" aria-label="Read the story of ${escapeHtml(item.name)}"><span aria-hidden="true">▤</span> Read its story</button>` : ''}</article>`).join('');
    }
    const nextLabel = !state.hatchedAt ? 'After your dragon hatches' : 'A little wander, every so often';
    document.getElementById('nextFindLabel').textContent = state.hatchedAt ? nextLabel : nextLabel;
  }
  function gardenPlantAvailable(plant) {
    return plant.treasure ? state.items.some(item => item.name === plant.treasure) : state.gardenLife.discovered.includes(plant.id);
  }
  function gardenPlantName(plant) { return state.gardenLife.names[plant.id] || plant.name; }
  function renderGardenLife() {
    const border = document.getElementById('ornamentalBorder');
    if (!border) return;
    const season = gardenSeason();
    document.getElementById('view-greenhouse').dataset.gardenSeason = season.key;
    document.getElementById('gardenSeasonSelect').value = state.gardenLife.season;
    document.getElementById('gardenSeasonCopy').textContent = `${season.name} · ${season.description}`;
    const positions = state.gardenLife.borders.map((id, index) => {
      const plant = gardenPlants.find(entry => entry.id === id);
      return `<button class="border-plant${plant ? '' : ' border-empty'}" data-action="${plant ? 'openGardenPlant' : 'openBorderPicker'}" data-slot="${index}" ${plant ? `data-plant="${id}"` : ''} aria-label="${plant ? escapeHtml(gardenPlantName(plant)) : `Plant ornamental position ${index + 1}`}">${plant ? `<img src="${plant.image}" alt=""><strong>${escapeHtml(gardenPlantName(plant))}</strong>` : '<span aria-hidden="true">&#43;</span><strong>A little room to grow</strong>'}</button>`;
    }).join('');
    border.innerHTML = positions;
    const sanctuary = document.getElementById('sanctuaryGarden');
    if (sanctuary) {
      sanctuary.innerHTML = state.gardenLife.borders.filter(Boolean).map(id => {
        const plant = gardenPlants.find(entry => entry.id === id);
        return `<button data-action="openGardenPlant" data-plant="${id}"><img src="${plant.image}" alt=""><span>${escapeHtml(gardenPlantName(plant))}</span></button>`;
      }).join('');
      sanctuary.dataset.gardenSeason = season.key;
      sanctuary.classList.toggle('hidden', !state.gardenLife.borders.some(Boolean));
    }
    const moment = state.gardenLife.moment;
    const poses = dragonPoseAssets[stageName()] || dragonPoseAssets.Hatchling;
    const dragon = document.getElementById('gardenDragonPortrait');
    dragon.src = poses[moment?.pose || 'idle'] || poses.idle;
    dragon.alt = `${state.name} in the garden`;
    dragon.classList.toggle('hidden', !state.hatchedAt);
    document.getElementById('gardenMomentTitle').textContent = moment?.title || 'A place to spend a little time';
    document.getElementById('gardenMomentBody').textContent = moment?.body || 'The leaves are still, and a little warmth lingers by the beds.';
    document.getElementById('keepGardenMomentButton').disabled = !moment;
    document.getElementById('gardenVisitors').innerHTML = gardenVisitors.map(visitor => {
      const seen = state.gardenLife.visitors.find(entry => entry.id === visitor.id);
      return `<button class="garden-visitor${state.gardenLife.currentVisitor === visitor.id ? ' is-visiting' : ''}" data-action="openGardenVisitor" data-visitor="${visitor.id}" ${seen ? '' : 'disabled'}><img src="${visitor.image}" alt=""><strong>${visitor.name}</strong><small>${seen ? state.gardenLife.currentVisitor === visitor.id ? 'Visiting now' : `First seen ${relativeDate(seen.at)}` : 'Not seen yet'}</small></button>`;
    }).join('');
    document.getElementById('gardenHybrids').innerHTML = gardenPlants.filter(plant => plant.crops).map(plant => `<article class="garden-discovery"><img src="${plant.image}" alt=""><div><h3>${plant.name}</h3><p>${plant.crops.map(id => foodCatalog.find(food => food.id === id).name).join(' + ')}</p><small>${state.gardenLife.discovered.includes(plant.id) ? 'A seed to keep' : `${plant.crops.filter(id => state.gardenLife.pollen.includes(id)).length} / 2 pollens remembered`}</small></div><button class="text-button" data-action="chooseGardenDiscovery" data-plant="${plant.id}" ${state.gardenLife.discovered.includes(plant.id) ? '' : 'disabled'}>Plant <span aria-hidden="true">&#43;</span></button></article>`).join('');
    document.getElementById('gardenKeepsakes').innerHTML = gardenPlants.filter(plant => plant.treasure).map(plant => {
      const treasure = curiosities.find(item => item.name === plant.treasure);
      const owned = gardenPlantAvailable(plant);
      return `<article class="garden-discovery"><img src="${treasure.image}" alt=""><div><h3>${plant.name}</h3><p>${plant.treasure}</p><small>${state.gardenLife.keepsakes.includes(plant.id) ? 'A story growing in the garden' : owned ? 'A little possibility' : 'Not yet found'}</small></div><button class="text-button" data-action="chooseGardenDiscovery" data-plant="${plant.id}" ${owned ? '' : 'disabled'}>Plant <span aria-hidden="true">&#43;</span></button></article>`;
    }).join('');
    document.getElementById('gardenMemoryPreview').innerHTML = state.gardenLife.scrapbook.length ? state.gardenLife.scrapbook.slice(0, 3).map(entry => `<article class="garden-memory"><small>${relativeDate(entry.at)}</small><h3>${escapeHtml(entry.title)}</h3><p>${escapeHtml(entry.body)}</p></article>`).join('') : '<p class="garden-quiet-copy">The first page is waiting for a little garden moment.</p>';
  }
  function openBorderPicker(slot = 0, preferred = null) {
    stopGame();
    borderSlot = Number.isInteger(slot) && slot >= 0 && slot < 3 ? slot : 0;
    const card = document.getElementById('modalCard');
    card.className = 'modal-card garden-picker-modal';
    card.innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">&times;</button><div class="modal-eyebrow">THE ORNAMENTAL BORDER</div><h2 id="modalTitle">A little room to grow</h2><fieldset class="shelf-positions"><legend>Planting position</legend>${['Left', 'Middle', 'Right'].map((label, index) => `<label><input type="radio" name="borderPosition" data-action="selectBorderSlot" data-slot="${index}" ${index === borderSlot ? 'checked' : ''}><span>${label}</span></label>`).join('')}</fieldset><div class="garden-plant-choices">${gardenPlants.map(plant => `<button class="garden-plant-choice${preferred === plant.id ? ' is-preferred' : ''}" data-action="plantBorder" data-plant="${plant.id}" ${gardenPlantAvailable(plant) ? '' : 'disabled'} aria-pressed="${state.gardenLife.borders[borderSlot] === plant.id}"><img src="${plant.image}" alt=""><span><strong>${escapeHtml(gardenPlantName(plant))}</strong><small>${plant.crops && !gardenPlantAvailable(plant) ? 'Waiting for its pollens' : plant.treasure && !gardenPlantAvailable(plant) ? `From ${plant.treasure}` : plant.note}</small></span></button>`).join('')}</div><div class="modal-actions"><button class="secondary-button" data-action="clearBorderSlot" ${state.gardenLife.borders[borderSlot] ? '' : 'disabled'}>Clear position</button><button class="primary-button" data-action="closeModal">Done <span aria-hidden="true">&rarr;</span></button></div>`;
    document.getElementById('modalBackdrop').classList.remove('hidden');
    card.querySelector('input:checked').focus({ preventScroll: true });
  }
  function plantBorder(id) {
    const plant = gardenPlants.find(entry => entry.id === id);
    if (!plant || !gardenPlantAvailable(plant)) return;
    state.gardenLife.borders = state.gardenLife.borders.map(current => current === id ? null : current);
    state.gardenLife.borders[borderSlot] = id;
    if (!state.gardenLife.discovered.includes(id)) state.gardenLife.discovered.push(id);
    addGardenMemory(`plant-${id}`, `${plant.name}, at home`, `${state.name} found a place for ${plant.name.toLowerCase()} in the ornamental border.`);
    if (plant.treasure && !state.gardenLife.keepsakes.includes(id)) {
      state.gardenLife.keepsakes.push(id);
      const body = `${plant.treasure} has a living companion in the garden now. ${state.name} checks the little leaves with great care. The original treasure is still safe in the hoard.`;
      addHoardChapter(state.items.find(item => item.name === plant.treasure), `garden-${id}`, 'A story with roots', body, false);
      addGardenMemory(`keepsake-${id}`, 'A story with roots', body);
    }
    makeGardenMoment('plant');
    closeModal();
    commit();
  }
  function openGardenPlant(id) {
    const plant = gardenPlants.find(entry => entry.id === id);
    if (!plant || !gardenPlantAvailable(plant)) return;
    stopGame();
    document.getElementById('modalCard').className = 'modal-card garden-plant-modal';
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">&times;</button><div class="modal-eyebrow">A LITTLE WILDNESS OF YOUR OWN</div><h2 id="modalTitle">${escapeHtml(gardenPlantName(plant))}</h2><div class="garden-plant-portrait"><img src="${plant.image}" alt="${escapeHtml(plant.name)}"></div><p>${plant.note}</p><label class="modal-label" for="gardenPlantName">PLANT NAME</label><input class="modal-input" id="gardenPlantName" maxlength="30" value="${escapeHtml(state.gardenLife.names[id] || '')}" placeholder="${plant.name}"><label class="modal-label" for="gardenPlantNote">YOUR GARDEN NOTE</label><textarea class="modal-input curio-inscription" id="gardenPlantNote" maxlength="240" rows="3">${escapeHtml(state.gardenLife.notes[id] || '')}</textarea><div class="modal-actions"><button class="secondary-button" data-action="chooseGardenDiscovery" data-plant="${id}">Rearrange</button><button class="primary-button" data-action="saveGardenPlant" data-plant="${id}">Save <span aria-hidden="true">&rarr;</span></button></div>`;
    document.getElementById('modalBackdrop').classList.remove('hidden');
    document.getElementById('gardenPlantName').focus({ preventScroll: true });
  }
  function saveGardenPlant(id) {
    if (!gardenPlants.some(plant => plant.id === id && gardenPlantAvailable(plant))) return;
    const name = document.getElementById('gardenPlantName')?.value.trim().slice(0, 30) || '';
    const note = document.getElementById('gardenPlantNote')?.value.trim().slice(0, 240) || '';
    if (name) state.gardenLife.names[id] = name; else delete state.gardenLife.names[id];
    if (note) state.gardenLife.notes[id] = note; else delete state.gardenLife.notes[id];
    closeModal(); commit(); showToast('Your garden words are safely kept.');
  }
  function setGardenSeason(value) {
    if (!['auto', 'spring', 'summer', 'autumn', 'winter'].includes(value)) return;
    state.gardenLife.season = value;
    const season = gardenSeason();
    addGardenMemory(`season-${season.key}`, `${season.name} in the garden`, season.description);
    commit();
  }
  function openGardenVisitor(id) {
    const visitor = gardenVisitors.find(entry => entry.id === id);
    const sighting = state.gardenLife.visitors.find(entry => entry.id === id);
    if (!visitor || !sighting) return;
    stopGame();
    document.getElementById('modalCard').className = 'modal-card garden-plant-modal';
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">&times;</button><div class="modal-eyebrow">A FRIENDLY VISITOR</div><h2 id="modalTitle">${visitor.name}</h2><div class="garden-plant-portrait"><img src="${visitor.image}" alt="${visitor.name}"></div><p>First seen ${relativeDate(sighting.at)}</p><p class="garden-visitor-story">${visitor.story}</p><div class="modal-actions"><button class="primary-button" data-action="closeModal">Back to the garden <span aria-hidden="true">&rarr;</span></button></div>`;
    document.getElementById('modalBackdrop').classList.remove('hidden');
    document.querySelector('#modalCard .modal-close').focus({ preventScroll: true });
  }
  function openGardenScrapbook(memoryId = null) {
    stopGame();
    const editing = memoryId ? state.gardenLife.scrapbook.find(entry => entry.id === memoryId && entry.personal) : null;
    document.getElementById('modalCard').className = 'modal-card garden-scrapbook-modal';
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">&times;</button><div class="modal-eyebrow">SMALL THINGS WORTH KEEPING</div><h2 id="modalTitle">The garden scrapbook</h2><label class="modal-label" for="gardenMemoryTitle">MEMORY TITLE</label><input class="modal-input" id="gardenMemoryTitle" maxlength="60" value="${escapeHtml(editing?.title || '')}"><label class="modal-label" for="gardenMemoryBody">YOUR WORDS</label><textarea class="modal-input curio-inscription" id="gardenMemoryBody" maxlength="240" rows="3">${escapeHtml(editing?.body || '')}</textarea><button class="secondary-button" data-action="saveGardenMemory" ${editing ? `data-memory="${escapeHtml(editing.id)}"` : ''}><span aria-hidden="true">&#9998;</span> ${editing ? 'Save changes' : 'Keep a memory'}</button><div class="garden-scrapbook-entries">${state.gardenLife.scrapbook.map(entry => `<article class="garden-memory"><small>${relativeDate(entry.at)}</small><h3>${escapeHtml(entry.title)}</h3><p>${escapeHtml(entry.body)}</p>${entry.personal ? `<button class="text-button" data-action="editGardenMemory" data-memory="${escapeHtml(entry.id)}">Edit <span aria-hidden="true">&#9998;</span></button>` : ''}</article>`).join('')}</div>`;
    document.getElementById('modalBackdrop').classList.remove('hidden');
    (editing ? document.getElementById('gardenMemoryTitle') : document.querySelector('#modalCard .modal-close')).focus({ preventScroll: true });
  }
  function saveGardenMemory(id) {
    const title = document.getElementById('gardenMemoryTitle')?.value.trim().slice(0, 60);
    const body = document.getElementById('gardenMemoryBody')?.value.trim().slice(0, 240);
    if (!title || !body) { showToast('Give this little memory a title and a few words.'); return; }
    const entry = id ? state.gardenLife.scrapbook.find(memory => memory.id === id && memory.personal) : null;
    if (id && !entry) return;
    if (entry) { entry.title = title; entry.body = body; }
    else {
      const memoryId = `personal-${Date.now()}-${state.gardenLife.scrapbook.length}`;
      addGardenMemory(memoryId, title, body);
      state.gardenLife.scrapbook.find(memory => memory.id === memoryId).personal = true;
    }
    commit(); openGardenScrapbook();
  }
  function openCuriosity(name) {
    const collected = state.items.find(item => item.name === name);
    const curio = curiosities.find(item => item.name === name);
    if (!collected || !curio || !curio.story) return;
    stopGame();
    document.getElementById('modalCard').className = 'modal-card curio-story-modal';
    const story = curio.story.replaceAll('{dragon}', () => state.name);
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">&times;</button><div class="modal-eyebrow">A LITTLE SOMETHING BROUGHT HOME</div><h2 id="modalTitle">${escapeHtml(curio.name)}</h2><div class="curio-story-art"><img src="${curio.image}" alt="${escapeHtml(curio.name)}"></div><p class="curio-story-date">Found ${relativeDate(collected.at)}</p><p class="curio-story-copy">${escapeHtml(story)}</p><div class="modal-actions"><button class="primary-button" data-action="closeModal">Back to the hoard <span aria-hidden="true">&rarr;</span></button></div>`;
    const details = document.createElement('div');
    details.className = 'curio-extra';
    const origins = { glide: 'Found while thermal gliding', bounce: 'Found in the crystal cave', seek: 'Found in Whispering Reeds', wander: 'Brought home from a quiet wander' };
    details.innerHTML = `${collected.origin ? `<p class="curio-origin">${origins[collected.origin] || origins.wander}</p>` : ''}${(collected.chapters || []).map(chapter => `<section class="curio-chapter"><div class="eyebrow">${relativeDate(chapter.at)}</div><h3>${escapeHtml(chapter.title)}</h3><p>${escapeHtml(chapter.body)}</p></section>`).join('')}${collected.heirloom ? `<p class="curio-heirloom">A keepsake from ${escapeHtml(collected.heirloom.parent)} to ${escapeHtml(collected.heirloom.child)}.</p>` : ''}<label class="modal-label" for="curioInscription">YOUR INSCRIPTION</label><textarea class="modal-input curio-inscription" id="curioInscription" maxlength="240" rows="3">${escapeHtml(state.hoardNotes[name] || '')}</textarea><button class="secondary-button" data-action="saveInscription" data-curiosity="${escapeHtml(name)}"><span aria-hidden="true">&#9998;</span> Save inscription</button>`;
    document.querySelector('#modalCard .modal-actions').before(details);
    const gardenPlant = gardenPlants.find(plant => plant.treasure === name);
    if (gardenPlant) document.querySelector('#modalCard .modal-actions').insertAdjacentHTML('afterbegin', `<button class="secondary-button" data-action="takeToGarden" data-plant="${gardenPlant.id}"><span aria-hidden="true">&#10047;</span> Plant in the garden</button>`);
    if (document.getElementById('view-sanctuary').classList.contains('active')) document.querySelector('#modalCard .modal-actions .primary-button').innerHTML = 'Back to the shelf <span aria-hidden="true">&rarr;</span>';
    document.querySelector('#modalCard .modal-actions').insertAdjacentHTML('afterbegin', `<button class="secondary-button" data-action="shelfFromStory" data-curiosity="${escapeHtml(name)}"><span aria-hidden="true">&#9671;</span> ${state.hoardShelf.includes(name) ? 'Move on shelf' : 'Display on shelf'}</button>${state.lineageHatched && ageDays() >= 365 && !state.lineageKeepsake ? `<button class="secondary-button" data-action="passKeepsake" data-curiosity="${escapeHtml(name)}"><span aria-hidden="true">&#9825;</span> Pass to ${escapeHtml(state.lineageName)}</button>` : ''}`);
    document.getElementById('modalBackdrop').classList.remove('hidden');
    document.querySelector('#modalCard .modal-close').focus({ preventScroll: true });
  }
  function renderHoardShelf() {
    const shelf = document.getElementById('treasureShelf');
    if (!shelf) return;
    shelf.innerHTML = state.hoardShelf.map((name, index) => {
      const curio = curiosities.find(item => item.name === name);
      return `<button class="shelf-treasure${curio && state.hoardShelfNotice?.name === name ? ' is-noticed' : ''}" data-action="${curio ? 'shelfTreasure' : 'openShelf'}" data-slot="${index}" ${curio ? `data-curiosity="${escapeHtml(name)}"` : ''} aria-label="${curio ? `Visit ${escapeHtml(name)}` : `Choose a treasure for position ${index + 1}`}">${curio ? `<img src="${curio.image}" alt=""><strong>${escapeHtml(name)}</strong>${state.hoardNotes[name] ? `<small title="${escapeHtml(state.hoardNotes[name])}">${escapeHtml(state.hoardNotes[name])}</small>` : ''}${state.lineageKeepsake === name ? '<span class="shelf-keepsake">Family keepsake</span>' : ''}` : '<span class="shelf-empty" aria-hidden="true">&#43;</span><strong>A little space</strong>'}</button>`;
    }).join('');
    const activePair = hoardArrangements.find(pair => pair.names.every(name => state.hoardShelf.includes(name)));
    const notice = state.hoardShelf.includes(state.hoardShelfNotice?.name) ? state.hoardShelfNotice.text : '';
    document.getElementById('shelfMoment').textContent = shelfReaction || (activePair ? hoardText(activePair.body) : notice || 'A quiet place for the things that feel like home.');
  }
  function openShelfPicker(slot = 0, preferred = null) {
    stopGame();
    shelfSlot = Number.isInteger(slot) && slot >= 0 && slot < 3 ? slot : 0;
    const card = document.getElementById('modalCard');
    card.className = 'modal-card shelf-picker-modal';
    card.dataset.preferredTreasure = preferred || '';
    const positionNames = ['Left', 'Middle', 'Right'];
    card.innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">&times;</button><div class="modal-eyebrow">LITTLE TREASURES, CLOSE BY</div><h2 id="modalTitle">Arrange the shelf</h2><fieldset class="shelf-positions"><legend>Display position</legend>${positionNames.map((label, index) => `<label><input type="radio" name="shelfPosition" value="${index}" data-action="selectShelfSlot" data-slot="${index}" ${index === shelfSlot ? 'checked' : ''}><span>${label}</span></label>`).join('')}</fieldset><div class="shelf-choice-list">${state.items.length ? state.items.map(item => {
      const curio = curiosities.find(entry => entry.name === item.name);
      if (!curio) return '';
      return `<button class="shelf-choice${preferred === item.name ? ' is-preferred' : ''}" data-action="displayCuriosity" data-curiosity="${escapeHtml(item.name)}" aria-pressed="${state.hoardShelf[shelfSlot] === item.name}"><img src="${curio.image}" alt=""><span>${escapeHtml(item.name)}</span>${state.hoardShelf.includes(item.name) ? '<small>On shelf</small>' : ''}</button>`;
    }).join('') : '<p class="shelf-waiting">The shelf is waiting for its first little discovery.</p>'}</div><div class="modal-actions"><button class="secondary-button" data-action="clearShelfSlot" ${state.hoardShelf[shelfSlot] ? '' : 'disabled'}>Clear position</button><button class="primary-button" data-action="closeModal">Done <span aria-hidden="true">&rarr;</span></button></div>`;
    document.getElementById('modalBackdrop').classList.remove('hidden');
    card.querySelector('input:checked').focus({ preventScroll: true });
  }
  function displayCuriosity(name) {
    const item = state.items.find(entry => entry.name === name);
    if (!item || !curiosities.some(curio => curio.name === name)) return;
    state.hoardShelf = state.hoardShelf.map(current => current === name ? null : current);
    state.hoardShelf[shelfSlot] = name;
    shelfReaction = `${state.name} settles the ${name.toLowerCase()} into its new place.`;
    commit();
    openShelfPicker(shelfSlot, name);
    showToast('A little treasure, close by.');
  }
  function saveInscription(name) {
    if (!state.items.some(item => item.name === name)) return;
    const input = document.getElementById('curioInscription');
    if (!input) return;
    const note = input.value.trim().slice(0, 240);
    if (note) state.hoardNotes[name] = note;
    else delete state.hoardNotes[name];
    commit();
    showToast(note ? 'Your words are tucked safely beside the treasure.' : 'The inscription has been cleared.');
  }
  function passKeepsake(name) {
    const item = state.items.find(entry => entry.name === name);
    if (!item || !state.lineageHatched || ageDays() < 365 || state.lineageKeepsake) return;
    state.lineageKeepsake = name;
    item.heirloom = { parent: state.name, child: state.lineageName, at: hoardNow() };
    addHoardChapter(item, 'heirloom', 'A treasure, handed on', `${state.name} placed the ${name.toLowerCase()} beside ${state.lineageName}'s nest. The little one reached for it, then leaned against a familiar warm side. The treasure had not left the family; its story had simply grown.`);
    commit();
    openCuriosity(name);
    showToast(`A family keepsake for ${state.lineageName}.`);
  }
  function renderJournal() {
    const list = document.getElementById('journalEntries');
    list.innerHTML = state.journal.slice(0, 18).map(entry => `<article class="journal-entry"><span class="journal-entry-marker">${entry.type === 'food' ? '◉' : entry.type === 'game' ? '⌁' : entry.type === 'find' ? '◈' : entry.type === 'hatch' ? '✧' : entry.type === 'bond' ? '♡' : '✦'}</span><div class="journal-entry-content"><span class="journal-entry-date">${relativeDate(entry.at)}</span><h3>${escapeHtml(entry.title)}</h3><p>${escapeHtml(entry.body)}</p></div></article>`).join('');
  }
  function setView(view) {
    document.querySelectorAll('.view-panel').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === view));
    document.querySelectorAll('.nav-link[data-view]').forEach(link => link.classList.toggle('active', link.dataset.view === view));
    document.getElementById('crumbCurrent').textContent = ({ sanctuary: 'TODAY', greenhouse: 'GREENHOUSE', games: 'PLAY & WANDER', hoard: 'CURIOSITY HOARD', journal: 'FIELD JOURNAL' })[view] || 'TODAY';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function addHatchProgress(amount, source) {
    if (state.hatchedAt) return;
    state.hatchProgress = clamp(state.hatchProgress + amount);
    state.moments += 1;
    animateDragon('egg');
    playTone(source === 'hum' ? 520 : 410);
    if (state.hatchProgress >= 100) hatchDragon();
    else showToast(source === 'warm' ? 'The embers glow a little brighter.' : source === 'hum' ? 'A tiny answering hum from inside.' : 'The shell catches the light.');
    commit();
  }
  function hatchDragon() {
    state.hatchedAt = Date.now() + state.timeSkipDays * DAY_MS;
    state.name = state.name || 'Luma';
    state.stats = { fullness: 76, energy: 82, mood: 91, luster: clamp(62 + state.hatchProgress / 5) };
    state.pearlDust += 8;
    state.checks.bond = true;
    state.moments += 1;
    addJournal('hatch', 'A new little dragon', `${state.name} blinked at the garden light and decided it felt like home.`);
    document.getElementById('modalBackdrop').classList.remove('hidden');
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">×</button><div class="modal-eyebrow">A BRAND-NEW BEGINNING</div><div class="hatch-celebration-art">✧</div><h2 id="modalTitle">Hello, little light.</h2><p>Your dragon hatched right into a safe place. What shall we call them?</p><label class="modal-label" for="dragonNameInput">DRAGON NAME</label><input class="modal-input" id="dragonNameInput" maxlength="18" value="${escapeHtml(state.name)}"><div class="modal-actions"><button class="primary-button" data-action="saveDragonName">Meet ${escapeHtml(state.name)} <span>→</span></button></div>`;
    document.querySelector('.hatch-celebration-art').style.cssText = 'display:grid;place-items:center;width:100%;height:95px;margin:12px 0;border-radius:7px;background:linear-gradient(135deg,#e3efe1,#f5e8d7);color:#75a18c;font-size:58px;text-shadow:0 0 22px #fff;';
    playTone(660, .28);
  }
  function meetDragon() {
    const input = document.getElementById('dragonNameInput');
    const name = input.value.trim().slice(0, 18);
    state.name = name || 'Luma';
    addJournal('hatch', 'A name for a new friend', `${state.name} has a name and a home in the garden.`);
    closeModal();
    animateDragon('hatch');
    showToast(`${state.name} is happy to meet you.`, '♡');
    commit();
  }
  function petDragon() {
    if (!state.hatchedAt) { addHatchProgress(12, 'touch'); return; }
    if (state.slumbering) {
      state.slumbering = false;
      capStat('mood', 12);
      capStat('energy', 6);
      state.moments += 1;
      state.checks.bond = true;
      addJournal('bond', 'A soft hello after a long sleep', `${state.name} woke slowly, stretched, and leaned into your hand.`);
      playTone(420, .18);
      animateDragon('wake');
      showToast(`${state.name} stretches awake. Welcome back.`, '♡');
    } else {
      capStat('mood', 9);
      state.moments += 1;
      state.checks.bond = true;
      if (Math.random() > .58) state.pearlDust += 1;
      playTone(530, .12);
      animateDragon('bond');
      showToast(`${state.name} leans into your hand.`, '♡');
      if (!state.journal.some(entry => entry.title === 'A moment, just for you' && relativeDate(entry.at) === 'Today')) addJournal('bond', 'A moment, just for you', `${state.name} settled beside you while the garden light shifted.`);
    }
    commit();
  }
  function polishScales() {
    if (!state.hatchedAt) { addHatchProgress(16, 'polish'); return; }
    capStat('luster', 8);
    state.pearlDust += 2;
    state.moments += 1;
    state.checks.bond = true;
    addJournal('bond', 'A fresh little shimmer', `You gently polished ${state.name}'s scales. They caught the light like a quiet rainbow.`);
    playTone(720, .09);
    animateDragon('polish');
    showToast('Two Pearl Dust gathered from the soft brushing.', '✦');
    commit();
  }
  function feed(foodId) {
    const food = foodCatalog.find(item => item.id === foodId);
    if (!food || !state.hatchedAt || state.inventory[foodId] < 1) return;
    state.inventory[foodId] -= 1;
    capStat('fullness', food.fullness);
    capStat('luster', food.luster);
    capStat('mood', food.mood);
    capStat('energy', food.energy);
    state.checks.nourish = true;
    state.moments += 1;
    addJournal('food', `${food.name} for ${state.name}`, food.treat ? `${state.name} enjoyed a sweet little treat. A gentle glide later can help bring the shine back.` : `${state.name} enjoyed a fresh bite. ${food.note}`);
    if (food.treat && state.inventory['sugar-crystal'] <= 0) showToast('A sweet treat! Try a healthy bite next time to bring back the shimmer.', '✧');
    else showToast(`${state.name} enjoys the ${food.name.toLowerCase()}.`, food.icon);
    playTone(570, .1);
    closeModal();
    animateDragon('snack');
    commit();
  }
  function openFoodModal() {
    if (!state.hatchedAt) { showToast('The little one is still getting ready to hatch.'); return; }
    document.getElementById('modalBackdrop').classList.remove('hidden');
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">×</button><div class="modal-eyebrow">A LITTLE SOMETHING GOOD</div><h2 id="modalTitle">Choose a snack for ${escapeHtml(state.name)}.</h2><p>There is no wrong answer. Different foods bring different little comforts.</p><div class="food-select-list">${foodCatalog.map(food => `<button class="food-choice" data-action="feed" data-food="${food.id}" ${!state.inventory[food.id] ? 'disabled' : ''}><span class="food-choice-art"><img src="${food.image}" alt="" loading="lazy"></span><span><strong>${food.name}</strong><small>${food.effect}</small></span><span class="food-choice-qty">× ${state.inventory[food.id] || 0}</span></button>`).join('')}</div>`;
  }
  function openGardenCropPicker(plotIndex) {
    if (!Number.isInteger(plotIndex) || plotIndex < 0 || plotIndex >= gardenPlotCapacity() || state.gardenPlots[plotIndex]) return;
    if (state.gardenSeeds < 1) { showToast('A fresh seed returns each day.', '☾'); return; }
    const plantableFoods = foodCatalog.filter(food => !food.treat);
    document.getElementById('modalBackdrop').classList.remove('hidden');
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">×</button><div class="modal-eyebrow">CHOOSE THIS BED'S CROP</div><h2 id="modalTitle">What should grow here?</h2><p>One seed starts one crop. It will be ready in about a day and won’t spoil.</p><div class="food-select-list">${plantableFoods.map(food => `<button class="food-choice" data-action="plantGardenCrop" data-crop="${food.id}" data-plot-index="${plotIndex}"><span class="food-choice-art"><img src="${food.image}" alt="" loading="lazy"></span><span><strong>${food.name}</strong><small>${food.effect} · Harvests 2 portions</small></span></button>`).join('')}</div>`;
  }
  function plantCrop(cropId, plotIndex) {
    const crop = foodCatalog.find(food => food.id === cropId && !food.treat);
    if (!crop || !Number.isInteger(plotIndex) || plotIndex < 0 || plotIndex >= gardenPlotCapacity() || state.gardenPlots[plotIndex]) return;
    if (state.gardenSeeds < 1) { showToast('A fresh seed returns each day.', '☾'); return; }
    const plantedAt = Date.now();
    state.gardenSeeds -= 1;
    state.gardenPlots[plotIndex] = { cropId, plantedAt, readyAt: plantedAt + GARDEN_GROWTH_MS, ready: false };
    addGardenMemory(`crop-${cropId}`, `${crop.name}, a beginning`, `A new ${crop.name.toLowerCase()} crop settled into the food garden. A little water, a little time, and no hurry.`);
    makeGardenMoment('plant');
    addJournal('food', `${crop.name} planted`, `A ${crop.name.toLowerCase()} crop is growing in garden bed ${plotIndex + 1}.`);
    closeModal();
    showToast(`${crop.name} planted. It will be ready in about a day.`, '✿');
    scheduleGardenGrowth();
    commit();
  }
  function scheduleGardenGrowth() {
    clearTimeout(gardenGrowthTimer);
    const now = Date.now();
    const virtualNow = now + state.timeSkipDays * DAY_MS;
    const nextPlotReadyAt = state.gardenPlots.filter(plot => !plot.ready).reduce((nearest, plot) => Math.min(nearest, plot.readyAt), Infinity);
    const nextSeedRefreshAt = state.lastSeedRefreshAt + DAY_MS;
    const timeUntilNextEvent = Math.min(nextPlotReadyAt - now, nextSeedRefreshAt - virtualNow);
    if (!Number.isFinite(timeUntilNextEvent)) return;
    gardenGrowthTimer = setTimeout(() => {
      const seedCount = state.gardenSeeds;
      refreshGardenSeeds(Date.now() + state.timeSkipDays * DAY_MS);
      const becameReady = updateGardenPlots();
      const seedsRefreshed = state.gardenSeeds > seedCount;
      if (becameReady) {
        const readyCount = state.gardenPlots.filter(plot => plot.ready).length;
        addJournal('food', 'Garden beds are ready', `${readyCount} ${readyCount === 1 ? 'crop is' : 'crops are'} ripe and waiting in the greenhouse.`);
        showToast(`${readyCount} garden bed${readyCount === 1 ? ' is' : 's are'} ready to harvest.`, '✿');
      }
      if (seedsRefreshed && !becameReady) {
        showToast('Fresh Moon-seeds are ready in the greenhouse.', '☾');
      }
      if (becameReady || seedsRefreshed) commit();
      scheduleGardenGrowth();
    }, Math.max(0, timeUntilNextEvent));
  }
  function harvestReadyGarden() {
    updateGardenPlots();
    const ripePlots = state.gardenPlots.filter(plot => plot.ready || Date.now() >= plot.readyAt);
    if (!ripePlots.length) return;
    ripePlots.forEach(plot => rememberGardenCrop(plot.cropId));
    makeGardenMoment('harvest');
    if (state.harvests === 0) addGardenMemory('first-harvest', 'Our first little harvest', `${state.name} watched as the first ripe food was gathered. The empty bed was not an ending, just room for something else to grow.`);
    const harvestCounts = {};
    ripePlots.forEach(plot => { harvestCounts[plot.cropId] = (harvestCounts[plot.cropId] || 0) + 2; });
    Object.entries(harvestCounts).forEach(([cropId, amount]) => {
      state.inventory[cropId] = (state.inventory[cropId] || 0) + amount;
    });
    state.harvests += ripePlots.length;
    state.gardenPlots = state.gardenPlots.filter(plot => !plot.ready && Date.now() < plot.readyAt);
    const harvestSummary = Object.entries(harvestCounts).map(([cropId, amount]) => `${amount} ${foodCatalog.find(food => food.id === cropId).name.toLowerCase()}`).join(' and ');
    addJournal('food', 'A little greenhouse harvest', `You gathered ${harvestSummary}.`);
    showToast(`Harvested ${harvestSummary}.`, '✿');
    scheduleGardenGrowth();
    commit();
  }
  function findCuriosity(announce = true, origin = 'wander') {
    const available = curiosities.filter(curio => !state.items.some(item => item.name === curio.name) && (origin === 'wander' || hoardGamePools[origin]?.includes(curio.name)));
    if (!available.length) {
      if (origin === 'wander') state.lastFindAt = Date.now();
      return;
    }
    const curio = available[Math.floor(Math.random() * available.length)];
    const entry = { ...curio, at: hoardNow(), origin, foundAtMoment: state.moments, chapters: [] };
    state.items.unshift(entry);
    if (origin === 'wander') state.lastFindAt = Date.now();
    addJournal('find', `${curio.name} came home`, curio.note);
    if (announce) showToast(`${state.name || 'Your dragon'} found a ${curio.name.toLowerCase()}.`, '◈');
    return entry;
  }
  function rewardHoardVisit(type) {
    if (!(type in state.hoardGameVisits)) return;
    state.hoardGameVisits[type] += 1;
    if ((state.hoardGameVisits[type] - 1) % 3 !== 0) return;
    return findCuriosity(false, type);
  }
  function skipTime() {
    const wasElder = ageDays() >= 365;
    if (!state.hatchedAt) {
      state.hatchProgress = 100;
      hatchDragon();
      commit();
      return;
    }
    state.timeSkipDays += 30;
    refreshGardenSeeds(Date.now() + state.timeSkipDays * DAY_MS);
    state.stats.energy = clamp(state.stats.energy + 6);
    findCuriosity(false);
    const elderNow = ageDays() >= 365;
    if (elderNow && !state.lineageEgg && !state.lineageHatched) state.lineageReady = true;
    addJournal('time', 'Another month in the garden', `${state.name} grew a little more. The sanctuary's story keeps unfolding, one gentle day at a time.`);
    if (!wasElder && elderNow) {
      state.lineageReady = true;
      showToast(`${state.name} has become a Sovereign Elder. A lineage egg is ready when you are.`, '✧');
    } else {
      showToast(`Time drifted gently forward. ${state.name} is now ${humanAge().toLowerCase()}.`, '◷');
    }
    commit();
    scheduleGardenGrowth();
  }
  function welcomeLineage() {
    if (!state.lineageReady || state.lineageEgg) return;
    state.lineageEgg = true;
    state.lineageReady = false;
    addJournal('lineage', 'A new egg joins the garden', `${state.name} tucked a small opal egg beside the warm nest. A new little story is beginning.`);
    showToast('A lineage egg has joined the sanctuary.', '✧');
    commit();
  }
  function hatchLineage() {
    if (!state.lineageEgg || state.lineageHatched) return;
    document.getElementById('modalBackdrop').classList.remove('hidden');
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">×</button><div class="modal-eyebrow">A NEW LITTLE STORY</div><h2 id="modalTitle">A name for the newest arrival?</h2><p>${escapeHtml(state.name)} will be right there when this little one hatches.</p><label class="modal-label" for="lineageNameInput">DRAGON NAME</label><input class="modal-input" id="lineageNameInput" maxlength="18" value="${escapeHtml(state.lineageName)}"><div class="modal-actions"><button class="primary-button" data-action="completeLineageHatch">Welcome them <span>→</span></button></div>`;
  }
  function completeLineageHatch() {
    const input = document.getElementById('lineageNameInput');
    state.lineageName = input.value.trim().slice(0, 18) || 'Pip';
    state.lineageEgg = false;
    state.lineageHatched = true;
    addJournal('lineage', 'A tiny new dragon', `${state.lineageName} hatched under ${state.name}'s watchful eye.`);
    closeModal();
    animateDragon('family');
    showToast(`${state.lineageName} has hatched. The family is together.`, '✧');
    commit();
  }
  function openSettings() {
    document.getElementById('modalBackdrop').classList.remove('hidden');
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">×</button><div class="modal-eyebrow">MAKE THIS PLACE YOURS</div><h2 id="modalTitle">Sanctuary settings</h2><p>Your sanctuary is saved privately in this browser.</p><label class="modal-label" for="dragonNameSetting">DRAGON NAME</label><input class="modal-input" id="dragonNameSetting" maxlength="18" value="${escapeHtml(state.name)}" ${!state.hatchedAt ? 'disabled' : ''}><div class="setting-row"><span><strong>Soft sounds</strong><small>Gentle synthesized chimes</small></span><button class="setting-action" data-action="toggleSound">${state.soundEnabled ? 'On' : 'Off'}</button></div><div class="setting-row"><span><strong>Long-term preview</strong><small>Advance the in-game clock by 30 days</small></span><button class="setting-action" data-action="skipFromSettings">Skip time</button></div><div class="setting-row"><span><strong>Fresh start</strong><small>Erase this sanctuary from this browser</small></span><button class="setting-action" data-action="confirmReset">Reset</button></div><div class="modal-actions"><button class="secondary-button" data-action="closeModal">Close</button><button class="primary-button" data-action="saveSettings">Save changes</button></div>`;
  }
  function openResetConfirmation() {
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">×</button><div class="modal-eyebrow">A NEW BEGINNING</div><h2 id="modalTitle">Start a fresh sanctuary?</h2><p>This permanently erases the LumaScale save in this browser. The little world will begin again with a new egg.</p><div class="modal-actions"><button class="secondary-button" data-action="openSettings">Keep this one</button><button class="primary-button" data-action="resetGame">Start fresh</button></div>`;
  }
  function saveSettings() {
    const input = document.getElementById('dragonNameSetting');
    if (input && state.hatchedAt) state.name = input.value.trim().slice(0, 18) || 'Luma';
    closeModal();
    commit();
    showToast('Sanctuary settings saved.');
  }
  function resetGame() {
    localStorage.removeItem(SAVE_KEY);
    state = defaultState();
    closeModal();
    render();
    showToast('A new sanctuary is waiting for you.', '✧');
  }
  function closeModal() {
    document.getElementById('modalBackdrop').classList.add('hidden');
    document.getElementById('modalCard').innerHTML = '';
    stopGame();
  }

  const seekSpots = [
    { name: 'Moonlit bank', left: 22, top: 34 },
    { name: 'Willow roots', left: 74, top: 32 },
    { name: 'Little island', left: 45, top: 51 },
    { name: 'Blue reeds', left: 19, top: 65 },
    { name: 'Lotus pool', left: 76, top: 68 },
    { name: 'Quiet shallows', left: 47, top: 84 }
  ];
  function startHideSeek() {
    if (!state.hatchedAt) { showToast('Your little one is still getting ready to hatch.'); return; }
    if (state.slumbering) { showToast('Wake your dragon with a gentle hello first.', '♡'); return; }
    stopGame();
    seekGame = { round: 1, target: Math.floor(Math.random() * seekSpots.length), found: false, checked: new Set(), hint: false };
    document.getElementById('modalBackdrop').classList.remove('hidden');
    document.getElementById('modalCard').className = 'modal-card seek-modal';
    renderHideSeek();
    document.querySelector('.seek-spot').focus({ preventScroll: true });
  }
  function renderHideSeek() {
    if (!seekGame) return;
    const { round, target, found, checked, hint } = seekGame;
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">×</button><div class="modal-eyebrow">WHISPERING REEDS</div><h2 id="modalTitle">Hide & seek</h2><div class="seek-topline"><span>${escapeHtml(state.name)}${found ? ' found you, too.' : ' is somewhere close.'}</span><strong>Round ${round} / 3</strong></div><div class="seek-board" id="seekBoard" role="group" aria-label="Whispering Reeds hiding spots">${seekSpots.map((spot, index) => `<button class="seek-spot${checked.has(index) ? ' is-searched' : ''}${found && target === index ? ' is-found' : ''}${hint && target === index && !found ? ' is-rustling' : ''}" style="--spot-left:${spot.left}%;--spot-top:${spot.top}%;--sway-delay:${index * -.4}s" data-action="searchSeek" data-spot="${index}" aria-label="${found && target === index ? `${escapeHtml(state.name)} found at` : 'Search'} ${spot.name}" ${found || checked.has(index) ? 'disabled' : ''}>${found && target === index ? `<img class="seek-found-dragon" src="assets/characters/sky-drifter/skydrifter-flying.webp" alt="${escapeHtml(state.name)}"><img class="seek-discovery" src="assets/game/hide-and-seek/discovery.png" alt="">` : ''}<img class="seek-reeds" src="assets/game/hide-and-seek/reeds.png" alt=""><span class="seek-spot-label">${spot.name}</span></button>`).join('')}</div><div class="seek-status" role="status">${found ? `${escapeHtml(state.name)} bounds out for a little hello.` : hint ? `A soft rustle comes from the ${seekSpots[target].name.toLowerCase()}.` : checked.size ? 'Just a little ripple. Your dragon is still nearby.' : 'The water settles. A little light waits in the reeds.'}</div><div class="seek-actions"><button class="secondary-button" data-action="hintSeek" ${found || hint ? 'disabled' : ''}><span aria-hidden="true">♫</span> Chime clue</button><button class="primary-button" data-action="nextSeek" ${found ? '' : 'disabled'}>${round === 3 ? 'Head home' : 'Hide again'} <span aria-hidden="true">→</span></button></div>`;
  }
  function searchHidingSpot(index) {
    if (!seekGame || seekGame.found || !Number.isInteger(index) || index < 0 || index >= seekSpots.length || seekGame.checked.has(index)) return;
    seekGame.checked.add(index);
    if (index === seekGame.target) {
      seekGame.found = true;
      playTone(740, .18);
    } else playTone(330, .06);
    renderHideSeek();
    if (seekGame.found) {
      const poses = dragonPoseAssets[stageName()] || dragonPoseAssets['Prism Drake'];
      document.querySelector('.seek-found-dragon').src = poses.play || poses.idle;
      document.querySelector('[data-action="nextSeek"]').focus({ preventScroll: true });
    }
    else document.querySelector('.seek-spot:not(:disabled)')?.focus({ preventScroll: true });
  }
  function nextSeekRound() {
    if (!seekGame || !seekGame.found) return;
    if (seekGame.round === 3) { endGame('seek', 3); seekGame = null; return; }
    seekGame.target = (seekGame.target + 1 + Math.floor(Math.random() * (seekSpots.length - 1))) % seekSpots.length;
    seekGame.round += 1;
    seekGame.found = false;
    seekGame.hint = false;
    seekGame.checked.clear();
    renderHideSeek();
    document.querySelector('.seek-spot').focus({ preventScroll: true });
  }

  function startGame(type) {
    if (!state.hatchedAt) { showToast('Your little one is still getting ready to hatch.'); return; }
    if (state.slumbering) { showToast('Wake your dragon with a gentle hello first.', '♡'); return; }
    document.getElementById('modalBackdrop').classList.remove('hidden');
    const title = type === 'glide' ? 'Thermal gliding' : 'Crystal bounce';
    const instruction = type === 'glide' ? 'Move your finger or pointer to guide the dragon through the light-motes. Follow the little breeze trails.' : 'Tap or click the glowing crystals before they drift away. Every catch counts.';
    document.getElementById('modalCard').className = 'modal-card game-modal';
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">×</button><div class="modal-eyebrow">A QUIET LITTLE GAME</div><h2 id="modalTitle">${title}</h2><div class="game-topline"><span>${instruction}</span><span class="game-timer" id="gameCounter">0 light-motes</span></div><div class="game-canvas-wrap"><canvas id="gameCanvas" aria-label="Interactive ${title} game"></canvas></div><p class="game-instructions">30 seconds · no wrong way to play · collected light-motes become Pearl Dust</p>`;
    state.stats.energy = clamp(state.stats.energy - 4);
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = bounds.width * ratio;
    canvas.height = bounds.height * ratio;
    context.scale(ratio, ratio);
    const width = bounds.width;
    const height = bounds.height;
    const loadGameImage = source => { const image = new Image(); image.src = source; return image; };
    const game = { type, width, height, points: 0, startedAt: performance.now(), duration: 30000, motes: [], pointer: { x: width * .3, y: height * .53, active: false }, trail: [], crystals: [], effects: [], clouds: [], frame: 0, ended: false, sceneImage: loadGameImage(type === 'glide' ? 'assets/game/backgrounds/thermal-gliding.webp' : 'assets/game/backgrounds/crystal-bounce.webp'), art: {} };
    game.art = type === 'glide'
      ? { mote: loadGameImage('assets/game/effects/light-motes-cluster.webp'), wind: loadGameImage('assets/game/effects/wind-trail.webp'), cloud: loadGameImage('assets/game/effects/storm-cloud.webp'), dragon: loadGameImage('assets/characters/sky-drifter/skydrifter-flying.webp') }
      : { gems: ['cyan', 'rose', 'gold'].map(color => loadGameImage(`assets/game/crystals/${color}.webp`)), catcher: loadGameImage('assets/game/effects/catcher.webp'), impact: loadGameImage('assets/game/effects/catch-impact.webp') };
    if (type === 'glide') game.clouds = [{ x: width * .08, y: height * .23, speed: .16, scale: .78 }, { x: width * .83, y: height * .7, speed: -.1, scale: .58 }];
    for (let index = 0; index < 6; index += 1) game.motes.push({ x: Math.random() * width, y: 45 + Math.random() * (height - 100), phase: Math.random() * 7 });
    for (let index = 0; index < 4; index += 1) game.crystals.push({ x: 30 + Math.random() * (width - 60), y: 40 + Math.random() * (height - 100), phase: Math.random() * 8, alive: true, size: 16 + Math.random() * 7, variant: index % 3 });
    canvas.addEventListener('pointermove', event => {
      const rect = canvas.getBoundingClientRect();
      game.pointer.x = event.clientX - rect.left;
      game.pointer.y = event.clientY - rect.top;
      game.pointer.active = true;
      if (type === 'glide') {
        game.trail.push({ x: game.pointer.x, y: game.pointer.y, at: performance.now() });
        game.trail = game.trail.slice(-14);
      }
    });
    canvas.addEventListener('pointerdown', event => {
      canvas.setPointerCapture(event.pointerId);
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (type === 'bounce') {
        game.crystals.forEach(crystal => {
          if (crystal.alive && Math.hypot(crystal.x - x, crystal.y - y) < 35) {
            crystal.alive = false;
            game.points += 1;
            game.effects.push({ x: crystal.x, y: crystal.y, born: performance.now() });
            game.crystals.push({ x: 25 + Math.random() * (width - 50), y: 40 + Math.random() * (height - 100), phase: 0, alive: true, size: 16 + Math.random() * 7, variant: Math.floor(Math.random() * 3) });
            playTone(700, .08);
          }
        });
      }
    });
    const draw = now => {
      if (document.getElementById('gameCanvas') !== canvas || game.ended) return;
      game.frame += 1;
      const elapsed = now - game.startedAt;
      const remaining = Math.max(0, Math.ceil((game.duration - elapsed) / 1000));
      const counter = document.getElementById('gameCounter');
      if (counter) counter.textContent = `${type === 'glide' ? game.points : game.points} light-motes · ${remaining}s`;
      context.clearRect(0, 0, width, height);
      const scenePan = type === 'glide' ? (game.pointer.x / width - .5) * 18 : 0;
      if (!drawSceneImage(context, game.sceneImage, width, height, scenePan, type === 'glide' ? 1.08 : 1.02)) {
        const sky = context.createLinearGradient(0, 0, 0, height);
        if (type === 'glide') {
          sky.addColorStop(0, '#262940'); sky.addColorStop(.72, '#35465a'); sky.addColorStop(1, '#27333e');
        } else {
          sky.addColorStop(0, '#16192d'); sky.addColorStop(.72, '#293544'); sky.addColorStop(1, '#293039');
        }
        context.fillStyle = sky;
        context.fillRect(0, 0, width, height);
      }
      const vignette = context.createLinearGradient(0, 0, 0, height);
      vignette.addColorStop(0, 'rgba(12, 14, 30, 0.18)');
      vignette.addColorStop(.58, 'rgba(12, 14, 30, 0.02)');
      vignette.addColorStop(1, 'rgba(12, 14, 30, 0.34)');
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
      if (type === 'glide') {
        game.clouds.forEach(cloud => {
          cloud.x += cloud.speed;
          if (cloud.x < -70) cloud.x = width + 50;
          if (cloud.x > width + 70) cloud.x = -50;
          if (game.art.cloud.complete && game.art.cloud.naturalWidth) {
            context.globalAlpha = .72;
            context.drawImage(game.art.cloud, cloud.x - 50 * cloud.scale, cloud.y - 28 * cloud.scale, 100 * cloud.scale, 56 * cloud.scale);
            context.globalAlpha = 1;
          }
        });
        game.trail.forEach((point, index) => {
          if (index % 3 !== 0 || !game.art.wind.complete || !game.art.wind.naturalWidth) return;
          const alpha = (index + 1) / game.trail.length * .42;
          context.save();
          context.globalAlpha = alpha;
          context.translate(point.x, point.y);
          context.drawImage(game.art.wind, -27, -15, 54, 30);
          context.restore();
        });
        if (!game.pointer.active) { game.pointer.x = width * .33 + Math.sin(now / 900) * 18; game.pointer.y = height * .53 + Math.sin(now / 600) * 16; }
        game.motes.forEach(mote => {
          mote.x -= .85;
          mote.y += Math.sin(now / 450 + mote.phase) * .36;
          if (mote.x < -14) { mote.x = width + 12; mote.y = 40 + Math.random() * (height - 100); }
          const caught = Math.hypot(game.pointer.x - mote.x, game.pointer.y - mote.y) < 29;
          if (caught) { game.points += 1; game.effects.push({ x: mote.x, y: mote.y, born: now }); mote.x = width + Math.random() * 50; mote.y = 40 + Math.random() * (height - 100); playTone(740, .06); }
          if (game.art.mote.complete && game.art.mote.naturalWidth) {
            context.save();
            context.translate(mote.x, mote.y);
            context.rotate(Math.sin(now / 700 + mote.phase) * .22);
            context.drawImage(game.art.mote, -17, -17, 34, 34);
            context.restore();
          } else {
            context.save(); context.translate(mote.x, mote.y); context.rotate(Math.PI / 4); context.fillStyle = '#fff0c7'; context.shadowColor = '#b0fffe'; context.shadowBlur = 18; context.beginPath(); context.moveTo(0, -9); context.lineTo(3, -3); context.lineTo(9, 0); context.lineTo(3, 3); context.lineTo(0, 9); context.lineTo(-3, 3); context.lineTo(-9, 0); context.lineTo(-3, -3); context.closePath(); context.fill(); context.restore();
          }
        });
        if (game.art.dragon.complete && game.art.dragon.naturalWidth) {
          context.save();
          context.translate(game.pointer.x, game.pointer.y);
          context.scale(game.pointer.active && game.pointer.x < width * .45 ? -1 : 1, 1);
          context.shadowColor = '#b0fffe99';
          context.shadowBlur = 15;
          context.drawImage(game.art.dragon, -44, -44, 88, 88);
          context.restore();
        } else {
          context.save(); context.translate(game.pointer.x, game.pointer.y); const pulse = 12 + Math.sin(now / 180) * 2; const halo = context.createRadialGradient(0, 0, 2, 0, 0, pulse + 19); halo.addColorStop(0, 'rgba(255, 239, 192, 0.82)'); halo.addColorStop(.28, 'rgba(176, 255, 254, 0.35)'); halo.addColorStop(1, 'rgba(176, 255, 254, 0)'); context.fillStyle = halo; context.beginPath(); context.arc(0, 0, pulse + 19, 0, Math.PI * 2); context.fill(); context.strokeStyle = 'rgba(234, 255, 249, 0.94)'; context.lineWidth = 1.5; context.beginPath(); context.ellipse(0, 0, pulse, pulse * .58, -.3, 0, Math.PI * 2); context.stroke(); context.fillStyle = '#fff4d1'; context.beginPath(); context.arc(0, 0, 3.5, 0, Math.PI * 2); context.fill(); context.restore();
        }
      } else {
        game.crystals.forEach(crystal => {
          if (!crystal.alive) return;
          crystal.y += Math.sin(now / 500 + crystal.phase) * .28 + .15;
          const gem = game.art.gems[crystal.variant];
          if (gem.complete && gem.naturalWidth) {
            context.save(); context.translate(crystal.x, crystal.y); context.rotate(Math.sin(now / 900 + crystal.phase) * .12); context.shadowColor = '#5ed8d999'; context.shadowBlur = 18; context.drawImage(gem, -crystal.size, -crystal.size, crystal.size * 2, crystal.size * 2); context.restore();
          } else {
            context.save(); context.translate(crystal.x, crystal.y); context.rotate(now / 1800 + crystal.phase); const crystalFill = context.createLinearGradient(-crystal.size, -crystal.size, crystal.size, crystal.size); crystalFill.addColorStop(0, '#fff1c5'); crystalFill.addColorStop(.48, '#b0fffe'); crystalFill.addColorStop(1, '#d3aaff'); context.fillStyle = crystalFill; context.shadowColor = '#5ed8d9'; context.shadowBlur = 22; context.beginPath(); context.moveTo(0, -crystal.size); context.lineTo(crystal.size * .65, 0); context.lineTo(0, crystal.size); context.lineTo(-crystal.size * .65, 0); context.closePath(); context.fill(); context.strokeStyle = 'rgba(255,255,255,.8)'; context.lineWidth = 1; context.stroke(); context.restore();
          }
          if (crystal.y > height - 35) { crystal.y = 34; crystal.x = 24 + Math.random() * (width - 48); }
        });
        const catcher = game.art.catcher;
        if (catcher.complete && catcher.naturalWidth) context.drawImage(catcher, width / 2 - 76, height - 60, 152, 72);
      }
      game.effects = game.effects.filter(effect => now - effect.born < 520);
      game.effects.forEach(effect => {
        const age = now - effect.born;
        const effectImage = type === 'glide' ? game.art.mote : game.art.impact;
        if (effectImage.complete && effectImage.naturalWidth) {
          context.save(); context.globalAlpha = Math.max(0, 1 - age / 520); context.drawImage(effectImage, effect.x - 36, effect.y - 36, 72, 72); context.restore();
        }
      });
      if (remaining <= 0) { endGame(type, game.points); return; }
      gameFrame = requestAnimationFrame(draw);
    };
    gameFrame = requestAnimationFrame(draw);
    gameTimer = setTimeout(() => endGame(type, game.points), game.duration);
    save();
  }
  function endGame(type, points) {
    if (!document.getElementById('gameCanvas') && !document.getElementById('seekBoard')) return;
    cancelAnimationFrame(gameFrame);
    clearTimeout(gameTimer);
    const reward = Math.max(3, Math.min(14, 3 + points));
    state.pearlDust += reward;
    capStat('energy', type === 'seek' ? 0 : type === 'glide' ? -8 : -5);
    capStat('mood', 12);
    capStat('luster', Math.min(7, Math.floor(points / 2)));
    state.checks.play = true;
    state.moments += 1;
    state.lastGameAt = Date.now();
    const gameFind = rewardHoardVisit(type);
    refreshHoardMemories();
    const outing = type === 'seek' ? `${state.name} played three rounds of hide & seek and came home with ${reward} Pearl Dust.` : `${state.name} found ${points} light-motes and came home with ${reward} Pearl Dust.`;
    addJournal('game', type === 'seek' ? 'Little lights in Whispering Reeds' : type === 'glide' ? 'A thermal glide together' : 'Crystals in the quiet cave', outing);
    save();
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">×</button><div class="game-result"><span>✦</span><div class="modal-eyebrow">A LOVELY LITTLE OUTING</div><h3 id="modalTitle">${type === 'seek' ? 'There you are, little light.' : points ? 'Look at all that light.' : 'A lovely stretch of wings.'}</h3><p>${escapeHtml(outing)}</p><div class="modal-actions"><button class="primary-button" data-action="finishGame" data-game="${type}">Back to the garden <span>→</span></button></div></div>`;
    if (gameFind) document.querySelector('.game-result .modal-actions').insertAdjacentHTML('beforebegin', `<div class="game-treasure-find"><img src="${gameFind.image}" alt=""><p>${escapeHtml(state.name)} also brought home a ${escapeHtml(gameFind.name.toLowerCase())}.</p><button class="text-button" data-action="gameFindStory" data-curiosity="${escapeHtml(gameFind.name)}">Read its story <span aria-hidden="true">&rarr;</span></button></div>`);
    playTone(600, .22);
  }
  function stopGame() {
    seekGame = null;
    if (gameFrame) cancelAnimationFrame(gameFrame);
    if (gameTimer) clearTimeout(gameTimer);
    gameFrame = 0;
    gameTimer = null;
    const card = document.getElementById('modalCard');
    if (card) card.className = 'modal-card';
  }

  document.addEventListener('click', event => {
    const nav = event.target.closest('[data-view]');
    if (nav) { setView(nav.dataset.view); return; }
    const goto = event.target.closest('[data-goto]');
    if (goto) { setView(goto.dataset.goto); return; }
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;
    const { action, food, game, crop, plotIndex } = actionButton.dataset;
    if (actionButton.disabled) return;
    if (action === 'hum') addHatchProgress(14, 'hum');
    if (action === 'warm') addHatchProgress(22, 'warm');
    if (action === 'polishEgg') addHatchProgress(17, 'polish');
    if (action === 'pet') petDragon();
    if (action === 'polish') polishScales();
    if (action === 'openFood') openFoodModal();
    if (action === 'openBorderPicker') openBorderPicker(Number(actionButton.dataset.slot) || 0);
    if (action === 'selectBorderSlot') openBorderPicker(Number(actionButton.dataset.slot));
    if (action === 'plantBorder') plantBorder(actionButton.dataset.plant);
    if (action === 'clearBorderSlot') { state.gardenLife.borders[borderSlot] = null; closeModal(); commit(); }
    if (action === 'openGardenPlant') openGardenPlant(actionButton.dataset.plant);
    if (action === 'saveGardenPlant') saveGardenPlant(actionButton.dataset.plant);
    if (action === 'chooseGardenDiscovery' || action === 'takeToGarden') {
      const plant = gardenPlants.find(entry => entry.id === actionButton.dataset.plant);
      if (plant && gardenPlantAvailable(plant)) {
        closeModal(); setView('greenhouse');
        const existing = state.gardenLife.borders.indexOf(plant.id);
        const empty = state.gardenLife.borders.indexOf(null);
        openBorderPicker(existing >= 0 ? existing : empty >= 0 ? empty : 0, plant.id);
      }
    }
    if (action === 'visitGarden') visitGarden();
    if (action === 'openGardenVisitor') openGardenVisitor(actionButton.dataset.visitor);
    if (action === 'openGardenScrapbook') openGardenScrapbook();
    if (action === 'editGardenMemory') openGardenScrapbook(actionButton.dataset.memory);
    if (action === 'saveGardenMemory') saveGardenMemory(actionButton.dataset.memory);
    if (action === 'keepGardenMoment' && state.gardenLife.moment) { const moment = state.gardenLife.moment; addGardenMemory(`moment-${moment.at}`, moment.title, moment.body); commit(); showToast('A quiet moment kept in the scrapbook.'); }
    if (action === 'openCuriosity') openCuriosity(actionButton.dataset.curiosity);
    if (action === 'openShelf') openShelfPicker(Number(actionButton.dataset.slot) || 0);
    if (action === 'selectShelfSlot') openShelfPicker(Number(actionButton.dataset.slot), document.getElementById('modalCard').dataset.preferredTreasure);
    if (action === 'shelfFromStory') {
      const name = actionButton.dataset.curiosity;
      const existing = state.hoardShelf.indexOf(name);
      const empty = state.hoardShelf.indexOf(null);
      openShelfPicker(existing >= 0 ? existing : empty >= 0 ? empty : 0, name);
    }
    if (action === 'displayCuriosity') displayCuriosity(actionButton.dataset.curiosity);
    if (action === 'clearShelfSlot') { state.hoardShelf[shelfSlot] = null; shelfReaction = ''; commit(); openShelfPicker(shelfSlot); }
    if (action === 'shelfTreasure') { animateDragon('bond'); openCuriosity(actionButton.dataset.curiosity); }
    if (action === 'saveInscription') saveInscription(actionButton.dataset.curiosity);
    if (action === 'passKeepsake') passKeepsake(actionButton.dataset.curiosity);
    if (action === 'gameFindStory') { closeModal(); commit(); setView('hoard'); openCuriosity(actionButton.dataset.curiosity); }
    if (action === 'feed') feed(food);
    if (action === 'chooseGardenCrop') openGardenCropPicker(Number(plotIndex));
    if (action === 'plantGardenCrop') plantCrop(crop, Number(plotIndex));
    if (action === 'harvestReadyGarden') harvestReadyGarden();
    if (action === 'hatchLineage') hatchLineage();
    if (action === 'startGlide') startGame('glide');
    if (action === 'startBounce') startGame('bounce');
    if (action === 'startSeek') startHideSeek();
    if (action === 'searchSeek') searchHidingSpot(Number(actionButton.dataset.spot));
    if (action === 'hintSeek' && seekGame && !seekGame.found) { seekGame.hint = true; playTone(520, .2); renderHideSeek(); document.querySelector('.is-rustling')?.focus({ preventScroll: true }); }
    if (action === 'nextSeek') nextSeekRound();
    if (action === 'closeModal') { closeModal(); commit(); }
    if (action === 'finishGame') {
      const returnPose = game === 'glide' ? 'landing' : 'play';
      closeModal();
      setView('sanctuary');
      animateDragon(returnPose);
      commit();
    }
    if (action === 'saveDragonName') meetDragon();
    if (action === 'completeLineageHatch') completeLineageHatch();
    if (action === 'toggleSound') { state.soundEnabled = !state.soundEnabled; openSettings(); commit(); }
    if (action === 'skipFromSettings') { closeModal(); skipTime(); }
    if (action === 'confirmReset') openResetConfirmation();
    if (action === 'resetGame') resetGame();
  });
  document.addEventListener('change', event => { if (event.target.id === 'gardenSeasonSelect') setGardenSeason(event.target.value); });
  document.getElementById('settingsButton').addEventListener('click', openSettings);
  document.getElementById('profileButton').addEventListener('click', openSettings);
  document.getElementById('timeSkipButton').addEventListener('click', () => {
    document.getElementById('modalBackdrop').classList.remove('hidden');
    document.getElementById('modalCard').innerHTML = `<button class="modal-close" data-action="closeModal" aria-label="Close">×</button><div class="modal-eyebrow">TIME MOVES GENTLY HERE</div><h2 id="modalTitle">Let the seasons drift?</h2><p>Move the sanctuary forward by 30 in-game days to glimpse your dragon's next stage. You can still do the slow days at your own pace.</p><div class="modal-actions"><button class="secondary-button" data-action="closeModal">Not yet</button><button class="primary-button" data-action="skipFromSettings">Drift ahead <span>→</span></button></div>`;
  });
  document.getElementById('lineageButton').addEventListener('click', welcomeLineage);
  document.getElementById('sortHoardButton').addEventListener('click', event => {
    sortNewest = !sortNewest;
    event.currentTarget.innerHTML = `${sortNewest ? 'Newest first' : 'Oldest first'} <span>⌄</span>`;
    renderHoard();
  });
  document.getElementById('modalBackdrop').addEventListener('click', event => {
    if (event.target.id === 'modalBackdrop') closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
    if (event.key === 'Enter' && event.target.id === 'dragonNameInput') meetDragon();
  });

  applyElapsedTime();
  render();
  scheduleGardenGrowth();
})();
