(function (database){

    var mongoDb = require ('mongodb');
    var mongoUrl = 'mongodb://localhost:27017/theBoard';
    var theDb = null;

    database.getDb = function (callbackFn) {
        if (!theDb){
            //Connecto to db
            mongoDb.MongoClient.connect(mongoUrl, function (error, db) {
                if (err){
                    callbackFn(error,null);
                } else {
                    theDb = {
                        db: db
                    };
                    callbackFn(null,theDb);
                }
            });
        } else {
            callbackFn (null, theDb);
        }

    }

})(module.exports);