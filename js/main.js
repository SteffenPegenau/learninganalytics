//google.load('visualization', '1.1', {'packages': ['corechart']});
//google.setOnLoadCallback(DrawChart());


/**
 * 
 */
function DrawChart(div) {
	$.ajax({
		url: "/mod/learninganalytics/rest/rest.php/latestCourseViews/3",
		dataType: 'json',
		context : document.body
	}).done(function (result) {
		console.log(result);
		console.log(result[8]);
		
		//------------------------------------------------------------------//
		// Create and populate the data table.
		//------------------------------------------------------------------//
       	var subarray = new Array('x days ago', 'Unique student course views', 'Number of Students that have not viewed the course that day');
		var array = new Array(subarray);
		
		for (var i = 0; i < result.length-1; i++) {
			var subarray1 = new Array();
			//var subarray3 = new Array();
			subarray1.push(i + 1, result[i], result[result.length-1] - result[i]);
			array.push(subarray1);
		};
		//console.log(subarray1);
		//console.log(subarray2);
		console.log(subarray);
		console.log(array);
		
    	var data = google.visualization.arrayToDataTable(array);
    	
    	
    	//------------------------------------------------------------------//
		// Create a ColumnChart.
		//------------------------------------------------------------------//
    	var chart = new google.visualization.ColumnChart(document.getElementById(div));
    	
    	
    	//------------------------------------------------------------------//
		// Setting the options for the column chart.
		//------------------------------------------------------------------//
    	var options = {
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
    	};
    	
    	
    	//------------------------------------------------------------------//
		// Draw the chart.
		//------------------------------------------------------------------//
    	chart.draw(data, options);
	});
}

function DrawGUI(div) {
	DrawChart(div);
}