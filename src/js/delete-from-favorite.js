import localStorageAPI from './storage'

const favoriteListEl = document.querySelector('.favorite__list')
const favoriteItemEl = document.querySelector('.favorite__item')

const favoriteNewsArray = localStorageAPI.load("favorite-news")

function removeLocalStorage(e) {
    const targetBtn = e.target.closest(".favorite__btn");
    const targetItem = e.target.closest(".favorite__item");

    if (e.target.nodeName !== `BUTTON`) {
        return;
    }

    console.log(e.target.parentNode)

    const index = favoriteNewsArray.findIndex(item => { return item.uri === e.target.parentNode.id })

    if (index > -1) {
        favoriteNewsArray.splice(index, 1)
        localStorageAPI.save("favorite-news", favoriteNewsArray)
    }
    
    function deleteItemFromMarkup() {
        favoriteItemEl.innerHTML = ''
    }
    
    deleteItemFromMarkup()
}

favoriteListEl.addEventListener("click", removeLocalStorage)