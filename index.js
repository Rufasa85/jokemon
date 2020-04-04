const inquirer = require("inquirer");

inquirer.prompt([
    {
        type:"input",
        name:"test",
        message:"test question"
    }
]).then(answers=>{
    console.log(answers);
})