// Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Note: theme follows browser/OS preference via CSS `prefers-color-scheme`.

// Handle file import (JSON array)
const fileInput = document.getElementById('fileInput');
if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const parsed = JSON.parse(reader.result);
                if (!Array.isArray(parsed)) throw new Error('JSON is not an array');
                document.getElementById('items').value = JSON.stringify(parsed, null, 2);
            } catch (err) {
                alert('Failed to read JSON file: ' + err.message);
            }
        };
        reader.onerror = () => {
            alert('Error reading file');
        };
        reader.readAsText(file);
    });
}

// Generate bingo board from textarea JSON array
const generateBtn = document.getElementById('generate');
if (generateBtn) {
    generateBtn.addEventListener("click", () => {
        const input = document.getElementById("items").value;
        let items;
        try {
            items = JSON.parse(input);
            if (!Array.isArray(items)) throw new Error('Not an array');
        } catch (err) {
            alert("Please enter a valid JSON array of strings.");
            return;
        }

        // Ensure there are at least 25 items, pad with "Free Square" if needed
        const pool = items.slice();
        while (pool.length < 25) pool.push("Free Square");

        const boardItems = shuffle(pool).slice(0, 25);
        const table = document.getElementById("bingo");
        if (!table) return;
        table.innerHTML = "";

        for (let r = 0; r < 5; r++) {
            const row = table.insertRow();
            for (let c = 0; c < 5; c++) {
                const cell = row.insertCell();
                const content = document.createElement('div');
                content.textContent = boardItems[r * 5 + c];
                cell.appendChild(content);
                cell.addEventListener("click", () => {
                    cell.classList.toggle("marked");
                });
            }
        }

        // Hide the input controls so only the board shows
        const controls = document.getElementById('controls');
        if (controls) controls.style.display = 'none';
    });
}
