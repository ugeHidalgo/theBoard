(function (auth) {

    auth.init  = function (app) {

        app.get ('/register', function (req, res) {
            res.render ('register', { title: 'Register into the board' });
        });
    };

})(module.exports);