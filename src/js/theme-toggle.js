const switchLight = document.querySelector('#switch-light')
const switchDark = document.querySelector('#switch-dark')  

console.log(switchLight)
console.log(switchDark)

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleThemeLight() {
   if (localStorage.getItem('theme') === 'theme-dark'){
       setTheme('theme-light');
   } else {
       return
   }
}

function toggleThemeDark() {
   if (localStorage.getItem('theme') === 'theme-light'){
       setTheme('theme-dark');
   } else {
       return
   }
}

switchLight.addEventListener('click', toggleThemeLight)
switchDark.addEventListener('click', toggleThemeDark)

// Immediately invoked function to set the theme on initial load
function immediateInvoke() {
   if (localStorage.getItem('theme') === 'theme-dark') {
       setTheme('theme-dark');
   } else {
       setTheme('theme-light');
   }
};

immediateInvoke()

export default {
    setTheme,
    toggleThemeLight,
    toggleThemeDark,
    immediateInvoke
};