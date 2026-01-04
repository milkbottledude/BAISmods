const DigBiz_button = document.querySelector('#dropButDigBiz')
const DigBiz_list = document.querySelector('#dropDigBiz')

DigBiz_button.addEventListener('click', function() {
    if (DigBiz_list.style.display === 'flex') {
        DigBiz_list.style.display = 'none'
    } else {
        DigBiz_list.style.display = 'flex'
    }
})

const FinTec_button = document.querySelector('#dropButFinTec')
const FinTec_list = document.querySelector('#dropFinTec')

FinTec_button.addEventListener('click', function() {
    if (FinTec_list.style.display === 'flex') {
        FinTec_list.style.display = 'none'
    } else {
        FinTec_list.style.display = 'flex'
    }
})

const ITSol_button = document.querySelector('#dropButITSol')
const ITSol_list = document.querySelector('#dropITSol')

ITSol_button.addEventListener('click', function() {
    if (ITSol_list.style.display === 'flex') {
        ITSol_list.style.display = 'none'
    } else {
        ITSol_list.style.display = 'flex'
    }
})

const AISol_button = document.querySelector('#dropButAISol')
const AISol_list = document.querySelector('#dropAISol')

AISol_button.addEventListener('click', function() {
    if (AISol_list.style.display === 'flex') {
        AISol_list.style.display = 'none'
    } else {
        AISol_list.style.display = 'flex'
    }
})

const ITBiz_button = document.querySelector('#dropButITBiz')
const ITBiz_list = document.querySelector('#dropITBiz')

ITBiz_button.addEventListener('click', function() {
    if (ITBiz_list.style.display === 'flex') {
        ITBiz_list.style.display = 'none'
    } else {
        ITBiz_list.style.display = 'flex'
    }
})

const ITSec_button = document.querySelector('#dropButITSec')
const ITSec_list = document.querySelector('#dropITSec')

ITSec_button.addEventListener('click', function() {
    if (ITSec_list.style.display === 'flex') {
        ITSec_list.style.display = 'none'
    } else {
        ITSec_list.style.display = 'flex'
    }
})

// showing pre-reqs left when clicking the button
const pr_window = document.querySelector('.pr_window')
const open_prs = document.querySelectorAll('.pre_reqs')

open_prs.forEach(open_pr => {
    open_pr.addEventListener('click', () => {
        pr_window.style.display = 'flex'
    })      
})

const got_it = document.querySelector('.got_it')

got_it.addEventListener('click', () => {
    pr_window.style.display = 'none'
})