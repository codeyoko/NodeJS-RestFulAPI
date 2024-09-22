const express = require('express');
const router = express.Router();

const path = require('path');

//call UserModel
const userModel = require('./modeles/config/user');

// Create User Acount 
router.post('/register', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    // check if user is already registered
    userModel.findOne({ 
        username: username, 
        password: password
    })
    .then((data) => {
        if(data) {
            res.json('User is already registered!');
        } else {
            //create acount and insert to DB
            return userModel.create({
                username: username,
                password: password
            })
        }
    })
    .then((data) => {
        res.json('Create Account Success!');
    })
    .catch((err) => {
        res.status(500).json('Create Account Failure');
    })
})

//login
router.post('/login', (req,res,next) => {
    var username = req.body.username;
    var password = req.body.password;

    //check in database
    userModel.findOne({ username: username, password: password})
        .then((data) => {
            if(data) {
                res.json('Login Success!');
            } else {
                console.log(req.body.username + ' ' + req.body.password);
                res.status(400).json('Login Failure!!');
            }
        })
        .catch(next);
})


// return html 


router.get('/public', (req, res) => {
    var pathFile = path.join(__dirname, 'views/home.html');
    console.log(pathFile);
    res.sendFile(pathFile);
  
})


router.get('/product', (req, res) => {
    res.json('router 1 product');
})

router.put('/product', (req, res) => {
    console.log(req.body);
    res.json('router 1 product '  + req.headers.data);
})

router.delete('/product', (req, res) => {
    console.log(req.body);
    res.json('router 1 product');
})

router.get('/car', (req, res) => {
    res.json('router 2 car');
})

module.exports = router;
