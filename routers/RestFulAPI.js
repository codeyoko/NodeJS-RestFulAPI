
const express = require('express');
const routerAPI = express.Router();

//call model
const userModel = require('../modeles/config/user');

// PAGE_SIZE
const PAGE_SIZE = 3;


// get data pagination
routerAPI.get('/users', (req, res, next) => {

    // chek page
    var page = req.query.page;
    console.log(page);
    if(page) {
        page = parseInt(page); // convert to number
        page < 1 ? page = 1 : page;
        var skip = (page - 1) * PAGE_SIZE;

        userModel.find({})
        .skip(skip) // bo qua 
        .limit(PAGE_SIZE)
        .then((data) => {res.json(data);})
        .catch(next);

    } else {
        userModel.find({})
        .then((data) => {res.json(data);})
        .catch(next);
    }

})

// get item data in DB
routerAPI.get('/:id', (req, res, next) => {

    // get id form server
    var id = req.params.id;

    // get item data in DB
    userModel.findById(id)
    .then((data) => {
        res.json(data);
    })
    .catch(next);
})


// get all data in DB
routerAPI.get('/', (req, res,next) => {

    userModel.find({})
        .then((data) => {
            res.json(data);
        })
        .catch(next);
})


// insert data in DB
routerAPI.post('/', (req, res, next) =>{

    // get data in client
    var username = req.body.username;
    var password = req.body.password;

    // check db
    userModel.findOne({ username: username, password: password})
        .then((data) => {
            if (data) {
                res.json('User is aleardy!');
            } else {
                // inser data
               return  userModel.create({ username: username, password: password});
            }

        })
        .then(data => {
            res.json('Created successfully!');
        })
        .catch(next);

})


// update data in DB
routerAPI.put('/:id', (req, res, next) =>{

    // get id from client
    var id = req.params.id;
    // get new password from server
    var newPassword = req.body.newPassword;

    // update password
    userModel.findByIdAndUpdate( id, {
        password: newPassword
    })
    .then(data =>{
        res.json('Change password successfully!');
    })
    .catch(next);
})


// delete data in DB
routerAPI.delete('/:id', (req, res, next) =>{

    // get id from client
    var id = req.params.id;

    // delete user 
    userModel.findByIdAndDelete( id, {})
    .then(data =>{
        res.json('Delete successfully!');
    })
    .catch(next);


})


module.exports = routerAPI;