import axios from "axios"
import noImage from '../images/desctop/no-image-available.png'
import svg from '../images/symbol-defs.svg'

const newsListEl = document.querySelector('.news__list')

const API_KEY = 'B0nM5YVwVGPOQpaqXoXzd3AxL5Kpg75H'
let data

async function makeFetch() {
    const response = await axios.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`)
    data = await response.data
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

        return `<li class="news__item" id="${item.id}">
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

function appendMarkup(array) {
    const markup = createMarkupNewsCards(array)
    newsListEl.innerHTML = markup
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