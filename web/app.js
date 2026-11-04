const checkboxes = [...document.querySelectorAll("[data-habit]")];
const todayKey = new Date().toISOString().slice(0, 10);
const storageKey = `habit-tracker-${todayKey}`;

function loadToday() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    checkboxes.forEach((box) => { box.checked = Boolean(saved[box.dataset.habit]); });
  } catch {
    checkboxes.forEach((box) => { box.checked = false; });
  }
}

function updateDashboard() {
  const done = checkboxes.filter((box) => box.checked).length;
  const total = checkboxes.length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  document.querySelector("#done-count").textContent = `${done}/${total}`;
  document.querySelector("#streak-count").textContent = `${done} ${done === 1 ? "день" : "дня"}`;
  document.querySelector("#progress-count").textContent = `${percent}%`;
  document.querySelector("#progress-label").textContent = `${done} из ${total}`;
  document.querySelector("#progress-fill").style.width = `${percent}%`;
  const state = Object.fromEntries(checkboxes.map((box) => [box.dataset.habit, box.checked]));
  localStorage.setItem(storageKey, JSON.stringify(state));
}

const date = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", weekday: "long" }).format(new Date());
document.querySelector("#today-date").textContent = date;
document.querySelector("#year").textContent = new Date().getFullYear();
loadToday();
checkboxes.forEach((box) => box.addEventListener("change", updateDashboard));
updateDashboard();
