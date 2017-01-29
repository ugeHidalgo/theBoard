(function (homeController){
    homeController.init = function (app) {

        app.get ('/', function (request, response){
            response.render ('index', {
                    title: 'Express using vash'
            });
        });

        app.get ('/hello', function (request, response){
            response.render ('index', {
                    title: 'Hello from server'
            });
        });
        
    };
})(module.exports);