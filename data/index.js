(function (data){
    var seedData = require ('./seedData');
    var database = require ('./database');


    //Get all categories.
    data.getNotesCategories = function (next){
        //next(null, seedData.initialNotes); //Used to seed initial data gotten from seedData.js

        database.getDb(function (error,db) {
            if (error){
                next (error, null);
            } else {
                db.notes.find().toArray( function (error, results) {
                    if (error){
                        console.log ('Failed to retrieve notes from database: ' + error);
                        next (error, null);
                    } else {
                        console.log ('Retrieved notes from database.');
                        next (null, results);
                    }
                });
            }
        });
    };

    //Get notes from a given category name.
    data.getNotes = function (categoryName, callbackFn){

        database.getDb(function (error,db) {
            if (error){
                callbackFn (error, null);
            } else {
                db.notes.findOne ({ name:categoryName }, callbackFn);
            }
        });
    };

    //Creates a new category with an empty array of notes.
    data.createNewCategory = function ( categoryName, callbackFn ){
        var cat = {}

        database.getDb(function (error,db) {
            if (error){
                next (error);
            } else {

                db.notes.find({name:categoryName}).count(function(error, count){
                    if (error) {
                        callbackFn(error);
                    } else {
                        if (count!=0) {
                            callbackFn('Category name exists');
                        } else {
                            cat.name = categoryName;
                            cat.notes = []       
                            db.notes.insert(cat, function (error){
                                if (error){
                                    callbackFn(error);
                                } else {
                                    callbackFn(null)
                                }
                            });
                        }
                    }
                });
            }
        });
    };

    //Add a note to a given category.
    data.addNote = function (categoryName, noteToInsert, callbackFn){
        database.getDb(function (error,db) {
            if (error){
                callbackFn (error);
            } else {
                db.notes.update({name:categoryName}, { $push: { notes: noteToInsert } }, callbackFn);
            }
        });
    };

    data.addUser = function (user, callbackFn) {
        database.getDb(function (error, db) {
            if (error){
                console.log('Failed to add user to BD');
                callbackFn(error);
            } else {
                db.users.insert(user, function (error){
                    if (error){
                        callbackFn(error);
                    } else {
                        callbackFn(null)
                    }
                });
            }
        });
    };

    data.getUser = function (username, callbackFn) {
        database.getDb(function (error, db) {
            if (error){
                console.log('Failed to get user from DB');
                callbackFn(error);
            } else {
                db.users.findOne({username:username}, callbackFn);
            }
        });
    };

    function seedDataBase () {
        database.getDb ( function ( error, db){
            if (error){
                console.log ('Failed to seed database: ' + error);
            } else {
                //Test to see id data exist yet to avoid reseeding
                db.notes.count ( function (error, data){
                    if (error) {
                        console.log ('Failed to count nodes in database: ' + error);
                    } else {
                        if (data===0){
                            console.log ('Seeding data into database.');
                            seedData.initialNotes.forEach (function (note) {
                                 db.notes.insert(note,function (error){
                                     if (error){
                                         console.log ('Failed to insert node in database: ' + error);
                                     }
                                 });
                            });
                        } else {
                            console.log ('Database already seeded.');
                        }
                    }
                });
            }
        });
    };

    seedDataBase();

})(module.exports);