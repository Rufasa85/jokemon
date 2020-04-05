const Pokemon = require("./Pokemon");

class GrassPokemon extends Pokemon {
    constructor(name,level,strength,hp){
        super(name,level,strength, hp,"grass");
        this.weakness = 'fire';
    }
}

module.exports = GrassPokemon;