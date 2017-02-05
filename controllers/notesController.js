(function (notesController) {

    var data = require('../data');

    notesController.init = function (app) {

        app.get('/api/notes/:categoryName', function(request, response){

            var categoryName = request.params.categoryName;

            data.getNotes ( categoryName, function(error, notes){
                if (error){
                    response.send(400, error);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(notes.notes);
                 }
            });
        });
    };

})(module.exports);