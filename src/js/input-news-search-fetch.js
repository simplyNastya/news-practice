import axios from "axios"
import svg from '../images/symbol-defs.svg'
import imgOps from '../images/desctop/news-main-img.png'
import noImage from '../images/desctop/no-image-available.png'

const formInputEl = document.querySelector('.header__search-form')
const newsListEl = document.querySelector('.news__list')
const containerNewsEl = document.querySelector('.news__container')
// const containerWeather = document.querySelector('.news__item-weather-tablet')

const API_KEY = 'B0nM5YVwVGPOQpaqXoXzd3AxL5Kpg75H'

let keyword
let page = 1;

async function makeFetch(keyword) {
    const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&page=${page}&sort=newest&api-key=${API_KEY}`)
    const data = await response.data

    if (data.response.docs.length === 0) {
        return createMarkupIfEmpty()
    }
    return data
}

function createMarkupNewsCards(array) {    
    return array.slice(0, 8).map(item => {
        let imageStart
        let imageBase
        if (item.multimedia.length > 0) {
            imageStart = 'https://static01.nyt.com/'
            imageBase = imageStart + item.multimedia[0].url;
        } else if (item.multimedia.length === 0) {
            imageBase = `${noImage}`
        }

        let formatDate = item.pub_date.slice(0, 10).replace(/-/g, '/')
        let formattedDate = Array.from(formatDate)
        formattedDate = formattedDate[8] + formattedDate[9] + formattedDate[7] + formattedDate[5] + formattedDate[6] + formattedDate[4] + formattedDate[0] + formattedDate[1] + formattedDate[2] + formattedDate[3]

        return `<li class="news__item" id="${item._id}">
        <img
          src="${imageBase}"
          alt="${item.section_name}"
          class="news__img"
        />
        <h2 class="news__title">
          ${item.headline.main}
        </h2>
        <h3 class="news__subtitle">
          ${item.snippet}
        </h3>
        <div class="news__date-link-wrapper">
          <p class="news__date">${formattedDate}</p>
          <a href="${item.web_url}" target="_blank" rel="noopener noreferrer" class="news__link">Read more</a>
        </div>
        <button type="button" class="news__btn">
          Add to favorite
          <svg class="news__btn-icon">
            <use href="${svg}#icon-heart"></use>
          </svg>
        </button>
        <p class="news__category">${item.section_name}</p>
      </li>`
    }).join('')
}


// function createMarkupWeather() {
//     return '<div class="weather__container-markup"></div>'
// }

function appendMarkup(array) {
    const markup = createMarkupNewsCards(array)
    newsListEl.innerHTML = markup
    // containerWeather.insertAdjacentHTML('afterend', createMarkupWeather())
}

function createMarkupIfEmpty() {
    const markup = `<h2 class="news__title-if-empty">We haven’t found news from this category</h2><img src="${imgOps}" alt="Ooooops" class="news__img-if-empty"/>`
    containerNewsEl.innerHTML = markup;
}

function handleSearchQuery(e) {
    e.preventDefault()

    keyword = e.currentTarget.elements.searchQuery.value

    makeFetch(keyword)
        .then(data => {
            if (keyword === '') {
                return
            }
            appendMarkup(data.response.docs)
            page += 1;
        })
        .catch((error) => {
            console.log(error)
        })
}

formInputEl.addEventListener('submit', handleSearchQuery)