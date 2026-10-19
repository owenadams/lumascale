# LumaScale

A cozy, browser-based dragon sanctuary prototype. The game is self-contained and saves its world in this browser's local storage; there is no account or backend.

## Stitch visuals

The supplied Stitch design system informs the midnight glass palette, typography, and sanctuary styling. The Sanctuary selects transparent pose sprites from `assets/characters/` by life stage and care action. Whelp and Sky-Drifter have idle, bonding, eating, sleeping, and activity poses; Prism Drake and Sovereign Elder currently share the adult idle sprite until Elder art is available. The Pantry and Hoard use processed Stitch illustrations from `assets/food/` and `assets/hoard/`; all three minigames use local Stitch backgrounds and object sprites from `assets/game/`. Whispering Reeds uses a marsh background and transparent reeds/discovery cutouts from its runtime kit, with the dragon's stage-specific activity sprite for reveals. The lineage state uses the parent-and-hatchling portrait. Pose previews and source images are kept separately; Stitch originals remain in `Stitch Files/organized/`. Reduced-motion preferences are respected, and the app does not depend on temporary Google image URLs.

## Run

Open `index.html` in a modern browser. For a local development server, run `python -m http.server 4173` from this folder and visit `http://localhost:4173`.

## Install On Your Phone

Public app: https://owenadams.github.io/lumascale/

- Android: open the address in Chrome and choose Install app from the browser menu, or use the install icon when Chrome offers it.
- iPhone/iPad: open the address in Safari, choose Share, then Add to Home Screen. Enable Open as Web App if that option is shown.

Open the app online once and let its initial offline installation finish. The installed app can then open the sanctuary, garden, hoard, and minigames without a local server or internet connection. Google-hosted fonts may fall back to local fonts offline; all game artwork is included in the offline cache.

Progress stays in this device/browser's local storage. GitHub does not receive the save, there is no account sync, and progress from a localhost or local-network address does not automatically transfer to the public address. Clearing site data can erase the save. Installing the app does not add cloud backup or cross-device synchronization.

New releases download in the background. An update icon appears when a replacement is ready; choosing it activates the new version and reloads the app. Updates do not deliberately reload an active game or alter the local save. The normal root localhost development server does not register the service worker, preventing stale development pages.

## Publish

The public repository contains only LumaScale, not the surrounding workspace, source Stitch ZIPs, processed previews, or private credentials. Pushes to `main` run `.github/workflows/pages.yml`: all tests, a deterministic static-site build, and GitHub Pages deployment.

Run `node scripts/build-site.cjs` to generate `_site`. Only allowlisted app files, icons, and runtime artwork are copied. A content-hashed `precache-manifest.js` includes the entire public asset set. Each worker cleans only its own project-scoped caches, leaving other apps such as Money Compass alone.

For a project-subfolder preview, run `node scripts/build-site.cjs --preview`, then serve `.pages-preview` and visit `/lumascale/`. Build folders and source artwork references remain local and are ignored by Git. No Node server is needed on the public site.

## Play

Warm, polish, and hum to the opal egg until it hatches. Once your dragon arrives, feed it from the greenhouse, spend a little time together, and try a gentle minigame. The garden starts with one bed and grows to two, three, and four as your dragon reaches Sky-Drifter, Prism Drake, and Sovereign Elder. Choose Moon-berries, quartz-root, sun-peppers, or mist-melons; crops mature after 24 real-world hours and never spoil. One seed per unlocked bed replenishes daily, and Harvest ready gathers all ripe plots. Curiosities arrive over time, and the journal keeps your shared moments. Missed days never cause illness or death. The clock control advances 30 in-game days at a time so the longer lifecycle and lineage feature can be explored without waiting a year.

### Living Garden

The greenhouse has a separate three-position ornamental border with freely rearrangeable bellflowers, luminous reeds, velvet moss, and Starlace vine. Arrange border selects a position and a plant; clearing or moving a plant costs nothing and never uses food seeds or food beds. Ornamentals are permanent and appear beneath the dragon in the Sanctuary too. Open a plant to give it a name of up to 30 characters and a garden note of up to 240 characters.

Stay awhile creates a small dragon gardening moment: dew for the roots, a proud crop inspection, time among flowers, or a nap near the seedlings. Planting and harvesting create appropriate moments too. A slumbering dragon stays asleep. Keep this moment records the scene in the garden scrapbook; the scrapbook also remembers first crops, the first harvest, new visitors, plant discoveries, seasons, and keepsake plantings. Open scrapbook to write or edit personal memories. Early memories are retained as the scrapbook grows, and older gardens are acknowledged without inventing an exact first-harvest date.

Ripe crops leave remembered pollen without being consumed. Both concurrently ripe crops and pollen retained from earlier harvests can unlock permanent ornamental hybrids, so even a one-bed garden can discover them over time:

- Moon-berries + mist-melons: Moonmist Blossoms.
- Sun-peppers + moon-berries: Ember Bells.
- Quartz-root + mist-melons: Crystal Fern.

Welcoming plants attract lantern fireflies, a glasswing butterfly, or a visiting little drake. Sightings happen on the first Stay awhile visit and every third visit after that when suitable plants are present. Previously unseen eligible visitors are favoured; the drake waits until your dragon hatches. Visitors are observed, never captured, and every season supports every visitor. Their first sightings and short stories remain in the scrapbook.

Bellflower seed, Tidepool Cup, and Fossil Fern can have living companions in the garden. Choose Plant in the garden from their hoard stories or use Keepsakes in the garden to place a bellflower, moss cup planter, or fern-and-fossil corner. The original treasure, discovery date, inscriptions, and other chapters stay intact; the planting adds a new hoard chapter and garden memory.

The garden season can follow the calendar or be set freely to First bloom, Long light, Amber hush, or Quiet frost. This changes garden colours and atmosphere, not rewards or plant health. Nothing is season-exclusive, and no plant dies, crop spoils, or visitor story expires while you are away. Existing food growth remains 24 real-world hours with two portions per harvested bed.

Garden artwork uses prepared Stitch flowers, fireflies, and foliage, derived hybrid colours, moss and keepsake composites, and a local butterfly SVG. Original Stitch sheets are unchanged; runtime sources are recorded in `Stitch Files/organized/MANIFEST.md`.

### Curiosity Hoard

The hoard has 24 unique treasures, each with local artwork and a short discovery story personalized with your dragon's name. Choose Read its story on a collected item to open its illustrated story. Existing saves gain the new stories and replacement Cloud-shaped Pebble artwork automatically without losing their original discovery dates.

After hatching, opening the app checks for one find per eight real-world hours since the last discovery, up to three per return. A 30-day time skip adds one find too. Finds never duplicate; completing the original twelve leaves the twelve new treasures available. The ZIP 10 source sheets are preserved, and their thirteen runtime cutouts in `assets/hoard/` have transparent backgrounds. Collectibles remain keepsakes, not currency or consumables; reading stories changes no stats or rewards.

The Sanctuary's keepsake shelf has three positions. Choose Arrange shelf, select Left, Middle, or Right, and choose a collected treasure. Display on shelf in a story opens the same picker. Moving a find removes its previous display position; clearing a position never removes the treasure from the hoard. The dragon occasionally inspects, nudges, or settles beside favourites after shared care/game moments. Add or clear an optional inscription of up to 240 characters in each treasure's story; inscriptions are saved locally and also appear on displayed finds.

All 24 finds gain a later chapter after three days; displaying them can reveal chapters sooner through shared care and games. The Bellflower seed has an additional flowering chapter after seven days or five shared moments since discovery while displayed. The compass gains a chapter when a lineage egg joins the family. Chapters remain in the item's story and are recorded once in the journal.

Four shelf pairings reveal shared stories without consuming anything: paper star + lantern, compass + wind ribbon, bellflower seed + lily bell, and sea glass + moon-shell. Discoveries are remembered even after rearranging the shelf. When a Sovereign Elder has a hatched child, choose Pass to in a treasure's story to designate one family keepsake. It retains its discovery date and inscription and gains a chapter recording the parent and child's names.

Completed minigames also bring related finds on the first completed visit and every third visit after that, independent of score: marsh finds from hide & seek, cave finds from Crystal Bounce, and sky finds from gliding. Cancelling a game grants no discovery. Game finds never duplicate owned items, consume nothing, and do not reset the passive wander clock. An exhausted themed pool simply stops producing new game finds; all treasures remain available through ordinary wanderings too.

Run all game and PWA regression tests with `node --test tests/*.test.cjs` from this folder. Node is only required for these tests and publishing builds, not to play the app.

### Hide & Seek in Whispering Reeds

Find your dragon among six reed patches over three rounds in Play & Wander. There is no countdown, energy cost, or penalty for an empty search. The optional Chime clue names and animates the hiding spot; all spots and controls work with touch, pointer, and keyboard. Finish all three rounds and choose Head home to receive 6 Pearl Dust, a mood boost, a journal entry, and the daily play check. Leaving early gives no reward and never changes your dragon's stats. Search progress is not saved between visits.

Use **Sanctuary settings → Start a fresh sanctuary** to erase this browser's save and begin again. The save is local to this browser and device.
