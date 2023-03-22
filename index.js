#! /usr/bin/env node
console.clear();
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
//------------------------------------------------------------------------------
//CONTRUCTORS/INTERFACES/CLASSES HERE
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//FUNCTIONS HERE
//------------------------------------------------------------------------------
const stopTime = () => {
    return new Promise((res) => {
        setTimeout(res, 3500);
    });
};
async function welcome(welcomeMessage) {
    let rainbowTitle = chalkAnimation.neon(chalk.yellowBright("Welcome To " + welcomeMessage + " App!\n\nCoded By Hosein Sirat Mohammad\n"));
    await stopTime();
    rainbowTitle.stop();
}
async function mainMenu() {
    var iResult = await inquirer.prompt([
        {
            type: "list",
            name: "mainOption",
            message: "What would you like to do?",
            choices: [
                {
                    name: "Open editor and count words.",
                    value: "editorChoice"
                },
                {
                    name: "Bye",
                    value: "bye"
                }
            ]
        },
        {
            type: "editor",
            name: "mainEditor",
            message: "Opening editor." + chalk.inverse("\nInside Vim Editor: \nPRESS ESC + TYPE :wq + ENTER (To save and exit ) \nPRESS ESC + TYPE :q! + ENTER (To discard and return )\n"),
            waitUserInput: true,
            when(oA) {
                return oA.mainOption == 'editorChoice';
            }
        }
    ])
        .then((result) => {
        if (result.mainOption == 'bye') {
            console.log(result.mainOption);
        }
        else {
            console.log(result.mainEditor);
            countParaFunc(result.mainEditor);
            mainMenu();
        }
    });
}
;
function countParaFunc(para) {
    let wordCount = para.match(/\w+/g);
    console.log(chalk.blueBright("\tWord/s Count = " + wordCount.length + "."));
    let charCount = para.replaceAll(/[ \n\t]/g, '');
    console.log(chalk.blueBright("\tCharacter/s Count = " + charCount.length + ".\n"));
}
;
//------------------------------------------------------------------------------
//MAIN HERE
//------------------------------------------------------------------------------
await welcome("Word Counter");
await mainMenu();
