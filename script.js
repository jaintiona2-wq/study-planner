// Load tasks when page opens
window.onload = function () {
    loadTasks();
};

// Add Task
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;

    let date = document.getElementById("dateInput").value;

    if (task === "") return;

    createTaskElement(task, date);
    saveTask(task);

    input.value = "";
    document.getElementById("emptyMsg").style.display = "none";

    updateProgress();
}

// Create Task Element
function createTaskElement(task, date) {
    let li = document.createElement("li");
    li.innerText = task + (date ? " (Due: " + date + ")" : "");

    // Mark as done
    li.onclick = function () {
        li.classList.toggle("done");
        updateProgress();
    };

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";

    deleteBtn.onclick = function () {
        li.remove();
        removeTask(task);
        updateProgress();
    };

    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);

    updateProgress();
}

// Save task
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => createTaskElement(task));

    if (tasks.length === 0) {
        document.getElementById("emptyMsg").style.display = "block";
    }

    updateProgress();
}

// Remove task
function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if (tasks.length === 0) {
        document.getElementById("emptyMsg").style.display = "block";
    }
}

// Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// Timer
let time = 1500;
let interval;

function startTimer() {
    if (interval) return;

    interval = setInterval(() => {
        if (time <= 0) {
            clearInterval(interval);
            alert("Time's up! Take a break 🎉");
            return;
        }

        time--;

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        document.getElementById("timer").innerText =
            `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }, 1000);
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    time = 1500;
    document.getElementById("timer").innerText = "25:00";
}

// Progress
function updateProgress() {
    let tasks = document.querySelectorAll("li");
    let doneTasks = document.querySelectorAll(".done");

    let total = tasks.length;
    let done = doneTasks.length;

    let percent = total === 0 ? 0 : Math.round((done / total) * 100);

    document.getElementById("progressBar").value = percent;
    document.getElementById("progressText").innerText =
        percent + "% completed";
}