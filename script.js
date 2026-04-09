// Load tasks when page opens
window.onload = function() {
    loadTasks();
};

function addTask(){
    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") return;

    createTaskElement(task, date);

    saveTask(task);

    input.value = "";
}document.getElementById("emptyMsg").style.display = "none";let date = document.getElementById("dateInput").value;

function createTaskElement(task,date) {
    let li = document.createElement("li");
    li.innerText = task+ (date ? " (Due: " + date + ")" : "");

    // Mark as done
    li.onclick = function() {
        li.classList.toggle("done");
    };

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = " ❌";
    deleteBtn.onclick = function() {
        li.remove();
        removeTask(task);
    };

    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
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
    tasks.forEach(task => createTaskElement(task));if (tasks.length === 0) {
    document.getElementById("emptyMsg").style.display = "block";
}
}

// Remove task
function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}if (tasks.length === 0) {
    document.getElementById("emptyMsg").style.display = "block";
}function toggleDarkMode() {
    document.body.classList.toggle("dark");
}