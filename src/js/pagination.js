const prevBtnEl = document.querySelector('.pagination__prevBtn')
const nextBtnEl = document.querySelector('.pagination__nextBtn')
const btn1El = document.getElementById('btn-1')
const btn2El = document.getElementById('btn-2')
const btn3El = document.getElementById('btn-3')
const btn4El = document.getElementById('btn-4')
const btn5El = document.getElementById('btn-5')
const btn6El = document.getElementById('btn-6')

// export function incrementPage() {
//     console.log('click')
// }

// export function DecrementPage() {
//     console.log(e.currentTarget)
// }

// prevBtnEl.addEventListener('click', onClick)
// nextBtnEl.addEventListener('click', onClick)
// btn1El.addEventListener('click', superOnClick)
// btn2El.addEventListener('click', superOnClick)
// btn3El.addEventListener('click', superOnClick)
// btn4El.addEventListener('click', superOnClick)
// btn5El.addEventListener('click', superOnClick)
// btn6El.addEventListener('click', superOnClick)

import axios from "axios";
import Notiflix from 'notiflix';

const API_KEY = 'B0nM5YVwVGPOQpaqXoXzd3AxL5Kpg75H';

export default class NewsApiService {
    constructor() {
        this.keyword = '';
        this.page = 0;
    }

    async makeFetch() {
        const response = await axios.get(`https://api.nytimes.com/svc/news/v3/content/nyt/${keyword}.json?page=${page}&limit=8&sort=newest&api-key=${API_KEY}`)
        const data = await response.data
        if (data.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.') 
        }
        this.incrementPage()
        
        return data
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.inputValue;
    }

    set query(newInputValue) {
        this.inputValue = newInputValue;
    }
}