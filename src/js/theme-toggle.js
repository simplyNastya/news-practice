const switchLight = document.querySelector('#switch-light')
const switchDark = document.querySelector('#switch-dark')  
const headerInputEl = document.querySelector('.header__search-form-input')
const formEl = document.querySelector('.header__search-form')
const headerBottomBorderEl = document.querySelector('.header__section')
const burgerMenuEl = document.querySelector('.header__burger-menu-icon')
const themeLightTextEl = document.querySelector('.header__theme-text-light')
const themeDarkTextEl = document.querySelector('.header__theme-text-dark')

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function toggleInputTheme() {
    const theme = localStorage.getItem('theme')

    if (theme === 'theme-dark') {
        headerInputEl.classList.add('theme-dark')
        formEl.classList.add('theme-dark')
        headerBottomBorderEl.classList.add('theme-dark')
        burgerMenuEl.classList.add('theme-dark')
        headerInputEl.classList.remove('theme-light')
        formEl.classList.remove('theme-light')
        headerBottomBorderEl.classList.remove('theme-light')
        burgerMenuEl.classList.remove('theme-light')
    } else if (theme === 'theme-light') {
        headerInputEl.classList.add('theme-light')
        formEl.classList.add('theme-light')
        headerBottomBorderEl.classList.add('theme-light')
        burgerMenuEl.classList.add('theme-light')
        headerInputEl.classList.remove('theme-dark')
        formEl.classList.remove('theme-dark')
        headerBottomBorderEl.classList.remove('theme-dark')
        burgerMenuEl.classList.remove('theme-dark')
    }
}

// function to toggle between light and dark theme
function toggleThemeLight() {
    setTheme('theme-light')
    themeDarkTextEl.style.color = "#111321"
    themeLightTextEl.style.color = "#4440F6"
}

function toggleThemeDark() {
    setTheme('theme-dark')
    themeDarkTextEl.style.color = "#4440F6"
    themeLightTextEl.style.color = "#ffffff"
}

switchLight.addEventListener('click', toggleThemeLight)
switchDark.addEventListener('click', toggleThemeDark)
switchLight.addEventListener('click', toggleInputTheme)
switchDark.addEventListener('click', toggleInputTheme)

// Immediately invoked function to set the theme on initial load
function immediateInvoke() {
    const theme = localStorage.getItem('theme')
   if (theme === 'theme-dark') {
       setTheme('theme-dark')
        themeDarkTextEl.style.color = "#4440F6"
        themeLightTextEl.style.color = "#ffffff"
   } else {
       setTheme('theme-light')
        themeDarkTextEl.style.color = "#111321"
        themeLightTextEl.style.color = "#4440F6"
   }
    
   toggleInputTheme()
};

immediateInvoke()

export default {
    setTheme,
    toggleThemeLight,
    toggleThemeDark,
    toggleInputTheme,
    immediateInvoke
};