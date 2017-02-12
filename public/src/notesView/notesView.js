(function (angular) {
    var theModule = angular.module ('notesView', []); 
    
     theModule.controller ('notesViewController',  [
         '$scope', '$window', '$http',
         function ($scope, $window, $http) {
            $scope.notes = [];

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

        }
        ]);

})(window.angular);