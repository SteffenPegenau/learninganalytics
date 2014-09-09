//google.load('visualization', '1.1', {'packages': ['corechart']});
//google.setOnLoadCallback(DrawChart());


/**
 * 
 */
function DrawChart(div) {
	$.ajax({
		url: "/mod/learninganalytics/rest/rest.php/latestCourseViews/3",
		dataType: 'json'
	}).done(function (result) {
		console.log(result);
		console.log(result[0]);
		console.log(result[1]);
		console.log(result[2]);
		console.log(result[3]);
		console.log(result[4]);
		
		//------------------------------------------------------------------//
		// Create and populate the data table.
		//------------------------------------------------------------------//
		//var data = new google.visualization.arrayToDataTable(result);
		//data.addColumn('number', 'x days ago');
		//data.addColumn('number', 'Unique course views');
		//data.addColumn('number', 'Rest of students');
        var array = new Array();
		var subarray3 = new Array('x days ago', 'Unique course views');
		var subarray4 = new Array(subarray3);
		
		for (var i = 0; i < 8; i++) {
			var subarray1 = new Array();
			var subarray2 = new Array();
			subarray1.push(i + 1, result[i]);
			subarray2.push(result[i]);
			subarray4.push(subarray1);
		};
		array.push(subarray1, subarray2);
		//console.log(subarray1);
		//console.log(subarray2);
		console.log(subarray3);
		console.log(subarray4);
		console.log(array);
		/*console.log([
    	                                                  ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
    	                                                   'Western', 'Literature', { role: 'annotation' } ],
    	                                                  ['2010', 10, 24, 20, 32, 18, 5, ''],
    	                                                  ['2020', 16, 22, 23, 30, 16, 9, ''],
    	                                                  ['2030', 28, 19, 29, 30, 12, 13, '']
    	                                                ])*/
		
    	/*$.each(result, function(id, felder) {
    		console.log(felder);
    		
    		subarray.push(felder);
			/*subarray.push(felder);
			subarray.push(felder);
			subarray.push(felder);
			subarray.push(felder);
			subarray.push(felder);
    		//data.addRow(array);
			//data.addRow('boolean', eigenschaften.bezeichnung);
			//array.push(subarray);
		});
		console.log(subarray);*/
    	//data.addRows(array);
    	var data = google.visualization.arrayToDataTable(subarray4);
	
	var options = {
			width: 600,
			height: 400,
			legend: { position: 'top', maxLines: 3 },
			bar: { groupWidth: '75%' },
			isStacked: true,
			hAxis: {
				gridlines: 10,
			},
	};
	
	var chart = new google.visualization.ColumnChart(document.getElementById(div));
	
	chart.draw(data, options);
	});
}

function DrawGUI(div) {
	DrawChart(div);
}