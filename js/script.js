var goods = {
    "00001" : {
        "name" : "Бургер",
        "cost" : 150,
        "description" : "бургер чистая говядина, жареная правильно",
        "image" : "img/11111.png",
        "categoryId" : "Фрукты"
    },
    "00002" : {
        "name" : "Лапша ",
        "cost" : 90,
        "description" : " просто саго лапша просто саго лапша просто саго лапша просто саго лапша просто саго лапшапросто саго лапша просто саго лапшапросто саго лапша просто саго лапша просто саго лапшапросто саго лапша просто саго лапша просто саго лапша просто саго лапша просто саго лапшапросто саго лапша просто саго лапшапросто саго лапша",
        "image" : "img/22222.png",
         "categoryId" : "Фрукты"
    },
    "00003" : {
        "name" : "Пицца",
        "cost" : 250,
        "description" : "пицца очень вкусная",
        "image" : "img/33333.png",
         "categoryId" : "овощи"
    },
    "00004" : {
        "name" : "Шашлык",
        "cost" : 50,
        "description" : "очень сочный ",
        "image" : "img/44444.png",
         "categoryId" : "овощи"
    },
    "00005" : {
        "name" : "Напитки",
        "cost" : 350,
        "description" : "нужно пить их всегда",
        "image" : "img/55555.png",
         "categoryId" : "овощи"
    },
    "00006" : {
        "name" : "Хлеб",
        "cost" : 15,
        "description" : "всегда свежий",
        "image" : "img/66666.jpg",
         "categoryId" : "Ботинки"
    },
    "00007" : {
        "name" : "соусы",
        "cost" : 500,
        "description" : "соус дрогой так как используются очень дорогие индигриенты",
        "image" : "img/77777.jpg",
         "categoryId" : "овощи"
    
}};

function getCategories(goods){
  let categories = new Set();
  for (good in goods){
    categories.add(goods[good].categoryId);  
  }    
  return categories;
}


$(document).ready(function(){
  $('#goods1').append("<h2>Категории</h2>");
  let categories = getCategories(goods);
  categories.forEach((category,categoryAgain,categories)=>{
    let out = '<h3 id="goods2">'+category+'</h3>';
    $('#goods1').append(out);
      for (good in goods){
       if(category == goods[good].categoryId){
          out = "<p>"+goods[good].name +", price: " +goods[good].price+"</p>";
          $('#goods1').append(out);
       }  
      }
  })
})