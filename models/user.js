const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Schema = mongoose.Schema;
const userSchema  = new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String,required:false},
    address:{type:String,required:true},
    datejoined:Date,
    userType:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
  

});

userSchema.pre("save", async function (next){
    if(!this.isModified('password')){
        next()

    }
    this.password = await bcrypt.hash(this.password,10)

});
// memberSchema.pre('remove', async function(next) {
//     // 'this' is the client being removed. Provide callbacks here if you want
//     // to be notified of the calls' result.
//     Beneficiary.remove({parent: this._id}).exec();
//     Balance.remove({memberid:this._id}).exec();
//     Contribute.remove({conmemberid:this._id}).exec();
//     //Case.remove({client_id: this._id}).exec();
//     next();
// });


const User = mongoose.model('User',userSchema)

module.exports = User;