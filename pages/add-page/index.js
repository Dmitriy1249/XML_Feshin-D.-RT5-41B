import {stockUrls} from "../../modules/stockUrls.js";
import {MainPage} from "../main/index.js";
import * as api from "../../modules/api.js";

export class AddProductPage {
    constructor(parent){
        this.parent = parent;
    } 

    render() {
    this.parent.innerHTML = `
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
    `;

    this.addEvents();
  }

  addEvents() {
    const form = document.getElementById("add-product-form");
    const cancelBtn = document.getElementById("cancel-btn");
    
    form.addEventListener("submit", async (event) => {
      try {
        event.preventDefault(); // запрещаем браузеру перезагружать страницу при отправке формы
        const formData = new FormData(form);
        const product = Object.fromEntries(formData.entries());
        product.description = product.description.split("\n").map(s => s.trim()).filter(s => s.length);
        await api.post(stockUrls.createStock(), product);
        new MainPage(this.parent).render();
      }catch(err){
        this.parent.innerHTML = `
        <div>ащибка</div>
        `; 
        console.error(err);
      }
    }
    )

    cancelBtn.addEventListener("click", () => {new MainPage(this.parent).render()})
}
}
/*
{ так выглядит product
    title: "",
    src: "",
    text: "",
    description: "" 
}
*/