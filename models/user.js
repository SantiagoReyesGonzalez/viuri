
//Se importa mongoose
const mongoose=require('mongoose');


//Se define el esquema
const userSchema=new mongoose.Schema({
    name:String,
    lastname:String,
    email:String,
    address:String,
    password:String,   
    });

const User = mongoose.model('User',userSchema);
module.exports = User;