
'use strict';


srvcModule.service('careerTimelineService',[ function( ){

    this.setComponentCoordinate = function(list, diameter, dayToPixel){
        var result = [];

        Object.keys(list).forEach(function (key) {
            console.log(list)

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

	};


}]);
