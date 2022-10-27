async function processLineByLine() {

  const checkPersonalFiles = require('./config/checkPersonalFiles.js');
  let checkPersonalFilesResult = await checkPersonalFiles.checkPersonalFiles();

  if (checkPersonalFilesResult) {

    //const updateGit = require('./config/updateGit.js');
    //updateGit.updateGitRepository();

    await checkPersonalFiles.checkBashFunctions();
    await checkPersonalFiles.checkNodeModules();

    const userConfig = require('./config/userConfig.json');
    const negotials = require('./modules/negotials.js');
    const pointsList = require('./modules/pointsList.json');
    const system = require('./modules/system.js');
    const fileManager = require('./modules/fileManager.js');
    const shellCommands = require('./modules/shellCommands.js');
    const terminalReport = require('./modules/terminalReport.js');

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

    let SISBBPoints = 0;
    let gitFiles = [];

    let othersFinalQTD = 0;

    let allProjects = await system.execShellCommand(shellCommands.cdAndLs);
    allProjects = allProjects.split("\n");

    let totalQtdBkp = 0;

    for (let i = 0; i < allProjects.length; i++) {

      let projectName = allProjects[i];

      if (projectName != null && projectName != "") {

        projectName = projectName.replace("\r","");

        let commits = await system.execShellCommandCheckFolders(shellCommands.generateGitCommits(projectName));
        commits = commits.split("\n");
        projectName += "/";

        let linesFromInput = [];

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
        let othersQTD = 0;

        let hashCommit = "###########";

        for (let o = 0; o < commits.length; o++) {

          let line = commits[o];

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
                others, othersQTD
              );

              line = obj.line;
              projectName = obj.projectName;
              gitFiles = obj.gitFiles;
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
              others = obj.others;
              othersQTD = obj.othersQTD;

            }

          }

        }

        let totalQtd = createJavaQTD + alterJavaQTD + alterJavaCompQTD + createJavaTestQTD
          + createHTMLQTD + alterHTMLQTD + createJSQTD + alterJSQTD + createXMLQTD
          + createCSSQTD + alterCSSQTD + alterXMLQTD + createShellQTD + alterShellQTD + createSQLQTD;

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
          + (createSQLQTD * createSQLPoints);

        othersFinalQTD += othersQTD;
        totalQtdBkp += totalQtd;
        SISBBPoints += totalSISBB;

      }

    }

    SISBBPoints = negotials.addRitosPoints(SISBBPoints, null, "").SISBBPoints;

    await terminalReport.printEstimateTerminalReport(totalQtdBkp, othersFinalQTD, SISBBPoints, gitFiles);
    await fileManager.updateUserJsonFile(SISBBPoints, gitFiles);

  } else {
    console.log("🚨​ Módulos Json não encontrados ou mal formatados 🚨​​");
  }

}

processLineByLine();
