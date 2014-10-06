//------------------------------------------------------------------//
// Load the Visualization API and the controls package.
//------------------------------------------------------------------//
google.load('visualization', '1.1', {'packages':['controls']});


//------------------------------------------------------------------//
// Set a callback to run when the Google Visualization API is loaded.
//------------------------------------------------------------------//
google.setOnLoadCallback(DrawVisualization());


/**
 * 
 */
function DrawVisualization() {
	$.ajax({
		url: "/mod/learninganalytics/rest/rest.php/latestCourseViews/5",
		dataType: 'json'
	}).done(function (result) {
		console.log(result);
		console.log(result[8]);
		
		//------------------------------------------------------------------//
		// Create and populate the data table.
		//------------------------------------------------------------------//
       	var subarray = new Array('number of days ago', 'Unique course views', 'Students that have not viewed the course');
		var array = new Array(subarray);
		
		for (var i = 0; i < result.length-1; i++) {
			var subarray1 = new Array();
			subarray1.push(i + 1, result[i], result[result.length-1] - result[i]);
			array.push(subarray1);
		};
		console.log(subarray);
		console.log(array);
	
    	var data = google.visualization.arrayToDataTable(array);
    	var view = new google.visualization.DataView(data);
    	
    	view.setColumns([0, 1,
    	                 { calc: "stringify",
    						sourceColumn: 1,
    						type: "string",
    						role: "annotation"
    	                 },
    	                 2]);
    	
    	
    	//------------------------------------------------------------------//
    	// Create the chart visualization.
    	//------------------------------------------------------------------//
    	var stackedChart = new google.visualization.ChartWrapper({
            chartType: 'ColumnChart',
            containerId: 'stacked_chart_div',
            dataTable: data,
            options: {
            	title: 'Student Course Views in the past 8 days',
        		width: 400,
        		height: 200,
        		colors: ['#99A604', '#F5A300'],
        		legend: {
        			position: 'top',
        			maxLines: 3
        			},
        		bar: {
        			groupWidth: '50%'
        			},
        		isStacked: true,
        		hAxis: {
        			title: 'number of days ago',
        			gridlines: {
        				count: 8,
        			},
        			format: '#',
        		},
        		vAxis: {
        			title: 'Students enrolled in this course: ' + result[8],
        			gridlines: {
        				count: 0,
        			},
        		},
            },
        });
    	
    	
    	//------------------------------------------------------------------//
    	// Create a range slider for the stacked chart.
    	//------------------------------------------------------------------//
        var dayRangeSlider = new google.visualization.ControlWrapper({
          controlType: 'NumberRangeFilter',
          containerId: 'filter_div',
          dataTable: data,
          options: {
            filterColumnIndex: 0
          },
        });
    	
        
    	//------------------------------------------------------------------//
		// Create a dashboard.
		//------------------------------------------------------------------//
    	var dashboard = new google.visualization.Dashboard(document.getElementById('learningAnalyticsDIV'));
    	
    	
    	//------------------------------------------------------------------//
    	// Establish dependencies.
    	//------------------------------------------------------------------//
    	dashboard.bind([dayRangeSlider], [stackedChart]);

    	
    	//------------------------------------------------------------------//
		// Draw the dashboard.
		//------------------------------------------------------------------//
    	dashboard.draw(view);
	});
}