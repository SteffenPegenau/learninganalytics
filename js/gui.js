/**
 * Generalized functions to draw tables, graphs and other gui elements
 */

function drawTable(div, res) {
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

	var table = new google.visualization.Table(document.getElementById(div));
	table.draw(data, {
		showRowNumber : false
	});

	/*
	 * // Setup listener google.visualization.events.addListener(table,
	 * 'select', selectHandler); // Select Handler. Call the table's
	 * getSelection() method function selectHandler() { var selection =
	 * table.getSelection(); $ .ajax({ url :
	 * "/report/toverview/html/detailed_course_view.html", context :
	 * document.body, success: function (inhalt) { var x =
	 * data.getValue(selection[0].row, 0); var find = "#ID#"; var regex = new
	 * RegExp(find, 'g'); //console.log(regex); inhalt = inhalt.replace(regex,
	 * x); //console.log(inhalt); $( "#getCourse").html(inhalt);
	 * $("#tabs").tabs({active: 0}); } }); }
	 */
}

function drawStackedColumnChart(div, res) {
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