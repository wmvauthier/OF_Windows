const system = require('../modules/system');
const userConfig = require('../config/userConfig.json');

let directoryOF = userConfig.directoryOF;

module.exports.updateGitRepository = async() => {
    let cmd = `cd ${directoryOF} && git pull`;
    await system.execShellCommand(cmd);
}