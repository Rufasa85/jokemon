class Trainer {
    constructor(name){
        this.name=name;
        this.pokemon = [];
        this.activePokemon = false;
    }
    addPokemon(pokemon){
        this.pokemon.push(pokemon);
        if(!this.activePokemon) {
            this.activePokemon = pokemon;
        }
    }
    fightPokemon(opponentPokemon){
        const myPokemon = this.activePokemon;
        if(opponentPokemon.isAlive()){

            if(opponentPokemon.weakness === myPokemon.type){
                console.log("it's super effective!")
                opponentPokemon.hp-= (myPokemon.strength *2)
                console.log(`${opponentPokemon.name} took ${myPokemon.strength * 2} points of damage!!!! ${opponentPokemon.hp} health left!`)
            }
            else {
                opponentPokemon.hp-= (myPokemon.strength)
                console.log(`${opponentPokemon.name} took ${myPokemon.strength} points of damage!!!! ${opponentPokemon.hp} health left!`)
            }
        }
        else {
            console.log("that pokemon is already knocked out");
        }
    }
    switchPokemon(pokeName){
        this.pokemon.forEach(singlePokemon=>{
            if(singlePokemon.name===pokeName){
                this.activePokemon = singlePokemon;
            }
        })
    }
    amIDefeated(){
        let defeated = true;
        this.pokemon.forEach(mon=>{
            if(mon.hp>0){
                defeated = false
            }
        })
        return defeated;
    }
}

module.exports = Trainer;