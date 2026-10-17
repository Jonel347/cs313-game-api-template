// What the Library Game Hub shows about YOUR game (Hub Contract, rule 1).
// Lab Step 6: replace every CHANGE_ME value with your own.
const pkg = require('../../package.json');

module.exports = {
  slug: 'library_mayhem',            // your group's game, lower case with hyphens, for example shelf-climb
  name: 'library Mayhem',            // the name players will see
  team: 'Library Mayhem (3-2)',            // your group's name and section, for example Bookworms (3-1)
  developer: 'Jonel347',       // YOUR GitHub username: this build is yours
  description: 'A multiplayer library game where players answers questions and compete for the highest score.',     // one sentence about how the game is played
  min_players: 2,               // change to the limits your game is designed for
  max_players: 15,
  version: pkg.version,         // read from package.json, do not edit here
};
