var restberry = require('restberry');
var restberryMongoose = require('restberry-mongoose');
var restberryAuthLocal = require('restberry-auth-local');

restberry
    .routes
    .addCustomRoute({
      action: function(req, res, next) {
          var userData = req.body;
              userData.password = restberryAuthLocal.saltAndEncryptPassword(userData.password);

          var user = new restberryMongoose.mongoose.models.User(userData);
          user.save(function(err){
              if(err){
                  res.status(500);
            res.json({error: err, user: user});
              }
              else{
                  var response = {
                      email: user.email,
                      href: "users/"+user._id,
                      id: user._id,
                      role: user.role,
                  };

            res.status(201);
            res.json({user: response});
              }
              next();
          });
        },
		    path: '/install/create',
        loginRequired: false,
        method: 'POST',
    		verbose: false
      })
      .addCustomRoute({
          action: function(req, res, next) {
            restberry.model('User').find({},successUser)

              function successUser(){
                console.log(arguments);
                res.status(200);
        				res.json({status: true});
              }
            },
      		    path: '/install/verif',
              loginRequired: false,
              method: 'GET',
      		verbose: false
        });
    // .addCreateRoute({
    //     loginRequired: true,
    // });
