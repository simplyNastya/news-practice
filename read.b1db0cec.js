function e(e,t,n,o){Object.defineProperty(e,t,{get:n,set:o,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},r={},d=n.parcelRequired7c6;null==d&&((d=function(e){if(e in o)return o[e].exports;if(e in r){var t=r[e];delete r[e];var n={id:e,exports:{}};return o[e]=n,t.call(n.exports,n,n.exports),n.exports}var d=new Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,t){r[e]=t},n.parcelRequired7c6=d),d.register("kyEFX",(function(t,n){var o,r;e(t.exports,"register",(function(){return o}),(function(e){return o=e})),e(t.exports,"resolve",(function(){return r}),(function(e){return r=e}));var d={};o=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)d[t[n]]=e[t[n]]},r=function(e){var t=d[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),d("kyEFX").register(JSON.parse('{"jewIc":"read.b1db0cec.js","9v6fF":"symbol-defs.6a6b8729.svg"}'));const a=document.querySelector(".header__burger-menu-btn"),c=document.querySelector(".mobile-menu__close-btn"),i=document.querySelector(".mobile-menu__container");a.addEventListener("click",(function(){i.classList.remove("invisible")})),c.addEventListener("click",(function(){i.classList.add("invisible")}));document.querySelector(".pagination__prevBtn"),document.querySelector(".pagination__nextBtn"),document.getElementById("btn-1"),document.getElementById("btn-2"),document.getElementById("btn-3"),document.getElementById("btn-4"),document.getElementById("btn-5"),document.getElementById("btn-6");function l(e){localStorage.setItem("theme",e),document.documentElement.className=e}"theme-dark"===localStorage.getItem("theme")?l("theme-dark"):l("theme-light");const s=document.querySelector(".read__dropdown-content-admin-btn"),u=document.querySelector(".read__dropdown-content-wrapper"),m=document.querySelector(".read__btn-icon-down"),f=document.querySelector(".read__btn-icon-up");s.addEventListener("click",(function(){u.classList.toggle("visible-content"),m.classList.toggle("invisible-content"),f.classList.toggle("visible-content")}));var g,h={save:(e,t)=>{try{const n=JSON.stringify(t);localStorage.setItem(e,n)}catch(e){console.error("Set state error: ",e.message)}},load:e=>{try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}},remove:e=>{try{localStorage.removeItem(e)}catch(e){console.error("Remove item error: ",e.message)}}};g=new URL(d("kyEFX").resolve("9v6fF"),import.meta.url).toString();const _=document.querySelector(".read__dropdown-content-list"),p=document.querySelector(".read__dropdown-content-admin-btn"),v=(document.querySelector(".read__dropdown-wrapper"),h.load("already-read-news")||[]);!function(){const e=v.reduce(((e,{dateOfRead:t})=>(e.includes(t)||e.push(t),e)),[]).map((e=>`<button class="read__dropdown-content-admin-btn theme-light">${e}</button>`)).join(""),n=v.map((({uri:e,src:n,alt:o,title:r,subtitle:d,date:a,href:c,category:i,dateOfRead:l})=>`<li\n                class="read__dropdown-content-item theme-light"\n                id="${e}"\n                data-date="${l}"\n              >\n                <img\n                  src="${n}"\n                  alt="${o}"\n                  class="read__dropdown-content-img theme-light"\n                />\n                <h2 class="read__dropdown-content-title theme-light">\n                  ${r}\n                </h2>\n                <h3 class="read__dropdown-content-subtitle theme-light">\n                  ${d}\n                </h3>\n                <div\n                  class="read__dropdown-content-date-link-wrapper theme-light"\n                >\n                  <p class="read__dropdown-content-date theme-light">\n                    ${a}\n                  </p>\n                  <a\n                    href="${c}"\n                    target="_blank"\n                    rel="noopener noreferrer"\n                    class="read__dropdown-content-link theme-light"\n                    >Read more</a\n                  >\n                </div>\n                <button\n                  type="button"\n                  class="read__dropdown-content-btn theme-light"\n                >\n                  Add to favorite\n                </button>\n                <svg\n                    class="read__dropdown-content-btn-icon-add theme-light"\n                  >\n                    <use href="${t(g)}#icon-heart"></use>\n                  </svg>\n                  <svg\n                    class="read__dropdown-content-btn-icon-remove theme-light"\n                  >\n                    <use href="${t(g)}#icon-heart"></use>\n                  </svg>\n                <p class="read__dropdown-content-category theme-light">\n                  ${i}\n                </p>\n                <p class="read__dropdown-content-already-read">\n                  Already read\n                  <svg class="read__dropdown-content-already-read-icon">\n                    <use\n                      href="${t(g)}#icon-icon-check"\n                    ></use>\n                  </svg>\n                </p>\n              </li>`)).join("");_.innerHTML="",p.insertAdjacentHTML("beforeend",e),_.insertAdjacentHTML("beforeend",n),v.map((e=>{(h.load("favorite-news")||[]).forEach((t=>{if(t.uri===e.uri){const e=document.getElementById(t.uri);if(e){const t=e.querySelector(".read__dropdown-content-btn");t.classList.add("fav"),t.textContent="Remove from favorite",t.style.width="168px"}}}))}))}();const b=document.querySelector(".read__dropdown-content-list");let w=h.load("favorite-news")||[];b.addEventListener("click",(function(e){const t=e.target.closest(".read__dropdown-content-btn"),n=e.target.closest(".read__dropdown-content-item");if("BUTTON"===e.target.nodeName){if(t.classList.toggle("fav"),t.classList.contains("fav")){const o={uri:e.target.parentNode.id,src:n.children[0].src,alt:n.children[0].alt,title:n.children[1].textContent,subtitle:n.children[2].textContent,date:n.children[3].children[0].textContent,href:n.children[3].children[1].href,category:n.children[7].textContent};t.textContent="Remove from favorite",t.style.width="168px",w.push(o),h.save("favorite-news",w)}if(!t.classList.contains("fav")){t.textContent="Add to favorite",t.style.width="126px";const n=h.load("favorite-news").filter((t=>t.uri!==e.target.parentNode.id));h.remove("favorite-news"),h.save("favorite-news",n),w=n}}}));
//# sourceMappingURL=read.b1db0cec.js.map
