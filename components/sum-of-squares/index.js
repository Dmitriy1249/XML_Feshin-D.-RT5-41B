export class SumOfSquaresComponent {
    constructor(parent) {
        this.parent = parent;
    }

    isPalindrome1(str) {
        const cleanStr = String(str).toLowerCase().replace(/\s/g, '');
        const reversed = cleanStr.split('').reverse().join('');
        return cleanStr === reversed;
    }

    isPalindrome2(str) {
        const cleanStr = String(str).toLowerCase().replace(/\s/g, '');
        for (let i = 0; i < Math.floor(cleanStr.length / 2); i++) {
            if (cleanStr[i] !== cleanStr[cleanStr.length - 1 - i]) {
                return false;
            }
        }
        return true;
    }

    calculateSquareSum(products) {
        return products.reduce((sum, product) => {
            const letterCount = product.title.replace(/\s/g, '').length;
            return sum + (letterCount * letterCount);
        }, 0);
    }

    countPrefixesForVTB(products) {
        const titles = products.map(product => product.title);
        const targetStr = "ВТБ";
        
        const prefixCount = titles.filter(title => {
            return targetStr.startsWith(title);
        }).length;

        return prefixCount;
    }

    getSumAndMultOfArray(products) {
        let sum = 0;
        let multiplication = 1;
        
        products.forEach(product => {
            const letterCount = product.title.replace(/\s/g, '').length;
            sum += letterCount;
            multiplication *= letterCount;
        });

        return {
            sum: sum,
            multiplication: multiplication
        };
    }

    render(products) {
        const squareSum = this.calculateSquareSum(products);
        const prefixCount = this.countPrefixesForVTB(products);
        const { sum, multiplication } = this.getSumAndMultOfArray(products);
        
        const palindromeResults = products.map(product => ({
            title: product.title,
            isPalindrome1: this.isPalindrome1(product.title),
            isPalindrome2: this.isPalindrome2(product.title)
        }));

        const palindromeHTML = palindromeResults
            .map(result => `
                <p class="card-text">
                    ${result.title}: ${result.isPalindrome1 ? '✅' : '❌'}
                </p>
            `)
            .join('');
        
        const container = document.createElement('div');
        container.className = 'row';
        container.innerHTML = `
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Статистика заголовков</h5>
                        <p class="card-text">Сумма квадратов: ${squareSum}</p>
                        <p class="card-text">Количество префиксов для "ВТБ": ${prefixCount}</p>
                        <p class="card-text">Простая сумма букв: ${sum}</p>
                        <p class="card-text">Произведение букв: ${multiplication}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Проверка на палиндром</h5>
                        ${palindromeHTML}
                    </div>
                </div>
            </div>
        `;
        
        this.parent.appendChild(container);
    }
} 