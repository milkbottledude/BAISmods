const language_tiles = document.querySelectorAll('.language_tile')
const notice = document.querySelector('.not_done_notice')
let langs_chosen = {} 

language_tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        const remove_choose = tile.firstElementChild
        if (tile.classList.contains('green_bg')) {
            tile.classList.remove('green_bg')
            const remove_key = tile.textContent.split(' ')[0].trim()
            delete langs_chosen[remove_key]
            remove_choose.style.display = 'none'
        } else {
            if (Object.keys(langs_chosen).length == 2) {
                notice.style.display = 'flex'
                setTimeout(() => {
                    notice.style.display = 'none'
                }, 1900)
            } else {
                tile.classList.add('green_bg')
                const lan_key = tile.textContent.split(' ')[0].trim()
                const lvl_val = document.querySelector(`#${lan_key}_lvl`)
                langs_chosen[lan_key] = lvl_val.value
                remove_choose.style.display = 'flex'
            }
        }
    })
})

// listening for level choosing
const choose_lvls_ = document.querySelectorAll('.lan_lvl')
choose_lvls_.forEach(choose_lvl => {
    choose_lvl.addEventListener('click', (e) => {
        e.stopPropagation()
    })
    choose_lvl.addEventListener('change', () => {
        const lan_id = choose_lvl.id.slice(0, -4)
        langs_chosen[lan_id] = choose_lvl.value
        console.log(langs_chosen)
    })
})

const back = document.querySelector('.back_button')
back.addEventListener('click', () => {
    localStorage.setItem('languages', JSON.stringify(langs_chosen))
    window.location.href = '/ue_mods'
})