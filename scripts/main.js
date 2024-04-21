const menuEmanil =  document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const menuHanIcon = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');
const menuCarroIcon = document.querySelector('.navbar-shopping-cart');
const productDetailCloseIcon = document.querySelector('.product-detail-close');
const shoppingCartContainer = document.querySelector('#shoppingCartContainer');
const cardsContainer = document.querySelector('.cards-container');
const productDetailContainer = document.querySelector('#productDetail');
const productList = [];
const prueba = document.querySelector('.prueba');




menuEmanil.addEventListener('click',toggleDesktopMenu);
menuHanIcon.addEventListener('click',toggleMobileMenu);
menuCarroIcon.addEventListener('click',toggleCarroAside);
productDetailCloseIcon.addEventListener('click', closeProductDetailAside);

function toggleDesktopMenu() {
    const isAsideClosed = shoppingCartContainer.classList.contains('inactive');

    if (!isAsideClosed) {
        shoppingCartContainer.classList.add('inactive')
    }

    desktopMenu.classList.toggle('inactive');
    closeProductDetailAside();
}

function toggleMobileMenu() {
    const isAsideClosed = shoppingCartContainer.classList.contains('inactive');

    if (!isAsideClosed) {
        shoppingCartContainer.classList.add('inactive')
    }

    closeProductDetailAside();
    mobileMenu.classList.toggle('inactive');

}

function toggleCarroAside() {
    const isMobileMenuClosed = mobileMenu.classList.contains('inactive');
    
    if (!isMobileMenuClosed) {
        mobileMenu.classList.add('inactive')
    }

    const isProductDetailClosed = productDetailContainer.classList.contains('inactive');

    if (!isProductDetailClosed) {
        productDetailContainer.classList.add('inactive');
    }


    ClosedDesktopMenu();

    shoppingCartContainer.classList.toggle('inactive')
}


productList.push({
    name: 'Maquillaje',
    price: 120,
    image: 'https://media.istockphoto.com/id/1296705483/es/foto/elabora-productos-basados-en-podios-blancos-sobre-fondo-rosa-en-pastel.jpg?s=2048x2048&w=is&k=20&c=QLk-QdKfqaxqt1FXKiiKMhD3wSjMDvk1ijQCBWTG6Do=',
    description: 'prueba prueba prueba prueba',
});

productList.push({
    name: 'Maquillaje2',
    price: 220,
    image: 'https://media.istockphoto.com/id/1296705483/es/foto/elabora-productos-basados-en-podios-blancos-sobre-fondo-rosa-en-pastel.jpg?s=2048x2048&w=is&k=20&c=QLk-QdKfqaxqt1FXKiiKMhD3wSjMDvk1ijQCBWTG6Do=',
    description: 'prueba prueba prueba prueba',
});

productList.push({
    name: 'Maquillaje3',
    price: 320,
    image: 'https://media.istockphoto.com/id/1296705483/es/foto/elabora-productos-basados-en-podios-blancos-sobre-fondo-rosa-en-pastel.jpg?s=2048x2048&w=is&k=20&c=QLk-QdKfqaxqt1FXKiiKMhD3wSjMDvk1ijQCBWTG6Do=',
    description: 'prueba prueba prueba prueba',
});





function showProducts(arr) {
    for (const product of arr) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
    
        const productImg = document.createElement('img');
        productImg.setAttribute('src', product.image);
        productImg.dataset.productName = product.name; // Aquí almacenamos el nombre del producto como un atributo de datos en el elemento de imagen
        productImg.addEventListener('click', openProductDetailAside);
    
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');
    
        const productInfoDiv = document.createElement('div');
        const productPrice = document.createElement('p');
        productPrice.innerText = '$' + product.price;
        const productName = document.createElement('p');
        productName.innerText = product.name;
    
        productInfoDiv.appendChild(productPrice);
        productInfoDiv.appendChild(productName);
        
        const productInfoFigure = document.createElement('figure');
        const productFigureImg = document.createElement('img');
        productFigureImg.setAttribute('src', './icons/bt_add_to_cart.svg');
    
    
        productInfoFigure.appendChild(productFigureImg);
    
        productInfo.appendChild(productInfoDiv);
        productInfo.appendChild(productInfoFigure);
    
        productCard.appendChild(productImg);
        productCard.appendChild(productInfo);
    
        cardsContainer.appendChild(productCard);
    }
}

function openProductDetailAside(event) {

    const productName = event.currentTarget.dataset.productName;

    createProductDetailContainer(productName);
    shoppingCartContainer.classList.add('inactive')
    productDetailContainer.classList.remove('inactive');
    ClosedDesktopMenu();
}

function closeProductDetailAside() {
    productDetailContainer.classList.add('inactive')
}

function ClosedDesktopMenu() {
    const isDesktopMenuClosed = desktopMenu.classList.contains('inactive');

    if(!isDesktopMenuClosed){
        desktopMenu.classList.add('inactive');
    }
}


showProducts(productList);


/* <aside id="productDetail" class="inactive">
        <div class="product-detail-close">
            <img src="./icons/icon_close.png" alt="close">
        </div>
        <img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="bike">
        <div class="product-info">
            <p>$35,00</p>
            <p>Bike</p>
            <p>With its practical position, this bike also fulfills a decorative function, add your hall or workspace.</p>
            <button class="primary-button add-to-cart-button">
                <img src="./icons/bt_add_to_cart.svg" alt="add to cart">
                Add to cart
            </button>
        </div>
</aside> */

function createProductDetailContainer(productName) {
    
    productDetailContainer.innerHTML = ""

    let productDetailMax = {};

    const productDetailClose = document.createElement('div');
    productDetailClose.classList.add('product-detail-close');
    const iconClose = document.createElement('img');
    iconClose.setAttribute('src', './icons/icon_close.png');
    iconClose.setAttribute('alt', 'close')
    productDetailClose.appendChild(iconClose);

    const imgProduct = document.createElement('img');
    for (const product of productList) {
        if (product.name === productName ) {
            productDetailMax = product;
        }
    }
    imgProduct.setAttribute('src', productDetailMax.image);
    imgProduct.setAttribute('alt', productDetailMax.name)


    productDetailContainer.appendChild(productDetailClose);    
    productDetailContainer.appendChild(imgProduct);  

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    const productPriceDatail = document.createElement('p');
    productPriceDatail.innerText = '$' + productDetailMax.price;
    const productNameDetail = document.createElement('p');
    productNameDetail.innerText = productDetailMax.name;
    const productDescriptionDetail = document.createElement('p');
    productDescriptionDetail.innerText = productDetailMax.description;
    productInfo.appendChild(productPriceDatail);
    productInfo.appendChild(productNameDetail);
    productInfo.appendChild(productDescriptionDetail);

    const buttonBuytoCart = document.createElement('button');
    buttonBuytoCart.classList.add('primary-button');
    buttonBuytoCart.classList.add('add-to-cart-button');

    const imgButton = document.createElement('img');
    imgButton.setAttribute('src', './icons/bt_add_to_cart.svg')
    imgButton.setAttribute('alt', 'add to cart');
    buttonBuytoCart.innerText = 'add to cart'

    productDetailContainer.appendChild(productInfo);
    productDetailContainer.appendChild(buttonBuytoCart);

}

