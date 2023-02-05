import axios from "axios"

const categoriesBtnEl = document.querySelector('.dropdown__content-admin-btn')
const categoriesDropdownContentWrapperEl = document.querySelector('.dropdown__content-wrapper')
const categoriesArrowDownIconEl = document.querySelector('.dropdown__content-admin-btn-icon-down')
const categoriesArrowUpIconEl = document.querySelector('.dropdown__content-admin-btn-icon-up')

const othersBtnEl = document.querySelector('.dropdown-tablet__content-admin-btn')
const othersDropdownContentWrapperEl = document.querySelector('.dropdown-tablet__content-wrapper')
const othersArrowDownIconEl = document.querySelector('.dropdown-tablet__content-admin-btn-icon-down')
const othersArrowUpIconEl = document.querySelector('.dropdown-tablet__content-admin-btn-icon-up')

const categoriesDropdownListEl = document.querySelector('.dropdown__content-list')
const othersDropdownListEl = document.querySelector('.dropdown-tablet__content-list')

const API_KEY = 'B0nM5YVwVGPOQpaqXoXzd3AxL5Kpg75H'

function showCategoriesList() {
    categoriesDropdownContentWrapperEl.classList.toggle('visible-content')
    categoriesBtnEl.classList.toggle('change-btn-style')
    categoriesArrowDownIconEl.classList.toggle('invisible-content')
    categoriesArrowUpIconEl.classList.toggle('visible-content')
}

categoriesBtnEl.addEventListener('click', showCategoriesList)

function showOthersList() {
    othersDropdownContentWrapperEl.classList.toggle('visible-content')
    othersBtnEl.classList.toggle('change-btn-style')
    othersArrowDownIconEl.classList.toggle('invisible-content')
    othersArrowUpIconEl.classList.toggle('visible-content')
}

othersBtnEl.addEventListener('click', showOthersList)



async function getCetegoryList() {
    const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`)

    const markupOthers = response.data.results.map(({ display_name }, index) => {
         if (index > 5) {
           return `<li class="dropdown-tablet__content-item">
              <button type="button" class="dropdown-tablet__content-btn">
                ${display_name}
              </button>
            </li>`
        }
    }).join('')
    othersDropdownListEl.innerHTML = markupOthers;

    const markupCategories = response.data.results.map(({ display_name }) => `<li class="dropdown__content-item">
            <button type="button" class="dropdown__content-btn">${display_name}</button>
          </li>`).join('')
    categoriesDropdownListEl.innerHTML = markupCategories
    
}
getCetegoryList();