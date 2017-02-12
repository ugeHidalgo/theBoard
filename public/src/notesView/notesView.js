(function (angular) {
    var theModule = angular.module ('notesView', ['ui.bootstrap']); 
    
     theModule.controller ('notesViewController',  [
         '$scope', '$window', '$http',
         function ($scope, $window, $http) {
            $scope.notes = [];
            $scope.colors= ['yellow', 'blue', 'orange', 'green'];
            $scope.newNote = createEmptyNote();

            //Get the category name
            var urlParts = $window.location.pathname.split('/');
            var categoryName = urlParts[urlParts.length-1];

            //The url for the API to be called
            var notesUrl = '/api/notes/'+categoryName;

            $http.get(notesUrl).
                then(function (result) {
                    //Success
                    $scope.notes = result.data;
                }, function (error) {
                    //Error
                    alert (error);
                });

            $scope.saveNote = function () {
                $http.post( notesUrl, $scope.newNote).
                    then(function (result) {
                        $scope.notes.push(result.data);
                        $scope.newNote = createEmptyNote();
                    }, function (error) {

                    });  
            };

        }
        ]);

        function createEmptyNote() {
            return {
                color: 'yellow',
                note: '',
                author: ''
            };
        };

})(window.angular);
