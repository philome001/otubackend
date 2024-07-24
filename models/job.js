const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const jobSchema  = new Schema({
   
    clientid:{
        type:Schema.Types.ObjectId, ref:'User'
    },
    jobtitle: {type:String,required:true},
    description:{type:String,required:true},
    clientname:{type:String,required:false},
    address:{type:String,required:false},
    phone:{type:String,required:false},
    beforeImage: {type:[String],required:false},
    afterImage: {type:[String],required:false},
    jobtype:{type:String,required:true},
    joblocation:{type:String,required:true},
    priority:{type:Number,required:true},
    notes:{type:String,required:false},
    status:{
        type:String,
        enum:['Pending','Ongoing','Complete'],
        default:'Pending'},
    date_posted:Date,
    date_started:{type:Date,required:false},
    date_comp:{type:Date,required:false},
   

});
const Job = mongoose.model('Job',jobSchema)

module.exports = Job;