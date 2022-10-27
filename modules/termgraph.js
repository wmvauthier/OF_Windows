module.exports.generateCalDatFile = (arrTermOptionsTemp) => {

    let arrCalDat = [];
    let arrTermOptions = [];

    while (arrTermOptionsTemp.length > 0) {

        let maxValue = 0;
        let maxIndex = 0;

        for (let i = 0; i < arrTermOptionsTemp.length; i++) {

            const element = arrTermOptionsTemp[i];

            if (element.qtd > maxValue) {
                maxValue = element.qtd;
                maxIndex = i;
            }

        }

        arrTermOptions.push(arrTermOptionsTemp[maxIndex]);
        arrTermOptionsTemp = arrTermOptionsTemp.filter(function (geeks) {
            return geeks != arrTermOptionsTemp[maxIndex];
        });

    }

    arrTermOptions.forEach(element => {
        if (element.qtd > 0)
            arrCalDat.push({ "name": element.name.replace("\n", ""), "qtd": element.qtd + "\n" });
    })

    let calDatFile = ``;

    arrCalDat.forEach(element => {
        calDatFile += element.name + " " + element.qtd;
    })

    return calDatFile;

}