
function transposeDataTable(dataTable) {
            //step 1: let us get what the columns would be
            var rows = [];//the row tip becomes the column header and the rest become
            for (var rowIdx=0; rowIdx < dataTable.getNumberOfRows(); rowIdx++) {
                var rowData = [];
                for( var colIdx = 0; colIdx < dataTable.getNumberOfColumns(); colIdx++) {
                    rowData.push(dataTable.getValue(rowIdx, colIdx));
                }
                rows.push( rowData);
            }
            var newTB = new google.visualization.DataTable();
            newTB.addColumn('string', dataTable.getColumnLabel(0));
            newTB.addRows(dataTable.getNumberOfColumns()-1);
            var colIdx = 1;
            for(var idx=0; idx < (dataTable.getNumberOfColumns() -1);idx++) {
                var colLabel = dataTable.getColumnLabel(colIdx);
                newTB.setValue(idx, 0, colLabel);
                colIdx++;
            }
            for (var i=0; i< rows.length; i++) {
                var rowData = rows[i];
                //console.log(rowData[0]);
                newTB.addColumn('number',rowData[0]); //assuming the first one is always a header
                var localRowIdx = 0;

                for(var j=1; j< rowData.length; j++) {
                    newTB.setValue(localRowIdx, (i+1), rowData[j]);
                    localRowIdx++;
                }
            }
            return newTB;
      }

function DrawGUI(div, course) {
	var loader = "<img src='/mod/learninganalytics/pix/loader.gif' style='display: block; margin-left: auto; margin-right: auto;'></src>";
	$( "#"+div ).html(loader);
	$.ajax({
		url: "/mod/learninganalytics/rest/rest.php/uniqueViews/" + course,
		type: 'GET',
        dataType: 'json',
	}).done(function (data) {
		//var grid = "<div class='row'><div class='col-md-6' id='left'></div><div class='col-md-6' id='right'></div></div>";
		var grid = "<div id='left'></div><div id='right'></div>";
		$('#'+div).html(grid);
		drawTable('left', data);
		drawStackedColumnChart('right', data);
	});
}