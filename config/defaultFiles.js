const userConfig = require('./userConfig.json');
let directoryOF = userConfig.directoryOF;

module.exports.defaultGitFunction = `

git () {
    command git "$@"
    node ${directoryOF}/estimateOF.js --"$@"
}

`;

module.exports.defaultPasswords = `
{
    "sisbb": "senhaDaChaveC/senhaDoSISBB",
    "hermes": "senhaDoHermes"
}`;

module.exports.defaultUserJson = `
{
    "choosenDate": "1997-05-02",
    "otherDate": "1997-12-31",
    "operations": [],
    "repositories": [],
    "tasks": [],
    "points": "0",
    "files": []
}`;