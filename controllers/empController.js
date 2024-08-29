const Emp = require('../models/employee');
const crypto = require('crypto');

const bcrypt = require('bcryptjs');



const addEmp= async(req,res)=>{

    let membID = ''
    let mail = req.body.email
  
    const exists=await Emp.findOne({email:mail})
    if(exists){
        res.status(400).json({message:"Email Exists"});

        return
    }else{
              
                const emp = new Emp({
                empname:req.body.empname,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
             
              
               
            });

    
    
       
        await emp.save()
            .then(result=>{
                res.send(result);
                //membID = result._id
                console.log('Emp saved successfully');
             
  
            }).catch(err=>console.log(err))
    
    }
   
   
}

const getAllEmps= async(req,res)=>{
    Emp.find(((err,result)=>{
        if(err){
            console.log(err);
        }
        
        res.send(result);
    })
   
)
}
const getEmp= async(req,res)=>{
       
    let id = req.params.id;
   
    
    Emp.findOne({email:id}).then((result)=> {
    
        res.status(200).send(result);
    

    }).catch(err=>console.log('kuna error'+err));
   
}

const forgotPassword=async(req,res)=>{
    let mail = req.body.email
    

    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
                console.log(err)
        }
        const token= buffer.toString("hex");
      
    Emp.findOne({email:mail})
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
  
   Emp.updateOne(
        { resetToken:req.body.token},
        { $set: { password: req.body.newpassword}},{upsert:true}).then((result, err) => {
            if(err){
                console.log(err)
            }
           return res.status(200).send(result);
       })

}

const deleteEmp=async(req,res)=>{

    await Emp.findByIdAndDelete(req.params.id)
    .then(output=>{
         res.json({message:'success',data:output})
    }).catch(err=>console.log('Error was found' +err))
     
    
 
}
const updateEmp=async(req,res)=>{
    
    
    const pwd = await bcrypt.hash(req.body.password,10)

   
       
        await Emp.updateOne(
            {_id:req.body.uid},
           {$set :
            {
            empname: req.body.empname, 
            email: req.body.email, 
            phone: req.body.phone,
            password:pwd,
            upsert: true }}
            ).then(result=> 
                {
                    res.status(200).json({message:"success"})
                    console.log(result)
            
                })

            .catch(err=>console.log(err))
           



}

module.exports=({deleteEmp,updatePassword,updateEmp,addEmp,getAllEmps,getEmp,forgotPassword})