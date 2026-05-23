 document.getElementById('convertBtn').addEventListener('click', function() {
      var tableName = document.getElementById('tableName').value.trim();
      var tableData = document.getElementById('tableData').value.trim();
      
      if (!tableName || !tableData) {
        alert('Please provide both the table name and the table data.');
        return;
      }

      // Split the data into lines and ignore any empty ones
      var lines = tableData.split('\n').filter(line => line.trim() !== '');
      if (lines.length < 2) {
        alert('Please include headers and at least one row of data.');
        return;
      }

      // Determine the delimiter: prioritize tab, then comma, else whitespace
      var delimiter = '\t';
      if (lines[0].indexOf('\t') === -1) {
        if (lines[0].indexOf(',') !== -1) {
          delimiter = ',';
        } else {
          delimiter = /\s+/;
        }
      }

      // Extract headers from the first line and wrap them in square brackets.
      var headers = lines[0].split(delimiter).map(h => '[' + h.trim() + ']');
      var insertStatements = [];

      // Process each subsequent line as a data row
      for (var i = 1; i < lines.length; i++) {
        var row = lines[i].split(delimiter).map(cell => cell.trim());
        
        // Prepare the values: if a value is "NULL", leave it as is.
        // If it's not numeric, wrap it in quotes (escaping any single quotes).
        var values = row.map(function(value) {
          if (value === "NULL") {
            return value;
          } else if (value === "" || isNaN(value)) {
            value = value.replace(/'/g, "''"); // Escape single quotes
            return "'" + value + "'";
          }
          return value;
        });

        var statement = "INSERT INTO " + tableName + " (" + headers.join(", ") + ") VALUES (" + values.join(", ") + ");";
        insertStatements.push(statement);
      }

      // Display the result in the output textarea
      document.getElementById('output').value = insertStatements.join("\n");
    });