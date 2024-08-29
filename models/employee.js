const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema  = new Schema({
    empname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    userType:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
   

})
const Emp = mongoose.model('Emp',employeeSchema)

module.exports = Emp;