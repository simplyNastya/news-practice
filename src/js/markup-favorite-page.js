import svg from '../images/symbol-defs.svg'

appendMarkup(localStorageAPI.load("favourite-news"))    

function createMarkupFavoriteNews(array) {
        return array.map(({id, src, alt, title, subtitle, date, href, category}) => {
            return `<li id="${id}" class="favorite__item theme-light">
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

    function appendMarkup(array) {
        const markup = createMarkupFavoriteNews(array)
    newsFavListEl.innerHTML = markup
}