// файл script.js

window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    // кнопка изменения знака (+/-)
    document.getElementById("btn_op_sign").onclick = function() { 
        if (!selectedOperation) {
            // Меняем знак числа a
            if (a !== '') {
                a = (-parseFloat(a)).toString();
                outputElement.innerHTML = a;
            }
        } else {
            // Меняем знак числа b
            if (b !== '') {
                b = (-parseFloat(b)).toString();
                outputElement.innerHTML = b;
            }
        }
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;

        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }

    // Кнопка вычисления геометрической прогрессии
    document.getElementById("btn_op_percent").onclick = function() {
        const a1 = parseFloat(prompt("Введите первый член прогрессии (a1):"));
        const q = parseFloat(prompt("Введите знаменатель прогрессии (q):"));
        const n = parseInt(prompt("Введите количество членов прогрессии (n):"));

        if (isNaN(a1) || isNaN(q) || isNaN(n) || n <= 0) {
            alert("Некорректные данные. Пожалуйста, введите числа.");
            return;
        }

        let sum;
        if (q === 1) {
            sum = a1 * n;
        } else {
            sum = a1 * (Math.pow(q, n) - 1) / (q - 1);
        }

        outputElement.innerHTML = sum.toFixed(2);
    }


    };