const Allocate = require('../models/allocate');

require("dotenv").config();



const addAllocate= async(req,res)=>{

   
    const allocate = new Allocate({
    jobid:req.body.jobid,
    empid:req.body.empid,
    jobtitle:req.body.jobtitle,
    description: req.body.description,
    joblocation:req.body.joblocation,
    empname:req.body.empname,
    email:req.body.email,
    amount:req.body.amount,
    dateallocated:new Date()

    
   })

       
    await allocate.save()
        .then(result=>{
            res.status(200).send(result);
           
        })
        .catch(err=>console.log(err))

       
      
}
const getAllallocations= (req,res)=>{
     
    Allocate.find(((err,result)=>{
        if(err){
            console.log('Kuna error'+err);
        }
        res.status(200).send(result);
    })
   
)
}
const getAllocation= (req,res)=>{
    const id = req.params.id;
  

    Allocate.findById(id).
        then(result=>{
            res.send(result);
        }).catch(err=>console.log(err));
}
const getEmpAllocation= (req,res)=>{
    const id = req.params.id;
  

    Allocate.find({'email':id}).
        then(result=>{
            res.send(result);
        }).catch(err=>console.log(err));
}

const deleteAllocation= async(req,res)=>{

  await Allocate.findByIdAndDelete(req.params.id)
  .then((result)=>{
    
      res.json({message:'success',data:result})
    
  }).catch(err=>{
   
      console.log('Error occured: '+err)
  })
  

}

const updateAllocation=async(req,res)=>{
    
 
         

 
    await Allocate.updateOne(
        {_id:req.body.jobid},
    //    {$set :
    //     {date_started: req.body.date_started,
    //      status:req.body.status
    //     }},
    //     {upsert:true} 
        
        ).then(result=> {
          res.status(200).json({message:"success",result:result})
        
        })
  
        .catch(err=>console.log(err))
       
 
 


}





module.exports=({updateAllocation,deleteAllocation,addAllocate,getAllallocations,getAllocation,getEmpAllocation})