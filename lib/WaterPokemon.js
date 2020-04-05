const Pokemon = require("./Pokemon");

class WaterPokemon extends Pokemon {
    constructor(name,level,strength,hp){
        super(name,level,strength,hp, "water");
        this.weakness = 'grass';
    }
}

module.exports = WaterPokemon;