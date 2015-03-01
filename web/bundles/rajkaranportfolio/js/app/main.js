define(["jquery", "bootstrap", "app/timeline", "app/browserCheck"], function ($, boostrap, timeline, browser) {
    
    $(document).ready(function(){
	
		//Show error message if browser does not suppport svg
		if(browser.isSVGSupported() == false) browser.showModel();
				
		// jQuery to collapse the navbar on scroll
		$(window).scroll(function() {
			if ($(".navbar").offset().top > 50) {
				$(".navbar-fixed-top").addClass("top-nav-collapse");
			} else {
				$(".navbar-fixed-top").removeClass("top-nav-collapse");
			}
		});

		// jQuery for page scrolling feature - requires jQuery Easing plugin
		$(function() {
			$('a.page-scroll').bind('click', function(event) {
				var $anchor = $(this);
				$('html, body').stop().animate({
					scrollTop: $($anchor.attr('href')).offset().top
				}, 1500, 'easeInOutExpo');
				event.preventDefault();
			});
		});

		// Closes the Responsive Menu on Menu Item Click
		$('.navbar-collapse ul li a').click(function() {
			$('.navbar-toggle:visible').click();
		});
		
		$('#navigation li a').hover(
			function() {
				var img = $( this ).find("img");
				var srcUrl = img.attr("src");
				srcUrl = srcUrl.replace("Black", "Blue");
				img.attr("src", srcUrl);
			}, function() {
				var img = $( this ).find("img");
				var srcUrl = img.attr("src");
				srcUrl = srcUrl.replace("Blue", "Black");
				img.attr("src", srcUrl);
			}
		);
		
		timeline.createTimeline();
	
	
	});
	
	
	
	
	
});
