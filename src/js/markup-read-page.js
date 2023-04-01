import localStorageAPI from './storage'
// import imgOps from '../images/desctop/news-main-img.png'
import svg from '../images/symbol-defs.svg'

const alreadyReadListEl = document.querySelector(".read__dropdown-content-list")
const adminBtn = document.querySelector('.read__dropdown-content-admin-btn')
const adminBtnWrapper = document.querySelector('.read__dropdown-wrapper')

const alreadyReadArray = localStorageAPI.load("already-read-news") || []

function createMarkupAlreadyReadNews() {
  const uniqueDates = alreadyReadArray.reduce((dates, { dateOfRead }) => {
    if (!dates.includes(dateOfRead)) {
      dates.push(dateOfRead);
    }
    return dates;
  }, []);

  const markupDates = uniqueDates.map((date) => {
    return `<button class="read__dropdown-content-admin-btn theme-light">${date}</button>`;
  }).join('');

  const markupNews = alreadyReadArray.map(({ uri, src, alt, title, subtitle, date, href, category, dateOfRead }) => {
            return `<li
                class="read__dropdown-content-item theme-light"
                id="${uri}"
                data-date="${dateOfRead}"
              >
                <img
                  src="${src}"
                  alt="${alt}"
                  class="read__dropdown-content-img theme-light"
                />
                <h2 class="read__dropdown-content-title theme-light">
                  ${title}
                </h2>
                <h3 class="read__dropdown-content-subtitle theme-light">
                  ${subtitle}
                </h3>
                <div
                  class="read__dropdown-content-date-link-wrapper theme-light"
                >
                  <p class="read__dropdown-content-date theme-light">
                    ${date}
                  </p>
                  <a
                    href="${href}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="read__dropdown-content-link theme-light"
                    >Read more</a
                  >
                </div>
                <button
                  type="button"
                  class="read__dropdown-content-btn theme-light"
                >
                  Add to favorite
                </button>
                <svg
                    class="read__dropdown-content-btn-icon-add theme-light"
                  >
                    <use href="${svg}#icon-heart"></use>
                  </svg>
                  <svg
                    class="read__dropdown-content-btn-icon-remove theme-light"
                  >
                    <use href="${svg}#icon-heart"></use>
                  </svg>
                <p class="read__dropdown-content-category theme-light">
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
  
  alreadyReadListEl.innerHTML = '';
  // adminBtnWrapper.innerHTML = markupDates;

  alreadyReadListEl.insertAdjacentHTML('beforeend', markupDates);
  alreadyReadListEl.insertAdjacentHTML('beforeend', markupNews);
}

adminBtn.addEventListener('click', createMarkupAlreadyReadNews)