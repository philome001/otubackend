const User = require('../models/user');
const crypto = require('crypto');

const bcrypt = require('bcryptjs');



const addUser= async(req,res)=>{

    let membID = ''
    let mail = req.body.email
  
    const exists=await User.findOne({email:mail})
    if(exists){
        res.status(400).json({message:"Email Exists"});

        return
    }else{
              
                const user = new User({
                username:req.body.username,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                address:req.body.address,
                datejoined:new Date()
              
               
            });

    
    
       
        await user.save()
            .then(result=>{
                res.send(result);
                //membID = result._id
                console.log('user saved successfully');
             
  
            }).catch(err=>console.log(err))
    
    }
   
   
}

const getAllUsers= async(req,res)=>{
    User.find(((err,result)=>{
        if(err){
            console.log(err);
        }
        
        res.send(result);
    })
   
)
}
const getUser= async(req,res)=>{
       
    let id = req.params.id;
   
    
    User.findOne({email:id}).then((result)=> {
        // if(err){
        //     //res.status(404).send('No data')
        //     console.log(err)
        // }
        res.status(200).send(result);
        
        //console.log(result)

    }).catch(err=>console.log('kuna error'+err));
   
}

const forgotPassword=async(req,res)=>{
    let mail = req.body.email
    

    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
                console.log(err)
        }
        const token= buffer.toString("hex");
      
    Member.findOne({email:mail})
    .then(user=>{
        if(!user){
            return res.status(402).json({message:"No such user exists"})
        }   
        user.resetToken=token
        user.expireToken=Date.now()+3600000
        user.save().then((result)=>{
       
        // let transporter = nodemailer.createTransport({
        //         host: "gra107.truehost.cloud",
      

    })
        
    res.json({message:'Check your email'})
    })

    })

}
const updatePassword=(req,res)=>{
  
    User.updateOne(
        { resetToken:req.body.token},
        { $set: { password: req.body.newpassword}},{upsert:true}).then((result, err) => {
            if(err){
                console.log(err)
            }
           return res.status(200).send(result);
       })

}

const deleteUser=async(req,res)=>{

    await User.findByIdAndDelete(req.params.id)
    .then(results=>{
         Beneficiary.findOneAndDelete({
            parent:results._id
    }).then(output=>{
         res.json({message:'success',data:output})
    }).catch(err=>console.log('Error was found' +err))
     
    })
 
}
const updateUser=async(req,res)=>{
    
    
    const pwd = await bcrypt.hash(req.body.password,10)

    if(req.file==null){
       
        await User.updateOne(
            {_id:req.body.uid},
           {$set :
            {
            username: req.body.name, 
            email: req.body.email, 
            phone: req.body.phone,
            address:req.body.address, 
            password:pwd,
            upsert: true }}
            ).then(result=> 
                {
                    res.status(200).json({message:"success"})
                    console.log(result)
            
                })

            .catch(err=>console.log(err))
           

    }else{
        await User.updateOne(
            {_id:req.body.uid},
           {$set :
            {username: req.body.name, 
            email: req.body.email, 
            phone: req.body.phone, 
            userType: req.body.userType,
            password:pwd,
            memberImage:req.file.path,
            upsert: true }}
            ).then(result=> res.status(200).json({message:"success"}))
            .catch(err=>console.log(err))
           
    }
       

}

module.exports=({deleteUser,updatePassword,updateUser,addUser,getAllUsers,getUser,forgotPassword})