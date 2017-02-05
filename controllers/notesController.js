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


        app.post('/api/notes/:categoryName', function(request, response){

            var categoryName = request.params.categoryName,
                noteToInsert = {
                    note: request.body.note,
                    color: request.body.color,
                    author: 'John Smith'
                };

            data.addNote ( categoryName, noteToInsert, function(error){
                 if (error){
                    response.send(400, 'Failed to add note to category: ' + categoryName);
                } else {
                    response.set('Content-Type','application/json');
                    response.send(201, noteToInsert);
                 }
            });
        });
    };

})(module.exports);