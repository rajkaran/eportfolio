
'use strict';



portfolioModule.directive('project', ['careerTimelineService', function( careerTimelineService ){

	return{
		restrict:'A',
		transclude: false,
		link : function(scope, element, attrs){
    		element.owlCarousel({
    			responsiveClass:true,
    			responsive:{
    				0:{ items:1, nav:false },
    				500:{ items:2, nav:false },
    				767:{ items:3, nav:false },
    				992:{ items:4, nav:true, },
    				1200:{ items:4, nav:true, }
        		},
    			navText: [
    		      '<span class="fa fa-chevron-left" aria-hidden="true"></span>',
    		      '<span class="fa fa-chevron-right" aria-hidden="true"></span>'
    		    ],
    			stagePadding: 15,
    		    margin:15,
    		});
		},// end of link
	};
}]);
