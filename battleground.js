const Pokemon = require("./lib/Pokemon");
const FirePokemon = require("./lib/FirePokemon");
const WaterPokemon = require("./lib/WaterPokemon");
const GrassPokemon = require("./lib/GrassPokemon");
const Trainer = require("./lib/Trainer.js")

const joe = new Trainer("Joe");
joe.addPokemon(new FirePokemon("charmander",1,5,25));

const denis = new Trainer("Denis");
denis.addPokemon(new WaterPokemon("Squirtle",1,5,25));

console.log(joe);
console.log(denis);


console.log(joe.amIDefeated())

// joe.switchPokemon("charmeleon");
// console.log(joe.activePokemon);
