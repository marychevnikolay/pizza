'use strict';

const hamb = document.querySelector('.menu');
const menuList = document.querySelector('.menu--list');
const navLink = document.querySelectorAll('.menu--item');

hamb.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamb.classList.toggle("active");
    menuList.classList.toggle("active");
}

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamb.classList.remove("active");
    menuList.classList.remove("active");
}

const popup = document.querySelector('.popup-consultation');
const btnMain = document.querySelector('.btn.btn-main');
const close = document.querySelector('.popup-close');

btnMain.addEventListener('click', function (){
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';

});

close.addEventListener('click', function() {
    popup.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.marginRight = `0px`;
});

const modal = document.querySelector('.modal');
const btnCart = document.querySelector('.button.button-cart');
const modalClose = document.querySelector('.close');

btnCart.addEventListener('click', function (){
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

});

modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    document.body.style.marginRight = `0px`;
});



//form
let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
};

const form = document.querySelector('.form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    let formData = new FormData(form);

    let obj = {};
    formData.forEach(function(value, key) {
        obj[key] = value;
    });
    let json = JSON.stringify(obj);

    request.send(json);

    request.addEventListener('readystatechange', function() {
        if (request.readyState < 4) {
            statusMessage.innerHTML = message.loading;
        } else if(request.readyState === 4 && request.status == 200) {
            statusMessage.innerHTML = message.success;
        } else {
            statusMessage.innerHTML = message.failure;
        }
    });


    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }
});




//распределение продуктов по категориям

// Подключение JSON


const init = () => {
   $.getJSON("./db/db.json", getProducts);
};



// Получение товаров с JSON 
const getProducts = (data) => {
   let sets = data.sets;
   let rolls = data.rolls;
   let pizza = data.pizza;
   let wok = data.wok;
   let newElement = "";

   for (let key in sets) {
      newElement += createElement( sets[key].id, sets[key].name, sets[key].foodValue, sets[key].price, sets[key].image,  sets[key].counter, sets[key].popular, sets[key].vegetarian, sets[key].new, sets[key].spicy);

      $(".sets-products").html(newElement);
   }

   newElement = "";
   for (let key in rolls) {
      newElement += createElement(rolls[key].id,rolls[key].name, rolls[key].foodValue, rolls[key].price,   rolls[key].image, rolls[key].counter, rolls[key].popular, rolls[key].vegetarian, rolls[key].new, rolls[key].spicy) ;

      $(".rolls-products").html(newElement);
   }

   newElement = "";
   for (let key in pizza) {
      newElement += createElement(pizza[key].id, pizza[key].name, pizza[key].foodValue, pizza[key].price, pizza[key].image, pizza[key].counter, pizza[key].popular, pizza[key].vegetarian, pizza[key].new, pizza[key].spicy);

      $(".pizza-products").html(newElement);
   }
   newElement = "";
   for (let key in wok) {
      newElement += createElement(wok[key].id, wok[key].name, wok[key].foodValue, wok[key].price, wok[key].image, wok[key].counter,  wok[key].popular, wok[key].vegetarian, wok[key].new, wok[key].spicy, wok[key].sauce);

      $(".wok-products").html(newElement);
   }
}


const btnClick = (e) => {
   e.preventDefault();
   console.log("hello");
};

const createElement = (id, name, foodValue, price, image) => {
//    let elementModificator = "";
//    if (newDish) {
//       elementModificator += " new-dish";
//    }
//    if (popular) {
//       elementModificator += " popular-dish";
//    } else if (vegetarian) {
//       elementModificator += " veg-dish";
//    } else if (spicy) {
//       elementModificator += " spicy-dish";
//    }

   return `

    <article  class="swiper-slide catalog-wrapper-card good" data-id=${id}>
        <img class="radius-img good-image" src="img/${image}" alt="">
        <h4 class="good--title">${name}</h4>
        <div class="catalog-wrapper-card_title">
            ${foodValue}
        </div>
    
        <div class="catalog-wrapper-card_price">
            <span class="cost">${price} руб</span>
            <div class="catalog-wrapper-card_item p-l">
                <div class="catalog-wrapper-card_control" data-action="minus">-</div>
                <div class="catalog-wrapper-card_current" data-counter>1</div>
                <div class="catalog-wrapper-card_control" data-action="plus">+</div>
            </div> 
        </div>
        <button  data-cart class="btn btn-goods btn-cart">в корзину<img src="img/online-shopping-cart.svg" alt=""></button>
    </article>      
   `
};


$(document).ready(() => {
   init()
});


// Добавляем прослушку на всем окне
window.addEventListener('click', function (event) {

    // Объявляем переменную для счетчика
    let counter;

    // Проверяем клик строго по кнопкам Плюс либо Минус
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        // Находим обертку счетчика
        const counterWrapper = event.target.closest('.catalog-wrapper-card_item');
        // Находим див с числом счетчика
        counter = counterWrapper.querySelector('[data-counter]');
    }

    // Проверяем является ли элемент по которому был совершен клик кнопкой Плюс
    if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
    }

    // Проверяем является ли элемент по которому был совершен клик кнопкой Минус
    if (event.target.dataset.action === 'minus') {

        // Проверяем чтобы счетчик был больше 1
        if (parseInt(counter.innerText) > 1) {
            // Изменяем текст в счетчике уменьшая его на 1
            counter.innerText = --counter.innerText;
        } else if (event.target.closest('.modal-body') && parseInt(counter.innerText) === 1) {
            // Проверка на товар который находится в корзине
            console.log('IN CART!!!!');
            // Удаляем товар из корзины
            event.target.closest('.food-row').remove();

        
        }

    }

    // Проверяем клик на + или - внутри коризины
    if (event.target.hasAttribute('data-action') && event.target.closest('.modal-body')) {
        // Пересчет общей стоимости товаров в корзине
        // calcCartPriceAndDelivery();
    }
});



const modalBody =  document.querySelector('.modal-body');
// const modalPrice = document.querySelector('.modal-pricetag');
// const costEl = modalBody.querySelectorAll('.food-price');
// const cart = [];
// Отслеживаем клик на странице
window.addEventListener('click', function (event) {
    // Проверяем что клик был совершен по кнопке "Добавить в корзину"
    if (event.target.hasAttribute('data-cart')) {

        // Находим карточку с товаром, внутри котрой был совершен клик
        const card = event.target.closest('.good');

        // Собираем данные с этого товара и записываем их в единый объект productInfo
        const productInfo = {
            id:  card.getAttribute('data-id'),
            name: card.querySelector('.good--title').innerText,
            price: card.querySelector('.cost').innerText,
            image: card.querySelector('.good-image').getAttribute('src'),
            counter: card.querySelector('[data-counter]').innerText,
        };

        

        // Проверять если ли уже такой товар в корзине
        const itemInCart = modalBody.querySelector(`[data-id="${productInfo.id}"]`);
        // const id = productInfo.id;
        // Если товар есть в корзине
        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        } else {
            // Если товара нет в корзине

            // Собранные данные подставим в шаблон для товара в корзине
            const cartItemHTML = `
                <div class="food-row" data-id="${productInfo.id}">
                    <img class="food-img" src="${productInfo.image}">
                    <span class="food-name">${productInfo.name}</span>
                    <strong class="food-price cost">${productInfo.price}</strong>
                    <div class="food-counter catalog-wrapper-card_item">
                        <div class="catalog-wrapper-card_control" data-action="minus">-</div>
                        <div class="catalog-wrapper-card_current" data-counter>${productInfo.counter}</div>
                        <div class="catalog-wrapper-card_control" data-action="plus">+</div>
                    </div>
                </div>    
          `;

            // Отобразим товар в корзине
            modalBody.insertAdjacentHTML('beforeend', cartItemHTML);
        }

        // Сбрасываем счетчик добавленного товара на "1"
        card.querySelector('[data-counter]').innerText = '1';
           
    }

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
});
   