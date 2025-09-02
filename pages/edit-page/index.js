import {stockUrls} from "../../modules/stockUrls.js";
import { MainPage } from "../main/index.js";
import {ProductPage} from "../product/index.js";
import * as api from "../../modules/api.js";

export class EditProductPage{
    constructor(parent, id){
        this.parent = parent;
        this.id = id;
        this.product;
    }

    async getData() {
        try {
          const data = await api.get(stockUrls.getStockById(this.id));
          this.renderData(data);
        } catch(err){
          this.parent.innerHTML = `<div>ащибка</div>`;
          console.error(err);
        }
    }

    renderData(data) {
        this.product = data;
        if (!this.product) return;

        console.log(this.product);
        
        this.parent.innerHTML = `
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
            <textarea class="form-control" name="description" rows="6" required>${this.product.description.join('\n')}</textarea>
          </div>

          <button type="submit" class="btn btn-primary">Сохранить</button>
          <button type="button" id="cancel-btn" class="btn btn-secondary">Отмена</button>
        </form>
      </div>
    `;

      this.addEvents();
    }

    addEvents() {
        const form = document.getElementById("edit-product-form");
        const cancelBtn = document.getElementById("cancel-btn");
        form.addEventListener("submit", async (event) => {
          try {
            event.preventDefault();
            const formData = new FormData(form);
            const product = Object.fromEntries(formData.entries());
            product.description = product.description.split('\n').map(s => s.trim()).filter(s => s.length);
            product.id = this.id;

            await api.patch(stockUrls.updateStockById(this.id), product);
            new ProductPage(this.parent, product.id).render();
          } catch(err){
            this.parent.innerHTML = `<div>ащибка</div>`;
            console.error(err);
          }
        })
        cancelBtn.addEventListener("click", () => {
            new ProductPage(this.parent, this.product.id).render();
        })
    }

    render() {
        this.parent.innerHTML = '';
        this.getData();
    }
}