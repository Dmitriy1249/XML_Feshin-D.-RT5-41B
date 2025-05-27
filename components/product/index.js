export class ProductComponent {
    constructor(parent, product) {
        this.parent = parent;
        this.product = product;
    }

    render() {
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
                                <p class="card-text">${this.product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}