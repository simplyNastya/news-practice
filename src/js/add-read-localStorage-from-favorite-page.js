import localStorageAPI from './storage';

const favoriteListEl = document.querySelector(".favorite__list")

let alreadyReadNews = localStorageAPI.load("already-read-news") || []

function addAlreadyReadToLocalStorage(e) {
    const targetLink = e.target.closest(".favorite__link");
    const targetItem = e.target.closest(".favorite__item");
    
    if (e.target.nodeName !== `A`) {
        return;
    }

    targetLink.classList.toggle("read")

    if (targetLink.classList.contains("read")) {
        const alreadyReadNew = {
            uri: targetItem.id,
            src: targetItem.children[0].src,
            alt: targetItem.children[0].alt,
            title: targetItem.children[1].textContent,
            subtitle: targetItem.children[2].textContent,
            date: targetItem.children[3].children[0].textContent,
            href: targetItem.children[3].children[1].href,
            category: targetItem.children[5].textContent,
            dateOfRead: new Date().toLocaleString().split(',')[0]
        }

        alreadyReadNews.push(alreadyReadNew)
        localStorageAPI.save("already-read-news", alreadyReadNews)
        targetItem.style.opacity = '0.8'
    }
}

favoriteListEl.addEventListener("click", addAlreadyReadToLocalStorage)