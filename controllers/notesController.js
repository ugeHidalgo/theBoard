(function (notesController) {

    var data = require('../data'),
        auth = require('../auth');

    notesController.init = function (app) {

        app.get('/api/notes/:categoryName', auth.ensureApiAuthenticated, function(request, response){

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


        app.post('/api/notes/:categoryName', auth.ensureApiAuthenticated, function(request, response){

            var categoryName = request.params.categoryName,
                noteToInsert = {
                    note: request.body.note,
                    color: request.body.color,
                    author: 'John Smith'
                };

            data.addNote ( categoryName, noteToInsert, function(error){
                 if (error){
                    response.status(400).send('Failed to add note to category: ' + categoryName);
                } else {
                    response.set('Content-Type','application/json');
                    response.status(201).send(noteToInsert);
                 }
            });
        });
    };

})(module.exports);