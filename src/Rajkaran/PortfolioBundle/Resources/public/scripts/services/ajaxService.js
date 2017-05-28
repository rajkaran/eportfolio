
'use strict';


srvcModule.service('ajaxService',['$http', '$q',function($http, $q){

	var requestJsonResponse = function(route, data){
		var deferred = $q.defer();

		$http.post(Routing.generate(route), {data:data})
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(msg, code){
			deferred.reject(msg);
		});

		return deferred;
	};

	this.makeAnAjaxCall = function(route, data){
		return requestJsonResponse(route, data).promise;
	};

}]);
