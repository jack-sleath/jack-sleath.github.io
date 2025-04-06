var scriptToAdd = "var dataSet = new DataSet();\n\n";

var usedNames = [];

function AddNewTable() {
    var tableName = document.getElementById("tableName").value;
    if (tableName == null || tableName == "") {
        console.log("Missing a name");
        return;
    }
    if (usedNames.includes(tableName)) {
        console.log("Table name in use");
        return;
    }
    usedNames.push(tableName);

    var tableObject = MapCurrentTable();

    scriptToAdd = scriptToAdd.concat("var " + tableName + " = new DataTable();\n\n")

    tableObject.Columns.forEach(function (column) {
        scriptToAdd = scriptToAdd.concat(tableName + ".Columns.Add(\"" + column + "\");\n");
    });
    criptToAdd = scriptToAdd.concat("\n");
    tableObject.Rows.forEach(function (row) {
        var rowData = "";
        row.forEach(function (data) {
            rowData = rowData.concat("\"" + data + "\", ");
        });
        rowData = rowData.slice(0, -2);
        scriptToAdd = scriptToAdd.concat(tableName + ".Rows.Add(" + rowData + ");\n");
    });

    scriptToAdd = scriptToAdd.concat("\ndataSet.Tables.Add(" + tableName + ");\n\n");
    document.getElementById("ScriptOutput").value = scriptToAdd;
    document.getElementById("CsvInput").value = "";
    document.getElementById("tableName").value = "";
}

function CopyDataSet() {
    scriptToAdd = scriptToAdd.concat("return dataSet;")
    document.getElementById("ScriptOutput").value = scriptToAdd;

    var copyText = document.getElementById("ScriptOutput");
    copyText.select();
    document.execCommand("copy");
}

function ClearDataSet() {
    document.getElementById("ScriptOutput").value = "";
    document.getElementById("CsvInput").value = "";
    document.getElementById("tableName").value = "";
    scriptToAdd = "var dataSet = new DataSet();\n\n";
    usedNames = [];
}

function MapCurrentTable() {
    var tableObject = { Columns: [], Rows: [] }
    var currentTableValue = document.getElementById("CsvInput").value;
    var splitTable = currentTableValue.split("\n");
    tableObject.Columns = splitTable[0].split("	");
    splitTable.shift();
    splitTable.forEach(function (row) {
        tableObject.Rows.push(row.split("	"));
    });
    return tableObject;
}