var holder = document.getElementById('holder');

var storedValues = {
    userLat: 0,
    userLng: 0,
    fileLat: "",
    fileLng: ""
};

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        storedValues.userLat = pos.lat;
        storedValues.userLng = pos.lng;

    });
}

if (typeof window.FileReader === 'undefined') {
    alert('File Reader not supported by your browser!')
}


holder.ondragover = function() {
    this.className = 'hover';
    return false;
};

holder.ondragend = function() {
    this.className = '';
    return false;
};

holder.ondrop = function(e) {
    this.className = '';
    e.preventDefault();

    var file = e.dataTransfer.files[0],
        reader = new FileReader();
    reader.onload = function(event) {
        var comma = event.target.result.indexOf(",");
        storedValues.fileLat = event.target.result.substr(0, comma - 1);
        storedValues.fileLng = event.target.result.substr(comma + 1);

        var locations = [
            [storedValues.userLat, storedValues.userLng],
            [parseFloat(storedValues.fileLat), parseFloat(storedValues.fileLng)]
        ];

        var bounds = new google.maps.LatLngBounds();
        for(i=0; i<locations.length; i++){
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 6,
              center: new google.maps.LatLng(locations[i][0], locations[i][1]),
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            bounds.extend(map.center);
        }

        map.fitBounds(bounds);

        var infowindow = new google.maps.InfoWindow();

        var geocoder = new google.maps.Geocoder();
        geocodeLatLng1(geocoder, locations, map, infowindow);

        var geocoder2 = new google.maps.Geocoder();
        geocodeLatLng2(geocoder, locations, map, infowindow);

    };
    reader.readAsText(file);
    return false;
};


function geocodeLatLng1(geocoder, locations, map, infowindow) {
    var latlng = {'lat': locations[0][0], 'lng': locations[0][1]};
    geocoder.geocode({'location': latlng}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
            if(results[0]) {
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });

                var regexp = /,/g;
                var match, matches = [];

                while ((match = regexp.exec(results[0].formatted_address)) != null) {
                  matches.push(match.index);
                }

                if(matches.length <= 2){
                    var street = results[0].formatted_address.substr(0,matches[0]);
                    var city = results[0].formatted_address.substr(matches[0]+1, matches[1]-3);
                } else {
                    var street = results[0].formatted_address.substr(0,matches[0]+1);
                    var city = results[0].formatted_address.substr(matches[0]+1, matches[1]-3);
                    var country = results[0].formatted_address.substr(matches[2] + 1);
                }

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        if(matches.length <= 2){
                            infowindow.setContent("<p> User location: " + "<br /><br />" + street + "<br />" + city + "<br /> " + "</p>");
                        } else {
                            infowindow.setContent("<p> User location: " + "<br /><br />" + street + "<br />" + city + "<br /> " + country + "</p>");
                        }
                        infowindow.open(map, marker);
                    }
                })(marker, 0));
            } else {
                window.alert("Error! No results found!")
            }
        } else {
            window.alert("Geocoder failed due to: " + status);
        }
    });
}

function geocodeLatLng2(geocoder, locations, map, infowindow) {
    var latlng = {'lat': locations[1][0], 'lng': locations[1][1]};
    geocoder.geocode({'location': latlng}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
            if(results[0]) {
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                

                var regexp = /,/g;
                var match, matches = [];

                while ((match = regexp.exec(results[0].formatted_address)) != null) {
                  matches.push(match.index);
                }

                if(matches.length <= 2){
                    var street = results[0].formatted_address.substr(0,matches[0]);
                    var city = results[0].formatted_address.substr(matches[0]+1, matches[1]+1);
                } else {
                    var street = results[0].formatted_address.substr(0,matches[0]);
                    var city = results[0].formatted_address.substr(matches[0]+1, matches[1]-3);
                    var country = results[0].formatted_address.substr(matches[2] + 1);
                }

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        if(matches.length <= 2){
                            infowindow.setContent("<p> File location: " + "<br /><br />" + street + "<br />" + city + "<br /> " + "</p>");
                        } else {
                            infowindow.setContent("<p> File location: " + "<br /><br />" + street + "<br />" + city + "<br /> " + country + "</p>");
                        }
                        infowindow.open(map, marker);
                    }
                })(marker, 1));
            } else {
                window.alert("Error! No results found!")
            }
        } else {
            window.alert("Geocoder failed due to: " + status);
        }
    });
}

