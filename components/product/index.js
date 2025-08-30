import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";

export class ProductComponent {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.product;
    }

    getData() { // тут мы будем с бэка получать карточки (по id)
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.renderData(data);
        });
    }

    renderData(data) {
        this.product = data;

        if (!this.product) return;

        this.parent.innerHTML = `
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
                                    ${this.product.description.map(line => `<li>${line}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        this.getData();
    }
}