class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    get(url, callback) {
        // url = "localhost.../stocks"
        // callback = (data) => {
        //   this.renderData(data);
        //}
        const xhr = new XMLHttpRequest(); // открытие возможности постучаться на бэк
        xhr.open('GET', url); // создали с данными
        xhr.send(); // послали запрос

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки (BODY)
     * @param {function} callback - Функция обратного вызова (data, status)
     */

    post(url, data, callback) {
        const xhr = new XMLHttpRequest(); // открытие возможности постучаться на бэк
        xhr.open('POST', url); // создали с данными
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data)); // послали запрос с BODY "{ id: 1, title: "ahaha" }"

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    patch(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("PATCH", url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                console.log('ready')
                this._handleResponse(xhr, callback);
            }
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    delete (url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        }
    }

    /**
     * Обработчик ответа (приватный метод)
     * @param {XMLHttpRequest} xhr - Объект запроса
     * @param {function} callback - Функция обратного вызова
     */
    _handleResponse(xhr, callback) {
        // xhr = xhr (object)
        // callback = (data) => {
        //   this.renderData(data);
        //}
        try {
            const data = xhr.responseText ? JSON.parse(xhr.responseText) : null; // здесь лежат все карточки с бэке (в json'e)
            callback(data, xhr.status);
            // все, конец
        } catch (error) {
            console.error("Ошибка парсинга JSON", error);
            callback(null, xhr.status);
        }
    }
}


/*
0 – UNSENT (объект создан, open() не вызван)

1 – OPENED (вызван open)

2 – HEADERS_RECEIVED (получены заголовки ответа)

3 – LOADING (получается тело ответа)

4 – DONE (ответ полностью получен)
*/
export const ajax = new Ajax();
