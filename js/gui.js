/**
 * Generalized functions to draw tables, graphs and other gui elements
 */

function drawTable(div, res, course, parentDiv) {
	var data = new google.visualization.DataTable();

	$.each(res.header, function(index, content) {
		data.addColumn('string', content);
	});

	result = res.data;
	var array = new Array();
	$.each(result, function(index, content) {
		var subarray = new Array();
		subarray.push(index);

		$.each(content, function(id, numbers) {
			subarray.push(numbers.toString());
		});
		array.push(subarray);
	});
	data.addRows(array);
        var formatter = new google.visualization.NumberFormat(
                {prefix: '$', negativeColor: 'red', negativeParens: true});
        formatter.format(data, 1);
	var table = new google.visualization.Table(document.getElementById(div));
	table.draw(data, {
		showRowNumber : false,
                allowHtml: true,
	});

	
	 // Setup listener
	google.visualization.events.addListener(table,	'select', selectHandler); 
	// Select Handler. Call the table's getSelection() method
	function selectHandler() { 
		var selection = table.getSelection();
                var translatedPluginName = data.getValue(selection[0].row, 0);
                console.log(translatedPluginName);
		$.ajax({
			url : "https://mdl-alpha.un.hrz.tu-darmstadt.de/mod/learninganalytics/rest/rest.php/detailedModView/" + course + "/" + translatedPluginName, 
			context : document.body,
                        type: 'GET',
                        dataType: 'json',
		}).done(function (res) {
                                drawGUI(parentDiv, res, course);
                        });
		}
}

function drawStackedColumnChart(div, res, course, parentDiv) {
	var data = new google.visualization.DataTable();
		
	var counter = 0;
	$.each(res.header, function(index, content) {
		if(counter == 0) {
			data.addColumn('string', content);
		}
		else {
			data.addColumn('number', content);
		}
		counter++;
	});
	
	result = res.data;
	var array = new Array();
	$.each(result, function(index, content) {
		var subarray = new Array();
		subarray.push(index.toString());

		$.each(content, function(id, numbers) {
			subarray.push(parseInt(numbers));
		});
		array.push(subarray);
	});
	data.addRows(array);
	var options = {
		isStacked: true,
	};
	var chart = new google.visualization.ColumnChart(document
			.getElementById(div));

	chart.draw(transposeDataTable(data), options);
}