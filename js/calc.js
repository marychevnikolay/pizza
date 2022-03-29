

function calcCartPriceAndDelivery() {
    const cartWrapper = document.querySelector('.modal-body');
    const priceElements = cartWrapper.querySelectorAll('.cost');
    const totalPriceEl = document.querySelector('.modal-pricetag');



    // Общая стоимость товаров
    let priceTotal = 0;

    // Обходим все блоки с ценами в корзине
    priceElements.forEach(function (item) {
        // Находим количество товара
        const amountEl = item.closest('.food-row').querySelector('[data-counter]');
        // Добавляем стоимость товара в общую стоимость (кол-во * цену)
        priceTotal += parseInt(item.innerText) * parseInt(amountEl.innerText);
    });

    // Отображаем цену на странице
    totalPriceEl.innerText = priceTotal + 'руб';
}