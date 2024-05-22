const menuEmanil =  document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const menuHanIcon = document.querySelector('.menu');
const mobileMenu = document.querySelector('.mobile-menu');
const productDetailCloseIcon = document.querySelector('.product-detail-close');
const cardsContainer = document.querySelector('.cards-container');
const productDetailContainer = document.querySelector('#productDetail');
let productList = [];




menuEmanil.addEventListener('click',toggleDesktopMenu);
menuHanIcon.addEventListener('click',toggleMobileMenu);


/* productList.push({
    name: 'Lápiz labial de larga duración',
    price: 120,
    image: 'https://media.istockphoto.com/id/487770577/es/foto/maquillaje-ubicado-en-la-tabla-vista-de-frente.jpg?s=1024x1024&w=is&k=20&c=2Y2kyg4QYYQo5JOQyNYxTLdy5WN6BnE6ECTA85t-92s=',
    description: 'Este producto es un suero concentrado diseñado para ser utilizado durante la noche. Contiene ingredientes especiales como retinol, ácido hialurónico y antioxidantes, que trabajan juntos para hidratar la piel, reducir arrugas y líneas de expresión, y promover la renovación celular mientras duermes',
    stock: 55,
});

productList.push({
    name: 'Sérum rejuvenecedor nocturno',
    price: 220,
    image: 'https://media.istockphoto.com/id/1296705483/es/foto/elabora-productos-basados-en-podios-blancos-sobre-fondo-rosa-en-pastel.jpg?s=2048x2048&w=is&k=20&c=QLk-QdKfqaxqt1FXKiiKMhD3wSjMDvk1ijQCBWTG6Do=',
    description: 'Este lápiz labial está formulado para brindar un color intenso y de larga duración. Su fórmula de larga duración es resistente a transferencias y borrones, lo que significa que puedes disfrutar de un labial vibrante durante horas sin necesidad de retoques constantes. Disponible en una amplia gama de tonos para adaptarse a todos los estilos y ocasiones',
    stock: 40,
}); */



function toggleDesktopMenu() {
    desktopMenu.classList.toggle('inactive');
    closeProductEditor();
}

function toggleMobileMenu() {

    closeProductEditor();
    mobileMenu.classList.toggle('inactive');

}


function showProducts(arr) {
    for (const product of arr) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
    
        const productImg = document.createElement('img');
        productImg.setAttribute('src', product.urlImg);
        productImg.dataset.productName = product.name; // Aquí almacenamos el nombre del producto como un atributo de datos en el elemento de imagen
        //productImg.addEventListener('click', openProductDetailAside);
    
        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');
    
        const productInfoDiv = document.createElement('div');
        const productPrice = document.createElement('p');
        productPrice.innerText = '$' + product.price;

        const productName = document.createElement('p');
        productName.innerText = product.name;

        const productStock = document.createElement('p');
        productStock.innerText = 'Stock: ' + product.stock;
    
        productInfoDiv.appendChild(productPrice);
        productInfoDiv.appendChild(productName);
        productInfoDiv.appendChild(productStock);

        
        // Se crean el boton de editar y eliminar
        const productInfoFigure = document.createElement('figure');
        const productFigureImgEdit = document.createElement('img');
        productFigureImgEdit.setAttribute('src', '../icons/edit.png');
        productFigureImgEdit.classList.add('btn-crud')
        productFigureImgEdit.dataset.productName = product.name;
        productFigureImgEdit.addEventListener('click',openProductEditor);
        

        const productFigureImgDelete = document.createElement('img');
        productFigureImgDelete.setAttribute('src', '../icons/delete.png');
        productFigureImgDelete.classList.add('btn-crud')
        productFigureImgDelete.addEventListener('click',consultarIdProducto);

    
        productInfoFigure.appendChild(productFigureImgEdit);
        productInfoFigure.appendChild(productFigureImgDelete);

        productInfo.appendChild(productInfoDiv);
        productInfo.appendChild(productInfoFigure);
    
        productCard.appendChild(productImg);
        productCard.appendChild(productInfo);
    
        cardsContainer.appendChild(productCard);
    }
}



function ClosedDesktopMenu() {
    const isDesktopMenuClosed = desktopMenu.classList.contains('inactive');

    if(!isDesktopMenuClosed){
        desktopMenu.classList.add('inactive');
    }
}

//funciones para crear el editor de productos
function openProductEditor(event) {

    const productName = event.currentTarget.dataset.productName;

    createProductEditorContainer(productName);
    productDetailContainer.classList.remove('inactive');
    ClosedDesktopMenu();
}

function closeProductEditor() {
    productDetailContainer.classList.add('inactive')
}

function createProductEditorContainer(productName) {
    
    productDetailContainer.innerHTML = ""
    console.log('prueba exitosa')

    let foundProductDetail = {};

    const productDetailClose = document.createElement('div');
    productDetailClose.classList.add('product-detail-close');


    //Titulo del editor
    const titleEditorProduct = document.createElement('p');
    titleEditorProduct.textContent = 'EDITAR PRODUCTO';
    titleEditorProduct.classList.add('product-info-edit-title')
    productDetailContainer.appendChild(titleEditorProduct);

    //Icono de cerrar
    const iconClose = document.createElement('img');
    iconClose.setAttribute('src', '../icons/close.png');
    iconClose.setAttribute('alt', 'close')
    iconClose.classList.add('btn-close-editor');
    productDetailClose.appendChild(iconClose);
    productDetailClose.addEventListener('click', closeProductEditor)


    //Esto nos permite buscar el nombre del producto que lanzo el evento
    for (const product of productList) {
        if (product.name === productName ) {
            foundProductDetail = product;
        }
    }

    //label del input de la URL de la imagen
    const labelUrlProduct = document.createElement('label');
    labelUrlProduct.setAttribute('for', 'urlImg')
    labelUrlProduct.textContent= 'URL de la imagen'
    labelUrlProduct.classList.add('labelUrlProduct')


    // input para el link de la imagen
    const imgUrlProduct = document.createElement('input');
    imgUrlProduct.setAttribute("type", "url");
    imgUrlProduct.setAttribute("id", "urlImg");
    imgUrlProduct.setAttribute("name", "urlImg");
    imgUrlProduct.setAttribute("required", "true");
    imgUrlProduct.classList.add("input");
    imgUrlProduct.value = foundProductDetail.urlImg;


    //label del input del precio
    const labelpriceProductEditor = document.createElement('label');
    labelpriceProductEditor.setAttribute('for', 'priceProductEditor');
    labelpriceProductEditor.textContent= 'Precio';
    //input para el precio del producto
    const priceProductEditor = document.createElement('input')
    priceProductEditor.setAttribute("type", "number");
    priceProductEditor.setAttribute("id", "priceProductEditor");
    priceProductEditor.setAttribute("name", "priceProductEditor");
    priceProductEditor.setAttribute("required", "true");
    priceProductEditor.classList.add("input");
    priceProductEditor.value = foundProductDetail.price;


    //label del input del nombre
    const labelnameProductEditor = document.createElement('label');
    labelnameProductEditor.setAttribute('for', 'nameProductEditor');
    labelnameProductEditor.textContent= 'Nombre';
    //input para el nombre del producto
    const nameProductEditor = document.createElement('input')
    nameProductEditor.setAttribute("type", "text");
    nameProductEditor.setAttribute("id", "nameProductEditor");
    nameProductEditor.setAttribute("name", "nameProductEditor");
    nameProductEditor.setAttribute("required", "true");
    nameProductEditor.classList.add("input");
    nameProductEditor.value = foundProductDetail.name;


    // Label para el input del stock
    const labelStockProductEditor = document.createElement('label');
    labelStockProductEditor.setAttribute('for', 'stockProductEditor');
    labelStockProductEditor.textContent = 'Stock';

    // Input para el stock del producto
    const stockProductEditor = document.createElement('input');
    stockProductEditor.setAttribute('type', 'number');
    stockProductEditor.setAttribute('id', 'stockProductEditor');
    stockProductEditor.setAttribute('name', 'stockProductEditor');
    stockProductEditor.setAttribute('required', 'true');
    stockProductEditor.classList.add('input');
    stockProductEditor.value = foundProductDetail.stock;


    //label del input del id
    const labelIdProductEditor = document.createElement('label');
    labelIdProductEditor.setAttribute('for', 'idProductEditor');
    labelIdProductEditor.textContent= 'ID';
    //input para el nombre del producto
    const idProductEditor = document.createElement('input')
    idProductEditor.setAttribute("type", "text");
    idProductEditor.setAttribute("id", "idProductEditor");
    idProductEditor.setAttribute("name", "idProductEditor");
    idProductEditor.setAttribute("required", "true");
    idProductEditor.setAttribute("readonly", "true"); // Añadir el atributo readonly
    idProductEditor.classList.add("input");
    idProductEditor.value = foundProductDetail._id;

    // Label para el textarea
    const labelDescriptionProductEditor = document.createElement('label');
    labelDescriptionProductEditor.setAttribute('for', 'descriptionProductEditor');
    labelDescriptionProductEditor.textContent = 'Descripción';
    // Textarea para la descripción del producto
    const descriptionProductEditor = document.createElement('textarea');
    descriptionProductEditor.setAttribute('id', 'descriptionProductEditor');
    descriptionProductEditor.setAttribute('name', 'descriptionProductEditor');
    descriptionProductEditor.setAttribute('required', 'true');
    descriptionProductEditor.classList.add('textarea');
    descriptionProductEditor.textContent = foundProductDetail.description;


    //Aqui se agregan todos los elementos al contenedor
    const productInfo = document.createElement('form');
    productInfo.classList.add('product-info');
    // Agregar event listener al formulario
    productInfo.addEventListener('submit', updateProduct);


    productInfo.appendChild(productDetailClose);    

    productInfo.appendChild(labelUrlProduct);      
    productInfo.appendChild(imgUrlProduct);  

    productInfo.appendChild(labelpriceProductEditor);      
    productInfo.appendChild(priceProductEditor);  

    productInfo.appendChild(labelnameProductEditor);      
    productInfo.appendChild(nameProductEditor);  

    productInfo.appendChild(labelStockProductEditor);      
    productInfo.appendChild(stockProductEditor);
    
    productInfo.appendChild(labelIdProductEditor);      
    productInfo.appendChild(idProductEditor);  

    productInfo.appendChild(labelDescriptionProductEditor);      
    productInfo.appendChild(descriptionProductEditor);  


    //Se agrega el boton para confirmar
    const confirmChangeButton = document.createElement('button');
    confirmChangeButton.classList.add('primary-button');
    confirmChangeButton.innerText = 'Actualizar'

    productInfo.appendChild(confirmChangeButton);
    productDetailContainer.appendChild(productInfo);
    

}


//Fin de funciones para crear el editor de productos

// public/scripts/fetchProducts.js

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

async function fetchProducts() {
    try {
        const response = await fetch('/products');
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const productListString = await response.text();
        //displayProducts(productListString);
        productList = JSON.parse(productListString);
        console.log(productList)
        showProducts(productList);

    } catch (error) {
        console.error('Error:', error);
    }
}


// actualizar los productos

async function updateProduct(event) {
    event.preventDefault(); // Evitar el envío estándar del formulario

    const productId = document.getElementById('idProductEditor').value;
    const urlImg = encodeURIComponent(document.getElementById('urlImg').value);
    const priceProductEditor = encodeURIComponent(document.getElementById('priceProductEditor').value);
    const nameProductEditor = encodeURIComponent(document.getElementById('nameProductEditor').value);
    const stockProductEditor = encodeURIComponent(document.getElementById('stockProductEditor').value);
    const descriptionProductEditor = encodeURIComponent(document.getElementById('descriptionProductEditor').value);

    const url = `/product/${productId}/${urlImg}/${priceProductEditor}/${nameProductEditor}/${stockProductEditor}/${descriptionProductEditor}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const updatedProduct = await response.json();
            console.log('Producto actualizado:', updatedProduct);
            alert('Producto actualizado exitosamente');
            // Aquí puedes agregar lógica para redirigir o actualizar la UI según sea necesario
            window.location.href = '/components/productmanagement.html';
        } else {
            const errorData = await response.json();
            console.error('Error al actualizar el producto:', errorData);
            alert('Error al actualizar el producto: ' + errorData.message);
        }
    } catch (error) {
        console.error('Error de red:', error);
        alert('Error de red: ' + error.message);
    }
}

// funcion para eliminar productos

async function deleteProduct(productId) {
    try {
        const response = await fetch(`/product/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }

        const result = await response.json();
        window.location.href = '/components/productmanagement.html';
        console.log('Producto eliminado:', result);
        // Aquí puedes añadir cualquier lógica adicional, como actualizar la interfaz de usuario
    } catch (error) {
        console.error('Error:', error);
    }
}

 function consultarIdProducto(event) {
    // Obtener el párrafo que contiene el nombre del producto
    const nombreProducto = event.target.closest('.product-card').querySelectorAll('p')[1].textContent;

    let productId = '';
    //Esto nos permite buscar el nombre del producto que lanzo el evento
    for (const product of productList) {
        if (product.name === nombreProducto ) {
            productId = product._id;
        }
    }


    deleteProduct(productId)
 }