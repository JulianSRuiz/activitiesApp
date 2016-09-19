angular.module('dosumApp')
    .controller('mainCtrl', function($scope, $state, doSumService) {

        $scope.location = ["Boston", "Chicago", "Dallas", "Los Angeles", "Miami", "New York", "Seattle"];

        $scope.getActivities = function(filterQuery) {
            console.log(filterQuery);
            doSumService.getData(filterQuery)
                .then(function(activities) {
                  if (activities.length === 0) {
                    activities[0] = {title : "No results.",
                        supplierName: "No results.",
                        fromPrice: "No results."}
                  }
                  console.log(activities);
                    $scope.activities = activities;
                    $state.go('activities');
                    $('.activity-card').slideUp('slow');
                    //$('.activity-card').slideDown('slow');
                })
        }


        $scope.postMessage = function(x) {
          doSumService.postMessage(x)
          };

        $scope.reviews = doSumService.getMessages();



    });
