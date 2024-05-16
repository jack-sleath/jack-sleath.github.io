function runCode() {
    var htmlCode = document.getElementById('html-code').value;
    var cssCode = document.getElementById('css-code').value;
    var jsCode = document.getElementById('js-code').value;

    var outputFrame = document.getElementById('output-frame');
    var outputDocument = outputFrame.contentDocument;

    outputDocument.open();
    outputDocument.write(`
    <html>
    <head>
      <style>${cssCode}</style>
    </head>
    <body>${htmlCode}</body>
    <script>${jsCode}</script>
    </html>
  `);
    outputDocument.close();
}

// Fetch and parse the JSON file
fetch('../JSON/code.json')
  .then(response => response.json())
  .then(data => {
    const dropdown = document.getElementById('example-dropdown');
    // Populate dropdown options
    data.forEach(item => {
      const option = document.createElement('option');
      option.textContent = item.option;
      dropdown.appendChild(option);
    });
    // Event listener to populate code areas when an option is selected
    dropdown.addEventListener('change', function() {
      const selectedOption = this.value;
      const selectedExample = data.find(item => item.option === selectedOption);
      document.getElementById('html-code').value = selectedExample.code.html;
      document.getElementById('css-code').value = selectedExample.code.css;
      document.getElementById('js-code').value = selectedExample.code.js;
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));
