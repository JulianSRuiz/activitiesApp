angular.module('dosumApp')
    .controller('mainCtrl', function($scope, $state, doSumService) {

        $scope.location = ["Chicago", "Dallas", "Los Angeles", "New York"];

        $scope.getActivities = function(filterQuery) {
            console.log(filterQuery);
            doSumService.getData(filterQuery)
                .then(function(activities) {
                  if (activities.length === 0) {
                    activities[0] = {title : "No results."}
                  }
                  console.log(activities);
                    $scope.activities = activities;
                    $state.go('activities');
                })
        }


    });
