import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { SumOfSquaresComponent } from "../../components/sum-of-squares/index.js";
import * as api from '../../modules/api.js'; 
import {stockUrls} from "../../modules/stockUrls.js";
import {AddProductPage} from "../add-page/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    async getData() { // тут мы будем с бэка получать карточки (все)
        try {
            const data = await api.get(stockUrls.getStocks());
            this.renderData(data);
        } catch (e) {
            const container = document.getElementById('products-container');
            container.innerHTML = `<div>НЕТ КАРТОЧЕК</div>`;
            console.error("ащибка", e);
        }
    }

  renderData(items) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    this.renderStatistics(items);
    items.forEach((item) => {
      new ProductCardComponent().render(
        item,
        container,
        (p) => this.openProduct(p),
        (p) => this.copyProduct(p),
        (id) => this.deleteProduct(id),
      );
    });
  }

    render() {
        this.parent.innerHTML = `
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
        `;
        this.getData();

        const addBtn = document.getElementById("add-btn");
        addBtn.addEventListener("click", () => {
            new AddProductPage(this.parent).render();
        });
    }

    renderStatistics(data) {
        const container = document.getElementById('statistics-container');
        container.innerHTML = '';
        new SumOfSquaresComponent(container).render(data);
    }

    openProduct(product) {
        this.parent.innerHTML = '';
        new ProductPage(this.parent, product.id).render();
    }

    async copyProduct(product) {
        try {
        const newProduct = {
            ...product,
            title: `${product.title} (копия)`,
        };
        delete newProduct.id;
        await api.post(stockUrls.createStock(), newProduct);
        this.getData();
        } catch(err){
            this.parent.innerHTML = `<div>ащибка</div>`;
            console.error(err);
        }
    }

    async deleteProduct(id) {
        try {
            await api.del(stockUrls.getStockById(id));
            this.getData();
        } catch(err){
            this.parent.innerHTML = `<div>ащибка</div>`;
            console.error(err);
        }
    }
}
