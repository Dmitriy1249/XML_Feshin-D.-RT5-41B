import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";
import { MainPage } from "../main/index.js";
import {ProductPage} from "../product/index.js";

export class EditDescriptionPage{
    constructor(parent, id){
        this.parent = parent;
        this.id = id;
        this.product;
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (product) => {
            this.renderData(product);
        })
    }

    renderData(data) {
        this.product = data;
        if (!this.product) return;

        console.log(this.product);
        
        this.parent.innerHTML = `
      <div class="container my-4">
        <h1 class="my-4">${this.product.title}</h1>
        <form id="edit-description-form">
            <label class="form-label">Описание</label>
            ${
                this.product.description.map((line, index) =>
                    `
                    <input type="text" class="form-control" name="description-${index}" required value="${line}">
                    <div class="container my-4">
                        <button type="button" class="btn btn-primary save-btn" data-index="${index}">Редактировать</button>
                        <button type="button" class="btn btn-primary delete-btn" data-index="${index}">Удалить</button>
                    </div>
                    `).join('')
            }
            <div class="container my-4">
                <button type="button" id="add-btn" class="btn btn-primary">Добавить</button>
                <button type="button" id="cancel-btn" class="btn btn-secondary">Отмена</button>
            </div>
        </form>
      </div>
    `;

    this.addEvents();
    }

    addEvents() {
        const saveBtn = document.querySelectorAll(".save-btn");
        const deleteBtn = document.querySelectorAll(".delete-btn");
        const addBtn = document.getElementById("add-btn");
        const cancelBtn = document.getElementById("cancel-btn");

        saveBtn.forEach(btn => {
            btn.addEventListener("click", (event) => {
                const index = event.currentTarget.dataset.index; // узнали индекс кнопки, которую нажали
                const input = document.querySelector(`input[name="description-${index}"]`); // взяли тот инпут, которому принадлежит кнопка
                const newValue = input.value;
                ajax.patch(stockUrls.updateDescriptionByIndex(this.id, index), {newDescription: newValue}, () => {
                    this.getData();
                })
            })
        })

        deleteBtn.forEach(btn => {
            btn.addEventListener("click", (event) => {
                const index = event.currentTarget.dataset.index;
                ajax.delete(stockUrls.deleteDescriptionByIndex(this.id, index), () => {
                    this.getData();
                })
            })
        })

        addBtn.addEventListener("click", () => {
            ajax.patch(stockUrls.addDescriptionById(this.id), { newDescription: "Новое поле"}, () => {
                this.getData();
            })
        })

        cancelBtn.addEventListener("click", () => {
            new ProductPage(this.parent, this.id).render();
        })
    }

    render() {
        this.parent.innerHTML = '';
        this.getData();
    }
}