function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},a=n.parcelRequired7c6;null==a&&((a=function(e){if(e in r)return r[e].exports;if(e in o){var t=o[e];delete o[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},n.parcelRequired7c6=a),a.register("kyEFX",(function(t,n){var r,o;e(t.exports,"register",(function(){return r}),(function(e){return r=e})),e(t.exports,"resolve",(function(){return o}),(function(e){return o=e}));var a={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)a[t[n]]=e[t[n]]},o=function(e){var t=a[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),a("kyEFX").register(JSON.parse('{"kHKil":"favorite.67b9a110.js","ixp4a":"news-main-img.890ff145.png","9v6fF":"symbol-defs.6a6b8729.svg"}'));const i=document.querySelector(".header__burger-menu-btn"),l=document.querySelector(".mobile-menu__close-btn"),c=document.querySelector(".mobile-menu__container");i.addEventListener("click",(function(){c.classList.remove("invisible")})),l.addEventListener("click",(function(){c.classList.add("invisible")}));document.querySelector(".pagination__prevBtn"),document.querySelector(".pagination__nextBtn"),document.getElementById("btn-1"),document.getElementById("btn-2"),document.getElementById("btn-3"),document.getElementById("btn-4"),document.getElementById("btn-5"),document.getElementById("btn-6");const s=document.querySelector("#switch-light"),d=document.querySelector("#switch-dark");function u(e){localStorage.setItem("theme",e),document.documentElement.className=e}function f(){"theme-dark"===localStorage.getItem("theme")&&u("theme-light")}function m(){"theme-light"===localStorage.getItem("theme")&&u("theme-dark")}function g(){"theme-dark"===localStorage.getItem("theme")?u("theme-dark"):u("theme-light")}console.log(s),console.log(d),s.addEventListener("click",f),d.addEventListener("click",m),g();var v;v=new URL(a("kyEFX").resolve("ixp4a"),import.meta.url).toString();var _;_=new URL(a("kyEFX").resolve("9v6fF"),import.meta.url).toString();var h={save:(e,t)=>{try{const n=JSON.stringify(t);localStorage.setItem(e,n)}catch(e){console.error("Set state error: ",e.message)}},load:e=>{try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}},remove:e=>{try{localStorage.removeItem(e)}catch(e){console.error("Remove item error: ",e.message)}}};const y=document.querySelector(".favorite__list"),p=document.querySelector(".favorite__section-title"),b=h.load("favorite-news");function S(){const e=b&&b.length?b.map((({uri:e,src:n,alt:r,title:o,subtitle:a,date:i,href:l,category:c})=>`<li id="${e}" class="favorite__item ">\n      <img\n        src="${n}"\n        alt="${r}"\n        class="favorite__img "\n      />\n      <h2 class="favorite__title ">\n        ${o}\n      </h2>\n      <h3 class="favorite__subtitle ">\n        ${a}\n      </h3>\n      <div class="favorite__date-link-wrapper ">\n        <p class="favorite__date ">${i}</p>\n        <a href="${l}" target="_blank" rel="noopener noreferrer" class="favorite__link ">Read more</a>\n        <p class="favorite__already-read">\n              Already read\n              <svg class="favorite__already-read-icon">\n                <use href="${t(_)}#icon-icon-check"></use>\n              </svg>\n            </p>\n      </div>\n      <button type="button" class="favorite__btn ">\n        Remove from favorite\n        <svg class="favorite__btn-icon ">\n          <use href="${t(_)}#icon-heart"></use>\n        </svg>\n      </button>\n      <p class="favorite__category ">${c}</p>\n      </li>`)).join(""):p.innerHTML=`<div class="favorite__noItem-wrapper"><h2 class="favorite__noItem-title">This page is empty yet</h2><img src="${t(v)}" alt="Ooooops" class="favorite__noItem-img"/></div>`;y.insertAdjacentHTML("beforeend",e),b.map((e=>{(h.load("already-read-news")||[]).forEach((t=>{if(t.uri===e.uri){const e=document.getElementById(t.uri);if(e){e.querySelector(".favorite__link").classList.add("read"),e.style.opacity="0.8"}}}))}))}S(),y.addEventListener("click",(function(e){if("BUTTON"!==e.target.nodeName)return;const t=b.findIndex((t=>t.uri===e.target.parentNode.id));t>-1&&(b.splice(t,1),h.save("favorite-news",b)),y.innerHTML="",S()}));const E=document.querySelector(".favorite__list");let k=h.load("already-read-news")||[];E.addEventListener("click",(function(e){const t=e.target.closest(".favorite__link"),n=e.target.closest(".favorite__item");if("A"===e.target.nodeName&&(t.classList.toggle("read"),t.classList.contains("read"))){const e={uri:n.id,src:n.children[0].src,alt:n.children[0].alt,title:n.children[1].textContent,subtitle:n.children[2].textContent,date:n.children[3].children[0].textContent,href:n.children[3].children[1].href,category:n.children[5].textContent,dateOfRead:(new Date).toLocaleString().split(",")[0]};k.push(e),h.save("already-read-news",k),n.style.opacity="0.8"}}));
//# sourceMappingURL=favorite.67b9a110.js.map