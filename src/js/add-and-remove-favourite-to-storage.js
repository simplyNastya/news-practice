import localStorageAPI from './storage';
let favoriteNews = localStorageAPI.load("favorite-news") || []

document.addEventListener("click", function (e) {
    const targetBtn = e.target.closest(".news__btn");
    const targetItem = e.target.closest(".news__item");

    if (e.target.nodeName !== `BUTTON`) {
        return;
    }

    targetBtn.classList.toggle("fav")

    if (targetBtn.classList.contains("fav")) {
        const favoriteNew = {
            id: e.target.parentNode.id,
            src: targetItem.children[0].src,
            alt: targetItem.children[0].alt,
            title: targetItem.children[1].textContent,
            subtitle: targetItem.children[2].textContent,
            date: targetItem.children[3].children[0].textContent,
            href: targetItem.children[3].children[1].href,
            category: targetItem.children[5].textContent
        }

        favoriteNews.push(favoriteNew)
        localStorageAPI.save("favorite-news", favoriteNews)
    }

    if (!targetBtn.classList.contains("fav")) {
        const favoriteNewsRemove = localStorageAPI.load("favorite-news").filter(item => item.id !== e.target.parentNode.id)
        localStorageAPI.remove("favorite-news")
        localStorageAPI.save("favorite-news", favoriteNewsRemove)
        favoriteNews = favoriteNewsRemove
    }
    
});


