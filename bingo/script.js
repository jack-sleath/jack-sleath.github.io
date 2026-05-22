// Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Note: theme follows browser/OS preference via CSS `prefers-color-scheme`.

const STORAGE_KEY = 'bingo:itemsJson';

const itemsTextarea = document.getElementById('items');
if (itemsTextarea) {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved !== null) itemsTextarea.value = saved;
    } catch (_) {}
    itemsTextarea.addEventListener('input', () => {
        try { localStorage.setItem(STORAGE_KEY, itemsTextarea.value); } catch (_) {}
    });
}

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
                const formatted = JSON.stringify(parsed, null, 2);
                document.getElementById('items').value = formatted;
                try { localStorage.setItem(STORAGE_KEY, formatted); } catch (_) {}
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

// Generate bingo board of a given size from textarea JSON array
function generateBoard(size) {
    const input = document.getElementById("items").value;
    let items;
    try {
        items = JSON.parse(input);
        if (!Array.isArray(items)) throw new Error('Not an array');
    } catch (err) {
        alert("Please enter a valid JSON array of strings.");
        return;
    }

    try { localStorage.setItem(STORAGE_KEY, input); } catch (_) {}

    const total = size * size;
    const pool = items.slice();
    while (pool.length < total) pool.push("Free Square");

    const boardItems = shuffle(pool).slice(0, total);
    const table = document.getElementById("bingo");
    if (!table) return;
    table.innerHTML = "";
    table.dataset.size = String(size);

    for (let r = 0; r < size; r++) {
        const row = table.insertRow();
        for (let c = 0; c < size; c++) {
            const cell = row.insertCell();
            const content = document.createElement('div');
            content.textContent = boardItems[r * size + c];
            cell.appendChild(content);
            cell.addEventListener("click", () => {
                cell.classList.toggle("marked");
            });
        }
    }

    const controls = document.getElementById('controls');
    if (controls) controls.style.display = 'none';
}

const generateBtn = document.getElementById('generate');
if (generateBtn) generateBtn.addEventListener("click", () => generateBoard(5));

const generate3Btn = document.getElementById('generate3');
if (generate3Btn) generate3Btn.addEventListener("click", () => generateBoard(3));
