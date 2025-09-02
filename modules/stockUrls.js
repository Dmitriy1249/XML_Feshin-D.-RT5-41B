class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3001';
    }

    getStocks(title) { // http://localhost:3000/stocks AND http://localhost:3000/stocks?title=...
        if (!title) return `${this.baseUrl}/stocks`; 
        return `${this.baseUrl}/stocks?title=${title}`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`; // http://localhost:3000/stocks/id
    }

    createStock() { // http://localhost:3000/stocks BODY
        return `${this.baseUrl}/stocks`;
    }

    updateStockById(id) { // http://localhost:3000/stocks/:id BODY
        return `${this.baseUrl}/stocks/${id}`;
    }

    removeStockById(id) { // http://localhost:3000/stocks/:id
        return `${this.baseUrl}/stocks/${id}`;
    }

    addDescriptionById(id) { // localhost:3000/stocks/1/description BODY
        return `${this.baseUrl}/stocks/${id}/description`;
    }

    updateDescriptionByIndex(id, index) {
        return `${this.baseUrl}/stocks/${id}/description/${index}`;
    }

    deleteDescriptionByIndex(id, index) {
        return `${this.baseUrl}/stocks/${id}/description/${index}`;
    }
}

export const stockUrls = new StockUrls();