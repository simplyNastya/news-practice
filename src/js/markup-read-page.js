import localStorageAPI from './storage'
import imgOps from '../images/desctop/news-main-img.png'
import svg from '../images/symbol-defs.svg'

const readSectionContainerEl = document.querySelector('.read__section-container')

const alreadyReadArray = localStorageAPI.load("already-read-news") || []

function createMarkupAlreadyReadNews() {

  if (!alreadyReadArray.length) {
    return (readSectionContainerEl.innerHTML = `<div class="read__noItem-wrapper">
    <h2 class="read__noItem-title">This page is empty yet</h2>
    <img src="${imgOps}" alt="Ooooops" class="read__noItem-img"/>
    </div>`)
  }

  const uniqueDates = alreadyReadArray.reduce((dates, { dateOfRead }) => {
    if (!dates.includes(dateOfRead)) {
      dates.push(dateOfRead);
    }
    return dates;
  }, []);

  const markupWrapper = uniqueDates.map((date) => {
    return `<div class="read__dropdown-wrapper">
            <button
              type="button"
              class="read__dropdown-content-admin-btn"
            >${date}
            <svg class="read__btn-icon-down">
              <use href="${svg}#icon-arrow-down"></use>
            </svg>
            <svg class="read__btn-icon-up">
              <use href="${svg}#icon-arrow-up"></use>
            </svg>
            </button>
            <div class="read__dropdown-content-wrapper">
              <ul class="read__dropdown-content-list"></ul>
            </div>
          </div>`;
  }).join('');

  readSectionContainerEl.insertAdjacentHTML('beforeend', markupWrapper)

  const alreadyReadListEl = document.querySelector('.read__dropdown-content-list')

  const markupNews = alreadyReadArray.map(({ uri, src, alt, title, subtitle, date, href, category, dateOfRead }) => {
            return `<li
                class="read__dropdown-content-item"
                id="${uri}"
                data-date="${dateOfRead}"
              >
                <img
                  src="${src}"
                  alt="${alt}"
                  class="read__dropdown-content-img"
                />
                <h2 class="read__dropdown-content-title">
                  ${title}
                </h2>
                <h3 class="read__dropdown-content-subtitle">
                  ${subtitle}
                </h3>
                <div
                  class="read__dropdown-content-date-link-wrapper"
                >
                  <p class="read__dropdown-content-date">
                    ${date}
                  </p>
                  <a
                    href="${href}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="read__dropdown-content-link"
                    >Read more</a
                  >
                </div>
                <button
                  type="button"
                  class="read__dropdown-content-btn"
                >
                  Add to favorite
                </button>
                <svg
                    class="read__dropdown-content-btn-icon-add"
                  >
                    <use href="${svg}#icon-heart"></use>
                  </svg>
                  <svg
                    class="read__dropdown-content-btn-icon-remove"
                  >
                    <use href="${svg}#icon-heart"></use>
                  </svg>
                <p class="read__dropdown-content-category">
                  ${category}
                </p>
                <p class="read__dropdown-content-already-read">
                  Already read
                  <svg class="read__dropdown-content-already-read-icon">
                    <use
                      href="${svg}#icon-icon-check"
                    ></use>
                  </svg>
                </p>
              </li>`
        })
    .join('')

  alreadyReadListEl.insertAdjacentHTML('beforeend', markupNews);

  alreadyReadArray.map(item => {
    const favoriteNews = localStorageAPI.load("favorite-news") || []
    favoriteNews.forEach(news => {
      if (news.uri === item.uri) {
        const newsItem = document.getElementById(news.uri)
        if (newsItem) {
          const favoriteBtn = newsItem.querySelector('.read__dropdown-content-btn')
          favoriteBtn.classList.add('fav')
          favoriteBtn.textContent = 'Remove from favorite'
          favoriteBtn.style.width = '168px'
    }
    }
  })
  })
}

createMarkupAlreadyReadNews()