import imgOps from '../images/desctop/news-main-img.png'
import svg from '../images/symbol-defs.svg'
import localStorageAPI from './storage'

const favoriteListEl = document.querySelector(".favorite__list")
const favoriteNewsTitle = document.querySelector(".favorite__section-title")

const favoriteNewsArray = localStorageAPI.load("favorite-news")

function createMarkupFavoriteNews() {

  if (!favoriteNewsArray || !favoriteNewsArray.length) {
    return (favoriteNewsTitle.innerHTML = `<div class="favorite__noItem-wrapper"><h2 class="favorite__noItem-title">This page is empty yet</h2><img src="${imgOps}" alt="Ooooops" class="favorite__noItem-img"/></div>`)

  }

      return favoriteNewsArray.map(({uri, src, alt, title, subtitle, date, href, category}) => {
            return `<li id="${uri}" class="favorite__item ">
      <img
        src="${src}"
        alt="${alt}"
        class="favorite__img "
      />
      <h2 class="favorite__title ">
        ${title}
      </h2>
      <h3 class="favorite__subtitle ">
        ${subtitle}
      </h3>
      <div class="favorite__date-link-wrapper ">
        <p class="favorite__date ">${date}</p>
        <a href="${href}" target="_blank" rel="noopener noreferrer" class="favorite__link ">Read more</a>
        <p class="favorite__already-read">
              Already read
              <svg class="favorite__already-read-icon">
                <use href="${svg}#icon-icon-check"></use>
              </svg>
            </p>
      </div>
      <button type="button" class="favorite__btn ">
        Remove from favorite
        <svg class="favorite__btn-icon ">
          <use href="${svg}#icon-heart"></use>
        </svg>
      </button>
      <p class="favorite__category ">${category}</p>
      </li>`
        })
            .join('')
    }

function appendMarkup() {
    const markup = createMarkupFavoriteNews()
  favoriteListEl.insertAdjacentHTML("beforeend", markup)
  
  favoriteNewsArray.map(item => {
    const alreadyReadNews = localStorageAPI.load("already-read-news") || []
    alreadyReadNews.forEach(news => {
      if (news.uri === item.uri) {
        const newsItem = document.getElementById(news.uri)
        if (newsItem) {
          const readLink = newsItem.querySelector('.favorite__link')
          readLink.classList.add('read')
          newsItem.style.opacity = '0.8'
    }
    }
    })
  })
}

appendMarkup()

function removeLocalStorage(e) {
    if (e.target.nodeName !== `BUTTON`) {
        return;
    }

    const index = favoriteNewsArray.findIndex(item => { return item.uri === e.target.parentNode.id })

    if (index > -1) {
        favoriteNewsArray.splice(index, 1)
        localStorageAPI.save("favorite-news", favoriteNewsArray)
    }
    
    function deleteItemFromMarkup() {
        favoriteListEl.innerHTML = ''
    }
    
  deleteItemFromMarkup()
  appendMarkup()
}

favoriteListEl.addEventListener("click", removeLocalStorage)