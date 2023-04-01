import localStorageAPI from './storage';

const newsListEl = document.querySelector('.news__list')

let alreadyReadNews = localStorageAPI.load("already-read-news") || []

function addAlreadyReadToLocalStorage(e) {
    const targetLink = e.target.closest(".news__link");
    const targetItem = e.target.closest(".news__item");
    // const targetP = targetLink.closest(".news__already-read")
    
    if (e.target.nodeName !== `A`) {
        return;
    }

    targetLink.classList.toggle("read")
    // targetP.classList.toggle("visible")

    if (targetLink.classList.contains("read")) {
        const alreadyReadNew = {
            uri: targetItem.id,
            src: targetItem.children[0].src,
            alt: targetItem.children[0].alt,
            title: targetItem.children[1].textContent,
            subtitle: targetItem.children[2].textContent,
            date: targetItem.children[3].children[0].textContent,
            href: targetItem.children[3].children[1].href,
            category: targetItem.children[7].textContent
        }

        alreadyReadNews.push(alreadyReadNew)
        localStorageAPI.save("already-read-news", alreadyReadNews)
        targetItem.style.opacity = '0.8'
    }
}

newsListEl.addEventListener("click", addAlreadyReadToLocalStorage)