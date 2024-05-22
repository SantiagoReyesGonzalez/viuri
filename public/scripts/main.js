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
const productListCart = [];
const prueba = document.querySelector('.prueba');
const btnAddToCart = document.querySelector('.add-to-cart')
const divCartItemCountIndicator = document.querySelector('#CartItemCountIndicator')
const myOrderContent = document.querySelector('.my-order-content-cart');
const titleContabackShoppingCartContaineriner = document.querySelector('.back-shopping-cart-container');
const totalShoppingCart = document.getElementById('totalShoppingCart');
let CartItemCountIndicator = 0;



productList.push({
    name: 'Lápiz labial de larga duración',
    price: 120,
    urlImg: 'https://media.istockphoto.com/id/487770577/es/foto/maquillaje-ubicado-en-la-tabla-vista-de-frente.jpg?s=1024x1024&w=is&k=20&c=2Y2kyg4QYYQo5JOQyNYxTLdy5WN6BnE6ECTA85t-92s=',
    description: 'Este producto es un suero concentrado diseñado para ser utilizado durante la noche. Contiene ingredientes especiales como retinol, ácido hialurónico y antioxidantes, que trabajan juntos para hidratar la piel, reducir arrugas y líneas de expresión, y promover la renovación celular mientras duermes',
    stock: 55,
    id: '1231231231'
});

productList.push({
    name: 'Sérum rejuvenecedor nocturno',
    price: 220,
    urlImg: 'https://media.istockphoto.com/id/1296705483/es/foto/elabora-productos-basados-en-podios-blancos-sobre-fondo-rosa-en-pastel.jpg?s=2048x2048&w=is&k=20&c=QLk-QdKfqaxqt1FXKiiKMhD3wSjMDvk1ijQCBWTG6Do=',
    description: 'Este lápiz labial está formulado para brindar un color intenso y de larga duración. Su fórmula de larga duración es resistente a transferencias y borrones, lo que significa que puedes disfrutar de un labial vibrante durante horas sin necesidad de retoques constantes. Disponible en una amplia gama de tonos para adaptarse a todos los estilos y ocasiones',
    stock: 40,
});

menuEmanil.addEventListener('click',toggleDesktopMenu);
menuHanIcon.addEventListener('click',toggleMobileMenu);
menuCarroIcon.addEventListener('click',toggleCarroAside);
titleContabackShoppingCartContaineriner.addEventListener('click',toggleCarroAside);


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






function showProducts(arr) {
    for (const product of arr) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
    
        const productImg = document.createElement('img');
        productImg.setAttribute('src', product.urlImg);
        productImg.dataset.productName = product.name; // Aquí almacenamos el nombre del producto como un atributo de datos en el elemento de imagen
        //productImg.addEventListener('click', openProductDetailAside);
        productImg.addEventListener('click', () => {
            openProductDetailAside(product.name, product.urlImg, product.price, product.description);
        });
    
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
        productFigureImg.classList.add('add-to-cart')
        productFigureImg.dataset.productName = product.name; // Aquí almacenamos el nombre del producto como un atributo de datos en el elemento de imagen, esto lo utilizaceremos para el addToCart
        productFigureImg.addEventListener('click', addToCart);
    
    
        productInfoFigure.appendChild(productFigureImg);
    
        productInfo.appendChild(productInfoDiv);
        productInfo.appendChild(productInfoFigure);
    
        productCard.appendChild(productImg);
        productCard.appendChild(productInfo);
    
        cardsContainer.appendChild(productCard);
    }
}

function openProductDetailAside(name, urlImg, price, description) {

    const productName = name;
    alert(productName)

    createProductDetailContainer(name, urlImg, price, description);
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



function createProductDetailContainer(name,urlImg,price, description) {
    
    productDetailContainer.innerHTML = ""

    let productDetailMax = {};

    const productDetailClose = document.createElement('div');
    productDetailClose.classList.add('product-detail-close');
    const iconClose = document.createElement('img');
    iconClose.setAttribute('src', './icons/icon_close.png');
    iconClose.setAttribute('alt', 'close')
    productDetailClose.appendChild(iconClose);
    productDetailClose.addEventListener('click', closeProductDetailAside)

    const imgProduct = document.createElement('img');
    /* for (const product of productList) {
        if (product.name === productName ) {
            productDetailMax = product;
        }
    } */
    imgProduct.setAttribute('src', urlImg);
    imgProduct.setAttribute('alt', name)


    productDetailContainer.appendChild(productDetailClose);    
    productDetailContainer.appendChild(imgProduct);  

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
    const productPriceDatail = document.createElement('p');
    productPriceDatail.innerText = '$' + price;
    const productNameDetail = document.createElement('p');
    productNameDetail.innerText = name;
    const productDescriptionDetail = document.createElement('p');
    productDescriptionDetail.innerText = description;
    productInfo.appendChild(productPriceDatail);
    productInfo.appendChild(productNameDetail);
    productInfo.appendChild(productDescriptionDetail);

    const buttonBuytoCart = document.createElement('button');
    buttonBuytoCart.classList.add('primary-button');
    buttonBuytoCart.classList.add('add-to-cart-button');

    const imgButton = document.createElement('img');
    imgButton.setAttribute('src', './icons/bt_add_to_cart.svg')
    imgButton.setAttribute('alt', 'add to cart');
    buttonBuytoCart.innerText = 'Añadir al carrito'


    productDetailContainer.appendChild(productInfo);
    productDetailContainer.appendChild(buttonBuytoCart);


    buttonBuytoCart.dataset.productName = name; // Aquí almacenamos el nombre del producto como un atributo de datos en el elemento de imagen, esto lo utilizaceremos para el addToCart
    buttonBuytoCart.addEventListener('click' , addToCart);
}

function addToCart(event) {

    //Aumenta el contador  del carro de comprar y lo actualiza en la interface

    CartItemCountIndicator += 1;
    divCartItemCountIndicator.textContent = CartItemCountIndicator ;

    //Traemos el nombre de producto que lo usaremos para buscarlo en la lista de productos
    const productName = event.currentTarget.dataset.productName;


    // Se guarda el producto

    let selectedProductDetail = {};

    for (const product of productList) {
        if (product.name === productName ) {
            selectedProductDetail = product;
        }
    }

    //Agregamos los productos encontramos a la lista del carrito de compras
    productListCart.push(selectedProductDetail)
    showProductListCart();
}

function deleteToCart(event) {
    //Disminuye el contador  del carro de comprar y lo actualiza en la interface

    CartItemCountIndicator -= 1;
    divCartItemCountIndicator.textContent = CartItemCountIndicator ;

    //Traemos el nombre de producto que lo usaremos para buscarlo en la lista de productos
    const productName = event.currentTarget.dataset.productName;

    // Se guarda el producto


    for (let i = 0; i < productListCart.length; i++) {
        if (productListCart[i].name === productName) {
            productListCart.splice(i, 1); // Elimina 1 elemento en la posición i
            break;
        }
    }
    calculateCartTotal();
    showProductListCart();
    console.log('se elimino producto total')
    
}

function showProductListCart() {

    myOrderContent.innerHTML = '';
    
    for (const product of productListCart) {

        const shoppingCart = document.createElement('div');
        shoppingCart.classList.add('shopping-cart')

        // Obtener el primer elemento hijo del contenedor, esto para que no se agregue al final del contenedor y dañe asi el diseño
        const firstElement = myOrderContent.firstChild;
        myOrderContent.insertBefore(shoppingCart,firstElement);

        const figure = document.createElement('figure');
        shoppingCart.appendChild(figure);

        const img = document.createElement('img');
        img.setAttribute('src', product.urlImg);
        figure.appendChild(img);

        const nameProductCart = document.createElement('p');
        nameProductCart.textContent = product.name;
        const priceProductCart = document.createElement('p');
        priceProductCart.textContent = '$'+product.price

        shoppingCart.appendChild(nameProductCart);
        shoppingCart.appendChild(priceProductCart);

        const imgDeleteProduct = document.createElement('img');
        imgDeleteProduct.setAttribute('src', './icons/icon_close.png');
        imgDeleteProduct.setAttribute('alt', 'close')
        shoppingCart.appendChild(imgDeleteProduct);
        imgDeleteProduct.dataset.productName = product.name; // Aquí almacenamos el nombre del producto como un atributo de datos en el elemento de imagen
        imgDeleteProduct.addEventListener('click', deleteToCart)

    }
        let sumaCartShoppingCart = 0;
        sumaCartShoppingCart = calculateCartTotal();
        totalShoppingCart.innerHTML = '$' +sumaCartShoppingCart;
        console.log(productListCart.length)

}



function calculateCartTotal() {
    let total = 0;
    
    
    for (const product of productListCart) {
        total = product.price + total;
    }
    console.log('total de la funcion ' + total)
    return(total);
}





async function fetchProducts() {
    try {
        const response = await fetch('/products');
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const productListString = await response.text();
        //displayProducts(productListString);
        const productList = JSON.parse(productListString);
        console.log(productList)
        showProducts(productList);

    } catch (error) {
        console.error('Error:', error);
    }
}

fetchProducts();



