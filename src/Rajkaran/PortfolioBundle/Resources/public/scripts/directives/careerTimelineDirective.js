
'use strict';



portfolioModule.directive('careerTimeline', ['careerTimelineService', function( careerTimelineService ){

	return{
		restrict:'A',
		transclude: false,
		scope:{
			projectList: '@',
            url:'@',
            diameter:'=',
            angleForDrop:'=',
            dropLength:'=',
            dayToPixel:'=',
            millisecondPerDay:'=',
            yAxis:'=',
		},
		link : function(scope, element, attrs){

            // var projectList = angular.fromJson(scope.projectList);
            // var svgHeight = element.parent().height();
            // var svgWidth = element.parent().width()
			//
            // var draw = SVG(element[0]).size(svgWidth, svgHeight);
			//
            // careerTimelineService.setComponentCoordinate(projectList, scope.diameter, scope.dayToPixel);
			//
            // var rect = draw.rect(100, 100).attr({ fill: '#f06' })


		},
	};
}]);
