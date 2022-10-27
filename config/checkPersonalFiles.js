module.exports.checkBashFunctions = async () => {

    try {

        const userConfig = require('../config/userConfig.json');
        const fileManager = require('../modules/fileManager.js');
        const defaultFiles = require('./defaultFiles');
        const system = require('../modules/system');

        userConfig.terminalConfig.forEach(config => {

            let directory = `${userConfig.home}/${config}`;

            if (fileManager.existsSync(directory)) {

                system.execShellCommand(`cd && cat ${config}`).then(response => {

                    if (!response.includes("git () {")) {
                        response += defaultFiles.defaultGitFunction;
                        fileManager.writeFile(directory, response);
                    }

                });

            }

        });

    } catch (error) {
        return false;
    }

    return true;

}

module.exports.checkNodeModules = async () => {

    try {

        const userConfig = require('../config/userConfig.json');
        const fileManager = require('../modules/fileManager.js');
        const system = require('../modules/system');

        let directory = `${userConfig.directoryOF}/node_modules`;

        if (!fileManager.existsSync(directory)) {

            system.execShellCommand(`npm install --force`).then(response => {
                return true;
            });

        }

    } catch (error) {
        return false;
    }

    return true;

}

module.exports.checkPersonalFiles = async () => {

    let hasPassword = false;
    let hasUserJson = false;

    try {

        const userConfig = require('../config/userConfig.json');
        const fileManager = require('../modules/fileManager.js');
        const defaultFiles = require('./defaultFiles.js');
        const system = require('../modules/system');

        let directoryOF = userConfig.directoryOF;

        let cmd = `cd ${directoryOF} && dir /B`;
        let result = await system.execShellCommand(cmd);
        let files = result.split("\n");

        let cmdConfig = `cd ${directoryOF}\\config && dir /B`;
        let resultConfig = await system.execShellCommand(cmdConfig);
        let filesConfig = resultConfig.split("\n");

        files.forEach(file => {
            if (file.includes("user.json"))
                hasUserJson = true;
        });

        filesConfig.forEach(file => {
            if (file.includes("passwords.json"))
                hasPassword = true;
        });

        if (!hasPassword) {
            let filePath = `${directoryOF}\\config\passwords.json`;
            fileManager.writeFile(filePath, defaultFiles.defaultPasswords);
        }

        if (!hasUserJson) {
            let filePath = `${directoryOF}/user.json`;
            fileManager.writeFile(filePath, defaultFiles.defaultUserJson);
        }

        return true;

    } catch (error) {
        return false;
    }

}
