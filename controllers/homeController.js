(function (homeController){
    homeController.init = function (app) {

        var data = require ('../data'),
            auth = require ('../auth');

        app.get ('/', function (request, response){

            data.getNotesCategories(function(err, results){
                response.render ('index', {
                        title: 'Categories',
                        error: err,
                        categories: results,
                        newCatError: request.flash('newCatErrorMessage') ,
                        user: request.user
                });
            });
        });

        app.get ('/notes/:categoryName', auth.ensureAuthenticated, function (req, res){

            var categoryName = req.params.categoryName;
            res.render ('notes', { title: categoryName, user: req.user });
        });

        app.post ('/newCategory', function (request, response){
            var categoryName = request.body.categoryName;

            data.createNewCategory ( categoryName, function (error){
                if (error) {
                    request.flash('newCatErrorMessage',error);

                    console.log ('Failed to create new category: ' + error);
                    response.redirect('/');
                } else {
                    response.redirect ('/notes/' + categoryName);
                }
            });
        });
        
    };
})(module.exports);