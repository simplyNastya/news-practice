import axios from "axios"
import localStorageAPI from './storage'
import svg from '../images/symbol-defs.svg'
import noImage from '../images/desctop/no-image-available.png'
import {unshowCategoriesList, unshowOthersList} from './open-close-categories-news-btn'

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


// const prevBtnEl = document.querySelector('.pagination__prevBtn')
// const nextBtnEl = document.querySelector('.pagination__nextBtn')
// const btn1El = document.getElementById('btn-1')
// const btn2El = document.getElementById('btn-2')
// const btn3El = document.getElementById('btn-3')
// const btn4El = document.getElementById('btn-4')
// const btn5El = document.getElementById('btn-5')
// const btn6El = document.getElementById('btn-6')



const newsListEl = document.querySelector('.news__list')

// const loadMoreBtnEl = document.querySelector('.loadMore')

const API_KEY = 'B0nM5YVwVGPOQpaqXoXzd3AxL5Kpg75H'
let keyword
let data
var numAllArticle
let page = 0


// Получаем ключевое слово для запроса
function getFetchValue(e) {
  if (e.target.nodeName !== `BUTTON`) {
    return 
  }
  keyword = e.target.textContent
  keyword = keyword.includes('%20&%20') ? keyword.replace('%20&%20', '%20').trim().toLowerCase() : keyword.trim().toLowerCase()
  keyword = keyword.includes('&') ? encodeURIComponent(keyword).trim().toLowerCase() : keyword.trim().toLowerCase()

}
filterCategoriesListEl.addEventListener('click', getFetchValue)
categoriesDropdownListEl.addEventListener('click', getFetchValue)
othersDropdownListEl.addEventListener('click', getFetchValue)


// Делаем функцию для получения результата запроса
async function makeFetch(keyword, page) {
  const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/all/${keyword}.json?limit=8&page=${page}&sort=newest&api-key=${API_KEY}`)
  data = await response.data
  console.log(data)
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
        imageCaption = 'no image'
      } else if (item.multimedia !== null) {
        if (item.multimedia.length < 4) {
          imageBase = item.multimedia[0].url
          imageCaption = item.multimedia[0].caption
        } else {
          imageBase = item.multimedia[2].url
          imageCaption = item.multimedia[0].caption
        }
      }
      
      let formatDate = item.published_date.slice(0, 10).replace(/-/g, '/')
      let formattedDate = Array.from(formatDate)
      formattedDate = formattedDate[8] + formattedDate[9] + formattedDate[7] + formattedDate[5] +formattedDate[6] + formattedDate[4] + formattedDate[0] + formattedDate[1] + formattedDate[2] + formattedDate[3]

      return `<li class="news__item " id="${item.uri}">
      <img
        src="${imageBase}"
        alt="${imageCaption}"
        class="news__img "
      />
      <h2 class="news__title ">
        ${item.title}
      </h2>
      <h3 class="news__subtitle ">
        ${item.abstract}
      </h3>
      <div class="news__date-link-wrapper ">
        <p class="news__date ">${formattedDate}</p>
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="news__link ">Read more</a>
        <p class="news__already-read">
          Already read
          <svg class="news__already-read-icon">
            <use href="${svg}#icon-icon-check"></use>
          </svg>
        </p>
      </div>
      <button type="button" class="news__btn ">
          Add to favorite
          </button>
          <svg class="news__btn-icon-add ">
            <use href="${svg}#icon-heart"></use>
          </svg>
          <svg class="news__btn-icon-remove ">
            <use href="${svg}#icon-heart"></use>
          </svg>
      <p class="news__category ">${item.section}</p>
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
  })
  .catch((error) => {
    console.log(error)
  })
}
categoriesDropdownListEl.addEventListener('click', handleFetch)
othersDropdownListEl.addEventListener('click', handleFetch)
filterCategoriesListEl.addEventListener('click', handleFetch)



// nextBtnEl.addEventListener('click', () => {
//   if (numAllArticle < 8) {
//     return
//   }
//   page += 1
//   numAllArticle -= 8
//   console.log(page)
//   console.log(numAllArticle)
//   handleFetch()
// })

// prevBtnEl.addEventListener('click', () => {
//   if (page <= 1) {
//     return
//   }
//   page -= 1
//   numAllArticle += 8
//   console.log(page)
//   console.log(numAllArticle)
// })