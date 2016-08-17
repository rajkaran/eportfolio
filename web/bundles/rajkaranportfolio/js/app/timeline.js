

define(["jquery", "draggable", "svg"],function ($, draggable, svg) {

	var SELF,
		PROJECTS,
		YEAR_BAR = new Object(),
		YEAR_TEXT_MOVE_LEFT = 40,
		DIAMETER = 160,
		ANGLE_FOR_DROP = 30,
		LENGTH_OF_DROP = 60,
		DAY_EQUALS_TO_PIXEL = 1,
		TIMELINE_PADDING_LEFT = 50,
		MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24,
		PADDING_TOP_BOTTOM = 10,
		Y_AXIS_RANGE_FROM,
		Y_AXIS_RANGE_TO,
		X_AXIS_LAST_POINT,
		PADDING_FOR_LAST_POINT = 20,
		COLOUR_COMBOS = [["E18942","EECD86"], ["ff6600","ff9900"], ["89E894","BED661"], ["732C7B", "BDAEC6"], ["78D5E3","93E2D5"]],
		SVG_CANVAS_ID = "timeline",
		SVG_CANVAS_HEIGHT,
		SVG_CANVAS_WIDTH,
		TEXT_COLOUR = '#fff';

    return{
		createTimeline:function(){
			SELF = this;

			url = $(".timeline").data("timeline");

			$.ajax({
				type: "POST",
				url: url,
				data: {  },
				statusCode: {
					200: function (response) {
						PROJECTS = JSON.parse( response );
						SELF.calculateProjectCordinates();
					},
					404: function (msg) {
						console.log("Failed to load Projects.....")
					}
				}
			});


		},



		//Calculate coordinate for every project on the x-axis
		calculateProjectCordinates:function(){

			var counter = 0;
			var previousDate;
			var	pointerOnXaxis = 0;

			Y_AXIS_RANGE_FROM = PADDING_TOP_BOTTOM+(DIAMETER/2);
			SVG_CANVAS_HEIGHT = $("#"+SVG_CANVAS_ID).height();
			SVG_CANVAS_WIDTH = $("#"+SVG_CANVAS_ID).width();
			Y_AXIS_RANGE_TO = SVG_CANVAS_HEIGHT-(PADDING_TOP_BOTTOM+(DIAMETER/2)+LENGTH_OF_DROP);

			Object.keys(PROJECTS).forEach(function (key) {

				var thisDate = SELF.parseDate( PROJECTS[key]['developed_when'] );

				PROJECTS[key]['position_on_y-axis'] = SELF.getRandomInt(Y_AXIS_RANGE_FROM, Y_AXIS_RANGE_TO);

				if(counter == 0){
					PROJECTS[key]['position_on_x-axis'] = parseInt(TIMELINE_PADDING_LEFT + (DIAMETER/2));
				}
				else{
					PROJECTS[key]['position_on_x-axis'] = parseInt( pointerOnXaxis+(DIAMETER/2)+(SELF.dateDiffInDays(previousDate, thisDate)*DAY_EQUALS_TO_PIXEL)+(DIAMETER/2) );
				}

				counter++;
				previousDate = thisDate;
				pointerOnXaxis = PROJECTS[key]['position_on_x-axis'];

				var yearForThis = new Date(thisDate).getFullYear();
				var firstDateOfYear = SELF.parseDate( yearForThis+'-01-01');

				X_AXIS_LAST_POINT = SELF.dateDiffInDays(thisDate, firstDateOfYear)+pointerOnXaxis+(DIAMETER/2);
				YEAR_BAR[yearForThis] = {date:thisDate, 'position_on_x-axis':X_AXIS_LAST_POINT, text:yearForThis};

			});



			SELF.createBubbles();

		},


		/*
		 * Returns a random integer between min (inclusive) and max (inclusive)
		 * Using Math.floor() will give you a non-uniform distribution!
		 */
		getRandomInt : function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		/* This function breaks the input date string into different components and then creates a date using
		 * JS Date object. This function is required to fix the issue with safari, as it does not parse 2014-07-15T00:00:00-0400
		 * and throws invalid date error.
		 */
		parseDate : function(str) {
			var a = $.map(str.split(/[^0-9]/), function(s) { return parseInt(s, 10) });
			return new Date(a[0], a[1]-1 || 0, a[2] || 1, a[3] || 0, a[4] || 0, a[5] || 0, a[6] || 0);
		},

		// get the difference between two dates while ignoring time part and timezone
		dateDiffInDays : function(x, y) {

			var a = new Date(x);
			var b = new Date(y);
			var utc1 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
			var utc2 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());

			return Math.floor((utc2 - utc1) / MILLISECONDS_PER_DAY);
		},



		createBubbles:function(){

			var draw = SVG(SVG_CANVAS_ID).size('100%', '100%');

			var allElements = draw.group();
			var circleArray = new Array();
			var imageArray = new Array();
			var projectNameArray = new Array();
			var connnectorArray = new Array();
			var yearBarArray = new Array();
			var yearBarTextArray = new Array();

			var preX = PROJECTS[0]['position_on_x-axis'];
			var preY = PROJECTS[0]['position_on_y-axis'];



			var rect = draw.rect(X_AXIS_LAST_POINT+PADDING_FOR_LAST_POINT+(DIAMETER/2), SVG_CANVAS_HEIGHT);
			rect.fill('#4c4c4c');

			var s1, s2, s3, s4
			var gradientPath = draw.gradient('linear', function(stop) {
				s3 = stop.at(0, '#E18942')
				s4 = stop.at(1, '#fff')
			})
			gradientPath.from(0, 0).to(0, 1)

			allElements.add(rect);

			Object.keys(PROJECTS).forEach(function (key) {

				var colorCombo = COLOUR_COMBOS[ SELF.getRandomInt(0, COLOUR_COMBOS.length-1) ];

				var gradient = draw.gradient('linear', function(stop) {
					s1 = stop.at(0, "#"+colorCombo[0])
					s2 = stop.at(.7, "#"+colorCombo[1])
				})

				gradient.from(0, 0).to(0, 1)

				circleArray[key] =  draw.circle( DIAMETER, DIAMETER ).center(PROJECTS[key]['position_on_x-axis'], PROJECTS[key]['position_on_y-axis']).fill(gradient).style({ cursor: 'pointer' });

				circleArray[key].attr('id', key);
				circleArray[key].data('dropColorFrom', colorCombo[1]);

				//imageArray[key] = draw.image('./../bundles/rajkaranportfolio/image/'+PROJECTS[key]['develop_for']+'.png', 80, 50).center(PROJECTS[key]['position_on_x-axis'], PROJECTS[key]['position_on_y-axis']-40)
				imageArray[key] = draw.image('../bundles/rajkaranportfolio/image/'+PROJECTS[key]['develop_for']+'.png', 80, 50).center(PROJECTS[key]['position_on_x-axis'], PROJECTS[key]['position_on_y-axis']-40)

				projectNameArray[key] = SELF.createProjectName(PROJECTS[key], draw);

				if(key>0){
					var edge = SELF.circleEdge( preX,preY,PROJECTS[key]['position_on_x-axis'],PROJECTS[key]['position_on_y-axis'],(DIAMETER/2) );
					var reverseEdge = SELF.circleEdge( PROJECTS[key]['position_on_x-axis'],PROJECTS[key]['position_on_y-axis'],preX,preY,(DIAMETER/2) );

					connnectorArray[key] = draw.line( edge[0], edge[1], reverseEdge[0], reverseEdge[1] ).stroke({ width: 2 }).fill(TEXT_COLOUR);

					preX = PROJECTS[key]['position_on_x-axis'];
					preY = PROJECTS[key]['position_on_y-axis'];

					allElements.add(connnectorArray[key]);
				}

				allElements.add(circleArray[key]);
				allElements.add(imageArray[key]);
				allElements.add(projectNameArray[key]);

			});

			Object.keys(YEAR_BAR).forEach(function (key) {
				yearBarArray[key] =  draw.line( YEAR_BAR[key]['position_on_x-axis'], YEAR_TEXT_MOVE_LEFT, YEAR_BAR[key]['position_on_x-axis'], SVG_CANVAS_HEIGHT-PADDING_TOP_BOTTOM ).stroke({ width: 1, dasharray: '10 10' }).fill(TEXT_COLOUR);

				yearBarTextArray[key] = draw.text(YEAR_BAR[key]['text']+'').center( YEAR_BAR[key]['position_on_x-axis'], PADDING_TOP_BOTTOM*2 ).font({size:18, weight:'bold'}).style({ fill: TEXT_COLOUR });

				allElements.add(yearBarTextArray[key]);
				allElements.add(yearBarArray[key]);
			});

			allElements.draggable({
			  minX: (SVG_CANVAS_WIDTH/2)-( X_AXIS_LAST_POINT+PADDING_FOR_LAST_POINT+(DIAMETER/2) )
			, minY: 0
			, maxX: X_AXIS_LAST_POINT+PADDING_FOR_LAST_POINT+(DIAMETER/2)
			, maxY: SVG_CANVAS_HEIGHT
			})
console.log('in bubbles', gradientPath);
			var path = draw.path('M5 10 Q10 20 40 30 ').fill(gradientPath);
console.log('in bubbles', path);
			allElements.add(path);

			var colorFrom = SVG.get(0).data('dropColorFrom');
			s3.update(0, "#"+colorFrom);

			SELF.updateDrop(0, path);
			SELF.updateProjectDescription(0);

			console.log(allElements);

			allElements.click(function(event) {

				console.log('cliclked', event);

				if(event.target.nodeName == "ellipse"){
					var key = $(event.target).attr('id');
					var colorFrom = SVG.get(key).data('dropColorFrom');

					s3.update(0, "#"+colorFrom);
					s4.update(0.7, "#fff");

					SELF.updateDrop( key, path);
					SELF.updateProjectDescription(key);
				}
			})

			allElements.touchstart(function(event) {
				if(event.target.nodeName == "ellipse"){
					var key = $(event.target).attr('id');
					var colorFrom = SVG.get(key).data('dropColorFrom');

					s3.update(0, "#"+colorFrom);
					s4.update(0.7, "#fff");

					SELF.updateDrop( key, path);
					SELF.updateProjectDescription(key);
				}
			})


		},


		updateDrop : function(key, path){

			var coordinates = SELF.getCoordinatesAtAngleForDrop(ANGLE_FOR_DROP, [PROJECTS[key]['position_on_x-axis'], PROJECTS[key]['position_on_y-axis']]);

			var dropEndPointY = LENGTH_OF_DROP+(DIAMETER/2)+PROJECTS[key]['position_on_y-axis'];
			var dropCurvePointLeftX = PROJECTS[key]['position_on_x-axis'] - 10;
			var dropCurvePointRightX = PROJECTS[key]['position_on_x-axis'] + 10;
			var dropCurvePointY = dropEndPointY - 30;

			plotString = 'M'+coordinates['left']['x']+' '+coordinates['left']['y']+' Q'+dropCurvePointLeftX+' '+dropCurvePointY+' '+PROJECTS[key]['position_on_x-axis']+' '+dropEndPointY+' Q'+dropCurvePointRightX+' '+dropCurvePointY+' '+coordinates['right']['x']+' '+coordinates['right']['y']+' ';

			path.plot(plotString)

		},

		updateProjectDescription : function(key){
			$("#project_name").html( PROJECTS[key]['project_name'] );
			$("#description").html( PROJECTS[key]['description'] );
			$("#feature").html( PROJECTS[key]['feature'] );
			$("#technology").html( PROJECTS[key]['technology'] );
			$("#development_aim").html( PROJECTS[key]['development_aim'] );
			$("#development_period").html( PROJECTS[key]['development_period'] );
		},

		circleEdge : function(x1,y1,x2,y2,r){
			var dx=x1-x2;
			var dy=y1-y2;
			var angle=Math.atan2(dy,dx);

			var xx=x2+r*Math.cos(angle);
			var yy=y2+r*Math.sin(angle);

			return Array(xx,yy);
		},

		createProjectName : function(projectObject, draw){
			var array = projectObject['alias'].split(" ");

			var string = "";
			for(var i=1; i<array.length; i++){
				string += " "+array[i];
			}

			return draw.text(function(add) {
				add.tspan(array[0]).center(projectObject['position_on_x-axis'], projectObject['position_on_y-axis']+15)
				add.tspan(string).center(projectObject['position_on_x-axis'], projectObject['position_on_y-axis']+35)
			}).font({size:18, weight:'bold'}).style({ fill: TEXT_COLOUR, 'text-anchor':'middle' });

		},

		getCoordinatesFromCenterForAngle : function(angle){
			var angleInRadian = SELF.toRadians(angle);
			var sinTheta = Math.sin( angleInRadian );
			var cosTheta =  Math.cos( angleInRadian );

			var x = ( cosTheta*(DIAMETER/2) )
			var y = ( sinTheta*(DIAMETER/2) );

			return [x,y];
		},

		getCoordinatesAtAngleForDrop : function(angle, center){
			var pointOFIntersection = new Object();

			pointOnCircumference = SELF.getCoordinatesFromCenterForAngle(angle);

			pointOFIntersection['right'] = new Object();
			pointOFIntersection['left'] = new Object();

			pointOFIntersection['right']['x'] = SELF.round(pointOnCircumference[0]+center[0],2);
			pointOFIntersection['right']['y'] = SELF.round(pointOnCircumference[1]+center[1],2);

			pointOFIntersection['left']['x'] = SELF.round(center[0]-pointOnCircumference[0],2);
			pointOFIntersection['left']['y'] = SELF.round(pointOnCircumference[1]+center[1],2);

			return pointOFIntersection;
		},

		toRadians : function(degree){
			return degree * (Math.PI/180);
		},

		round : function(value, exp) {
			if (typeof exp === 'undefined' || +exp === 0)
			return Math.round(value);

			value = +value;
			exp  = +exp;

			if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
			return NaN;

			// Shift
			value = value.toString().split('e');
			value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

			// Shift back
			value = value.toString().split('e');
			return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
		},


	}







});
