#! /usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const existpackageManeger = fs.existsSync('package.json');
const CreateReactProject  = require('./ProjectCreator/React')


async function buildpackageJson() {
    let  config = {
        version: 2,
        name : "test"
    };
 const answers = await  inquirer
    .prompt([
      {
        type: 'text',
        name: 'name',
        message: 'what is name of your project?',
        default: path.basename(process.cwd()),
      },
      {
        type: 'list',
        name: 'type',
        message: 'what is the version  of your project?',
        choices: [
          'Npx create-React-app',
          'Next TS',
          'React TS',
          'Backend Exprees',
          'Backend graphql',
          'Backend gprc',
        ],
      },
    ])
    config.name = answers.name
    switch (answers.type) {
        case "Npx create-React-app":
            config = await  CreateReactProject(config)
            break;
        }
}

if (existpackageManeger) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'the package.json is already exist ! would you overwrite it ?',
        default: false,
      },
    ])
    .then((amswer) => {
      if (amswer.overwrite) {
        buildpackageJson();
      } else {
        console.log('Ok good bye👍');
      }
    })
    .catch((error) => {
        console.log(error);
    });
} else {
  buildpackageJson();
}
