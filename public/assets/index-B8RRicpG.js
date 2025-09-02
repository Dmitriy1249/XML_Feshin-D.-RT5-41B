(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();class y{render(t,e,s,n,r){const i=document.createElement("div");i.className="col-md-4 mb-4",i.innerHTML=`
            <div class="card h-100">
                <img src="${t.src}" class="card-img" alt="${t.title}"
                     onerror="this.src='https://via.placeholder.com/300?text=Нет+фото'">
                <div class="card-body">
                    <h5 class="card-title">${t.title}</h5>
                    <p class="card-text">${t.text}</p>
                </div>
                <div class="card-footer bg-transparent">
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-sm btn-primary">Подробнее</button>
                        <div>
                            <button class="btn btn-sm btn-outline-secondary me-2">Копировать</button>
                            <button class="btn btn-sm btn-outline-danger">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;const[c,l,d]=i.querySelectorAll("button");c.addEventListener("click",()=>s(t)),l.addEventListener("click",()=>n(t)),d.addEventListener("click",()=>r(t.id)),e.appendChild(i)}}class f{constructor(t,e){this.parent=t,this.onClick=e}render(){const t=document.createElement("button");t.className="btn btn-secondary mb-4",t.innerHTML="← Назад",t.addEventListener("click",this.onClick),this.parent.appendChild(t)}}class g{constructor(){this.baseUrl="http://localhost:3001"}getStocks(t){return t?`${this.baseUrl}/stocks?title=${t}`:`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}createStock(){return`${this.baseUrl}/stocks`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}removeStockById(t){return`${this.baseUrl}/stocks/${t}`}addDescriptionById(t){return`${this.baseUrl}/stocks/${t}/description`}updateDescriptionByIndex(t,e){return`${this.baseUrl}/stocks/${t}/description/${e}`}deleteDescriptionByIndex(t,e){return`${this.baseUrl}/stocks/${t}/description/${e}`}}const o=new g,m=async a=>{try{const t=await fetch(a);return t?t.json():void 0}catch(t){throw t}},b=async(a,t)=>{try{const e=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return e?e.json():void 0}catch(e){throw e}},h=async(a,t)=>{try{const e=await fetch(a,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return e?e.json():void 0}catch(e){throw e}},v=async a=>{try{const t=await fetch(a,{method:"DELETE"});return t?t.json():void 0}catch(t){throw t}};class L{constructor(t,e){this.parent=t,this.id=e,this.product}async getData(){try{const t=await m(o.getStockById(this.id));this.renderData(t)}catch(t){this.parent.innerHTML=`
            <div>ащибка</div>
            `,console.error(t)}}renderData(t){this.product=t,this.product&&(this.parent.innerHTML=`
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-6">
                        <img src="${this.product.src}" class="img-fluid rounded-start"
                             alt="${this.product.title}" style="max-height: 500px; object-fit: cover;"
                             onerror="this.src='https://via.placeholder.com/600x400?text=Нет+изображения'">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h2 class="card-title">${this.product.title}</h2>
                            <p class="text-muted">${this.product.text}</p>
                            <div class="mt-4">
                                <h4>Описание:</h4>
                                <ul class="card-text">
                                    ${this.product.description.map(e=>`<li>${e}</li>`).join("")}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)}render(){this.parent.innerHTML="",this.getData()}}class E{constructor(t,e){this.parent=t,this.id=e,this.product}async getData(){try{const t=await m(o.getStockById(this.id));this.renderData(t)}catch(t){this.parent.innerHTML="<div>ащибка</div>",console.error(t)}}renderData(t){this.product=t,this.product&&(console.log(this.product),this.parent.innerHTML=`
      <div class="container my-4">
        <h1 class="my-4">Редактировать продукт</h1>
        <form id="edit-product-form">
          <div class="mb-3">
            <label class="form-label">Название</label>
            <input type="text" class="form-control" name="title" value="${this.product.title}" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Картинка (URL)</label>
            <input type="text" class="form-control" name="src" required value="${this.product.src}" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Краткий текст</label>
            <input type="text" class="form-control" name="text" required value="${this.product.text}" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Описание (каждая строка = отдельный пункт)</label>
            <textarea class="form-control" name="description" rows="6" required>${this.product.description.join(`
`)}</textarea>
          </div>

          <button type="submit" class="btn btn-primary">Сохранить</button>
          <button type="button" id="cancel-btn" class="btn btn-secondary">Отмена</button>
        </form>
      </div>
    `,this.addEvents())}addEvents(){const t=document.getElementById("edit-product-form"),e=document.getElementById("cancel-btn");t.addEventListener("submit",async s=>{try{s.preventDefault();const n=new FormData(t),r=Object.fromEntries(n.entries());r.description=r.description.split(`
`).map(i=>i.trim()).filter(i=>i.length),r.id=this.id,await h(o.updateStockById(this.id),r),new u(this.parent,r.id).render()}catch(n){this.parent.innerHTML="<div>ащибка</div>",console.error(n)}}),e.addEventListener("click",()=>{new u(this.parent,this.product.id).render()})}render(){this.parent.innerHTML="",this.getData()}}class w{constructor(t,e){this.parent=t,this.id=e,this.product}async getData(){try{const t=await m(o.getStockById(this.id));this.renderData(t)}catch(t){this.parent.innerHTML="<div>ащибка</div>",console.error(t)}}renderData(t){this.product=t,this.product&&(console.log(this.product),this.parent.innerHTML=`
      <div class="container my-4">
        <h1 class="my-4">${this.product.title}</h1>
        <form id="edit-description-form">
            <label class="form-label">Описание</label>
            ${this.product.description.map((e,s)=>`
                    <input type="text" class="form-control" name="description-${s}" required value="${e}">
                    <div class="container my-4">
                        <button type="button" class="btn btn-primary save-btn" data-index="${s}">Редактировать</button>
                        <button type="button" class="btn btn-primary delete-btn" data-index="${s}">Удалить</button>
                    </div>
                    `).join("")}
            <div class="container my-4">
                <button type="button" id="add-btn" class="btn btn-primary">Добавить</button>
                <button type="button" id="cancel-btn" class="btn btn-secondary">Отмена</button>
            </div>
        </form>
      </div>
    `,this.addEvents())}addEvents(){const t=document.querySelectorAll(".save-btn"),e=document.querySelectorAll(".delete-btn"),s=document.getElementById("add-btn"),n=document.getElementById("cancel-btn");t.forEach(r=>{r.addEventListener("click",async i=>{try{const c=i.currentTarget.dataset.index,d=document.querySelector(`input[name="description-${c}"]`).value;await h(o.deleteDescriptionByIndex(this.id,c),{newDescription:d}),this.getData()}catch(c){this.parent.innerHTML="<div>ащибка</div>",console.error(c)}})}),e.forEach(r=>{r.addEventListener("click",async i=>{try{const c=i.currentTarget.dataset.index;await v(o.deleteDescriptionByIndex(this.id,c)),this.getData()}catch(c){this.parent.innerHTML="<div>ащибка</div>",console.error(c)}})}),s.addEventListener("click",async()=>{try{await h(o.addDescriptionById(this.id),{newDescription:"Новая строка"}),this.getData()}catch(r){this.parent.innerHTML="<div>ащибка</div>",console.error(r)}}),n.addEventListener("click",()=>{new u(this.parent,this.id).render()})}render(){this.parent.innerHTML="",this.getData()}}class u{constructor(t,e){this.parent=t,this.product=e}render(){this.parent.innerHTML=`
            <div class="container mt-4">
                <div id="back-button"></div>
                <div id="product-container"></div>
                <div class="container my-4 left">
                    <button id="edit-btn" class="btn btn-sm btn-primary bounce-btn">Редактировать карточку</button>
                    <button id="edit-description-btn" class="btn btn-sm btn-primary bounce-btn">Редактировать описание</button>
                </div>
            </div>

            <style>
                .left {
                    margin-left: auto;
                    margin-right: 20px;
                    display: block;
                }

                .bounce-btn {
                    margin-bottom: 10px;
                    display: block;
                    transition: transform 0.2s;
                }

                .bounce-btn:hover {
                    transform: translateY(-5px);
                }
            </style>
        `,document.getElementById("edit-btn").addEventListener("click",()=>{new E(this.parent,this.product).render()}),document.getElementById("edit-description-btn").addEventListener("click",()=>{new w(this.parent,this.product).render()}),new f(document.getElementById("back-button"),()=>new p(this.parent).render()).render(),new L(document.getElementById("product-container"),this.product).render()}}class x{constructor(t){this.parent=t}isPalindrome1(t){const e=String(t).toLowerCase().replace(/\s/g,""),s=e.split("").reverse().join("");return e===s}isPalindrome2(t){const e=String(t).toLowerCase().replace(/\s/g,"");for(let s=0;s<Math.floor(e.length/2);s++)if(e[s]!==e[e.length-1-s])return!1;return!0}calculateSquareSum(t){return t.reduce((e,s)=>{const n=s.title.replace(/\s/g,"").length;return e+n*n},0)}countPrefixesForVTB(t){const e=t.map(r=>r.title),s="ВТБ";return e.filter(r=>s.startsWith(r)).length}getSumAndMultOfArray(t){let e=0,s=1;return t.forEach(n=>{const r=n.title.replace(/\s/g,"").length;e+=r,s*=r}),{sum:e,multiplication:s}}render(t){const e=this.calculateSquareSum(t),s=this.countPrefixesForVTB(t),{sum:n,multiplication:r}=this.getSumAndMultOfArray(t),c=t.map(d=>({title:d.title,isPalindrome1:this.isPalindrome1(d.title),isPalindrome2:this.isPalindrome2(d.title)})).map(d=>`
                <p class="card-text">
                    ${d.title}: ${d.isPalindrome1?"✅":"❌"}
                </p>
            `).join(""),l=document.createElement("div");l.className="row",l.innerHTML=`
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Статистика заголовков</h5>
                        <p class="card-text">Сумма квадратов: ${e}</p>
                        <p class="card-text">Количество префиксов для "ВТБ": ${s}</p>
                        <p class="card-text">Простая сумма букв: ${n}</p>
                        <p class="card-text">Произведение букв: ${r}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Проверка на палиндром</h5>
                        ${c}
                    </div>
                </div>
            </div>
        `,this.parent.appendChild(l)}}class B{constructor(t){this.parent=t}render(){this.parent.innerHTML=`
      <div class="container my-4">
        <h1 class="my-4">Добавить продукт</h1>
        <form id="add-product-form">
          <div class="mb-3">
            <label class="form-label">Название</label>
            <input type="text" class="form-control" name="title" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Картинка (URL)</label>
            <input type="text" class="form-control" name="src" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Краткий текст</label>
            <input type="text" class="form-control" name="text" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Описание (каждая строка = отдельный пункт)</label>
            <textarea class="form-control" name="description" rows="6" required></textarea>
          </div>

          <button type="submit" class="btn btn-primary">Сохранить</button>
          <button type="button" id="cancel-btn" class="btn btn-secondary">Отмена</button>
        </form>
      </div>
    `,this.addEvents()}addEvents(){const t=document.getElementById("add-product-form"),e=document.getElementById("cancel-btn");t.addEventListener("submit",async s=>{try{s.preventDefault();const n=new FormData(t),r=Object.fromEntries(n.entries());r.description=r.description.split(`
`).map(i=>i.trim()).filter(i=>i.length),await b(o.createStock(),r),new p(this.parent).render()}catch(n){this.parent.innerHTML=`
        <div>ащибка</div>
        `,console.error(n)}}),e.addEventListener("click",()=>{new p(this.parent).render()})}}class p{constructor(t){this.parent=t}async getData(){try{const t=await m(o.getStocks());this.renderData(t)}catch(t){const e=document.getElementById("products-container");e.innerHTML="<div>НЕТ КАРТОЧЕК</div>",console.error("ащибка",t)}}renderData(t){const e=document.getElementById("products-container");e.innerHTML="",this.renderStatistics(t),t.forEach(s=>{new y().render(s,e,n=>this.openProduct(n),n=>this.copyProduct(n),n=>this.deleteProduct(n))})}render(){this.parent.innerHTML=`
            <div class="container">
                <h1 class="my-4">Наши продукты</h1>
                <div id="statistics-container"></div>
                <button id="add-btn" class="btn btn-sm btn-primary bounce-btn">+ Добавить</button>
                <div id="products-container" class="row"></div>
            </div>

            <style>
                .bounce-btn {
                    margin-bottom: 10px;
                    transition: transform 0.2s;
                }

                .bounce-btn:hover {
                    transform: translateY(-5px); 
                }
            </style>
        `,this.getData(),document.getElementById("add-btn").addEventListener("click",()=>{new B(this.parent).render()})}renderStatistics(t){const e=document.getElementById("statistics-container");e.innerHTML="",new x(e).render(t)}openProduct(t){this.parent.innerHTML="",new u(this.parent,t.id).render()}async copyProduct(t){try{const e={...t,title:`${t.title} (копия)`};delete e.id,await b(o.createStock(),e),this.getData()}catch(e){this.parent.innerHTML="<div>ащибка</div>",console.error(e)}}async deleteProduct(t){try{await v(o.getStockById(t)),this.getData()}catch(e){this.parent.innerHTML="<div>ащибка</div>",console.error(e)}}}new p(document.getElementById("root")).render();
