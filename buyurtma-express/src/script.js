const burgerMenu = document.querySelector('.burger-menu');
const menu = burgerMenu.querySelector('.menu');
const burgerBtn = document.querySelector('.burger-btn');
// Получаем текущий URL
var currentUrl = window.location.href;

// Функция для открытия и закрытия бургер-меню
function toggleMenu() {
  const burgerMenu = document.querySelector('.burger-menu');
  const menuLeft = parseInt(getComputedStyle(burgerMenu).left);
  if (menuLeft < 0) {
    burgerMenu.style.left = '0';
    burgerBtn.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }
  else {
    burgerMenu.style.left = '-110%';
    burgerBtn.classList.toggle('active');
    document.body.classList.remove('menu-open');
  }

}
document.addEventListener('DOMContentLoaded', function () {
  var menuItem = document.querySelectorAll('.menu [data-category]');
  var submenus = document.querySelectorAll('.submenu');
  var arrows = document.querySelectorAll('.arrow')
  var windowWidth = window.innerWidth;
  if (windowWidth > 1024) {

    menuItem.forEach(function (menuItem) {
      menuItem.addEventListener('click', function () {
        // Close submenu and burger menu on item click
        closeMenus();
        toggleMenu()
      });

      var submenuId = menuItem.getAttribute('data-category') + '-submenu';
      var submenu = document.getElementById(submenuId);

      if (submenu) {
        menuItem.addEventListener('mouseenter', function () {
          closeMenus(); // Close other submenus
          submenu.classList.add('active');
        });
        // Изменено с mouseleave на submenu.mouseleave
        burgerMenu.addEventListener('mouseleave', function () {
          submenu.classList.remove('active');
        });
      }
    });

    // Функция для закрытия всех подменю
    function closeMenus() {
      submenus.forEach(function (submenus) {
        submenus.classList.remove('active');
      });
    }
    return;
  }



  else {
    menuItem.forEach(function (menuItem) {
      menuItem.addEventListener('click', function () {
        // Close submenu and burger menu on item click
        closeMenus();
      });
      var submenuId = menuItem.getAttribute('data-category') + '-submenu';
      var submenu = document.getElementById(submenuId);

      menuItem.addEventListener('click', function () {
        closeMenus(); // Закрыть другие подменю

        if (!submenu.classList.contains('active')) {
          submenu.classList.add('active');
        }
        else {
          submenu.classList.remove('active');
        }
      });

    });
    arrows.forEach(function (arrow) {
      arrow.addEventListener('click', function () {
        closeMenus();
      });
    });
    // Функция для закрытия всех подменю
    function closeMenus() {
      submenus.forEach(function (submenu) {
        submenu.classList.remove('active');
      });
    }
  }
});

// Добавляем параметр "index" со значением, например, 1
// var newIndex = 1;
// var newUrl = currentUrl + '?index=' + newIndex;

// // Перенаправляем на новый URL
// window.location.href = newUrl;

function filterProducts(category, index) {
  // Добавьте код, который использует индекс
  console.log(`Clicked on category: ${category} with index: ${index}`);
  displayProducts(category);
  closeMenu();
}

menu.addEventListener('click', function (event) {
  const target = event.target;
  const action = target.dataset.action;
  const category = target.dataset.category;
  const index = target.dataset.index;

  if (action === 'filterProducts' && category && index !== undefined) {
    // Вызываем функцию фильтрации продуктов при клике на элемент с data-action="filterProducts"
    filterProducts(category, index);

    // Изменяем URL, добавляя индекс к параметру query
    window.history.pushState({}, '', `?category=${category}&index=${index}`);
  }
});

const products = [
  { name: 'Обувь', category: 'shoes', price: 50, image: 'icon/123BLM16.jpg' },
  { name: 'Игрушки', category: 'toys', price: 100, image: 'icon/123BLM16.jpg' },
  { name: 'Мужская одежда', category: 'clothing_men', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Мебель', category: 'furniture', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Обувь', category: 'shoes', price: 50, image: 'icon/123BLM16.jpg' },
  { name: 'Игрушки', category: 'toys', price: 100, image: 'icon/123BLM16.jpg' },
  { name: 'Мужская одежда', category: 'clothing_men', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Мебель', category: 'furniture', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Обувь', category: 'shoes', price: 50, image: 'icon/123BLM16.jpg' },
  { name: 'Игрушки', category: 'toys', price: 100, image: 'icon/123BLM16.jpg' },
  { name: 'Мужская одежда', category: 'clothing_men', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Мебель', category: 'furniture', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
  { name: 'Футболка', category: 'tshirts', price: 20, image: 'icon/123BLM16.jpg' },
];


function displayProducts(category = 'all') {
  const productCardsContainer = document.getElementById('product-cards-container');
  productCardsContainer.innerHTML = '';

  const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);

  filteredProducts.forEach(product => {
    const card = createProductCard(product);
    productCardsContainer.appendChild(card);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.addEventListener("click", () => openProductPage(product));

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.name;

  const productName = document.createElement('h3');
  productName.textContent = product.name;

  const productPrice = document.createElement('p');
  productPrice.textContent = `$${product.price}`;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttons');

  const addToCartButton = document.createElement('button');
  addToCartButton.classList.add('add-to-cart');
  addToCartButton.textContent = 'В корзину';

  const buyNowButton = document.createElement('button');
  buyNowButton.classList.add('buy-now');
  buyNowButton.textContent = 'Купить';

  buttonsDiv.appendChild(addToCartButton);
  buttonsDiv.appendChild(buyNowButton);

  card.appendChild(image);
  card.appendChild(productName);
  card.appendChild(productPrice);
  card.appendChild(buttonsDiv);

  // Добавьте дополнительные элементы, если необходимо

  return card;
}
function openProductPage(product) {
  // Сохраняем данные о товаре и выбранной категории в localStorage
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  localStorage.setItem("selectedCategory", product.category);

  // Переходим на новую страницу
  window.location.href = "product.html";
}



document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.href.includes('product.html')) {
    displayProducts();
  }
});