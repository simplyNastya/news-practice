import axios from "axios"
import localStorageAPI from './storage'
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

const filterCategoriesListEl = document.querySelector('.filter-tablet__list')
const categoriesDropdownListEl = document.querySelector('.dropdown__content-list')
const othersDropdownListEl = document.querySelector('.dropdown-tablet__content-list')


const prevBtnEl = document.querySelector('.pagination__prevBtn')
const nextBtnEl = document.querySelector('.pagination__nextBtn')
const btn1El = document.getElementById('btn-1')
const btn2El = document.getElementById('btn-2')
const btn3El = document.getElementById('btn-3')
const btn4El = document.getElementById('btn-4')
const btn5El = document.getElementById('btn-5')
const btn6El = document.getElementById('btn-6')



const newsListEl = document.querySelector('.news__list')

// const loadMoreBtnEl = document.querySelector('.loadMore')

const API_KEY = 'B0nM5YVwVGPOQpaqXoXzd3AxL5Kpg75H'
let keyword
let data
var numAllArticle
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
    const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?&api-key=${API_KEY}`)

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
  keyword = e.target.textContent
  keyword = keyword.trim()
  keyword = keyword.split(' ').join('')
  keyword = keyword.toLowerCase()
}
filterCategoriesListEl.addEventListener('click', getFetchValue)
categoriesDropdownListEl.addEventListener('click', getFetchValue)
othersDropdownListEl.addEventListener('click', getFetchValue)


// Делаем функцию для получения результата запроса
async function makeFetch(keyword, page) {
  const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/nyt/${keyword}.json?limit=8&page=${page}&sort=newest&api-key=${API_KEY}`)
  data = await response.data
  numAllArticle = data.num_results
  return data
}

// Функция для отрисовки разметки по запросу
function createMarkupNewsCards(array) {    
  return array.map(item => {
      let imageBase
      let imageCaption
      if (item.multimedia === null) {
        imageBase = `${noImage}`
        imageCaption = 'na image'
      } else if (item.multimedia !== null) {
        imageBase = item.multimedia[2].url
        imageCaption = item.multimedia[0].caption
      }
      
      let formatDate = item.published_date.slice(0, 10).replace(/-/g, '/')
      let formattedDate = Array.from(formatDate)
      formattedDate = formattedDate[8] + formattedDate[9] + formattedDate[7] + formattedDate[5] +formattedDate[6] + formattedDate[4] + formattedDate[0] + formattedDate[1] + formattedDate[2] + formattedDate[3]

      return `<li class="news__item theme-light" id="${item.uri}">
      <img
        src="${imageBase}"
        alt="${imageCaption}"
        class="news__img theme-light"
      />
      <h2 class="news__title theme-light">
        ${item.title}
      </h2>
      <h3 class="news__subtitle theme-light">
        ${item.abstract}
      </h3>
      <div class="news__date-link-wrapper theme-light">
        <p class="news__date theme-light">${formattedDate}</p>
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="news__link theme-light">Read more</a>
        <p class="news__already-read">
          Already read
          <svg class="news__already-read-icon">
            <use href="${svg}#icon-icon-check"></use>
          </svg>
        </p>
      </div>
      <button type="button" class="news__btn theme-light">
          Add to favorite
          </button>
          <svg class="news__btn-icon-add theme-light">
            <use href="${svg}#icon-heart"></use>
          </svg>
          <svg class="news__btn-icon-remove theme-light">
            <use href="${svg}#icon-heart"></use>
          </svg>
      <p class="news__category theme-light">${item.section}</p>
      </li>`
    }).join('')
}

// Функция, которая вставляет отрисованую разметку на страницу
function appendMarkup(array) {
    const markup = createMarkupNewsCards(array)
  newsListEl.innerHTML = markup
  
  array.map(item => {
    const favoriteNews = localStorageAPI.load("favorite-news") || []
    favoriteNews.forEach(news => {
      if (news.uri === item.uri) {
        const newsItem = document.getElementById(news.uri)
        if (newsItem) {
          const favoriteBtn = newsItem.querySelector('.news__btn')
          favoriteBtn.classList.add('fav')
          favoriteBtn.textContent = 'Remove from favorite'
          favoriteBtn.style.width = '168px'
    }
    }
    })
    
    const alreadyReadNews = localStorageAPI.load("already-read-news") || []
        alreadyReadNews.forEach(news => {
      if (news.uri === item.uri) {
        const newsItem = document.getElementById(news.uri)
        if (newsItem) {
          const readLink = newsItem.querySelector('.news__link')
          readLink.classList.add('read')
          newsItem.style.opacity = '0.8'
    }
    }
    })
  })
}

// Делаем запрос на бекенд по ключевому слову, которое получили с категории
function handleFetch() {
  makeFetch(keyword, page)
  .then(data => {
    if (keyword === '') {
      return
    }
    appendMarkup(data.results)
    unshowCategoriesList()

    unshowOthersList()
    console.log(page)
    console.log('hi')
  })
  .catch((error) => {
    console.log(error)
  })
}
categoriesDropdownListEl.addEventListener('click', handleFetch)
othersDropdownListEl.addEventListener('click', handleFetch)
filterCategoriesListEl.addEventListener('click', handleFetch)



nextBtnEl.addEventListener('click', () => {
  if (numAllArticle < 8) {
    return
  }
  page += 1
  numAllArticle -= 8
  console.log(page)
  console.log(numAllArticle)
  handleFetch()
})

prevBtnEl.addEventListener('click', () => {
  if (page <= 1) {
    return
  }
  page -= 1
  numAllArticle += 8
  console.log(page)
  console.log(numAllArticle)
})