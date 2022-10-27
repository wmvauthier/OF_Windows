const user = require('../user.json');
const userConfig = require('../config/userConfig.json');

let directory = userConfig.directory;
let directoryOF = userConfig.directoryOF;
let yourKey = userConfig.yourKey;
let choosenDate = user.choosenDate;
let otherDate = user.otherDate;

module.exports.cdAndLs = `cd ${directory} && dir /B`;
module.exports.getGitCommits = `git log --name-status --no-merges --perl-regexp --author="${yourKey.toLowerCase()}|${yourKey.toUpperCase()}" --after=${choosenDate} --before=${otherDate} --all --pretty=format:"commit: #%h"`;
module.exports.generateGitCommits = (projectName) => { return `cd ${directory}\\${projectName} && ${this.getGitCommits}`; }

module.exports.getGitCommitsOutput = `git log --name-status --no-merges --perl-regexp --author="${yourKey.toLowerCase()}|${yourKey.toUpperCase()}" --after=${choosenDate} --before=${otherDate} --all --pretty=format:"commit: #%h" > ${directoryOF}/input.txt`;
module.exports.generateGitCommitsOutput = (projectName) => { return `cd ${directory}\\${projectName} && ${this.getGitCommitsOutput}`; }

module.exports.getFullReportGit = (projectName) => { return `cd ${directory}\\${projectName} && git log --no-merges --graph --stat --perl-regexp --author="${yourKey.toLowerCase()}|${yourKey.toUpperCase()}" --after=${choosenDate} --before=${otherDate} --all --pretty=format:"%as - #%h - %s %cn"`; }
