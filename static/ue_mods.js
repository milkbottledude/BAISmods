const languages_dict = JSON.parse(localStorage.getItem('languages'))
const remaining_crs_span = document.querySelector('#remaining_crs')
for (let lvl of Object.values(languages_dict)) {
    let new_crs = Number(remaining_crs_span.textContent) - 4*lvl
    if (new_crs < 0) {
        remaining_crs_span.classList.add('red')
    }
    remaining_crs_span.textContent = new_crs
} 

const minors = JSON.parse(localStorage.getItem('minors'))
const ID_w_minor = JSON.parse(localStorage.getItem('ID_w_minor'))
const CD_w_minor = JSON.parse(localStorage.getItem('CD_w_minor'))

