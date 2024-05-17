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
fetch('../code/json/code.json')
    .then(response => response.json())
    .then(data => {
        const dropdown = document.getElementById('example-dropdown');
        // Populate dropdown options
        data.forEach(item => {
            const option = document.createElement('option');
            option.textContent = item.option;
            dropdown.appendChild(option);
        });

        const params = new URLSearchParams(window.location.search);

        // Get specific parameter values
        const code = params.get('code');

        // Check if the code parameter exists and matches an option
        const selectedOption = data.find(item => item.option === code) ? code : 'Blank';

        // Set the selected option in the dropdown
        dropdown.value = selectedOption;



        // Event listener to populate code areas when an option is selected
        dropdown.addEventListener('change', function () {
            const selectedOption = this.value;
            const selectedExample = data.find(item => item.option === selectedOption);
            document.getElementById('html-code').value = selectedExample.code.html;
            document.getElementById('css-code').value = selectedExample.code.css;
            document.getElementById('js-code').value = selectedExample.code.js;
            runCode();
        });

        // Create a new change event
        const event = new Event('change', {
            bubbles: true,
            cancelable: true
        });

        dropdown.dispatchEvent(event);
    })
    .catch(error => console.error('Error fetching JSON:', error));
