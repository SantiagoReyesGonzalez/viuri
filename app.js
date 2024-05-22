const express =  require('express');
const puerto = 3000;
const { default: mongoose } = require('mongoose');
const app =  express();
const User = require('./models/user')
const Product = require('./models/product')
//const Contacto = require('./models/contacto')

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

//Se realiza conexion en la base de datos. 
mongoose.connect('mongodb://127.0.0.1:27017/viuri') // cambiamos local host por la ip puesto que por alguna razon desconocida no funciona si se coloca localhost
.then(()=>{
    console.log(`Conectado a la base de datos ${mongoose.connection.db.databaseName}`)
})
.catch((error)=>{
    console.log('Error al conectar a la base de datos');
    console.log(error)
});

const connection = mongoose.connection;



app.get('/',(req,res) =>{
    res.json({response: 'success'})    
});


app.post('/user/new', async (req, res) => {
    try {
        const { name, lastname, email, address, password } = req.body;
        const newUser = new User({name,lastname,email,address,password});
        const savedUser = await newUser.save();
        res.redirect('/components/login.html');
    } catch (error) {
        console.error('Error al incluir un nuevo usuario: ', error);
        res.status(500).json({ message: 'Error al incluir un nuevo usuario', error: error.message });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        if (user.password !== password) {  // En una aplicación real, la contraseña debería ser hasheada y comparada usando bcrypt
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si la autenticación es exitosa, redirigir al dashboard o a otra página
        res.redirect('/index.html');
    } catch (error) {
        console.error('Error al autenticar al usuario: ', error);
        res.status(500).json({ message: 'Error al autenticar al usuario', error: error.message });
    }
});

app.post('/change-password', async (req, res) => {
    const { email, currentPassword, password } = req.body;

    console.log('Email:', email);
    console.log('Current Password:', currentPassword);
    console.log('New Password:', password);


    try {
        // Buscar al usuario por email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña actual
        if (user.password !== currentPassword) {  // En una aplicación real, la contraseña debería ser hasheada y comparada usando bcrypt
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }

        // Actualizar la contraseña
        user.password = password;  // En una aplicación real, la nueva contraseña debería ser hasheada usando bcrypt
        await user.save();

        res.redirect('/components/login.html');
    } catch (error) {
        console.error('Error al cambiar la contraseña: ', error);
        res.status(500).json({ message: 'Error al cambiar la contraseña', error: error.message });
    }
});


app.post('/product/new', async (req, res) => {
    try {
        const { urlImg, priceProductNew, nameProductNew, stockProductNew, descriptionProductNew } = req.body;

        // Imprimir valores en la consola
        console.log('URL de la imagen:', urlImg);
        console.log('Precio:', priceProductNew);
        console.log('Nombre:', nameProductNew);
        console.log('Cantidad:', stockProductNew);
        console.log('Descripción:', descriptionProductNew);

        const newProduct = new Product({
            urlImg,
            price: priceProductNew,
            name: nameProductNew,
            stock: stockProductNew,
            description: descriptionProductNew
        });
        
        const savedProduct = await newProduct.save();
        res.redirect('/components/newproduct.html'); // Redirigir a una página de éxito después de guardar
    } catch (error) {
        console.error('Error al crear un nuevo producto: ', error);
        res.status(500).json({ message: 'Error al crear un nuevo producto', error: error.message });
    }
});


// Ruta para consultar todos los productos
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        console.error('Error al obtener los productos: ', error);
        res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
});

app.listen(puerto,() =>{
    console.log(`escuchando en http://localhost:${puerto}`)
})