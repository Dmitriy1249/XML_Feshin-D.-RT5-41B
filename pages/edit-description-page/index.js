import {stockUrls} from "../../modules/stockUrls.js";
import { MainPage } from "../main/index.js";
import {ProductPage} from "../product/index.js";
import * as api from "../../modules/api.js";

export class EditDescriptionPage{
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
            this.parent.innerHTML = `<div>ошибка</div>`;
            console.error(err);
        }
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
            btn.addEventListener("click", async (event) => {
                try {
                    const index = event.currentTarget.dataset.index; // узнали индекс кнопки, которую нажали
                    const input = document.querySelector(`input[name="description-${index}"]`); // взяли тот инпут, которому принадлежит кнопка
                    const newValue = input.value;

                    await api.patch(stockUrls.deleteDescriptionByIndex(this.id, index), {newDescription: newValue});
                    this.getData();
                } catch(err){
                    this.parent.innerHTML = `<div>ошибка</div>`;
                    console.error(err);
                }
            })
        })

        deleteBtn.forEach(btn => {
            btn.addEventListener("click", async (event) => {
                try {
                    const index = event.currentTarget.dataset.index;
                    await api.del(stockUrls.deleteDescriptionByIndex(this.id, index));
                    this.getData();
                } catch(err) {
                    this.parent.innerHTML = `<div>ошибка</div>`;
                    console.error(err);
                }
            })
        })

        addBtn.addEventListener("click", async () => {
            try {
                await api.patch(stockUrls.addDescriptionById(this.id), {newDescription: "Новая строка"});
                this.getData();
            } catch(err) {
                this.parent.innerHTML = `<div>ошибка</div>`;
                console.error(err);
            }
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