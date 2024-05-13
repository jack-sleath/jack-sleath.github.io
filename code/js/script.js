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
