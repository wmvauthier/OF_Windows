const user = require('../user.json');
const userConfig = require('../config/userConfig.json');
const system = require('./system.js');
const fs = require('fs');

let directoryOF = userConfig.directoryOF;
let choosenDate = user.choosenDate;
let otherDate = user.otherDate;
let tasks = user.tasks;
let operations = user.operations;
let repositories = user.repositories;
let baseXLS = userConfig.baseXLS;
let baseSheet = userConfig.baseSheet;
let hermesXLS = userConfig.hermesXLS;
let repeatFiles = userConfig.repeatFiles;

module.exports.writeToFiles = (QTD, points, options, tmpFile, files, filesTXT, worksheet, rowCounter) => {

    if (QTD > 0) {

        tmpFile += `${filesTXT}\n ${files}\n`;
        tmpFile += `    Total: ${QTD} arquivos\n`;
        tmpFile += `    Pontuação: ${QTD * points} SISBB\n\n`;

    }

    return { 'tmpFile': tmpFile, 'rowCounter': rowCounter };

}

module.exports.addHistoryRito = (tasks, ritosList, worksheet, rowCounter) => {

    let tasksStr = "";

    tasks.forEach(history => {
        tasksStr += history;
    });

    ritosList.forEach(rito => {

        let row = worksheet.getRow(rowCounter);
        row.getCell(3).value = rito[0];
        row.getCell(4).value = rito[1];
        row.getCell(5).value = rito[2];
        row.getCell(7).value = rito[3];
        row.getCell(8).value = rito[4];
        row.getCell(11).value = tasks.length;
        row.getCell(12).value = tasksStr;
        row.commit();
        rowCounter++;

    });

    return rowCounter;

}

module.exports.updateUserJsonFile = async (points, files) => {

    let opStr = "";

    if (operations) {
        let opArray = operations.toString().split(",");

        opStr += "[";
        opArray.forEach(operation => {
            operation = operation.replace("\n", "");
            opStr += `"${operation}\\n",`;
        });
        opStr = opStr.slice(0, -1);
        opStr += "]";
    } else { opStr = "[]" }

    let repoStr = "";

    if (repositories) {
        let repoArray = repositories.toString().split(",");

        repoStr += "[";
        repoArray.forEach(repository => {
            repository = repository.replace("\n", "");
            repoStr += `"${repository}\\n",`;
        });
        repoStr = repoStr.slice(0, -1);
        repoStr += "]";
    } else { repoStr = "[]" }

    let histStr = "";

    if (tasks) {
        let histArray = tasks.toString().split(",");

        histStr += "[";
        histArray.forEach(history => {
            history = history.replace("\n", "");
            histStr += `"${history}\\n",`;
        });
        histStr = histStr.slice(0, -1);
        histStr += "]";
    } else { histStr = "[]" }

    let filesStr = "";

    if (files) {
        let filesArray = files.toString().split(",");

        filesStr += `[`;
        filesArray.forEach(file => {
            file = file.substring(1);
            file = file.replace("\t", "");
            filesStr += `"${file}",`;
        });
        filesStr = filesStr.slice(0, -1);
        filesStr += `]`;
    } else { filesStr = "[]" }

    if (!repeatFiles)
        repeatFiles = "false";

    if (!baseXLS)
        baseXLS = "SimuladorBase.xlsx";

    if (!hermesXLS)
        hermesXLS = "SimuladorBase2.xlsx";

    if (!baseSheet)
        baseSheet = "Orçamento";

    let userJsonFile = `{
      "choosenDate": "${choosenDate}",
      "otherDate": "${otherDate}",
      "operations": ${opStr},
      "repositories": ${repoStr},
      "tasks": ${histStr},
      "points": "${points}",
      "files": ${filesStr}
  }`;

    let filePath = `${directoryOF}/user.json`;

    await system.execShellCommand('del /F /Q user.json');

    this.writeFile(filePath, userJsonFile);

}

module.exports.existsSync = (directory) => {
    return fs.existsSync(directory);
}

module.exports.createReadStream = (file) => {
    return fs.createReadStream(file)
}

module.exports.writeFile = (path, file) => {
    fs.writeFile(path, file, function (err) {
        if (err) { return console.log(err); }
    });
}
