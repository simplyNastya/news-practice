import axios from "axios"
import noImage from '../images/desctop/no-image-available.png'
import svg from '../images/symbol-defs.svg'
import localStorageAPI from './storage'

const newsListEl = document.querySelector('.news__list')

const API_KEY = 'B0nM5YVwVGPOQpaqXoXzd3AxL5Kpg75H'
let data
let page = 0

async function makeFetch() {
  const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`)
  data = await response.data
  // console.log(data)
}

function createMarkupNewsCards(array) {    
  return array.slice(0, 8).map(item => {
    let imageBase
    let imageCaption

        if (item.media.length > 0) {
            imageBase = item.media[0]['media-metadata'][2].url
            imageCaption = item.media[0].caption
        } else if (item.media.length === 0) {
            imageBase = `${noImage}`
            imageCaption = 'no image'
        }

        let formatDate = item.published_date.replace(/-/g, '/')
        let formattedDate = Array.from(formatDate)
        formattedDate = formattedDate[8] + formattedDate[9] + formattedDate[7] + formattedDate[5] + formattedDate[6] + formattedDate[4] + formattedDate[0] + formattedDate[1] + formattedDate[2] + formattedDate[3]

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

function handleFetch() {
    makeFetch()
        .then(() => {
          appendMarkup(data.results)
        })
        .catch(error => {
        console.log(error)
        })
}
handleFetch()