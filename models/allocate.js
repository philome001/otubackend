const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allocateSchema  = new Schema({
    jobid:{
        type:Schema.Types.ObjectId, ref:'Job'
    },
    empid:{
        type:Schema.Types.ObjectId, ref:'Emp'
    },
    jobtitle: {type:String,required:true},
    description:{type:String,required:true},
    joblocation:{type:String,required:true},
    empname:{type:String,required:true},
    email:{type:String,required:true},
    amount:{type:Number,required:true},
    dateallocated:Date
   
   

})
const Allocate = mongoose.model('Allocate',allocateSchema)

module.exports = Allocate;