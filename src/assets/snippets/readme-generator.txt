
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const heya = require("./folder1/index") // array of questions for user
function init() { // function to initialize inquirer and generate markdown document
    inquirer.prompt(heya).then(answer => {
        console.log(answer);
        fs.writeFile("./folder1/README.md", generateMarkdown(answer), err => console.log(err))
    })
}
init();