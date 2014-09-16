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
		url: "/mod/learninganalytics/rest/rest.php/latestForumPosts/5",
		dataType: 'json'
	}).done(function (result) {
		console.log(result);
		//console.log(result[8]);
		
		//------------------------------------------------------------------//
		// Create and populate the data table.
		//------------------------------------------------------------------//
       	var subarray = new Array('number of days ago', 'New posts');
		var array = new Array(subarray);
		
		for (var i = 0; i < result.length; i++) {
			var subarray1 = new Array();
			subarray1.push(i + 1, result[i]);
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
    	                 ]);
    	
    	
    	//------------------------------------------------------------------//
    	// Create the chart visualization.
    	//------------------------------------------------------------------//
    	var columnChart = new google.visualization.ChartWrapper({
            chartType: 'ColumnChart',
            containerId: 'column_chart_div',
            dataTable: data,
            options: {
            	title: 'New forum posts in the past 8 days',
        		width: 400,
        		height: 200,
        		colors: ['#99A604'],
        		legend: {
        			position: 'none',
        			maxLines: 3
        			},
        		bar: {
        			groupWidth: '50%'
        			},
        		isStacked: false,
        		hAxis: {
        			title: 'number of days ago',
        			gridlines: {
        				count: 8,
        			},
        			format: '#',
        		},
        		vAxis: {
        			title: 'Number of new posts',
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
          containerId: 'column_filter_div',
          dataTable: data,
          options: {
            filterColumnIndex: 0
          },
        });
    	
        
    	//------------------------------------------------------------------//
		// Create a dashboard.
		//------------------------------------------------------------------//
    	var dashboard = new google.visualization.Dashboard(document.getElementById('learningAnalyticsDIV2'));
    	
    	
    	//------------------------------------------------------------------//
    	// Establish dependencies.
    	//------------------------------------------------------------------//
    	dashboard.bind([dayRangeSlider], [columnChart]);

    	
    	//------------------------------------------------------------------//
		// Draw the dashboard.
		//------------------------------------------------------------------//
    	dashboard.draw(view);
	});
}