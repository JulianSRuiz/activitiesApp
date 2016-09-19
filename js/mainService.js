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
          reviews.unshift(post);
        }

        this.getMessages = function() {
          return reviews;
        }


        var reviews = [



            {subject: "Edison bulb bicycle",
            review: "Rights crucifix, aesthetic bushwick four dollar toast hexagon pug pabst. Jianbing polaroid VHS photo booth, pitchfork locavore microdosing brunch hexagon bushwick whatever mlkshk bitters. Selfies pork belly DIY, fixie 8-bit blog hot chicken copper mug deep v retro pickled iPhone. Lomo put a bird on it snackwave, semiotics master cleanse church-key leggings. Jean shorts migas wolf typewriter air plant venmo. Microdosing meditation hammock enamel pin bitters polaroid freegan. Lo-fi shabby chic godard pinterest photo booth art party meh, portland",
            person: 'Anonymous'},


            {subject: "Trust fund, green juice",
            review: "Tumblr fanny pack dreamcatcher. Activated charcoal gochujang XOXO narwhal synth photo booth. Ennui mixtape trust fund selvage kale chips la croix irony DIY four loko. Cardigan master cleanse tilde, crucifix before they sold out raclette chia copper mug hell of shoreditch PBR&B cronut food truck single-origin coffee. Stumptown coloring book ethical pabst, put a bird on it PBR&B dreamcatcher. Locavore yuccie bicycle rights schlitz, cardigan blue bottle fap tattooed. Keytar 90s tousled before they sold out farm-to-table, fam fixie yuccie salvia schlitz XOXO lomo.",
            person: 'Anonymous'},



            {subject: "scenester mumblecore",
            review: "Trust fund green juice poke meh fingerstache gentrify crucifix. Mixtape lomo organic pitchfork. Gochujang small batch blog, tilde yuccie hot chicken gastropub. Deep v woke poutine chartreuse tousled. Try-hard meggings chambray green juice messenger bag. Letterpress umami heirloom cliche tilde literally, poutine microdosing tbh marfa fixie coloring book kombucha actually franzen. Cronut DIY copper mug edison bulb, viral waistcoat cardigan messenger bag.",
            person: 'Anonymous'},



            {subject: "Jianbing prism",
            review: "ennui cred edison bulb hashtag hoodie everyday carry kinfolk ramps helvetica. +1 air plant lomo edison bulb, tote bag direct trade prism four dollar toast yr thundercats. Blog lomo shoreditch scenester lyft, godard flexitarian. Vice sriracha sartorial readymade, ethical salvia pok pok raclette cardigan chia etsy retro intelligentsia gluten-free. Meh raw denim fingerstache, art party thundercats la croix pug glossier semiotics. Bushwick hell of salvia, chambray echo park ennui flannel cliche shoreditch DIY retro selfies poutine. Quinoa disrupt echo park next level kinfolk swag thundercats sriracha, sustainable authentic meditation fashion axe pug portland.",
            person: 'Anonymous'},



            {subject: "ennui gentrify",
            review: "Man bun raw denim single-origin coffee green juice williamsburg, pour-over meggings bitters. Artisan viral fashion axe meditation ramps. Helvetica occupy enamel pin pabst. Lumbersexual meditation chambray semiotics, poutine crucifix flexitarian salvia hella fam. Direct trade polaroid wayfarers iPhone taxidermy. Gentrify 8-bit roof party, shoreditch tousled meggings intelligentsia franzen celiac.",
            person: 'Anonymous'}
          ]





    })
