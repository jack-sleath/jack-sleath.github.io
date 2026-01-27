const months = [
  { name: "Janbruary", days: 59, accent: "#ff6b4a" },
  { name: "Marpril", days: 61, accent: "#ffb545" },
  { name: "Mune", days: 61, accent: "#2a7f62" },
  { name: "Augly", days: 62, accent: "#3b6cf0" },
  { name: "Septober", days: 61, accent: "#9d4edd" },
  { name: "Nocember", days: 61, accent: "#f35d99" },
];

const storageKey = "six-month-calendar-v1";
const calendarEl = document.getElementById("calendar");
const totalDaysEl = document.getElementById("total-days");
const markedDaysEl = document.getElementById("marked-days");
const selectedDateEl = document.getElementById("selected-date");
const markedToggleEl = document.getElementById("marked-toggle");
const noteInputEl = document.getElementById("note-input");
const clearAllButton = document.getElementById("clear-all");
const leapToggleButton = document.getElementById("toggle-leap");
const themeToggleButton = document.getElementById("toggle-theme");

let selectedKey = null;
let data = loadData();

function loadData() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    return { days: {}, leapYear: false, darkMode: false };
  }
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.days) {
      return { days: {}, leapYear: false, darkMode: false };
    }
    return {
      leapYear: Boolean(parsed.leapYear),
      darkMode: Boolean(parsed.darkMode),
      days: parsed.days,
    };
  } catch (error) {
    return { days: {}, leapYear: false, darkMode: false };
  }
}

function saveData() {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function dayKey(monthIndex, day) {
  return `${monthIndex}-${day}`;
}

function getDayData(key) {
  if (!data.days[key]) {
    data.days[key] = { marked: false, note: "" };
  }
  return data.days[key];
}

function daysInMonth(monthIndex) {
  const baseDays = months[monthIndex].days;
  if (data.leapYear && monthIndex === 0) {
    return baseDays + 1;
  }
  return baseDays;
}

function buildCalendar() {
  calendarEl.innerHTML = "";
  let totalDays = 0;

  months.forEach((month, monthIndex) => {
    const monthDays = daysInMonth(monthIndex);
    totalDays += monthDays;

    const monthEl = document.createElement("section");
    monthEl.className = "month";
    monthEl.style.setProperty("--accent", month.accent);

    const headerEl = document.createElement("div");
    headerEl.className = "month-header";

    const titleEl = document.createElement("h2");
    titleEl.className = "month-title";
    titleEl.textContent = month.name;

    const countEl = document.createElement("span");
    countEl.className = "month-count";
    countEl.textContent = `${monthDays} days`;

    headerEl.appendChild(titleEl);
    headerEl.appendChild(countEl);

    const daysEl = document.createElement("div");
    daysEl.className = "days";

    for (let day = 1; day <= monthDays; day += 1) {
      const key = dayKey(monthIndex, day);
      const dayData = getDayData(key);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "day";
      button.dataset.key = key;
      button.dataset.monthIndex = `${monthIndex}`;
      button.dataset.day = `${day}`;
      button.textContent = day;

      if (dayData.marked) {
        button.classList.add("marked");
      }
      if (dayData.note) {
        button.classList.add("noted");
      }

      button.addEventListener("click", () => handleDayClick(button));

      daysEl.appendChild(button);
    }

    monthEl.appendChild(headerEl);
    monthEl.appendChild(daysEl);
    calendarEl.appendChild(monthEl);
  });

  totalDaysEl.textContent = totalDays;
  updateMarkedCount();
  updateLeapButton();
}

function handleDayClick(button) {
  const key = button.dataset.key;
  selectDay(key);
  toggleMarked(key);
  updateDayButton(button, key);
  updatePanel(key);
}

function updateDayButton(button, key) {
  const dayData = getDayData(key);
  button.classList.toggle("marked", dayData.marked);
  button.classList.toggle("noted", Boolean(dayData.note));
}

function selectDay(key) {
  if (selectedKey === key) {
    return;
  }

  if (selectedKey) {
    const prevButton = document.querySelector(`.day[data-key="${selectedKey}"]`);
    if (prevButton) {
      prevButton.classList.remove("selected");
    }
  }

  selectedKey = key;
  const nextButton = document.querySelector(`.day[data-key="${selectedKey}"]`);
  if (nextButton) {
    nextButton.classList.add("selected");
  }
}

function toggleMarked(key) {
  const dayData = getDayData(key);
  dayData.marked = !dayData.marked;
  saveData();
  updateMarkedCount();
}

function updateMarkedCount() {
  const markedCount = Object.values(data.days).filter((entry) => entry.marked).length;
  markedDaysEl.textContent = markedCount;
}

function updatePanel(key) {
  const dayData = getDayData(key);
  const [monthIndex, day] = key.split("-").map(Number);
  const monthName = months[monthIndex]?.name ?? "Unknown";

  selectedDateEl.textContent = `${monthName} ${day}`;
  markedToggleEl.checked = dayData.marked;
  noteInputEl.value = dayData.note;
}

function updateLeapButton() {
  if (!leapToggleButton) {
    return;
  }
  leapToggleButton.textContent = data.leapYear ? "Disable leap year" : "Enable leap year";
}

function updateThemeButton() {
  if (!themeToggleButton) {
    return;
  }
  themeToggleButton.textContent = data.darkMode ? "Disable dark mode" : "Enable dark mode";
}

function applyTheme() {
  document.body.classList.toggle("dark", data.darkMode);
  updateThemeButton();
}

function validateSelection() {
  if (!selectedKey) {
    return;
  }
  const [monthIndex, day] = selectedKey.split("-").map(Number);
  if (day > daysInMonth(monthIndex)) {
    selectedKey = null;
    selectedDateEl.textContent = "Select a day";
    markedToggleEl.checked = false;
    noteInputEl.value = "";
  }
}

markedToggleEl.addEventListener("change", () => {
  if (!selectedKey) {
    markedToggleEl.checked = false;
    return;
  }
  const dayData = getDayData(selectedKey);
  dayData.marked = markedToggleEl.checked;
  saveData();
  updateMarkedCount();
  const button = document.querySelector(`.day[data-key="${selectedKey}"]`);
  if (button) {
    updateDayButton(button, selectedKey);
  }
});

noteInputEl.addEventListener("input", () => {
  if (!selectedKey) {
    return;
  }
  const dayData = getDayData(selectedKey);
  dayData.note = noteInputEl.value.trim();
  saveData();
  const button = document.querySelector(`.day[data-key="${selectedKey}"]`);
  if (button) {
    updateDayButton(button, selectedKey);
  }
});

clearAllButton.addEventListener("click", () => {
  if (!confirm("Clear all marked days and notes?")) {
    return;
  }
  data = { days: {}, leapYear: data.leapYear, darkMode: data.darkMode };
  saveData();
  selectedKey = null;
  buildCalendar();
  selectedDateEl.textContent = "Select a day";
  markedToggleEl.checked = false;
  noteInputEl.value = "";
});

leapToggleButton.addEventListener("click", () => {
  data.leapYear = !data.leapYear;
  saveData();
  buildCalendar();
  validateSelection();
});

themeToggleButton.addEventListener("click", () => {
  data.darkMode = !data.darkMode;
  saveData();
  applyTheme();
});

buildCalendar();
applyTheme();
