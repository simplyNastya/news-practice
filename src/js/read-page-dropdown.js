const dateBtnEl = document.querySelector('.read__dropdown-content-admin-btn')
const dropdownContentWrapperEl = document.querySelector('.read__dropdown-content-wrapper')
const dropdownrrowDownIconEl = document.querySelector('.read__btn-icon-down')
const dropdownArrowUpIconEl = document.querySelector('.read__btn-icon-up')

// Клик на кнопку откривает список
function showAlreadyReadNewsList() {
    dropdownContentWrapperEl.classList.toggle('visible-content')
    dateBtnEl.classList.toggle('change-btn-style')
    dropdownrrowDownIconEl.classList.toggle('invisible-content')
    dropdownArrowUpIconEl.classList.toggle('visible-content')
}
dateBtnEl.addEventListener('click', showAlreadyReadNewsList)