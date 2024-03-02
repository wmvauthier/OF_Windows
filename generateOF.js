const user = require("./user.json");
const userConfig = require("./config/userConfig.json");
const negotials = require("./modules/negotials.js");
const pointsList = require("./modules/pointsList.json");
const fileManager = require("./modules/fileManager.js");
const xlsManager = require("./modules/xlsManager.js");
const termgraph = require("./modules/termgraph.js");
const system = require("./modules/system.js");
const utils = require("./modules/utils.js");
const shellComands = require("./modules/shellCommands.js");
const readline = require("readline");
var Excel = require("exceljs");

// VERIFICAR VARIÁVEIS GLOBAIS
var directoryOF = userConfig.directoryOF;
var yourName = userConfig.yourName;
let baseXLS = userConfig.baseXLS;
let baseSheet = userConfig.baseSheet;
let hermesXLS = userConfig.hermesXLS;
let repeatFiles = userConfig.repeatFiles;

var createJavaPoints = pointsList.points[0].value;
var alterJavaPoints = pointsList.points[1].value;
var alterJavaCompPoints = pointsList.points[2].value;
var createJavaTestPoints = pointsList.points[3].value;
var createHTMLPoints = pointsList.points[4].value;
var alterHTMLPoints = pointsList.points[5].value;
var createJSPoints = pointsList.points[6].value;
var alterJSPoints = pointsList.points[7].value;
var createXMLPoints = pointsList.points[8].value;
var alterXMLPoints = pointsList.points[9].value;
var createCSSPoints = pointsList.points[14].value;
var alterCSSPoints = pointsList.points[15].value;
var createShellPoints = pointsList.points[18].value;
var alterShellPoints = pointsList.points[19].value;
var createSQLPoints = pointsList.points[20].value;
var createPythonPoints = pointsList.points[21].value;
var alterPythonPoints = pointsList.points[22].value;

var createJavaOptions = pointsList.points[0].options;
var alterJavaOptions = pointsList.points[1].options;
var alterJavaCompOptions = pointsList.points[2].options;
var createJavaTestOptions = pointsList.points[3].options;
var createHTMLOptions = pointsList.points[4].options;
var alterHTMLOptions = pointsList.points[5].options;
var createJSOptions = pointsList.points[6].options;
var alterJSOptions = pointsList.points[7].options;
var createXMLOptions = pointsList.points[8].options;
var alterXMLOptions = pointsList.points[9].options;
var createCSSOptions = pointsList.points[14].options;
var alterCSSOptions = pointsList.points[15].options;
var createShellOptions = pointsList.points[18].options;
var alterShellOptions = pointsList.points[19].options;
var createSQLOptions = pointsList.points[20].options;
var createPythonOptions = pointsList.points[21].options;
var alterPythonOptions = pointsList.points[22].options;

var createJavaTXT = pointsList.points[0].name;
var alterJavaTXT = pointsList.points[1].name;
var alterJavaCompTXT = pointsList.points[2].name;
var createJavaTestTXT = pointsList.points[3].name;
var createHTMLTXT = pointsList.points[4].name;
var alterHTMLTXT = pointsList.points[5].name;
var createJSTXT = pointsList.points[6].name;
var alterJSTXT = pointsList.points[7].name;
var createXMLTXT = pointsList.points[8].name;
var alterXMLTXT = pointsList.points[9].name;
var othersTXT = pointsList.points[10].name;
var createCSSTXT = pointsList.points[14].name;
var alterCSSTXT = pointsList.points[15].name;
var createShellTXT = pointsList.points[18].name;
var alterShellTXT = pointsList.points[19].name;
var createSQLTXT = pointsList.points[20].name;
var createPythonTXT = pointsList.points[21].name;
var alterPythonTXT = pointsList.points[22].name;

var createJavaCode = pointsList.points[0].code;
var alterJavaCode = pointsList.points[1].code;
var alterJavaCompCode = pointsList.points[2].code;
var createJavaTestCode = pointsList.points[3].code;
var createHTMLCode = pointsList.points[4].code;
var alterHTMLCode = pointsList.points[5].code;
var createJSCode = pointsList.points[6].code;
var alterJSCode = pointsList.points[7].code;
var createXMLCode = pointsList.points[8].code;
var alterXMLCode = pointsList.points[9].code;
var othersCode = pointsList.points[10].code;
var createCSSCode = pointsList.points[14].code;
var alterCSSCode = pointsList.points[15].code;
var createShellCode = pointsList.points[18].code;
var alterShellCode = pointsList.points[19].code;
var createSQLCode = pointsList.points[20].code;
var createPythonCode = pointsList.points[21].code;
var alterPythonCode = pointsList.points[22].code;

var createJavaComplexity = pointsList.points[0].complexity;
var alterJavaComplexity = pointsList.points[1].complexity;
var alterJavaCompComplexity = pointsList.points[2].complexity;
var createJavaTestComplexity = pointsList.points[3].complexity;
var createHTMLComplexity = pointsList.points[4].complexity;
var alterHTMLComplexity = pointsList.points[5].complexity;
var createJSComplexity = pointsList.points[6].complexity;
var alterJSComplexity = pointsList.points[7].complexity;
var createXMLComplexity = pointsList.points[8].complexity;
var alterXMLComplexity = pointsList.points[9].complexity;
var othersComplexity = pointsList.points[10].complexity;
var createCSSComplexity = pointsList.points[14].complexity;
var alterCSSComplexity = pointsList.points[15].complexity;
var createShellComplexity = pointsList.points[18].complexity;
var alterShellComplexity = pointsList.points[19].complexity;
var createSQLComplexity = pointsList.points[20].complexity;
var createPythonComplexity = pointsList.points[21].complexity;
var alterPythonComplexity = pointsList.points[22].complexity;

var createJavaFinal = "";
var alterJavaFinal = "";
var alterJavaCompFinal = "";
var createJavaTestFinal = "";
var createHTMLFinal = "";
var alterHTMLFinal = "";
var createJSFinal = "";
var alterJSFinal = "";
var createXMLFinal = "";
var alterXMLFinal = "";
var createCSSFinal = "";
var alterCSSFinal = "";
var createShellFinal = "";
var alterShellFinal = "";
var createSQLFinal = "";
var createPythonFinal = "";
var alterPythonFinal = "";
var othersFinal = "";

var createJavaFinalQTD = 0;
var alterJavaFinalQTD = 0;
var alterJavaCompFinalQTD = 0;
var createJavaTestFinalQTD = 0;
var createHTMLFinalQTD = 0;
var alterHTMLFinalQTD = 0;
var createJSFinalQTD = 0;
var alterJSFinalQTD = 0;
var createXMLFinalQTD = 0;
var alterXMLFinalQTD = 0;
var createCSSFinalQTD = 0;
var alterCSSFinalQTD = 0;
var createShellFinalQTD = 0;
var alterShellFinalQTD = 0;
var createSQLFinalQTD = 0;
var createPythonFinalQTD = 0;
var alterPythonFinalQTD = 0;
var othersFinalQTD = 0;

var totalQtdBkp = 0;
var totalSISBBBkp = 0;
var gitFiles = [];

var data = new Date();
var month = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
][data.getMonth()].toUpperCase();
var year = data.getFullYear();

var fullReportFile = "";

async function processLineByLine() {
  let workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(baseXLS);
  let worksheet = workbook.getWorksheet(baseSheet);
  xlsManager.cleanSpreedsheet(worksheet);
  await workbook.xlsx.writeFile(baseXLS);

  let rowCounter = 4;

  var allProjects = await system.execShellCommand(shellComands.cdAndLs);
  allProjects = allProjects.split("\n");

  await system.execShellCommand(`mkdir -p ${month}-${year}`);
  directoryOF = `${directoryOF}/${month}-${year}`;

  for (var i = 0; i < allProjects.length; i++) {
    var projectName = allProjects[i];

    if (projectName != null && projectName != "") {
      await system.execShellCommandCheckFolders(
        shellComands.generateGitCommitsOutput(projectName)
      );

      var fullReportProject = await system.execShellCommandCheckFolders(
        shellComands.getFullReportGit(projectName)
      );

      const fileStream = fileManager.createReadStream("input.txt");

      var output = `${projectName}-${month}-${data.getFullYear()}`;
      projectName += "/";

      var filePath = `${directoryOF}/${output}.txt`;

      var linesFromInput = [];
      var tmpFile = "";

      var createJava = "";
      var alterJava = "";
      var alterJavaComp = "";
      var createJavaTest = "";
      var createHTML = "";
      var alterHTML = "";
      var createJS = "";
      var alterJS = "";
      var createCSS = "";
      var alterCSS = "";
      var createXML = "";
      var alterXML = "";
      var createShell = "";
      var alterShell = "";
      var createSQL = "";
      var createPython = "";
      var alterPython = "";
      var others = "";

      var createJavaQTD = 0;
      var alterJavaQTD = 0;
      var alterJavaCompQTD = 0;
      var createJavaTestQTD = 0;
      var createHTMLQTD = 0;
      var alterHTMLQTD = 0;
      var createJSQTD = 0;
      var alterJSQTD = 0;
      var createCSSQTD = 0;
      var alterCSSQTD = 0;
      var createXMLQTD = 0;
      var alterXMLQTD = 0;
      var createShellQTD = 0;
      var alterShellQTD = 0;
      var createSQLQTD = 0;
      var createPythonQTD = 0;
      var alterPythonQTD = 0;
      var othersQTD = 0;

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      var hashCommit = "###########";

      for await (var line of rl) {
        if (
          line.includes("commit:") &&
          negotials.checkValidLineFromCommit(line)
        )
          hashCommit = line.split("#")[1];

        var condition = true;

        if (repeatFiles == false || repeatFiles == "false")
          condition = !linesFromInput.includes(line);

        if (condition) {
          if (
            !line.includes("commit:") &&
            line != "" &&
            negotials.checkValidLineFromCommit(line)
          ) {
            var obj = negotials.detectFilesCategory(
              line,
              projectName,
              gitFiles,
              linesFromInput,
              hashCommit,
              alterJS,
              alterJSPoints,
              alterJSQTD,
              createJS,
              createJSPoints,
              createJSQTD,
              alterCSS,
              alterCSSPoints,
              alterCSSQTD,
              createCSS,
              createCSSPoints,
              createCSSQTD,
              createJavaTest,
              createJavaTestPoints,
              createJavaTestQTD,
              createJava,
              createJavaPoints,
              createJavaQTD,
              alterJava,
              alterJavaPoints,
              alterJavaQTD,
              alterJavaComp,
              alterJavaCompPoints,
              alterJavaCompQTD,
              alterHTML,
              alterHTMLPoints,
              alterHTMLQTD,
              createHTML,
              createHTMLPoints,
              createHTMLQTD,
              alterXML,
              alterXMLPoints,
              alterXMLQTD,
              createXML,
              createXMLPoints,
              createXMLQTD,
              createShell,
              createShellPoints,
              createShellQTD,
              alterShell,
              alterShellPoints,
              alterShellQTD,
              createSQL,
              createSQLPoints,
              createSQLQTD,
              createPython,
              createPythonPoints,
              createPythonQTD,
              alterPython,
              alterPythonPoints,
              alterPythonQTD,
              others,
              othersQTD
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

      tmpFile =
        projectName +
        " - " +
        user.yourName +
        " - " +
        user.yourKey +
        " - " +
        user.choosenDate +
        " - " +
        user.otherDate +
        "\n\n";

      var tmpResult = fileManager.writeToFiles(
        createJavaQTD,
        createJavaPoints,
        createJavaOptions,
        tmpFile,
        createJava,
        createJavaTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        alterJavaQTD,
        alterJavaPoints,
        alterJavaOptions,
        tmpFile,
        alterJava,
        alterJavaTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        alterJavaCompQTD,
        alterJavaCompPoints,
        alterJavaCompOptions,
        tmpFile,
        alterJavaComp,
        alterJavaCompTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        createJavaTestQTD,
        createJavaTestPoints,
        createJavaTestOptions,
        tmpFile,
        createJavaTest,
        createJavaTestTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        createHTMLQTD,
        createHTMLPoints,
        createHTMLOptions,
        tmpFile,
        createHTML,
        createHTMLTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        alterHTMLQTD,
        alterHTMLPoints,
        alterHTMLOptions,
        tmpFile,
        alterHTML,
        alterHTMLTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        createJSQTD,
        createJSPoints,
        createJSOptions,
        tmpFile,
        createJS,
        createJSTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        alterJSQTD,
        alterJSPoints,
        alterJSOptions,
        tmpFile,
        alterJS,
        alterJSTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        createXMLQTD,
        createXMLPoints,
        createXMLOptions,
        tmpFile,
        createXML,
        createXMLTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        alterXMLQTD,
        alterXMLPoints,
        alterXMLOptions,
        tmpFile,
        alterXML,
        alterXMLTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        createCSSQTD,
        createCSSPoints,
        createCSSOptions,
        tmpFile,
        createCSS,
        createCSSTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        alterCSSQTD,
        alterCSSPoints,
        alterCSSOptions,
        tmpFile,
        alterCSS,
        alterCSSTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        createShellQTD,
        createShellPoints,
        createShellOptions,
        tmpFile,
        createShell,
        createShellTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        alterShellQTD,
        alterShellPoints,
        alterShellOptions,
        tmpFile,
        alterShell,
        alterShellTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        createSQLQTD,
        createSQLPoints,
        createShellOptions,
        tmpFile,
        createSQL,
        createSQLTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        createPythonQTD,
        createPythonPoints,
        createPythonOptions,
        tmpFile,
        createPython,
        createPythonTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;
      tmpResult = fileManager.writeToFiles(
        alterPythonQTD,
        alterPythonPoints,
        alterPythonOptions,
        tmpFile,
        alterPython,
        alterPythonTXT,
        worksheet,
        rowCounter
      );
      tmpFile = tmpResult.tmpFile;
      rowCounter = tmpResult.rowCounter;

      if (othersQTD > 0) tmpFile += `${othersTXT}\n ${others}\n`;

      var totalQtd =
        createJavaQTD +
        alterJavaQTD +
        alterJavaCompQTD +
        createJavaTestQTD +
        createHTMLQTD +
        alterHTMLQTD +
        createJSQTD +
        alterJSQTD +
        createXMLQTD +
        createCSSQTD +
        alterCSSQTD +
        alterXMLQTD +
        createShellQTD +
        alterShellQTD +
        createSQLQTD +
        createPythonQTD +
        alterPythonQTD;

      var totalSISBB =
        createJavaQTD * createJavaPoints +
        alterJavaQTD * alterJavaPoints +
        alterJavaCompQTD * alterJavaCompPoints +
        createJavaTestQTD * createJavaTestPoints +
        createHTMLQTD * createHTMLPoints +
        alterHTMLQTD * alterHTMLPoints +
        createJSQTD * createJSPoints +
        alterJSQTD * alterJSPoints +
        createCSSQTD * createCSSPoints +
        alterCSSQTD * alterCSSPoints +
        alterXMLQTD * alterXMLPoints +
        createShellQTD * createShellPoints +
        alterShellQTD * alterShellPoints +
        createSQLQTD * createSQLPoints +
        createPythonQTD * createPythonPoints +
        alterPythonQTD * alterPythonPoints;

      totalQtdBkp += totalQtd;
      totalSISBBBkp += totalSISBB;

      tmpFile += `Total Geral: ${totalQtd} arquivos\n`;
      tmpFile += `Pontuação Geral: ${totalSISBB} SISBB\n\n`;

      if (totalQtd > 0) {
        fileManager.writeFile(filePath, tmpFile);

        var projectTitle = `${projectName} `;

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

      await system.execShellCommand('find . -name "input.txt" -type f -delete');
    }
  }

  let newJSON = montarJSONNovo();
  await system.execShellCommand(
    `echo '${newJSON}' > ${directoryOF}/of-${user.numeroOF}.json`
  );

  var output = `${yourName}-${month}-${data.getFullYear()}`;
  var filePath = `${directoryOF}/${output}.txt`;

  fileManager.writeFile(filePath, fullReportFile);

  var tmpResult = xlsManager.writeToXLS(
    createJavaFinalQTD,
    createJavaOptions,
    createJavaFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    alterJavaFinalQTD,
    alterJavaOptions,
    alterJavaFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    alterJavaCompFinalQTD,
    alterJavaCompOptions,
    alterJavaCompFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    createJavaTestFinalQTD,
    createJavaTestOptions,
    createJavaTestFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    createHTMLFinalQTD,
    createHTMLOptions,
    createHTMLFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    alterHTMLFinalQTD,
    alterHTMLOptions,
    alterHTMLFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    createJSFinalQTD,
    createJSOptions,
    createJSFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    alterJSFinalQTD,
    alterJSOptions,
    alterJSFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    createXMLFinalQTD,
    createXMLOptions,
    createXMLFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    alterXMLFinalQTD,
    alterXMLOptions,
    alterXMLFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    createCSSFinalQTD,
    createCSSOptions,
    createCSSFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    alterCSSFinalQTD,
    alterCSSOptions,
    alterCSSFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    createShellFinalQTD,
    createShellOptions,
    createShellFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    alterShellFinalQTD,
    alterShellOptions,
    alterShellFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    createSQLFinalQTD,
    createSQLOptions,
    createSQLFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    createPythonFinalQTD,
    createPythonOptions,
    createPythonFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;
  tmpResult = xlsManager.writeToXLS(
    alterPythonFinalQTD,
    alterPythonOptions,
    alterPythonFinal,
    worksheet,
    rowCounter
  );
  rowCounter = tmpResult.rowCounter;

  var addRitoPointsJson = negotials.addRitosPoints(
    totalSISBBBkp,
    rowCounter,
    worksheet
  );

  totalSISBBBkp = addRitoPointsJson.SISBBPoints;
  rowCounter = addRitoPointsJson.rowCounter;
  worksheet = addRitoPointsJson.worksheet;

  workbook.xlsx.writeFile(`${directoryOF}/${hermesXLS}`);
  //await system.execShellCommand(`find . -name "${hermesXLS}" -type f -delete`);
  await updateCalDatFile();
}

async function updateCalDatFile() {
  await system.execShellCommand("echo > cal.dat");

  var arrTermOptions = [
    { name: createJavaTXT, qtd: createJavaFinalQTD * createJavaPoints },
    { name: alterJavaTXT, qtd: alterJavaFinalQTD * alterJavaPoints },
    {
      name: alterJavaCompTXT,
      qtd: alterJavaCompFinalQTD * alterJavaCompPoints,
    },
    {
      name: createJavaTestTXT,
      qtd: createJavaTestFinalQTD * createJavaTestPoints,
    },
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
    { name: alterPythonTXT, qtd: alterPythonFinalQTD * alterPythonPoints },
  ];

  var ritosPoints =
    (pointsList.points[11].value +
      pointsList.points[12].value +
      pointsList.points[13].value) *
    utils.checkValidArrayLength(user.tasks);

  var operationPoints =
    pointsList.points[16].value * utils.checkValidArrayLength(user.operations);
  var repositoryPoints =
    pointsList.points[17].value *
    utils.checkValidArrayLength(user.repositories);

  arrTermOptions.push({
    name: "PARTICIPAÇÕES_EM_RITOS",
    qtd: ritosPoints,
  });

  arrTermOptions.push({
    name: "CRIAÇÃO_DE_OPERAÇÃO",
    qtd: operationPoints,
  });

  arrTermOptions.push({
    name: "CRIAÇÃO_DE_REPOSITÓRIO",
    qtd: repositoryPoints,
  });

  var calDatFile = termgraph.generateCalDatFile(arrTermOptions);

  var filePath = `${userConfig.directoryOF}/cal.dat`;

  fileManager.writeFile(filePath, calDatFile);

  console.log("");
  console.log(
    await system.execShellCommand(
      "echo -n 📊​ $(tput bold)RELATÓRIO DE OF$(tput sgr0)"
    )
  );
  console.log("");

  if (othersFinalQTD > 0) {
    console.log(
      await system.execShellCommand(
        `echo -n 📦 $(tput bold)Arquivos detectados:$(tput sgr0) ${totalQtdBkp} + '\x1b[33m'${othersFinalQTD}'\x1b[0m' arquivos`
      )
    );
  } else {
    console.log(
      await system.execShellCommand(
        `echo -n 📦 $(tput bold)Arquivos detectados:$(tput sgr0) ${totalQtdBkp} arquivos`
      )
    );
  }

  gitFiles.forEach((file) => {
    var fileArray = file.split("(");
    fileArray[1] = fileArray[1].replace(")", "");
    console.log(
      `\t📬 ${fileArray[0]}` + "(" + "\x1b[32m",
      "" + fileArray[1] + "",
      "\x1b[0m" + ") "
    );
  });

  if (othersFinalQTD > 0) {
    var arr = othersFinal.split("\n");
    arr.forEach((file) => {
      if (file != "") console.log(`\t📬` + "\x1b[33m" + ` ${file}` + "\x1b[0m");
    });
  }

  //console.log(await system.execShellCommand('termgraph cal.dat'));

  console.log("");
  console.log(
    await system.execShellCommand(
      `echo -n 🎯 $(tput bold)Pontuação:$(tput sgr0) ${totalSISBBBkp}pts`
    )
  );
  console.log("");

  await system.execShellCommand('find . -name "cal.dat" -type f -delete');
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
