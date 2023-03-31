import imgOps from '../images/desctop/news-main-img.png'
import svg from '../images/symbol-defs.svg'
import localStorageAPI from './storage'

const favoriteListEl = document.querySelector(".favorite__list")
const favoriteNewsArray = localStorageAPI.load("favorite-news")
const favoriteNewsTitle = document.querySelector(".favorite__section-title")

console.log(favoriteNewsArray)

function createMarkupFavoriteNews() {

  if (!favoriteNewsArray || !favoriteNewsArray.length) {
    return (favoriteNewsTitle.innerHTML = `<div class="favorite__noItem-wrapper"><h2 class="favorite__noItem-title">This page is empty yet</h2><img src="${imgOps}" alt="Ooooops" class="favorite__noItem-img"/></div>`)

  }

      return favoriteNewsArray.map(({uri, src, alt, title, subtitle, date, href, category}) => {
            return `<li id="${uri}" class="favorite__item theme-light">
      <img
        src="${src}"
        alt="${alt}"
        class="favorite__img theme-light"
      />
      <h2 class="favorite__title theme-light">
        ${title}
      </h2>
      <h3 class="favorite__subtitle theme-light">
        ${subtitle}
      </h3>
      <div class="favorite__date-link-wrapper theme-light">
        <p class="favorite__date theme-light">${date}</p>
        <a href="${href}" target="_blank" rel="noopener noreferrer" class="favorite__link theme-light">Read more</a>
      </div>
      <button type="button" class="favorite__btn theme-light">
        Remove from favorite
        <svg class="favorite__btn-icon theme-light">
          <use href="${svg}#icon-heart"></use>
        </svg>
      </button>
      <p class="favorite__category theme-light">${category}</p>
      <p class="favorite__already-read">
              Already read
              <svg class="favorite__already-read-icon">
                <use href="${svg}#icon-icon-check"></use>
              </svg>
            </p>
      </li>`
        })
            .join('')
    }

function appendMarkup() {
    const markup = createMarkupFavoriteNews()
    favoriteListEl.insertAdjacentHTML("beforeend", markup)
}

appendMarkup()