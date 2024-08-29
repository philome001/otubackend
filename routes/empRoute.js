const express = require('express');
const {deleteEmp,updatePassword,updateEmp,addEmp,getAllEmps,getEmp,forgotPassword} = require('../controllers/empController');
const router = express.Router();


router.post('/emp',addEmp);
router.get('/getallemps',getAllEmps);
router.get('/getemp/:id',getEmp);
router.delete('/deleteemp/:id',deleteEmp);
router.put('/updateemp',updateEmp);
router.post('/forgotpassword',forgotPassword);
router.put('/updatepassword',updatePassword);
module.exports =router