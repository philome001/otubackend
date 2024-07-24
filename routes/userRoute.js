const express = require('express');
const {deleteUser,updatePassword,updateUser,addUser,getAllUsers,getUser,forgotPassword} = require('../controllers/userController');
const router = express.Router();


router.get('/',(req,res)=> {
    res.send('welcome')
});

router.post('/user',addUser);
router.get('/getallusers',getAllUsers);
router.get('/getuser/:id',getUser);
router.delete('/deleteuser/:id',deleteUser);
router.put('/updateuser',updateUser);
router.post('/forgotpassword',forgotPassword);
router.put('/updatepassword',updatePassword);
module.exports =router