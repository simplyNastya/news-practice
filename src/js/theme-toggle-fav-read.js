const switchLight = document.querySelector('#switch-light')
const switchDark = document.querySelector('#switch-dark')  
const mobileSwitchLight = document.querySelector('#mobile-switch-light')
const mobileSwitchDark = document.querySelector('#mobile-switch-dark')
const headerBottomBorderEl = document.querySelector('.header__section')
const burgerMenuEl = document.querySelector('.header__burger-menu-icon')
const themeLightTextEl = document.querySelector('.header__theme-text-light')
const themeDarkTextEl = document.querySelector('.header__theme-text-dark')
const themeSunEl = document.querySelector('.header__theme-sun-icon')
const themeMoonEl = document.querySelector('.header__theme-moon-icon')
const mobileThemeSunEl = document.querySelector('.mobile-menu__theme-sun-icon')
const mobileThemeMoonEl = document.querySelector('.mobile-menu__theme-moon-icon')
const mobileMenuContainerEl = document.querySelector('.mobile-menu__container')
const toggleContainerEl = document.querySelector('.toggle-container')
const mobileToggleContainerEl = document.querySelector('.mobile-menu__toggle-container')

const markupToggleLight = `<svg
        class="header__toggle-icon-light"
        width="40"
        height="20"
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.30235"
          y="0.30235"
          width="39.3953"
          height="19.3953"
          rx="9.69765"
          fill="white"
        />
        <circle cx="9" cy="10" r="8" fill="#4B48DB" />
        <rect
          x="0.30235"
          y="0.30235"
          width="39.3953"
          height="19.3953"
          rx="9.69765"
          stroke="#4B48DB"
          stroke-width="0.604701"
        />
      </svg>`

const markupToggleDark = `<svg
        class="header__toggle-icon-dark"
        width="40"
        height="20"
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.30235"
          y="0.30235"
          width="39.3953"
          height="19.3953"
          rx="9.69765"
          fill="#4B48DB"
        />
        <circle cx="31" cy="10" r="8" fill="white" />
        <rect
          x="0.30235"
          y="0.30235"
          width="39.3953"
          height="19.3953"
          rx="9.69765"
          stroke="white"
          stroke-width="0.604701"
        />
      </svg>`

const markupMobileToggleLight = `<svg
        class="mobile-menu__toggle-icon-light"
        width="40"
        height="20"
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.30235"
          y="0.30235"
          width="39.3953"
          height="19.3953"
          rx="9.69765"
          fill="white"
        />
        <circle cx="9" cy="10" r="8" fill="#4B48DB" />
        <rect
          x="0.30235"
          y="0.30235"
          width="39.3953"
          height="19.3953"
          rx="9.69765"
          stroke="#4B48DB"
          stroke-width="0.604701"
        />
      </svg>`

const markupMobileToggleDark = `<svg
        class="mobile-menu__toggle-icon-dark"
        width="40"
        height="20"
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.30235"
          y="0.30235"
          width="39.3953"
          height="19.3953"
          rx="9.69765"
          fill="#4B48DB"
        />
        <circle cx="31" cy="10" r="8" fill="white" />
        <rect
          x="0.30235"
          y="0.30235"
          width="39.3953"
          height="19.3953"
          rx="9.69765"
          stroke="white"
          stroke-width="0.604701"
        />
      </svg>`

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleThemeLight() {
    setTheme('theme-light')
    themeDarkTextEl.style.color = "#111321"
    themeLightTextEl.style.color = "#4440F6"
    themeMoonEl.style.stroke = "#5F6775"
    themeSunEl.style.stroke = "#4440F6"
    mobileThemeMoonEl.style.stroke = "#5F6775"
    mobileThemeSunEl.style.stroke = "#4440F6"
    toggleContainerEl.innerHTML = markupToggleLight
    mobileToggleContainerEl.innerHTML = markupMobileToggleLight
}

function toggleThemeDark() {
    setTheme('theme-dark')
    themeDarkTextEl.style.color = "#4440F6"
    themeLightTextEl.style.color = "#5F6775"
    themeMoonEl.style.stroke = "#4440F6"
    themeSunEl.style.stroke = "#5F6775"
    mobileThemeMoonEl.style.stroke = "#4440F6"
    mobileThemeSunEl.style.stroke = "#5F6775"
    toggleContainerEl.innerHTML = markupToggleDark
    mobileToggleContainerEl.innerHTML = markupMobileToggleDark
}

function toggleElementsColor() {
    const theme = localStorage.getItem('theme')

    if (theme === 'theme-dark') {
        headerBottomBorderEl.classList.add('theme-dark')
        burgerMenuEl.classList.add('theme-dark')
        mobileMenuContainerEl.classList.add('theme-dark')
        headerBottomBorderEl.classList.remove('theme-light')
        burgerMenuEl.classList.remove('theme-light')
        mobileMenuContainerEl.classList.remove('theme-light')
    } else if (theme === 'theme-light') {
        headerBottomBorderEl.classList.add('theme-light')
        burgerMenuEl.classList.add('theme-light')
        mobileMenuContainerEl.classList.add('theme-light')
        headerBottomBorderEl.classList.remove('theme-dark')
        burgerMenuEl.classList.remove('theme-dark')
        mobileMenuContainerEl.classList.remove('theme-dark')
    }
}

switchLight.addEventListener('click', toggleThemeLight)
switchDark.addEventListener('click', toggleThemeDark)
mobileSwitchLight.addEventListener('click', toggleThemeLight)
mobileSwitchDark.addEventListener('click', toggleThemeDark)
switchLight.addEventListener('click', toggleElementsColor)
switchDark.addEventListener('click', toggleElementsColor)
mobileSwitchLight.addEventListener('click', toggleElementsColor)
mobileSwitchDark.addEventListener('click', toggleElementsColor)

// Immediately invoked function to set the theme on initial load
function immediateInvoke() {
    const theme = localStorage.getItem('theme')
   if (theme === 'theme-dark') {
       setTheme('theme-dark')
        themeDarkTextEl.style.color = "#4440F6"
        themeLightTextEl.style.color = "#5F6775"
        themeMoonEl.style.stroke = "#4440F6"
        themeSunEl.style.stroke = "#5F6775"
        mobileThemeMoonEl.style.stroke = "#4440F6"
        mobileThemeSunEl.style.stroke = "#5F6775"
        toggleContainerEl.innerHTML = markupToggleDark
        mobileToggleContainerEl.innerHTML = markupMobileToggleDark
   } else {
        setTheme('theme-light')
        themeDarkTextEl.style.color = "#111321"
        themeLightTextEl.style.color = "#4440F6"
        themeMoonEl.style.stroke = "#5F6775"
        themeSunEl.style.stroke = "#4440F6"
        mobileThemeMoonEl.style.stroke = "#5F6775"
        mobileThemeSunEl.style.stroke = "#4440F6"
        toggleContainerEl.innerHTML = markupToggleLight
        mobileToggleContainerEl.innerHTML = markupMobileToggleLight
   }
    
   toggleElementsColor()
};

immediateInvoke()

export default {
    setTheme,
    toggleThemeLight,
    toggleThemeDark,
    toggleElementsColor,
    immediateInvoke
};