let Others3 = JSON.parse(localStorage.getItem('Others3'))
if (!Others3) {
    Others3 = []
}

const searchMod = document.querySelector('#search_mod')
let target_mods;
let all_mods_dict;
let model;

async function loadStuff() {
    target_mods = await fetch('/jsons/target_mods.json').then(r => r.json())
    all_mods_dict = await fetch('/jsons/all_mods.json').then(r => r.json())
    model = await use.load()
}

loadStuff()

// tensorflow's USE instead of BERT (21 - 50)

function cosineSimilarity(a, b) {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0)
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
    return dot/(magA * magB)
}

async function findSimilarSentences(query, sentences) {
    if (!model) {
        alert('Model still loading, please wait...')
        return
    }
    const allTexts = [query, ...sentences]
    const embeddings = await model.embed(allTexts)
    const embeddingsArray = await embeddings.array()
    embeddings.dispose()
    const queryEmbed = embeddingsArray[0]
    const results = []

    // stopped here, it isolates the 1st embed (query) den compares the rest w the query
    for (let i = 1; i < embeddingsArray.length; i++) {
        const sentEmbed = embeddingsArray[i] 
        const similarity = cosineSimilarity(queryEmbed, sentEmbed)
        results.push({ 
            text: sentences[i], 
            similarity: similarity.toFixed(3)
    })
    }

    return results.sort((a, b) => b.similarity - a.similarity)
}

const base_tiles = document.querySelector('.base_tiles')
let chosen_others = []

searchMod.addEventListener('keydown', async function(e) {
    if (e.key === 'Enter') {
        console.log('pressed')
        base_tiles.innerHTML = ''
        const to_show = {}
        const all_descs = {}
        Object.keys(all_mods_dict).forEach(key => {
            if (!JSON.parse(localStorage.getItem('Others')).includes(key) &&
                !JSON.parse(localStorage.getItem('ID_mods2')).includes(key) &&
                !JSON.parse(localStorage.getItem('CD_mods2')).includes(key) &&
                !JSON.parse(localStorage.getItem('pe_mods')).includes(key) &&
                !JSON.parse(localStorage.getItem('core_mods')).includes(key) &&
                !Object.values(JSON.parse(localStorage.getItem('pillar_mods'))).includes(key) &&
                key.slice(0, 2) != 'LA' // new
            ) {
                if (!all_descs[all_mods_dict[key]['description']]) {
                    all_descs[all_mods_dict[key]['description']] = key
                }
                if (key.includes(e.target.value.toUpperCase()) && e.target.value != '') {
                    to_show[key] = all_mods_dict[key]["title"]
                }
            }
        })
        // // has to compare query text with 16619 other descs, too much
        // if (Object.keys(to_show).length === 0 && e.target.value != '') {
        //     const query = e.target.value
        //     let results = await findSimilarSentences(query, Object.keys(all_descs))
        //     results.slice(0, 8).forEach(desc => {
        //         to_show.append(all_descs[desc])
        //     })
        // }
        for (let [code, title] of Object.entries(to_show)) {
            console.log(code)
            console.log(title)
            let add_html;
            if (chosen_others.includes(code)) {
                add_html = `<div class="tile button otherModTile green_bg" id="${code}tile">`
            } else {
                add_html = `<div class="tile button otherModTile" id="${code}tile">`
            }
            add_html += `<div class="otherModCode" id="${code}code">${code}</div>`
            add_html += `<div class="otherModTitle" id="${code}title">${title}</div></div>`
            base_tiles.insertAdjacentHTML('beforeend', add_html);
        }
        if (Object.keys(to_show).length === 0) {
            base_tiles.innerHTML = '<div style="font-size: 160%; color: aliceblue;">No modules found, adjust your search</div>'
        }
    }
});

base_tiles.addEventListener('click', (e) => {
    if (e.target.classList.contains('otherModTile')) {
        let modTile = e.target
        let modCode = modTile.id.slice(0, -4)
        if (modTile.classList.contains('green_bg')) {
            chosen_others = chosen_others.filter(mod => mod != modCode)
        } else {
            chosen_others.push(modCode)
        }
        modTile.classList.toggle('green_bg')
    }
})

const back_to_ue = document.querySelector('.back_button') 

back_to_ue.addEventListener('click', () => {
    let current_others;
    if (JSON.parse(localStorage.getItem('Others2'))) {
        current_others = JSON.parse(localStorage.getItem('Others2')).filter(mod => !Others3.includes(mod))
    } else {
        current_others = JSON.parse(localStorage.getItem('Others')).filter(mod => !Others3.includes(mod))
    }
    current_others.push(...chosen_others)
    localStorage.setItem('Others2', JSON.stringify(current_others))
    localStorage.setItem('Others3', JSON.stringify(chosen_others))
    window.location.href = '/ue_mods'
})