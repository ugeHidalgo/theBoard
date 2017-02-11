(function (angular) {
    var theModule = angular.module ('notesView', []); 
    
     theModule.controller ('notesViewController',  [
         '$scope',
         function ($scope) {
            $scope.notes = [{
                    note: 'Hello World 1',
                    color: 'yellow',
                    author: 'Michael Jordan'
                },{
                    note: 'Hello World 2',
                    color: 'blue',
                    author: 'Charles Barkley'
                },{
                    note: 'Hello World 3',
                    color: 'green',
                    author: 'Isiah Thomas' 
                }];
        }
        ]);

})(window.angular);