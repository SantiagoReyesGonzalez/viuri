const express =  require('express');
const puerto = 3000;
const { default: mongoose } = require('mongoose');
const app =  express();
const User = require('./models/user')
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



app.listen(puerto,() =>{
    console.log(`escuchando en http://localhost:${puerto}`)
})