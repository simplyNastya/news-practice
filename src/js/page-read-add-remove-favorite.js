import localStorageAPI from './storage';

const alreadyReadListEls = document.querySelectorAll(".read__dropdown-content-list")

let favoriteNews = localStorageAPI.load("favorite-news") || []

export function addRemoveLocalStorage(e) {
    const targetBtn = e.target.closest(".read__dropdown-content-btn");
    const targetItem = e.target.closest(".read__dropdown-content-item");

    if (e.target.nodeName !== `BUTTON`) {
        return;
    }

    targetBtn.classList.toggle("fav")

    if (targetBtn.classList.contains("fav")) {
        const favoriteNew = {
            uri: e.target.parentNode.id,
            src: targetItem.children[0].src,
            alt: targetItem.children[0].alt,
            title: targetItem.children[1].textContent,
            subtitle: targetItem.children[2].textContent,
            date: targetItem.children[3].children[0].textContent,
            href: targetItem.children[3].children[1].href,
            category: targetItem.children[7].textContent
        }

        targetBtn.textContent = "Remove from favorite"
        targetBtn.style.width = "168px"
        favoriteNews.push(favoriteNew)
        localStorageAPI.save("favorite-news", favoriteNews)
    }

    if (!targetBtn.classList.contains("fav")) {
        targetBtn.textContent = "Add to favorite"
        targetBtn.style.width = "126px"
        const favoriteNewsRemove = localStorageAPI.load("favorite-news").filter(item => item.uri !== e.target.parentNode.id)
        localStorageAPI.remove("favorite-news")
        localStorageAPI.save("favorite-news", favoriteNewsRemove)
        favoriteNews = favoriteNewsRemove
    }
}

alreadyReadListEls.forEach(alreadyReadListEl => {
  alreadyReadListEl.addEventListener('click', addRemoveLocalStorage)
})