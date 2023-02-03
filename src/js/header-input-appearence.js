const formEl = document.querySelector('.header__search-form')
const inputEl = document.querySelector('.header__search-form-input')
const btnEl = document.querySelector('.header__search-form-btn')

function hendleInput() {
    formEl.style.cssText = 'position: relative;'
    inputEl.classList.toggle('visible')
    btnEl.classList.toggle('btn-transform')
}

btnEl.addEventListener('click', hendleInput)
