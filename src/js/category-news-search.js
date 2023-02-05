import axios from "axios"

const categoriesDropdownListEl = document.querySelector('.dropdown__content-list')
const othersDropdownListEl = document.querySelector('.dropdown-tablet__content-list')

const API_KEY = 'B0nM5YVwVGPOQpaqXoXzd3AxL5Kpg75H'

async function getCetegoryList() {
    const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`)

    const markupOthers = response.data.results.map(({ display_name }, index) => {
         if (index > 5) {
           return `<li class="dropdown-tablet__content-item">
              <button type="button" class="dropdown-tablet__content-btn">
                ${display_name}
              </button>
            </li>`
        }
    }).join('')
    othersDropdownListEl.innerHTML = markupOthers;

    const markupCategories = response.data.results.map(({ display_name }) => `<li class="dropdown__content-item">
            <button type="button" class="dropdown__content-btn">${display_name}</button>
          </li>`).join('')
    categoriesDropdownListEl.innerHTML = markupCategories
    
}
getCetegoryList();