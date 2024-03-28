const user = require('./user.json');
const userConfig = require('./config/userConfig.json');
const negotials = require('./modules/negotials.js');
const pointsList = require('./modules/pointsList.json');
const fileManager = require('./modules/fileManager.js');
const xlsManager = require('./modules/xlsManager.js');
const termgraph = require('./modules/termgraph.js');
const system = require('./modules/system.js');
const utils = require('./modules/utils.js');
const shellComands = require('./modules/shellCommands.js');
const readline = require('readline');
let Excel = require('exceljs');

// VERIFICAR VARIÁVEIS GLOBAIS
let directoryOF = userConfig.directoryOF;
let yourName = userConfig.yourName;
let baseXLS = userConfig.baseXLS;
let baseSheet = userConfig.baseSheet;
let hermesXLS = userConfig.hermesXLS;
let repeatFiles = userConfig.repeatFiles;

let createJavaPoints = pointsList.points[0].value;
let alterJavaPoints = pointsList.points[1].value;
let alterJavaCompPoints = pointsList.points[2].value;
let createJavaTestPoints = pointsList.points[3].value;
let createHTMLPoints = pointsList.points[4].value;
let alterHTMLPoints = pointsList.points[5].value;
let createJSPoints = pointsList.points[6].value;
let alterJSPoints = pointsList.points[7].value;
let createXMLPoints = pointsList.points[8].value;
let alterXMLPoints = pointsList.points[9].value;
let createCSSPoints = pointsList.points[14].value;
let alterCSSPoints = pointsList.points[15].value;
let createShellPoints = pointsList.points[18].value;
let alterShellPoints = pointsList.points[19].value;
let createSQLPoints = pointsList.points[20].value;
var createPythonPoints = pointsList.points[21].value;
var alterPythonPoints = pointsList.points[22].value;

let createJavaOptions = pointsList.points[0].options;
let alterJavaOptions = pointsList.points[1].options;
let alterJavaCompOptions = pointsList.points[2].options;
let createJavaTestOptions = pointsList.points[3].options;
let createHTMLOptions = pointsList.points[4].options;
let alterHTMLOptions = pointsList.points[5].options;
let createJSOptions = pointsList.points[6].options;
let alterJSOptions = pointsList.points[7].options;
let createXMLOptions = pointsList.points[8].options;
let alterXMLOptions = pointsList.points[9].options;
let createCSSOptions = pointsList.points[14].options;
let alterCSSOptions = pointsList.points[15].options;
let createShellOptions = pointsList.points[18].options;
let alterShellOptions = pointsList.points[19].options;
let createSQLOptions = pointsList.points[20].options;
var createPythonOptions = pointsList.points[21].options;
var alterPythonOptions = pointsList.points[22].options;

let createJavaTXT = pointsList.points[0].name;
let alterJavaTXT = pointsList.points[1].name;
let alterJavaCompTXT = pointsList.points[2].name;
let createJavaTestTXT = pointsList.points[3].name;
let createHTMLTXT = pointsList.points[4].name;
let alterHTMLTXT = pointsList.points[5].name;
let createJSTXT = pointsList.points[6].name;
let alterJSTXT = pointsList.points[7].name;
let createXMLTXT = pointsList.points[8].name;
let alterXMLTXT = pointsList.points[9].name;
let othersTXT = pointsList.points[10].name;
let createCSSTXT = pointsList.points[14].name;
let alterCSSTXT = pointsList.points[15].name;
let createShellTXT = pointsList.points[18].name;
let alterShellTXT = pointsList.points[19].name;
let createSQLTXT = pointsList.points[20].name;
var createPythonTXT = pointsList.points[21].name;
var alterPythonTXT = pointsList.points[22].name;

let createJavaFinal = "";
let alterJavaFinal = "";
let alterJavaCompFinal = "";
let createJavaTestFinal = "";
let createHTMLFinal = "";
let alterHTMLFinal = "";
let createJSFinal = "";
let alterJSFinal = "";
let createXMLFinal = "";
let alterXMLFinal = "";
let createCSSFinal = "";
let alterCSSFinal = "";
let createShellFinal = "";
let alterShellFinal = "";
let createSQLFinal = "";
var createPythonFinal = "";
var alterPythonFinal = "";
let othersFinal = "";

let createJavaFinalQTD = 0;
let alterJavaFinalQTD = 0;
let alterJavaCompFinalQTD = 0;
let createJavaTestFinalQTD = 0;
let createHTMLFinalQTD = 0;
let alterHTMLFinalQTD = 0;
let createJSFinalQTD = 0;
let alterJSFinalQTD = 0;
let createXMLFinalQTD = 0;
let alterXMLFinalQTD = 0;
let createCSSFinalQTD = 0;
let alterCSSFinalQTD = 0;
let createShellFinalQTD = 0;
let alterShellFinalQTD = 0;
let createSQLFinalQTD = 0;
var createPythonFinalQTD = 0;
var alterPythonFinalQTD = 0;
let othersFinalQTD = 0;

let totalQtdBkp = 0;
let totalSISBBBkp = 0;
let gitFiles = [];

let data = new Date();
let month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][data.getMonth()].toUpperCase();
let year = data.getFullYear();

let fullReportFile = "";

async function processLineByLine() {

  let workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(baseXLS);
  let worksheet = workbook.getWorksheet(baseSheet);
  xlsManager.cleanSpreedsheet(worksheet);
  await workbook.xlsx.writeFile(baseXLS);

  let rowCounter = 4;

  let allProjects = await system.execShellCommand(shellComands.cdAndLs);
  allProjects = allProjects.split("\n");

  await system.execShellCommand(`if not exist ${month}-${year} mkdir ${month}-${year}`);
  directoryOF = `${directoryOF}/${month}-${year}`;

  for (let i = 0; i < allProjects.length; i++) {

    let projectName = allProjects[i];

    projectName = projectName.replace("\r","");

    if (projectName != null && projectName != "") {

      await system.execShellCommandCheckFolders(shellComands.generateGitCommitsOutput(projectName));

      let fullReportProject = await system.execShellCommandCheckFolders(shellComands.getFullReportGit(projectName));

      const fileStream = fileManager.createReadStream('input.txt');

      let output = `${projectName}-${month}-${data.getFullYear()}`;
      projectName += "/";

      let filePath = `${directoryOF}/${output}.txt`;

      let linesFromInput = [];
      let tmpFile = "";

      let createJava = "";
      let alterJava = "";
      let alterJavaComp = "";
      let createJavaTest = "";
      let createHTML = "";
      let alterHTML = "";
      let createJS = "";
      let alterJS = "";
      let createCSS = "";
      let alterCSS = "";
      let createXML = "";
      let alterXML = "";
      let createShell = "";
      let alterShell = "";
      let createSQL = "";
      var createPython = "";
      var alterPython = "";
      let others = "";

      let createJavaQTD = 0;
      let alterJavaQTD = 0;
      let alterJavaCompQTD = 0;
      let createJavaTestQTD = 0;
      let createHTMLQTD = 0;
      let alterHTMLQTD = 0;
      let createJSQTD = 0;
      let alterJSQTD = 0;
      let createCSSQTD = 0;
      let alterCSSQTD = 0;
      let createXMLQTD = 0;
      let alterXMLQTD = 0;
      let createShellQTD = 0;
      let alterShellQTD = 0;
      let createSQLQTD = 0;
      var createPythonQTD = 0;
      var alterPythonQTD = 0;
      let othersQTD = 0;

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });

      let hashCommit = "###########";

      for await (let line of rl) {

        if (line.includes("commit:") && negotials.checkValidLineFromCommit(line))
          hashCommit = line.split("#")[1];

        let condition = true;

        if (repeatFiles == false || repeatFiles == "false")
          condition = !linesFromInput.includes(line)

        if (condition) {

          if (!line.includes("commit:") && line != "" && negotials.checkValidLineFromCommit(line)) {

            let obj = negotials.detectFilesCategory(line, projectName, gitFiles, linesFromInput, hashCommit,
              alterJS, alterJSPoints, alterJSQTD,
              createJS, createJSPoints, createJSQTD,
              alterCSS, alterCSSPoints, alterCSSQTD,
              createCSS, createCSSPoints, createCSSQTD,
              createJavaTest, createJavaTestPoints, createJavaTestQTD,
              createJava, createJavaPoints, createJavaQTD,
              alterJava, alterJavaPoints, alterJavaQTD,
              alterJavaComp, alterJavaCompPoints, alterJavaCompQTD,
              alterHTML, alterHTMLPoints, alterHTMLQTD,
              createHTML, createHTMLPoints, createHTMLQTD,
              alterXML, alterXMLPoints, alterXMLQTD,
              createXML, createXMLPoints, createXMLQTD,
              createShell, createShellPoints, createShellQTD,
              alterShell, alterShellPoints, alterShellQTD,
              createSQL, createSQLPoints, createSQLQTD,
              createPython, createPythonPoints, createPythonQTD,
              alterPython, alterPythonPoints, alterPythonQTD,
              others, othersQTD
            );

            line = obj.line;
            projectName = obj.projectName;
            linesFromInput = obj.linesFromInput;
            hashCommit = obj.hashCommit;
            alterJS = obj.alterJS;
            alterJSQTD = obj.alterJSQTD;
            createJS = obj.createJS;
            createJSQTD = obj.createJSQTD;
            alterCSS = obj.alterCSS;
            alterCSSQTD = obj.alterCSSQTD;
            createCSS = obj.createCSS;
            createCSSQTD = obj.createCSSQTD;
            createJavaTest = obj.createJavaTest;
            createJavaTestQTD = obj.createJavaTestQTD;
            createJava = obj.createJava;
            createJavaQTD = obj.createJavaQTD;
            alterJava = obj.alterJava;
            alterJavaQTD = obj.alterJavaQTD;
            alterJavaComp = obj.alterJavaComp;
            alterJavaCompQTD = obj.alterJavaCompQTD;
            alterHTML = obj.alterHTML;
            alterHTMLQTD = obj.alterHTMLQTD;
            createHTML = obj.createHTML;
            createHTMLQTD = obj.createHTMLQTD;
            alterXML = obj.alterXML;
            alterXMLQTD = obj.alterXMLQTD;
            createXML = obj.createXML;
            createXMLQTD = obj.createXMLQTD;
            alterShell = obj.alterShell;
            alterShellQTD = obj.alterShellQTD;
            createShell = obj.createShell;
            createShellQTD = obj.createShellQTD;
            createSQL = obj.createSQL;
            createSQLQTD = obj.createSQLQTD;
            createPython = obj.createPython;
            createPythonQTD = obj.createPythonQTD;
            alterPython = obj.alterPython;
            alterPythonQTD = obj.alterPythonQTD;
            others = obj.others;
            othersQTD = obj.othersQTD;

          }

        }

      }

      tmpFile = projectName + " - " + user.yourName + " - " + user.yourKey + " - " + user.choosenDate + " - " + user.otherDate + "\n\n";

      let tmpResult = fileManager.writeToFiles(createJavaQTD, createJavaPoints, createJavaOptions, tmpFile, createJava, createJavaTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(alterJavaQTD, alterJavaPoints, alterJavaOptions, tmpFile, alterJava, alterJavaTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(alterJavaCompQTD, alterJavaCompPoints, alterJavaCompOptions, tmpFile, alterJavaComp, alterJavaCompTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(createJavaTestQTD, createJavaTestPoints, createJavaTestOptions, tmpFile, createJavaTest, createJavaTestTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(createHTMLQTD, createHTMLPoints, createHTMLOptions, tmpFile, createHTML, createHTMLTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(alterHTMLQTD, alterHTMLPoints, alterHTMLOptions, tmpFile, alterHTML, alterHTMLTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(createJSQTD, createJSPoints, createJSOptions, tmpFile, createJS, createJSTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(alterJSQTD, alterJSPoints, alterJSOptions, tmpFile, alterJS, alterJSTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(createXMLQTD, createXMLPoints, createXMLOptions, tmpFile, createXML, createXMLTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(alterXMLQTD, alterXMLPoints, alterXMLOptions, tmpFile, alterXML, alterXMLTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(createCSSQTD, createCSSPoints, createCSSOptions, tmpFile, createCSS, createCSSTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(alterCSSQTD, alterCSSPoints, alterCSSOptions, tmpFile, alterCSS, alterCSSTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(createShellQTD, createShellPoints, createShellOptions, tmpFile, createShell, createShellTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(alterShellQTD, alterShellPoints, alterShellOptions, tmpFile, alterShell, alterShellTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(createSQLQTD, createSQLPoints, createShellOptions, tmpFile, createSQL, createSQLTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(createPythonQTD, createPythonPoints, createPythonOptions, tmpFile, createPython, createPythonTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(alterPythonQTD, alterPythonPoints, alterPythonOptions, tmpFile, alterPython, alterPythonTXT, worksheet, rowCounter);
      tmpFile = tmpResult.tmpFile; rowCounter = tmpResult.rowCounter;

      if (othersQTD > 0)
        tmpFile += `${othersTXT}\n ${others}\n`;

      let totalQtd = createJavaQTD + alterJavaQTD + alterJavaCompQTD + createJavaTestQTD
        + createHTMLQTD + alterHTMLQTD + createJSQTD + alterJSQTD + createXMLQTD
        + createCSSQTD + alterCSSQTD + alterXMLQTD + createShellQTD + alterShellQTD + createSQLQTD
        + createPythonQTD + alterPythonQTD;

      let totalSISBB = (createJavaQTD * createJavaPoints)
        + (alterJavaQTD * alterJavaPoints)
        + (alterJavaCompQTD * alterJavaCompPoints)
        + (createJavaTestQTD * createJavaTestPoints)
        + (createHTMLQTD * createHTMLPoints)
        + (alterHTMLQTD * alterHTMLPoints)
        + (createJSQTD * createJSPoints)
        + (alterJSQTD * alterJSPoints)
        + (createCSSQTD * createCSSPoints)
        + (alterCSSQTD * alterCSSPoints)
        + (alterXMLQTD * alterXMLPoints)
        + (createShellQTD * createShellPoints)
        + (alterShellQTD * alterShellPoints)
        + (createSQLQTD * createSQLPoints)
        + (createPythonQTD * createPythonPoints)
        + (alterPythonQTD * alterPythonPoints);

      totalQtdBkp += totalQtd;
      totalSISBBBkp += totalSISBB;

      tmpFile += `Total Geral: ${totalQtd} arquivos\n`;
      tmpFile += `Pontuação Geral: ${totalSISBB} SISBB\n\n`;

      if (totalQtd > 0) {

        fileManager.writeFile(filePath, tmpFile);

        let projectTitle = `${projectName} `;

        while (projectTitle.length < 110) {
          projectTitle += "*";
        }

        fullReportFile += `${projectTitle} \n`;
        fullReportFile += `\n${fullReportProject}\n`;

      }

      createJavaFinal += createJava;
      alterJavaFinal += alterJava;
      alterJavaCompFinal += alterJavaComp;
      createJavaTestFinal += createJavaTest;
      createHTMLFinal += createHTML;
      alterHTMLFinal += alterHTML;
      createJSFinal += createJS;
      alterJSFinal += alterJS;
      createXMLFinal += createXML;
      alterXMLFinal += alterXML;
      createCSSFinal += createCSS;
      alterCSSFinal += alterCSS;
      createShellFinal += createShell;
      alterShellFinal += alterShell;
      createSQLFinal += createSQL;
      createPythonFinal += createPython;
      alterPythonFinal += alterPython;
      othersFinal += others;

      createJavaFinalQTD += createJavaQTD;
      alterJavaFinalQTD += alterJavaQTD;
      alterJavaCompFinalQTD += alterJavaCompQTD;
      createJavaTestFinalQTD += createJavaTestQTD;
      createHTMLFinalQTD += createHTMLQTD;
      alterHTMLFinalQTD += alterHTMLQTD;
      createJSFinalQTD += createJSQTD;
      alterJSFinalQTD += alterJSQTD;
      createXMLFinalQTD += createXMLQTD;
      alterXMLFinalQTD += alterXMLQTD;
      createCSSFinalQTD += createCSSQTD;
      alterCSSFinalQTD += alterCSSQTD;
      createShellFinalQTD += createShellQTD;
      alterShellFinalQTD += alterShellQTD;
      createSQLFinalQTD += createSQLQTD;
      createPythonFinalQTD += createPythonQTD;
      alterPythonFinalQTD += alterPythonQTD;
      othersFinalQTD += othersQTD;

      await system.execShellCommand('del /F /Q input.txt');

    }

  }

  let newJSON = montarJSONNovo();
  await system.execShellCommand(
    `echo '${newJSON}' > ${directoryOF}/of-${user.numeroOF}.json`
  );

  let output = `${yourName}-${month}-${data.getFullYear()}`;
  let filePath = `${directoryOF}/${output}.txt`;

  fileManager.writeFile(filePath, fullReportFile);

  let tmpResult = xlsManager.writeToXLS(createJavaFinalQTD, createJavaOptions, createJavaFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(alterJavaFinalQTD, alterJavaOptions, alterJavaFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(alterJavaCompFinalQTD, alterJavaCompOptions, alterJavaCompFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(createJavaTestFinalQTD, createJavaTestOptions, createJavaTestFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(createHTMLFinalQTD, createHTMLOptions, createHTMLFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(alterHTMLFinalQTD, alterHTMLOptions, alterHTMLFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(createJSFinalQTD, createJSOptions, createJSFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(alterJSFinalQTD, alterJSOptions, alterJSFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(createXMLFinalQTD, createXMLOptions, createXMLFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(alterXMLFinalQTD, alterXMLOptions, alterXMLFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(createCSSFinalQTD, createCSSOptions, createCSSFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(alterCSSFinalQTD, alterCSSOptions, alterCSSFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(createShellFinalQTD, createShellOptions, createShellFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(alterShellFinalQTD, alterShellOptions, alterShellFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(createSQLFinalQTD, createSQLOptions, createSQLFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(createPythonFinalQTD, createPythonOptions, createPythonFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(alterPythonFinalQTD, alterPythonOptions, alterPythonFinal, worksheet, rowCounter);
  rowCounter = tmpResult.rowCounter;

  let addRitoPointsJson = negotials.addRitosPoints(totalSISBBBkp, rowCounter, worksheet);

  totalSISBBBkp = addRitoPointsJson.SISBBPoints;
  rowCounter = addRitoPointsJson.rowCounter;
  worksheet = addRitoPointsJson.worksheet;

  workbook.xlsx.writeFile(`${directoryOF}/${hermesXLS}`);
  //await system.execShellCommand(`${baseXLS}`);
  await updateCalDatFile();

}

async function updateCalDatFile() {

  await system.execShellCommand('echo > cal.dat');

  let arrTermOptions = [
    { name: createJavaTXT, qtd: createJavaFinalQTD * createJavaPoints },
    { name: alterJavaTXT, qtd: alterJavaFinalQTD * alterJavaPoints },
    { name: alterJavaCompTXT, qtd: alterJavaCompFinalQTD * alterJavaCompPoints },
    { name: createJavaTestTXT, qtd: createJavaTestFinalQTD * createJavaTestPoints },
    { name: createHTMLTXT, qtd: createHTMLFinalQTD * createHTMLPoints },
    { name: alterHTMLTXT, qtd: alterHTMLFinalQTD * alterHTMLPoints },
    { name: createJSTXT, qtd: createJSFinalQTD * createJSPoints },
    { name: alterJSTXT, qtd: alterJSFinalQTD * alterJSPoints },
    { name: createXMLTXT, qtd: createXMLFinalQTD * createXMLPoints },
    { name: alterXMLTXT, qtd: alterXMLFinalQTD * alterXMLPoints },
    { name: createCSSTXT, qtd: createCSSFinalQTD * createCSSPoints },
    { name: alterCSSTXT, qtd: alterCSSFinalQTD * alterCSSPoints },
    { name: createShellTXT, qtd: createShellFinalQTD * createShellPoints },
    { name: alterShellTXT, qtd: alterShellFinalQTD * alterShellPoints },
    { name: createSQLTXT, qtd: createSQLFinalQTD * createSQLPoints },
    { name: createPythonTXT, qtd: createPythonFinalQTD * createPythonPoints },
    { name: alterPythonTXT, qtd: alterPythonFinalQTD * alterPythonPoints }
  ];

  let ritosPoints = (pointsList.points[11].value +
    pointsList.points[12].value +
    pointsList.points[13].value) * utils.checkValidArrayLength(user.tasks);

  let operationPoints = pointsList.points[16].value * utils.checkValidArrayLength(user.operations);
  let repositoryPoints = pointsList.points[17].value * utils.checkValidArrayLength(user.repositories);

  arrTermOptions.push({
    name: "PARTICIPAÇÕES_EM_RITOS", qtd: ritosPoints
  });

  arrTermOptions.push({
    name: "CRIAÇÃO_DE_OPERAÇÃO", qtd: operationPoints
  });

  arrTermOptions.push({
    name: "CRIAÇÃO_DE_REPOSITÓRIO", qtd: repositoryPoints
  });

  let calDatFile = termgraph.generateCalDatFile(arrTermOptions);

  let filePath = `${userConfig.directoryOF}/cal.dat`;

  fileManager.writeFile(filePath, calDatFile);

  console.log("");
  console.log(await system.execShellCommand('echo RELATORIO DE OF'));

  if (othersFinalQTD > 0) {
    console.log(await system.execShellCommand(`echo Arquivos detectados: ${totalQtdBkp} + \x1b[33m${othersFinalQTD}\x1b[0m arquivos`));
  } else {
    console.log(await system.execShellCommand(`echo Arquivos detectados: ${totalQtdBkp} arquivos`));
  }

  gitFiles.forEach(file => {
    let fileArray = file.split("(");
    fileArray[1] = fileArray[1].replace(")", "");
    console.log(`\t📬 ${fileArray[0]}` + '(' + '\x1b[32m', "" + fileArray[1] + "", '\x1b[0m' + ') ');
  });

  if (othersFinalQTD > 0) {
    let arr = othersFinal.split("\n");
    arr.forEach(file => {
      if (file != "")
        console.log(`\t📬` + '\x1b[33m' + ` ${file}` + '\x1b[0m');
    });
  }

  //console.log(await system.execShellCommand('termgraph cal.dat'));

  console.log("");
  console.log(await system.execShellCommand(`echo Pontuacao: ${totalSISBBBkp}pts`));

  await system.execShellCommand('del /F /Q cal.dat');

}

function montarJSONNovo() {
  let arrays = [];

  let createJava = arrays.push({
    itemGuia: createJavaCode,
    complexidade: createJavaComplexity,
    itens: limparArray(createJavaFinal),
  });

  let alterJava = arrays.push({
    itemGuia: alterJavaCode,
    complexidade: alterJavaComplexity,
    itens: limparArray(alterJavaFinal),
  });

  let alterJavaComp = arrays.push({
    itemGuia: alterJavaCompCode,
    complexidade: alterJavaCompComplexity,
    itens: limparArray(alterJavaCompFinal),
  });

  let createJavaTest = arrays.push({
    itemGuia: createJavaTestCode,
    complexidade: createJavaTestComplexity,
    itens: limparArray(createJavaTestFinal),
  });

  let alterHTML = arrays.push({
    itemGuia: alterHTMLCode,
    complexidade: alterHTMLComplexity,
    itens: limparArray(alterHTMLFinal),
  });

  console.log(limparArray(alterHTMLFinal));

  let createJS = arrays.push({
    itemGuia: createJSCode,
    complexidade: createJSComplexity,
    itens: limparArray(createJSFinal),
  });

  let alterJS = arrays.push({
    itemGuia: alterJSCode,
    complexidade: alterJSComplexity,
    itens: limparArray(alterJSFinal),
  });

  let createXML = arrays.push({
    itemGuia: createXMLCode,
    complexidade: createXMLComplexity,
    itens: limparArray(createXMLFinal),
  });

  let alterXML = arrays.push({
    itemGuia: alterXMLCode,
    complexidade: alterXMLComplexity,
    itens: limparArray(alterXMLFinal),
  });

  let createCSS = arrays.push({
    itemGuia: createCSSCode,
    complexidade: createCSSComplexity,
    itens: limparArray(createCSSFinal),
  });

  let alterCSS = arrays.push({
    itemGuia: alterCSSCode,
    complexidade: alterCSSComplexity,
    itens: limparArray(alterCSSFinal),
  });

  let createShell = arrays.push({
    itemGuia: createShellCode,
    complexidade: createShellComplexity,
    itens: limparArray(createShellFinal),
  });

  let alterShell = arrays.push({
    itemGuia: alterShellCode,
    complexidade: alterShellComplexity,
    itens: limparArray(alterShellFinal),
  });

  let createSQL = arrays.push({
    itemGuia: createSQLCode,
    complexidade: createSQLComplexity,
    itens: limparArray(createSQLFinal),
  });

  let createPython = arrays.push({
    itemGuia: createPythonCode,
    complexidade: createPythonComplexity,
    itens: limparArray(createPythonFinal),
  });

  let alterPython = arrays.push({
    itemGuia: alterPythonCode,
    complexidade: alterPythonComplexity,
    itens: limparArray(alterPythonFinal),
  });

  let newJSON = {
    chave: user.chave,
    numeroOF: user.numeroOF,
    numeroOrdemContratacao: user.numeroOrdemContratacao,
    valorOF: user.points,
    entregas: [],
  };

  arrays.forEach((arr) => {
    if (arr.itens.length > 0) {
      newJSON.entregas.push(arr);
    }
  });

  return JSON.stringify(newJSON);
}

function limparArray(array) {
  
  array = array.split("\n");
  const arrayLimpo = array.map((elemento) => elemento.replace(/\n|\t/g, ""));
  const arrayFiltrado = arrayLimpo.filter((elemento) => elemento.trim() !== "");

  return arrayFiltrado.map((item) => {
    return {
      caminho: item,
      descricao: "",
    };
  });

}

processLineByLine();
