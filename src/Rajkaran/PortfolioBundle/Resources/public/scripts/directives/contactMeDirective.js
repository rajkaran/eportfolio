
'use strict';



portfolioModule.directive('contactMe', ['ajaxService', 'helperService', function( ajaxService, helperService ){

	return{
		restrict:'A',
		transclude: false,
		link : function(scope, element, attrs){

            element.find('#btnContactUs').on('click', function(event){
                scope.enquiry.error = {}; //reset to null
				scope.enquiry.errorShow = true;

				if(scope.enquiry.name == undefined || scope.enquiry.name == ''){
					scope.$apply(function () {
	        			scope.enquiry.error.name = 'Invalid name input.';
	        			scope.enquiry.nameStyle = 'has-error';
	        			scope.enquiry.errorStyle = 'alert-danger';
					});
        		}
        		else if(scope.enquiry.email == undefined || !helperService.validateEmail(scope.enquiry.email)){
					scope.$apply(function () {
						scope.enquiry.nameStyle = 'has-success';
						scope.enquiry.error.email = 'Invalid email address.';
	        			scope.enquiry.emailStyle = 'has-error';
	        			scope.enquiry.errorStyle = 'alert-danger';
					});
        		}
        		else if(scope.enquiry.message == undefined || scope.enquiry.message == ''){
					scope.$apply(function () {
						scope.enquiry.nameStyle = 'has-success';
						scope.enquiry.emailStyle = 'has-success';
	        			scope.enquiry.error.message = 'Invalid message input.';
	        			scope.enquiry.messageStyle = 'has-error';
	        			scope.enquiry.errorStyle = 'alert-danger';
					});
        		}

        		if(helperService.objectSize(scope.enquiry.error) > 0){
					scope.$apply(function () {
        				scope.enquiry.errorStyle = 'alert-danger';
					});
        		}
        		else{
					scope.$apply(function () {
						scope.enquiry.buttonText = 'Sending email';
		        		scope.enquiry.disableButton = true;
						scope.enquiry.errorStyle = 'alert-success';
						scope.enquiry.emailStyle = 'has-success';
						scope.enquiry.nameStyle = 'has-success';
						scope.enquiry.messageStyle = 'has-success';
					});

        			var promise = ajaxService.makeAnAjaxCall('fe_enquiry', scope.enquiry);

        			promise.then(function(response){
        				scope.enquiry.error.message = response.response;
        				scope.enquiry.email = '';
        				scope.enquiry.name = '';
        				scope.enquiry.message = '';
        				scope.enquiry.buttonText = 'Send message';
        				scope.enquiry.disableButton = '';
        	        }).catch(function(error){
        	            // this code block will run when there is some symfony error occured
        	            scope.enquiry.error.server = error.msg;
        				scope.enquiry.errorStyle = 'alert-danger';
        	        });
        		}
				
            });
		}, // end of link
	};
}]);
