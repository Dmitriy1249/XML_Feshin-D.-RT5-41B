import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { MainPage } from "../main/index.js";
import { EditProductPage } from "../edit-page/index.js" 
import { EditDescriptionPage } from "../edit-description-page/index.js" 

export class ProductPage {
    constructor(parent, product) {
        this.parent = parent;
        this.product = product;
    }

    render() {
        this.parent.innerHTML = `
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
        `;
        
        const editBtn = document.getElementById("edit-btn");
        editBtn.addEventListener("click", () => {
            new EditProductPage(this.parent, this.product).render();
        });

        const editDescriptionBtn = document.getElementById("edit-description-btn");
        editDescriptionBtn.addEventListener("click", () => {
            new EditDescriptionPage(this.parent, this.product).render();
        });

        new BackButtonComponent(
            document.getElementById('back-button'),
            () => new MainPage(this.parent).render()
        ).render();
        
        new ProductComponent(
            document.getElementById('product-container'),
            this.product
        ).render();

    }
}