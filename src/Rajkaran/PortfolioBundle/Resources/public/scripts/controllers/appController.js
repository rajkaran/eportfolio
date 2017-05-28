'use strict';


portfolioModule.controller('appCtrl',['$scope', 'ajaxService', function ($scope, ajaxService) {

	$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

	// Initialize all tooltips
	$('[data-toggle="tooltip"]').tooltip();

	$scope.enquiry = {
		name:'',
		email:'',
		message:'',
		nameStyle:'',
		emailStyle:'',
		messageStyle:'',
		error:{},
		errorStyle:'alert-warning',
		errorShow:false,
		buttonText : 'Send message',
		disableButton : ''
	}




	/*
	$scope.hoverIn = function(e){
		var target = e.currentTarget, srcUrl = '', imgTag;

		if(target == 'IMG'){
			imgTag = target;
			srcUrl =  e.target.src;
		}
		else{
			var anchorTag = angular.element(e.currentTarget);
			imgTag = anchorTag.find('img')[0];
			srcUrl =  imgTag.src;
		}

		srcUrl = srcUrl.replace('Light', 'Green');
		imgTag.src = srcUrl;
    };

    $scope.hoverOut = function(e){
		var target = e.currentTarget, srcUrl = '', imgTag;

		if(target == 'IMG'){
			imgTag = target;
			srcUrl =  e.target.src;
		}
		else{
			var anchorTag = angular.element(e.currentTarget);
			imgTag = anchorTag.find('img')[0];
			srcUrl =  imgTag.src;
		}

		srcUrl = srcUrl.replace('Green', 'Light');
		imgTag.src = srcUrl;
    };*/



}]);
