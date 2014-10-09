
function transposeDataTable(dataTable) {
    //step 1: let us get what the columns would be
    var rows = [];//the row tip becomes the column header and the rest become
    for (var rowIdx = 0; rowIdx < dataTable.getNumberOfRows(); rowIdx++) {
        var rowData = [];
        for (var colIdx = 0; colIdx < dataTable.getNumberOfColumns(); colIdx++) {
            rowData.push(dataTable.getValue(rowIdx, colIdx));
        }
        rows.push(rowData);
    }
    var newTB = new google.visualization.DataTable();
    newTB.addColumn('string', dataTable.getColumnLabel(0));
    newTB.addRows(dataTable.getNumberOfColumns() - 1);
    var colIdx = 1;
    for (var idx = 0; idx < (dataTable.getNumberOfColumns() - 1); idx++) {
        var colLabel = dataTable.getColumnLabel(colIdx);
        newTB.setValue(idx, 0, colLabel);
        colIdx++;
    }
    for (var i = 0; i < rows.length; i++) {
        var rowData = rows[i];
        //console.log(rowData[0]);
        newTB.addColumn('number', rowData[0]); //assuming the first one is always a header
        var localRowIdx = 0;

        for (var j = 1; j < rowData.length; j++) {
            newTB.setValue(localRowIdx, (i + 1), rowData[j]);
            localRowIdx++;
        }
    }
    return newTB;
}

function initialiseGUI(div, course) {
    var loader = "<img src='/mod/learninganalytics/pix/loader.gif' style='display: block; margin-left: auto; margin-right: auto;'></src>";
    $("#" + div).html(loader);
    $.ajax({
        url: "/mod/learninganalytics/rest/rest.php/uniqueViews/" + course,
        type: 'GET',
        dataType: 'json'
    }).done(function(data) {
        //console.log(data);
        drawGUI(div, data, course);
        //var grid = "<div class='row'><div class='col-md-6' id='left'></div><div class='col-md-6' id='right'></div></div>";

    });
}

function drawGUI(parentDiv, data, course) {
    var grid = '<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Kurs&uuml;bersicht</h3></div><div class="panel-body"><div id="left"></div><div id="right"></div></div>';
    //var grid = "<div id='left'></div><div id='right'></div>";
    $('#' + parentDiv).html(grid);
    drawTable('left', data, course, parentDiv);
    drawStackedColumnChart('right', data, course, parentDiv);
}

var GUI = {
    course: 0,
    div: '',
    level: 0,
    button: '',
    buttonTemplate: '<button type="button" class="btn btn-info" onclick="ACTION">TITLE</button>',
    head: '',
    loader: "<img src='/mod/learninganalytics/pix/loader.gif' style='display: block; margin-left: auto; margin-right: auto;'></src>",
    gridTemplate: '<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title" id="button"></h3></div><div class="panel-body"><div id="left"></div><div id="right"></div></div>',
    grid: '',
    data: '',
    generateButton: function(action, title) {
        if (GUI.level === 0) {
            action = '';
            title = 'Kurs&uuml;bersicht';
        }
        GUI.button = GUI.buttonTemplate.replace('ACTION', action);
        GUI.button = GUI.button.replace('TITLE', title);
        console.log(GUI.button);
        $('#button').html(GUI.button);
    },
    generateMainView: function() {
        link = "/mod/learninganalytics/rest/rest.php/uniqueViews/" + GUI.course;
        GUI.loadData(link, function() {
            drawTable('left');
            drawStackedColumnChart('right');
        });
    },
    draw: function() {
        if (!GUI.grid) {
            GUI.grid = GUI.gridTemplate;
        }
        $('#' + GUI.div).html(GUI.grid);

        GUI.generateButton();
        GUI.drawLoader();
        if (GUI.level === 0) {
            GUI.generateMainView();
        }
        if (GUI.level > 0) {
            drawTable('left');
            drawStackedColumnChart('right');
        }

    },
    drawLoader: function() {
        $("#right").html('');
        $("#left").html(this.loader);
    },
    loadData: function(link, success) {
        $.ajax({
            url: link,
            type: 'GET',
            dataType: 'json'
        }).done(function(data) {
            GUI.data = data;
            success();
        });
    }
};
