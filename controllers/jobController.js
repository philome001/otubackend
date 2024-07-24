const Job = require('../models/job');

require("dotenv").config();



const addJob= async(req,res)=>{


    const imageUrls = req.files.map(file => `http://10.0.0.175:5000/${file.path}`);//change when you get a domain

    const job = new Job({
    jobtitle:req.body.jobtitle,
    clientid:req.body.clientid,
    clientname:req.body.clientname,
    address:req.body.address,
    phone:req.body.phone,
    jobtype:req.body.jobtype,
    description: req.body.description,
    joblocation:req.body.joblocation,
    priority: req.body.priority,
    beforeImage:imageUrls,
    date_posted:new Date()

    
   })

       
    await job.save()
        .then(result=>{
            res.status(200).send(result);
           
        })
        .catch(err=>console.log(err))

       
      
}
const getAllJobs= (req,res)=>{
     
    Job.find(((err,result)=>{
        if(err){
            console.log('Kuna error'+err);
        }
        res.status(200).send(result);
    })
   
)
}
const getJob= (req,res)=>{
    const id = req.params.id;

    Job.findById(id).
        then(result=>{
            res.send(result);
        }).catch(err=>console.log(err));
}

const deleteJob= async(req,res)=>{

  await Job.findByIdAndDelete(req.params.id)
  .then((result)=>{
    
      res.json({message:'success',data:result})
    
  }).catch(err=>{
   
      console.log('Error occured: '+err)
  })
  

}
const updatecompleteJob=async(req,res)=>{
    console.log(req.body)
  
    const imageUrls = req.files.map(file => `http://10.0.0.175:5000/${file.path}`);
   
    await Job.updateOne(
        {_id:req.body.jobid},
       {$set :
        {date_comp: req.body.date_comp,
         status:req.body.status,
         afterImage:imageUrls,
         notes:req.body.notes 
        }},
        {upsert:true} 
        
        ).then(result=> {
          res.status(200).json({message:"success",result:result})
        
        })
  
        .catch(err=>console.log(err))

}
const updateJob=async(req,res)=>{
    
 
         

 
    await Job.updateOne(
        {_id:req.body.jobid},
       {$set :
        {date_started: req.body.date_started,
         status:req.body.status
        }},
        {upsert:true} 
        
        ).then(result=> {
          res.status(200).json({message:"success",result:result})
        
        })
  
        .catch(err=>console.log(err))
       
 
 


}





module.exports=({updateJob,deleteJob,addJob,getAllJobs,getJob,updatecompleteJob})