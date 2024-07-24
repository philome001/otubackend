const express = require('express');
const {updateJob,deleteJob,addJob,getAllJobs,getJob,updatecompleteJob} = require('../controllers/jobController');
const router = express.Router();

const multer = require('multer');



const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}.jpg`);
    },
  });
  
  
const upload=multer({ storage })


router.post('/job',upload.array('beforeImage',15),addJob);
router.get('/getalljobs',getAllJobs);
router.get('/getjob/:id',getJob);
router.put('/updatejob',updateJob);
router.put('/updatecompletejob',upload.array('afterImage',15),updatecompleteJob);
router.delete('/deletejob/:id',deleteJob);


module.exports =router
