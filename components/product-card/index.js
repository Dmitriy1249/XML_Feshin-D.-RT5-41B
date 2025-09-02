export class ProductCardComponent {
    render(product, parent, onOpen, onCopy, onDelete) {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <img src="${product.src}" class="card-img" alt="${product.title}"
                     onerror="this.src='https://via.placeholder.com/300?text=Нет+фото'">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.text}</p>
                </div>
                <div class="card-footer bg-transparent">
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-sm btn-primary">Подробнее</button>
                        <div>
                            <button class="btn btn-sm btn-outline-secondary me-2">Копировать</button>
                            <button class="btn btn-sm btn-outline-danger">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const [detailsBtn, copyBtn, deleteBtn] = card.querySelectorAll('button');
        detailsBtn.addEventListener('click', () => onOpen(product));
        copyBtn.addEventListener('click', () => onCopy(product));
        deleteBtn.addEventListener('click', () => onDelete(product.id));

        parent.appendChild(card);
    }
}