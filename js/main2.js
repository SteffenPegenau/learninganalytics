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
		url: "/mod/learninganalytics/rest/rest.php/latestCourseViews/3",
		dataType: 'json'
	}).done(function (result) {
		console.log(result);
		console.log(result[8]);
		
		//------------------------------------------------------------------//
		// Create and populate the data table.
		//------------------------------------------------------------------//
       	var subarray = new Array('number of days ago', 'Unique student course views', 'Number of Students that have not viewed the course that day');
		var array = new Array(subarray);
		
		for (var i = 0; i < result.length-1; i++) {
			var subarray1 = new Array();
			subarray1.push(i + 1, result[i], result[result.length-1] - result[i]);
			array.push(subarray1);
		};
		console.log(subarray);
		console.log(array);
		
    	var data = google.visualization.arrayToDataTable(array);
    	
    	
    	//------------------------------------------------------------------//
    	// Create the chart visualization.
    	//------------------------------------------------------------------//
    	var stackedChart = new google.visualization.ChartWrapper({
            chartType: 'ColumnChart',
            containerId: 'stacked_chart_div',
            dataTable: data,
            options: {
        		width: 600,
        		height: 400,
        		legend: { position: 'top', maxLines: 3 },
        		bar: { groupWidth: '75%' },
        		isStacked: true,
        		hAxis: {
        			title: 'number of days ago',
        			gridlines: {
        				count: 8,
        			},
        			format: '#',
        		},
            },
        });
    	
    	//------------------------------------------------------------------//
    	// Create a range slider for the stacked chart.
    	//------------------------------------------------------------------//
        var donutRangeSlider = new google.visualization.ControlWrapper({
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
    	dashboard.bind([donutRangeSlider], [stackedChart]);
    	
    	
    	//------------------------------------------------------------------//
		// Draw the dashboard.
		//------------------------------------------------------------------//
    	dashboard.draw(data);
	});
}