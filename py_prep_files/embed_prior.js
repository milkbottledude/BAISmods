const fs = require('fs').promises
const tf = require('@tensorflow/tfjs');
const fsSync = require('fs')
const use = require('@tensorflow-models/universal-sentence-encoder');

let all_mods_dict;
let USE_model;
let no = 1

async function loadStuff() {
    all_mods_dict = await fs.readFile('../jsons/all_mods.json').then(r => JSON.parse(r))
    USE_model = await use.load()
}

loadStuff().then(async () => {
    for (let [modkey, valDict] of Object.entries(all_mods_dict)) {
        const embedArrTF = await USE_model.embed([valDict['description']])
        const embedArr = await embedArrTF.array()
        embedArrTF.dispose()
        all_mods_dict[modkey]['descEmbed'] = embedArr[0]
        console.log(`embedded ${no}`)
        no++
    }
}).then(_ => {
    all_mods_dict = JSON.stringify(all_mods_dict, null, 2)
    fsSync.writeFileSync("../jsons/all_mods.json2.json", all_mods_dict, "utf8");
})

