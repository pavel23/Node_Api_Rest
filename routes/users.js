
module.exports = function(app) {

  var User = require('../models/users.js');

  findAllUsers = function(req, res) {
    User.findAll(function(err, users){
        if(!err){
            res.json(users);
        }else{
            res.json({'error':'An error has occurred'});
        }
    });
  };

  findByEmail = function(req, res) {
    User.findByEmail(req.params.email, function(err, user){
        if(!err){
            res.json(user);
        }else{
            res.json({'error':'An error has occurred'});
        }
    });
  };

  addUser = function(req, res) {
    var user_data = {
            user:      req.body.user,
            name:      req.body.name,
            last_name: req.body.last_name,
            email:     req.body.email,
            company:   req.body.company,
            phone:     req.body.phone,
            latitude:  req.body.latitude,
            longitude: req.body.longitude
    };

    User.newUser(user_data, function(err, user){
        if(!err){
            res.json(user);
        }else{
            res.json({'error':'An error has occurred'});
        }
    });
  };

  updateUser = function(req, res) {
    User.updateUser(req.params.email, req.body, function(err, count){
        if(!err){
            res.json({count: count});
        }else{
            res.json({'error':'An error has occurred'});
        }
    });

  };

  deleteUser = function(req, res){
    User.removeUser(req.params.email, function(err, count){
        if(!err){
            res.json({count: count});
        }else{
            res.json({'error':'An error has occurred'});
        }
    });
  };

  //Link routes and functions
  app.get('/users', findAllUsers);
  app.get('/user/:email', findByEmail);
  app.post('/user', addUser);
  app.put('/user/:email', updateUser);
  app.delete('/user/:email', deleteUser);

};