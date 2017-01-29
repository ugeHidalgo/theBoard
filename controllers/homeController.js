(function (homeController){
    homeController.init = function (app) {

        var data = require ('../data');

        app.get ('/', function (request, response){

            data.getNotesCategories(function(err, results){
                response.render ('index', {
                        title: 'Categories',
                        error: err,
                        categories: results
                });
            });
        });
        
    };
})(module.exports);