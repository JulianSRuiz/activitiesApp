angular.module('dosumApp')
    .service('doSumService', function($http, $q) {

        var baseUrl = 'http://terminal2.expedia.com/x/activities/search';
        var apikey = 'AmoVsRBADzERLLuqH5bjMV52JphpTYYh';
        var geocodeURL = "https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters";

        var inexpensive = [];
        var average = [];
        var above_average = [];
        var expensive = [];

        this.getData = function(filterQuery) {
            var deferred = $q.defer();
            $http.get(baseUrl + "?location=" + filterQuery.location + "&apikey=" + apikey)
                .then(function(results) {
                    if (filterQuery.price) {
                        getPricePoint(results.data.activities);
                        if (filterQuery.price === "inexpensive") {

                            deferred.resolve(inexpensive);
                        } else if (filterQuery.price === "average") {
                          console.log()
                            deferred.resolve(average);
                        }
                        if (filterQuery.price === "above_average") {
                            deferred.resolve(above_average);
                        } else {
                            deferred.resolve(expensive);
                        }
                    }
                })
            return deferred.promise;
        }


        function datamapper(x) {
            //console.log(Array.isArray(x), x);
            return x.map(function(ele) {
                return {
                    title: ele.title,
                    largeImageURL: ele.largeImageURL,
                    fromPrice: ele.fromPrice,
                    shortDescription: ele.supplieName,
                    latLng: ele.latLng
                }
            })
        }



        function getPricePoint(activities) {
            return activities.map(function(ele) {
                var price = parseInt(ele.fromPrice.slice(1));
                if (price <= 15) {
                    inexpensive.push(ele);
                } else if (price > 15 && price <= 40) {
                    average.push(ele);
                } else if (price > 40 && price <= 100) {
                    above_average.push(ele);
                } else {
                    expensive.push(ele);
                }
            })
        }


        this.postMessage = function(post) {
          return $http({
            method: 'POST',
            data: {message:post,
                person: 'Anonymous:'}
          })
          .then(function(response) {

          });
        }

    })
