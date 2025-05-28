import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { SumOfSquaresComponent } from "../../components/sum-of-squares/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.products = this.loadProducts();
    }

    loadProducts() {
        const saved = localStorage.getItem('products');
        return saved ? JSON.parse(saved) : [
            {
                id: 1,
                src: "https://avatars.mds.yandex.net/i?id=2ee2c2c1afeb06ac3d644d0a8a6777d956dea938-12472731-images-thumbs&n=13",
                title: "ВТБ Накопительный счет",
                text: "Высокие проценты",
                description: "Доступ к пополнению счета и снятии денежных средств до 99%"
            },
            {
                id: 2,
                src: "https://sberex.ru/wp-content/uploads/2019/05/pasted.jpg",
                title: "Кредитная карта ВТБ",
                text: "Льготный период",
                description: "Беспроцентный период до 120 дней"
            },
            {
                id: 3,
                src: "https://shareholder-guide.vtb.ru/images/share/logo-ru.jpg",
                title: "ВТБ",
                text: "Лучший банк страны",
                description: "Подходит для всех слоев населения"
            },
            {
                id: 4,
                src: "https://avatars.mds.yandex.net/i?id=848c27e16857aab3b38dd44bf2215977_l-5277049-images-thumbs&n=13",
                title: "шалаш",
                text: "Лучшее место для консультаций",
                description: "В каждом городе России"
            },
            {
                id: 5,
                src: "https://avatars.mds.yandex.net/i?id=7533def7ad75a500a7bd51f865c75c79_l-7010604-images-thumbs&n=13",
                title: "ВТБ Дебетовая карта",
                text: "Кэшбэк 5%",
                description: "Возврат денег за покупки в выбранных категориях"
            }
        ];
    }

    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    render() {
        this.parent.innerHTML = `
            <div class="container">
                <h1 class="my-4">Наши предложения</h1>
                <div id="statistics-container"></div>
                <div id="products-container" class="row"></div>
            </div>
        `;
        this.renderStatistics();
        this.renderProducts();
    }

    renderProducts() {
        const container = document.getElementById('products-container');
        container.innerHTML = '';
        this.products.forEach(product => {
            new ProductCardComponent().render(
                product,
                container,
                (p) => this.openProduct(p),
                (p) => this.copyProduct(p),
                (id) => this.deleteProduct(id)
            );
        });
    }

    renderStatistics() {
        const container = document.getElementById('statistics-container');
        container.innerHTML = '';
        new SumOfSquaresComponent(container).render(this.products);
    }

    openProduct(product) {
        this.parent.innerHTML = '';
        new ProductPage(this.parent, product).render();
    }

    copyProduct(product) {
        const newProduct = {...product, id: Date.now()};
        this.products.push(newProduct);
        this.saveProducts();
        this.renderProducts();
        this.renderStatistics();
    }

    deleteProduct(id) {
        if (confirm('Удалить этот предложение?')) {
            this.products = this.products.filter(p => p.id !== id);
            this.saveProducts();
            this.renderProducts();
            this.renderStatistics();
        }
    }
}