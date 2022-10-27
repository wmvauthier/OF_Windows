const userConfig = require('../config/userConfig.json');
const user = require('../user.json');
const system = require('./system.js');
const utils = require('./utils.js');
const holiday = require('./holiday.js');

let yourName = userConfig.yourName;
let yourKey = userConfig.yourKey;
let yourCountry = userConfig.yourCountry;
let yourState = userConfig.yourState;
let yourCity = userConfig.yourCity;

let choosenDate = user.choosenDate;
let otherDate = user.otherDate;
let points = user.points;

let files = user.files;

module.exports.printEstimateTerminalReport = async (totalQtdBkp, othersFinalQTD, SISBBPoints, gitFiles) => {

    let nome = await system.execShellCommand(`echo 👤 Nome: ${yourName}`);
    let chave = await system.execShellCommand(`echo 🔑 Chave: ${yourKey}`);
    let periodo = await system.execShellCommand(`echo 📆 Periodo: ${utils.formatDateTerminalReport(choosenDate)} ~ ${utils.formatDateTerminalReport(otherDate)}`);

    let date1 = new Date();
    let date2 = new Date(otherDate);

    let diffDays = utils.getBusinessDatesCount(date1, date2);

    let choosenDateObj = new Date(choosenDate);
    let otherDateObj = new Date(otherDate);
    let holidays = holiday.getHolidayBetweenDates(choosenDateObj, otherDateObj, yourCountry, yourState, yourCity);
    let tempo = "";

    if (holidays.length > 0) {
        holidays.forEach(feriado => {
            if (!feriado.isPast) { diffDays--; }
        });
    }

    if (diffDays > 0) {
        tempo = await system.execShellCommand(`echo ⌛ Tempo restante: ${diffDays - holidays.length} dias`);
    } else {
        tempo = await system.execShellCommand(`echo ⌛ Tempo restante: 🚫`);
    }

    tempo = tempo.slice(0,-1);

    // if (holidays.length > 0) {

    //     if (holidays.length < 10) {
    //         tempo += ` [\x1b[32m0${holidays.length} feriados 🏖️ ​\x1b[0m] `;
    //     } else {
    //         tempo += ` [\x1b[32m${holidays.length} feriados 🏖️ ​\x1b[0m] `;
    //     }

    // }

    let arquivos = await system.execShellCommand(`echo 📦 Arquivos: ${totalQtdBkp} arquivos`);

    if (othersFinalQTD > 0)
        arquivos = await system.execShellCommand(`echo 📦 Arquivos: ${totalQtdBkp} + \x1b[33m${othersFinalQTD}\x1b[0m arquivos`);

    let char = utils.returnSISBBStatus(diffDays, SISBBPoints);
    let pontuacao = await system.execShellCommand(`echo 🎯 Pontuacao: ${SISBBPoints}pts ${char[0]}`);

    if (char[1]) {
        pontuacao = await system.execShellCommand(`echo 🎯 Pontuacao: ${SISBBPoints}pts ${char[0]} ${char[1]}`);
    }

    if (char[1] && char[2]) {
        pontuacao = await system.execShellCommand(`echo 🎯 Pontuacao: ${SISBBPoints}pts ${char[0]} ${char[1]}${char[2]}`);
    }

    if (points == undefined || points == "undefined")
        points = 0;

    let pointsDiff = SISBBPoints - points;
    let pontuacaoArr = pontuacao.split("pts");

    if (files == undefined || files == "undefined")
        files = [];

    let auxFiles = [];

    gitFiles.forEach(gitFile => {

        let alreadyHas = false;

        gitFile = gitFile.replace("\t", "");
        gitFile = gitFile.substring(1);

        files.forEach(file => {
            if (file == gitFile) { alreadyHas = true; }
        });

        if (!alreadyHas)
            auxFiles.push(gitFile);

    });

    console.log("=================================");
    console.log(nome.slice(0,-1));
    console.log(chave.slice(0,-1));
    console.log(periodo.slice(0,-1));
    console.log(tempo);

    if (holidays.length > 0) {
        holidays.forEach(feriado => {
            if (feriado.isPast) {
                console.log('\t' + '\x1b[9m', "" + `🏖️  ${feriado.dia} - (${utils.getDayByDate(feriado.m)} ${utils.formatDate2TerminalReport(feriado.d)})` + "", '\x1b[0m' + ' ');
            } else {
                console.log('\t' + '\x1b[0m', "" + `🏖️  ${feriado.dia} - (${utils.getDayByDate(feriado.m)} ${utils.formatDate2TerminalReport(feriado.d)})` + "", '\x1b[0m' + ' ');
            }
        });
    }

    if (auxFiles.length > 0) {

        console.log(`📦 Arquivos: ${totalQtdBkp} arquivos ` + '(' + '\x1b[32m', "+" + auxFiles.length + " arquivos", '\x1b[0m' + ') ');

        auxFiles.forEach(file => {
            let fileArray = file.split("(");
            fileArray[1] = fileArray[1].replace(")", "");
            console.log(`\t📬 ${fileArray[0]}` + '(' + '\x1b[32m', "" + fileArray[1] + "", '\x1b[0m' + ') ');
        });

        let fortune = await system.execShellCommandDontShowErrors('fortune /usr/share/games/fortunes/brasil');

        while (fortune.includes("\n") || fortune.includes("\t")) {
            fortune = fortune.replace('\n', '').replace('\t', '');
        }

        if (!fortune.includes("not found")) {
            console.log("");
            console.log(`\t 🧙 ${fortune}`);
            console.log("");
        }

    } else {
        console.log(arquivos.slice(0,-1));
    }

    if (pointsDiff > 0) {
        console.log(pontuacaoArr[0] + 'pts ' + '(' + '\x1b[32m' + "+" + pointsDiff + 'pts\x1b[0m' + ') ' + char[0]);
    } else if (pointsDiff < 0) {
        console.log(pontuacaoArr[0] + 'pts ' + '(' + '\x1b[31m' + "" + pointsDiff + 'pts\x1b[0m' + ') ' + char[0]);
    } else {
        console.log(pontuacao.slice(0,-1));
    }

    console.log("=================================");

}
