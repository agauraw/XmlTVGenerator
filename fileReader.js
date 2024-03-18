const fs = require('fs');
// Requiring the module 
const reader = require('xlsx')
const path = require('path');

const { create } = require('xmlbuilder2');
const xmlStr = '<tv generator-info-name="xyz"><channel id="MCIBB.2216"><display-name lang="eng">Pitaara</display-name></channel>';
const doc = create(xmlStr);
/* from the renderer thread */
async function handleFile(e) {
    const filePath = e.target.files[0].path;
    const relativePath = path.relative(__dirname, filePath)
    const file = reader.readFile(relativePath)

    let data = []
    const sheets = file.SheetNames

    const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[0]])
    temp.forEach((res) => {
        doc.root().ele('programme').att('start', res.start + " +0000").att('stop', res.stop + " +0000").att('channel', 'MCIBB.2216')
            .ele('title').txt(res.ProgramTitle).att('lang', 'eng').up()
            .ele('desc').txt(res.ProgramDesc).att('lang', 'eng').up()
            .ele('icon').txt('eng').att('src', res.ProgramIcon).att('width', 1920).att('height', 1080).up()
            .ele('category').txt('G1008').att('lang', 'eng').up()
            .ele('length').txt(res.ProgramDuration).att('units', 'seconds').up()
            .ele('episode-num').txt('MCIBB16395598').att('system', 'assetID').up()
            .ele('rating').ele('value').txt('NA').up()
    })


    // Printing data 
    console.log(data)



    console.log(doc.end({ prettyPrint: true }));


    editor.value = doc.end({ prettyPrint: true });

    const fs = require('fs');
    try { fs.writeFileSync('pitara.xmltv', editor.value, 'utf-8'); }
    catch (e) { alert('Failed to save the file !'); }

    /* DO SOMETHING WITH workbook HERE */
}
document.getElementById("xlf").addEventListener("change", handleFile, false);

