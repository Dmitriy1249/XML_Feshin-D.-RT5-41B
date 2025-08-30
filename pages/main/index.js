import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { SumOfSquaresComponent } from "../../components/sum-of-squares/index.js";
import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";
import {AddProductPage} from "../add-page/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() { // тут мы будем с бэка получать карточки (все)
        ajax.get(stockUrls.getStocks(), (data) => {
            this.renderData(data);
            // здесь на самом деле не сама функция, а адрес 00000x43
        });
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

    copyProduct(product) {
        const newProduct = {
            ...product,
            title: `${product.title} (копия)`,
        };
        delete newProduct.id;
        ajax.post(stockUrls.createStock(), newProduct, () => this.getData());
        // (аргументы, которые принимаем) => { то, что мы делаем }
        // function название(аргументы, которые принимаем) {
        //     то, что мы делаем
        // }
    }

    deleteProduct(id) {
        ajax.delete(stockUrls.removeStockById(id), () => this.getData());
    }
}
