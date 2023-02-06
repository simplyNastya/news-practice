import axios from "axios"
import svg from '../images/symbol-defs.svg'
import noImage from '../images/desctop/no-image-available.png'

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

const newsListEl = document.querySelector('.news__list')

const API_KEY = 'B0nM5YVwVGPOQpaqXoXzd3AxL5Kpg75H'
let keyword
let data
let page = 1

// Клик на кнопку Categories откривает список
function showCategoriesList() {
    categoriesDropdownContentWrapperEl.classList.toggle('visible-content')
    categoriesBtnEl.classList.toggle('change-btn-style')
    categoriesArrowDownIconEl.classList.toggle('invisible-content')
    categoriesArrowUpIconEl.classList.toggle('visible-content')
}
categoriesBtnEl.addEventListener('click', showCategoriesList)

// Клик на кнопку Others откривает список
function showOthersList() {
    othersDropdownContentWrapperEl.classList.toggle('visible-content')
    othersBtnEl.classList.toggle('change-btn-style')
    othersArrowDownIconEl.classList.toggle('invisible-content')
    othersArrowUpIconEl.classList.toggle('visible-content')
}
othersBtnEl.addEventListener('click', showOthersList)

// Функция закривает список Categories
function unshowCategoriesList() {
    categoriesDropdownContentWrapperEl.classList.remove('visible-content')
    categoriesBtnEl.classList.remove('change-btn-style')
    categoriesArrowDownIconEl.classList.remove('invisible-content')
    categoriesArrowUpIconEl.classList.remove('visible-content')
}

// Функция закривает список Others
function unshowOthersList() {
    othersDropdownContentWrapperEl.classList.remove('visible-content')
    othersBtnEl.classList.remove('change-btn-style')
    othersArrowDownIconEl.classList.remove('invisible-content')
    othersArrowUpIconEl.classList.remove('visible-content')
}

// Запрос на бекенд для получения категорий
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
    othersDropdownListEl.innerHTML = markupOthers

    const markupCategories = response.data.results.map(({ display_name }) => `<li class="dropdown__content-item">
            <button type="button" class="dropdown__content-btn">${display_name}</button>
          </li>`).join('')
    categoriesDropdownListEl.innerHTML = markupCategories
    
}
getCetegoryList()

// Получаем ключевое слово для запроса
function getFetchValue(e) {
  if (e.target.nodeName !== `BUTTON`) {
    return 
  }
  keyword = e.target.textContent.trim()
  keyword = keyword.toLowerCase()
}
categoriesDropdownListEl.addEventListener('click', getFetchValue)
othersDropdownListEl.addEventListener('click', getFetchValue)


// Делаем функцию для получения результата запроса
async function makeFetch(keyword) {
  const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/nyt/${keyword}.json?page=${page}&sort=newest&api-key=${API_KEY}`)
  console.log(response)
  data = await response.data
  console.log(data)
  return data
}

// Функция для отрисовки разметки по запросу
function createMarkupNewsCards(array) {    
    return array.slice(0, 8).map(item => {
      let imageBase
      let imageCaption
      if (item.multimedia === null) {
        imageBase = `${noImage}`
        imageCaption = 'image'
      } else if (item.multimedia !== null) {
        imageBase = item.multimedia[2].url
        imageCaption = item.multimedia[0].caption
      }
        // if (item.multimedia.length > 0) {
        //     imageBase = item.multimedia[2].url;
        // } else if (item.multimedia.length === 0 || item.multimedia === null) {
        //     imageBase = `${noImage}`
        // }

        let formatDate = item.published_date.slice(0, 10).replace(/-/g, '/')
        let formattedDate = Array.from(formatDate)
        formattedDate = formattedDate[8] + formattedDate[9] + formattedDate[7] + formattedDate[5] + formattedDate[6] + formattedDate[4] + formattedDate[0] + formattedDate[1] + formattedDate[2] + formattedDate[3]

        return `<li class="news__item"">
        <img
          src="${imageBase}"
          alt="${imageCaption}"
          class="news__img"
        />
        <h2 class="news__title">
          ${item.title}
        </h2>
        <h3 class="news__subtitle">
          ${item.abstract}
        </h3>
        <div class="news__date-link-wrapper">
          <p class="news__date">${formattedDate}</p>
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="news__link">Read more</a>
        </div>
        <button type="button" class="news__btn">
          Add to favorite
          <svg class="news__btn-icon">
            <use href="${svg}#icon-heart"></use>
          </svg>
        </button>
        <p class="news__category">${item.section}</p>
      </li>`
    }).join('')
}

// Функция, которая вставляет отрисованую разметку на страницу
function appendMarkup(array) {
    const markup = createMarkupNewsCards(array)
    newsListEl.innerHTML = markup
}

// Делаем запрос на бекенд по ключевому слову, которое получили с категории
function handleFetch() {
  makeFetch(keyword)
  .then(data => {
    if (keyword === '') {
      return
    }
    appendMarkup(data.results)
    page += 1
    unshowCategoriesList()

    unshowOthersList()
  })
  .catch((error) => {
    console.log(error)
  })
}
categoriesDropdownListEl.addEventListener('click', handleFetch)
othersDropdownListEl.addEventListener('click', handleFetch)