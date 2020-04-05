class Pokemon {
    constructor(name,level,strength,hp,type = "normal"){
        this.name = name;
        this.level = level;
        this.strength = strength;
        this.hp = hp;
        this.type = type;
    }

    speak(){
        console.log(`${this.name} ${this.name}!!!`)
    }
    isAlive() {
        return this.hp>0
    }

}

module.exports = Pokemon;