const mobileMenuOpenBtn = document.querySelector('.header__burger-menu-btn')
const mobileMenuCloseBtn = document.querySelector('.mobile-menu__close-btn')
const mobileMenuContainerEl = document.querySelector('.mobile-menu__container')

function openMobileMenu() {
    mobileMenuContainerEl.classList.remove('invisible')
}

mobileMenuOpenBtn.addEventListener('click', openMobileMenu)

function closeMobileMenu() {
    mobileMenuContainerEl.classList.add('invisible')
}

mobileMenuCloseBtn.addEventListener('click', closeMobileMenu)