(function (auth) {

    var data = require ('../data'),
        hasher = require ('./hasher'),
        passport = require ('passport');
        localStrategy = require ('localStrategy').Strategy;


    function userVerify( username, password, callbackFn) {
        data.getUser(username, function (err, user) {
            if (!err) {
                var testHash = hasher.computeHash(password, user.salt);
                if (testHash === user.passwordHash) {
                    allbackFn (null, user);
                    return;
                }
            }
            callbackFn (null, false, {message:'Invalid username/password.'});
        });
    }


    auth.init  = function (app) {

        //setup passport authentication, por ahora solo local strategy, pero si quisieramos usar
        // facebook, google, etc además, se inicializaría aquí también.
        passport.use(new localStrategy(userVerify));
        passport.serializeUser(function(user, callbackFn) {
            callbackFn(null,user.username);
        });
        passport.deserializeUser(function (key, callbackFn){
            data.getUser( key, function (err, user) {
                if (err) {
                    callbackFn(null, false, { message: 'Failed to retrieve user.'});
                } else {
                    callbackFn(null, user);
                }
            });
        });
        app.use(passport.initialize());
        app.use(passport.session());

        app.get ('/register', function (req, res) {
            res.render ('register', { 
                title: 'Register into the board',
                message: req.flash('registrationError')
            });
        });

        app.post ('/register', function (req, res) {

            var salt = hasher.createSalt(),

                user =  {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                passwordHash: hasher.computeHash(req.body.password, salt) ,
                salt: salt
            };

            data.addUser( user, function (err) {
                if (err){
                    req.flash('registrationError', 'Could not save user to database.');
                    res.redirect('/register');
                } else {
                    res.redirect('/login');
                }
            });
        });

    };

})(module.exports);