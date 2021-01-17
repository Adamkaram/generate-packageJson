const inquirer = require("inquirer");
const path = require("path");
const latestVersion = require("latest-version");
const fs = require("fs");
var init = require('init-package-json')
var initFile = path.resolve(process.env.HOME, '.npm-init')
var dir = process.cwd()
var configData = { some: 'extra stuff' }

const CreateReact = {
  version: "0.1.0",
  main: ".eslintrc.js",
  private: true,
  dependencies: {
  react: "^17.0.1",
  concurrently: "^5.3.0",
  },
  scripts: {
    start: "react-scripts start",
    build: "react-scripts build",
    test: "react-scripts test",
    eject: "react-scripts eject",
    Backend: "npm run start --prefix Backend",
    server: 'concurrently "npm run start" "npm run Backend"',
  },
};

async function CreateReactProject(configration) {
  let mainFile = ".eslintrc.js";
  let packageJSONPath;

  try {
    packageJSONPath = path.join(process.cwd(), 'package.json') ;
    mainFile =  CreateReact.main;
  } catch (error) {
    console.error('package.json does not exist!');
    process.exit(1);
  }
  const answers = await inquirer.prompt([
    {
      type: "text",
      name: "main",
      message: "what is the path to your react entry point? ",
      default: mainFile,
    },
    {
      type: "confirm",
      name: "Reactversion",
      message: "version you want you want last version or specific version ? ",
      default: true,
    },
    {
      type: "confirm",
      name: "private",
      message: "it it  a private project ? ",
      default: true,
    },
    {
      type: "list",
      name: "dependencyManagement",
      message: "prefer dependency management?",
      choices: ["npm", "yarn"],
    },
  ]);

  //   CreateReact.builds[0].src = answers.main;
  //   CreateReact.routes[0].dest = answers.main;
  CreateReact.main = answers.main;
  CreateReact.dependencies.react = await latestVersion("react");
  CreateReact.private = answers.private;


  switch (answers.dependencyManagement) {
    case "npm":
      CreateReact.Backend = "npm run start --prefix Backend";
      CreateReact.server = 'concurrently "npm run start" "npm run Backend"';
      break;
    case "yarn":
      CreateReact.scripts.Backend = "yarn run start --prefix Backend";
      CreateReact.scripts.server =
        'concurrently "yarn run start" "yarn run Backend"';
      break;
    default:
      break;
  }
  fs.writeFileSync(
    packageJSONPath,
    JSON.stringify(CreateReact, null, 2),
    "utf8"
  );

  return {
    ...configration,
    ...CreateReact,
  };
}

module.exports = CreateReactProject;
