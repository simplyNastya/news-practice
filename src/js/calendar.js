import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css";
import axios from "axios"
import imgOps from '../images/desctop/news-main-img.png'
import noImage from '../images/desctop/no-image-available.png'
import svg from '../images/symbol-defs.svg'

const calendarInputEl = document.querySelector('.calender__input')
const filterCategoriesListEl = document.querySelector('.filter-tablet__list')
const categoriesDropdownListEl = document.querySelector('.dropdown__content-list')
const othersDropdownListEl = document.querySelector('.dropdown-tablet__content-list')
const newsListEl = document.querySelector('.news__list')
const newsContainer = document.querySelector('.news__container')

const API_KEY = 'B0nM5YVwVGPOQpaqXoXzd3AxL5Kpg75H'
let categoryKeyword

const options = {
    altFormat: 'd/m/Y',
    ariaDateFormat: 'd/m/Y',
    dateFormat: 'd/m/Y',
    maxDate: new Date(),
    defaultDate: new Date(),
    shorthand: true,
    locale: {
        firstDayOfWeek: 1,
  },

    onChange(selectedDates) {
        let ourDate = new Date(selectedDates)
        ourDate = ourDate.toLocaleString().split(',')[0]
        ourDate = ourDate.replace(/\//g, '-')
        let ourDateArr = Array.from(ourDate)
        ourDateArr = ourDateArr[6] + ourDateArr[7] + ourDateArr[8] + ourDateArr[9] + ourDateArr[5] + ourDateArr[3] + ourDateArr[4] + ourDateArr[2] + ourDateArr[0] + ourDateArr[1]

        return makeFetchDateAndCategory(ourDateArr, categoryKeyword)
            .then(data => {
                if (data.response.docs.length === 0) {
                    return createMarkupIfNoResultsByFetch()
                }
                appendMarkup(data.response.docs)
            })
            .catch(error => console.log(error))
    }
}
flatpickr(calendarInputEl, options)

function getFetchValue(e) {
  if (e.target.nodeName !== `BUTTON`) {
    return 
  }
  categoryKeyword = e.target.textContent.trim()
}
filterCategoriesListEl.addEventListener('click', getFetchValue)
categoriesDropdownListEl.addEventListener('click', getFetchValue)
othersDropdownListEl.addEventListener('click', getFetchValue)

async function makeFetchDateAndCategory(selectedDate, categoryKeyword) {
    const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${categoryKeyword}&fq=pub_date:(${selectedDate}) AND section_name:(${categoryKeyword})&api-key=${API_KEY}`)
    console.log(response)
    const data = await response.data
    console.log(data)
    return data
}

function createMarkupByDateAndCategory(array) {    
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

        return `<li class="news__item theme-light" id="${item.uri}">
        <img
          src="${imageBase}"
          alt="${item.section_name}"
          class="news__img theme-light"
        />
        <h2 class="news__title theme-light">
          ${item.headline.main}
        </h2>
        <h3 class="news__subtitle theme-light">
          ${item.snippet}
        </h3>
        <div class="news__date-link-wrapper theme-light">
          <p class="news__date theme-light">${formattedDate}</p>
          <a href="${item.web_url}" target="_blank" rel="noopener noreferrer" class="news__link theme-light">Read more</a>
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
        <p class="news__category theme-light">${item.section_name}</p>
      </li>`
    }).join('')
}

function appendMarkup(array) {
    const markup = createMarkupByDateAndCategory(array)
    newsListEl.innerHTML = markup
}

function createMarkupIfNoResultsByFetch() {
    const markup = `<h2 class="news__title-if-empty theme-light">We haven’t found news from this category that day</h2><img src="${imgOps}" alt="Ooooops" class="news__img-if-empty theme-light"/>`
    newsContainer.innerHTML = markup;
}