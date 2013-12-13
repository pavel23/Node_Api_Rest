
module.exports = function(app) {

  var User = require('../models/users.js');

  findAllUsers = function(req, res) {
    return User.find(function(err, users) {
      if(!err) {
        console.log('GET /users');
        res.json(users);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  findByEmail = function(req, res) {
    return User.find({email: req.params.email}, function(err, user) {
      if(!err) {
        console.log('GET /user/' + req.params.email);
        res.json(user);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  addUser = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var user = new User({
      user:      req.body.user,
      name:      req.body.name,
      last_name: req.body.last_name,
      email:     req.body.email,
      company:   req.body.company,
      phone:     req.body.phone,
      latitude:  req.body.latitude,
      longitude: req.body.longitude
    });

    return user.save(function(err, data) {
      return res.json(data);
    });
  };

  updateUser = function(req, res) {
    return User.update({email: req.params.email}, req.body, {multi: false}, function (err, count) {
        return res.json({count: count});
    });
  };

  deleteUser = function(){
    return User.remove({email: req.params.email}, function (err, count) {
        return res.json({count: count});
    });
  };

  //Link routes and functions
  app.get('/users', findAllUsers);
  app.get('/user/:email', findByEmail);
  app.post('/user', addUser);
  app.put('/user/:email', updateUser);
  app.delete('/user/:email', deleteUser);

};