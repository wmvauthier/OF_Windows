const userConfig = require('./config/userConfig.json');
const passwords = require('./config/passwords.json');
const shellCommands = require('./modules/shellCommands.js');
const system = require('./modules/system.js');

// VERIFICAR VARIÁVEIS GLOBAIS
let directory = userConfig.directory;
let yourKey = userConfig.yourKey;
let yourPassword = passwords.sisbb;

let result = [];

async function gitPullAllRepositories() {

  let cmd = shellCommands.cdAndLs;
  let getGitStatus = `git status`;

  let allProjects = await system.execShellCommand(cmd);

  allProjects = allProjects.split("\n");

  console.log();
  console.log(`📦 ${allProjects.length} projetos detectados em ${directory}`);

  for (let i = 0; i < allProjects.length; i++) {

    let projectName = allProjects[i];

    if (projectName != null && projectName != "") {

      let generateGitStatus = `cd ${directory}/${projectName} && ${getGitStatus}`;
      let gitStatus = await system.execShellCommand(generateGitStatus);

      let obj = {
        projectName: projectName,
        status: gitStatus,
        char: '🚫'
      };

      if (gitStatus.includes("nothing to commit") > 0) {

        let getGitURL = `git config --get remote.origin.url`;
        let generateGitURL = `cd ${directory}/${projectName} && ${getGitURL}`;
        let gitURL = await system.execShellCommand(generateGitURL);
        obj.URL = gitURL;

        let arrayURL = gitURL.split("//");
        let strURL = `${arrayURL[0]}//${yourKey}:${yourPassword}@${arrayURL[1]}`;

        let getGitPull = `git pull ${strURL}`;
        let generateGitPull = `cd ${directory}/${projectName} && ${getGitPull}`;
        let gitPull = await system.execShellCommand(generateGitPull);

        if (gitPull.includes("Already")) { obj.char = '✅'; }
        else if (gitPull.includes("denied")) { i = 9999; }
        else { obj.char = '📥'; }

      }

      result.push(obj);

      if (obj.char != "🚫") {
        console.log('\t' + obj.char + " " + obj.projectName);
      } else {
        console.log('\t' + obj.char + " " + obj.projectName);
      }

    }

    //i = allProjects.length + 1;

  }

  console.log();

}

async function main() {
  await gitPullAllRepositories();
}

main();