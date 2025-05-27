export class BackButtonComponent {
    constructor(parent, onClick) {
        this.parent = parent;
        this.onClick = onClick;
    }

    render() {
        const button = document.createElement('button');
        button.className = 'btn btn-secondary mb-4';
        button.innerHTML = '← Назад к продуктам';
        button.addEventListener('click', this.onClick);
        this.parent.appendChild(button);
    }
}