const Pokemon = require("./Pokemon");

class FirePokemon extends Pokemon {
    constructor(name,level,strength,hp){
        super(name,level,strength,hp, "fire");
        this.weakness = 'water';
    }
}

module.exports = FirePokemon;