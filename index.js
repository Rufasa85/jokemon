const inquirer = require("inquirer");
const fs = require("fs");
const Pokemon = require("./lib/Pokemon");
const FirePokemon = require("./lib/FirePokemon");
const WaterPokemon = require("./lib/WaterPokemon");
const GrassPokemon = require("./lib/GrassPokemon");
const Trainer = require("./lib/Trainer.js")

function createTrainer() {
    inquirer.prompt([
        {
            type: "input",
            name: "trainerName",
            message: "what is your name, trainer?"
        }, {
            type: "input",
            name: "opponentName",
            message: "what is your opponents name?"
        }
    ]).then(trainerAnswers => {
        const trainer = new Trainer(trainerAnswers.trainerName);
        const opponent = new Trainer(trainerAnswers.opponentName);
        console.log("is joe trainer");
        console.log(trainer instanceof Trainer)
        createPokemon(trainer, opponent);
    })
}

function createPokemon(trainer, opponent) {
    inquirer.prompt([
        {
            type: "list",
            choices: [trainer.name, opponent.name],
            message: "whose pokemon is this?",
            name: "whosePokemon"
        },
        {
            type: "input",
            name: "name",
            message: "name of the pokemon"
        },
        {
            type: "number",
            name: "level",
            message: "what level is said pokemon?"
        },
        {
            type: "number",
            name: "attack",
            message: "how many attack?"
        },
        {
            type: "number",
            name: "hp",
            message: "how many hitpoints?"
        },
        {
            type: "list",
            name: "type",
            choices: ["fire", "water", "grass", "normal"],
            message: "what type is it?"
        }
    ]).then(answers => {
        let newPokemon;
        switch (answers.type) {
            case 'normal':
                newPokemon = new Pokemon(answers.name, answers.level, answers.attack, answers.hp);
                break;
            case 'fire':
                newPokemon = new FirePokemon(answers.name, answers.level, answers.attack, answers.hp);
                break;
            case 'water':
                newPokemon = new WaterPokemon(answers.name, answers.level, answers.attack, answers.hp);
                break;
            case 'grass':
                newPokemon = new GrassPokemon(answers.name, answers.level, answers.attack, answers.hp);
                break;

            default:
                break;
        }
        if (answers.whosePokemon === trainer.name) {
            trainer.addPokemon(newPokemon);
        } else {
            opponent.addPokemon(newPokemon);
        }
        inquirer.prompt([
            {
                type: "confirm",
                message: "do you want any more pokemon?",
                name: "morePokemon"
            }
        ]).then(confirmAnswers => {
            if (confirmAnswers.morePokemon === true) {
                createPokemon(trainer, opponent);
            } else {
                playGame(trainer,opponent,true);
            }
        })
    })
}

function playGame(firstPlayer, secondPlayer, isFirstPlayersTurn) {
    if (isFirstPlayersTurn) {
        console.log(firstPlayer.name);
        inquirer.prompt([
            {
                type: "list",
                message: "what is your move?",
                choices: ["attack", "switch pokemon"],
                name: "moveChoice"
            }
        ]).then(results => {
            if (results.moveChoice === "attack") {
                firstPlayer.fightPokemon(secondPlayer.activePokemon);
                if (secondPlayer.amIDefeated()) {
                    console.log(`${firstPlayer.name} is the champion!`)
                }
                else {
                    playGame(firstPlayer, secondPlayer, !isFirstPlayersTurn);
                }
            } else {
                const pokeNames = firstPlayer.pokemon.map(pokes => {
                    return pokes.name
                });
                inquirer.prompt([{
                    type: "list",
                    choices: pokeNames,
                    name: "switchPokemon"
                }]).then(switchAnswers => {
                    firstPlayer.switchPokemon(switchAnswers.switchPokemon);
                    if (secondPlayer.amIDefeated()) {
                        console.log(`${firstPlayer.name} is the champion!`)
                    }
                    else {
                        playGame(firstPlayer, secondPlayer, !isFirstPlayersTurn);
                    }
                })
            }
        })
    } else {
        console.log(secondPlayer.name);
        inquirer.prompt([
            {
                type: "list",
                message: "what is your move?",
                choices: ["attack", "switch pokemon"],
                name: "moveChoice"
            }
        ]).then(results => {
            if (results.moveChoice === "attack") {
                secondPlayer.fightPokemon(firstPlayer.activePokemon);
                if (firstPlayer.amIDefeated()) {
                    console.log(`${secondPlayer.name} is the champion!`);
                }
                else {
                    playGame(firstPlayer, secondPlayer, !isFirstPlayersTurn);
                }
            } else {
                const pokeNames = secondPlayer.pokemon.map(pokes => {
                    return pokes.name
                });
                inquirer.prompt([{
                    type: "list",
                    choices: pokeNames,
                    name: "switchPokemon"
                }]).then(switchAnswers => {
                    secondPlayer.switchPokemon(switchAnswers.switchPokemon);
                    if (firstPlayer.amIDefeated()) {
                        console.log(`${secondPlayer.name} is the champion!`);
                    }
                    else {
                        playGame(firstPlayer, secondPlayer, !isFirstPlayersTurn);
                    }
                })
            }
        })
    }
}

