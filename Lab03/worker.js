self.addEventListener('message', function(e) {
	
	Number.prototype.toRad = function() {
    	return this * Math.PI / 180;
	}

	var data = e.data;

	var userLat = data.userLat;
	var userLng = data.userLng;
	var fileLat = data.fileLat;
	var fileLng = data.fileLng;

	var R = 6371; //km
	var dLat = (fileLat - userLat).toRad();
	var dLon = (fileLng - userLng).toRad();
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(userLat.toRad()) * Math.cos(parseFloat(fileLat).toRad()) * Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = parseInt(R*c);

	data.distance = d;
	self.postMessage(data.distance);

})