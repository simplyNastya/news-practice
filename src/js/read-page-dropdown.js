const dateBtnEls = document.querySelectorAll('.read__date-title')

// Клик на кнопку откривает список
function showAlreadyReadNewsList(e) {
    const currentBtn = e.currentTarget
    const currentWrapper = currentBtn.nextElementSibling
    const currentDropdownDownIcon = currentBtn.querySelector('.read__date-icon-down')
    const currentDropdownUpIcon = currentBtn.querySelector('.read__date-icon-up')

    currentWrapper.classList.toggle('visible-content')
    currentDropdownDownIcon.classList.toggle('invisible-content')
    currentDropdownUpIcon.classList.toggle('visible-content')
}
dateBtnEls.forEach(dateBtnEl => {
  dateBtnEl.addEventListener('click', showAlreadyReadNewsList)
})