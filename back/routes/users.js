const router = require('express').Router();
const express = require('express')
const User = require('../models/User');
const jwt = require('jsonwebtoken')

//Registre
router.post('/register',async (req,res) => {
    const emailexist = await User.findOne({email: req.body.email});
    if(emailexist) return res.status(400).send('email already exists');
    const user = new User( { 
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
     });
     try {
         const saveUser = await user.save();
         res.send(saveUser);
     }
     catch(err) {
         res.status(400).send(err);
     }
})

//Login

router.post('/login', async (req,res) => {
    
    const user = await User.findOne({ email: req.body.email,password : req.body.password});
    if(!user) return res.status(401).send('email or password is wrong');

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn : "1h"});

    res.header('auth-token',token).json({token,user} );
     
      return res.status(200).send(token)
})

router.get("/:id",async (req,res)=> {
    const findUser = await User.findById({_id : req.params.id})
    if(!findUser) return res.status(401).send('user not found');
    console.log(findUser)
    return res.send(findUser)
    
})

module.exports = router