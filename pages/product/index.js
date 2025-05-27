import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { MainPage } from "../main/index.js";

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
            </div>
        `;
        
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