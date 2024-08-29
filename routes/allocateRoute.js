const express = require('express');
const {updateAllocation,deleteAllocation,addAllocate,getAllallocations,getAllocation,getEmpAllocation} = require('../controllers/allocateController');
const router = express.Router();



router.post('/allocate',addAllocate);
router.get('/getallallocations',getAllallocations);
router.get('/getallocation/:id',getAllocation);
router.get('/getempallocation/:id',getEmpAllocation);
router.put('/updateallocation',updateAllocation);
//router.put('/updatecompletejob',upload.array('afterImage',15),updatecompleteJob);
router.delete('/deleteallocation/:id',deleteAllocation);


module.exports =router
