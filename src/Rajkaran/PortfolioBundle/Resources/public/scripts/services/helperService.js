
'use strict';


srvcModule.service('helperService',[ function( ){

    this.validateEmail = function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	this.objectSize = function(object){
		var count = 0, i;

		for (i in object) {
			if (object.hasOwnProperty(i)) { count++; }
		}

		return count;
	}


}]);
