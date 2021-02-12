<html lang="en">
<head>
    <meta charset="utf-8">

    <title>Make a DataSet</title>
    <meta name="description" content="The HTML5 Herald">
    <meta name="author" content="SitePoint">

    <link rel="stylesheet" href="css/styles.css">
    <script src="js/script.js"></script>

</head>

<body>
    <div>
        <textarea class="boxsizingBorder" id="CsvInput" name="CSV Input" placeholder="Enter table here..."></textarea>
    </div>
    <div>
        <input id="tableName" type="text" placeholder="Enter table name here..." />
        <button onclick="AddNewTable()">Add Another DataTable</button>
        <button onclick="CopyDataSet()">Copy DataSet</button>
        <button onclick="ClearDataSet()">Clear DataSet</button>
    </div>
    <div>
        <textarea class="boxsizingBorder" id="ScriptOutput" name="Script Output"></textarea>
    </div>
</body>
</html>