function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},s=r.parcelRequired7c6;null==s&&((s=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){o[e]=t},r.parcelRequired7c6=s),s.register("kyEFX",(function(t,r){var n,o;e(t.exports,"register",(function(){return n}),(function(e){return n=e})),e(t.exports,"resolve",(function(){return o}),(function(e){return o=e}));var s={};n=function(e){for(var t=Object.keys(e),r=0;r<t.length;r++)s[t[r]]=e[t[r]]},o=function(e){var t=s[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),s("kyEFX").register(JSON.parse('{"kHKil":"favorite.ed4ec80b.js","ixp4a":"news-main-img.890ff145.png","9v6fF":"symbol-defs.6a6b8729.svg"}'));const i=document.querySelector(".header__burger-menu-btn"),l=document.querySelector(".mobile-menu__close-btn"),a=document.querySelector(".mobile-menu__container");i.addEventListener("click",(function(){a.classList.remove("invisible")})),l.addEventListener("click",(function(){a.classList.add("invisible")}));document.querySelector(".pagination__prevBtn"),document.querySelector(".pagination__nextBtn"),document.getElementById("btn-1"),document.getElementById("btn-2"),document.getElementById("btn-3"),document.getElementById("btn-4"),document.getElementById("btn-5"),document.getElementById("btn-6");const c=document.querySelector("#switch-light"),d=document.querySelector("#switch-dark"),m=document.querySelector("#mobile-switch-light"),u=document.querySelector("#mobile-switch-dark"),f=document.querySelector(".header__section"),h=document.querySelector(".header__burger-menu-icon"),y=document.querySelector(".header__theme-text-light"),v=document.querySelector(".header__theme-text-dark"),_=document.querySelector(".header__theme-sun-icon"),g=document.querySelector(".header__theme-moon-icon"),k=document.querySelector(".mobile-menu__theme-sun-icon"),p=document.querySelector(".mobile-menu__theme-moon-icon"),b=document.querySelector(".mobile-menu__container");function S(e){localStorage.setItem("theme",e),document.documentElement.className=e}function L(){S("theme-light"),v.style.color="#111321",y.style.color="#4440F6",g.style.stroke="#5F6775",_.style.stroke="#4440F6",p.style.stroke="#5F6775",k.style.stroke="#4440F6"}function F(){S("theme-dark"),v.style.color="#4440F6",y.style.color="#5F6775",g.style.stroke="#4440F6",_.style.stroke="#5F6775",p.style.stroke="#4440F6",k.style.stroke="#5F6775"}function E(){const e=localStorage.getItem("theme");"theme-dark"===e?(f.classList.add("theme-dark"),h.classList.add("theme-dark"),b.classList.add("theme-dark"),f.classList.remove("theme-light"),h.classList.remove("theme-light"),b.classList.remove("theme-light")):"theme-light"===e&&(f.classList.add("theme-light"),h.classList.add("theme-light"),b.classList.add("theme-light"),f.classList.remove("theme-dark"),h.classList.remove("theme-dark"),b.classList.remove("theme-dark"))}function q(){"theme-dark"===localStorage.getItem("theme")?(S("theme-dark"),v.style.color="#4440F6",y.style.color="#5F6775",g.style.stroke="#4440F6",_.style.stroke="#5F6775",p.style.stroke="#4440F6",k.style.stroke="#5F6775"):(S("theme-light"),v.style.color="#111321",y.style.color="#4440F6",g.style.stroke="#5F6775",_.style.stroke="#4440F6",p.style.stroke="#5F6775",k.style.stroke="#4440F6"),E()}c.addEventListener("click",L),d.addEventListener("click",F),m.addEventListener("click",L),u.addEventListener("click",F),c.addEventListener("click",E),d.addEventListener("click",E),m.addEventListener("click",E),u.addEventListener("click",E),q();var w;w=new URL(s("kyEFX").resolve("ixp4a"),import.meta.url).toString();var x;x=new URL(s("kyEFX").resolve("9v6fF"),import.meta.url).toString();var I={save:(e,t)=>{try{const r=JSON.stringify(t);localStorage.setItem(e,r)}catch(e){console.error("Set state error: ",e.message)}},load:e=>{try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}},remove:e=>{try{localStorage.removeItem(e)}catch(e){console.error("Remove item error: ",e.message)}}};const O=document.querySelector(".favorite__list"),R=document.querySelector(".favorite__section-title"),$=I.load("favorite-news");function B(){const e=$&&$.length?$.map((({uri:e,src:r,alt:n,title:o,subtitle:s,date:i,href:l,category:a})=>`<li id="${e}" class="favorite__item ">\n      <img\n        src="${r}"\n        alt="${n}"\n        class="favorite__img "\n      />\n      <h2 class="favorite__title ">\n        ${o}\n      </h2>\n      <h3 class="favorite__subtitle ">\n        ${s}\n      </h3>\n      <div class="favorite__date-link-wrapper ">\n        <p class="favorite__date ">${i}</p>\n        <a href="${l}" target="_blank" rel="noopener noreferrer" class="favorite__link ">Read more</a>\n        <p class="favorite__already-read">\n              Already read\n              <svg class="favorite__already-read-icon">\n                <use href="${t(x)}#icon-icon-check"></use>\n              </svg>\n            </p>\n      </div>\n      <button type="button" class="favorite__btn ">\n        Remove from favorite\n        <svg class="favorite__btn-icon ">\n          <use href="${t(x)}#icon-heart"></use>\n        </svg>\n      </button>\n      <p class="favorite__category ">${a}</p>\n      </li>`)).join(""):R.innerHTML=`<div class="favorite__noItem-wrapper"><h2 class="favorite__noItem-title">This page is empty yet</h2><img src="${t(w)}" alt="Ooooops" class="favorite__noItem-img"/></div>`;O.insertAdjacentHTML("beforeend",e),$.map((e=>{(I.load("already-read-news")||[]).forEach((t=>{if(t.uri===e.uri){const e=document.getElementById(t.uri);if(e){e.querySelector(".favorite__link").classList.add("read"),e.style.opacity="0.8"}}}))}))}B(),O.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName)return;const t=$.findIndex((t=>t.uri===e.target.parentNode.id));t>-1&&($.splice(t,1),I.save("favorite-news",$)),O.innerHTML="",B()}));const H=document.querySelector(".favorite__list");let N=I.load("already-read-news")||[];H.addEventListener("click",(function(e){const t=e.target.closest(".favorite__link"),r=e.target.closest(".favorite__item");if("A"===e.target.nodeName&&(t.classList.toggle("read"),t.classList.contains("read"))){const e={uri:r.id,src:r.children[0].src,alt:r.children[0].alt,title:r.children[1].textContent,subtitle:r.children[2].textContent,date:r.children[3].children[0].textContent,href:r.children[3].children[1].href,category:r.children[5].textContent,dateOfRead:(new Date).toLocaleString().split(",")[0]};N.push(e),I.save("already-read-news",N),r.style.opacity="0.8"}}));
//# sourceMappingURL=favorite.ed4ec80b.js.map
