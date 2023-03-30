import localStorageAPI from './storage';
const favoriteNews = localStorageAPI.load("favourite-news") || []

document.addEventListener("click", function (e) {
    const targetBtn = e.target.closest(".news__btn");
    const targetItem = e.target.closest(".news__item");

    if (targetBtn) {
        favoriteNew = {
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
        localStorageAPI.save("favourite-news", favoriteNews)
    }
  
});
