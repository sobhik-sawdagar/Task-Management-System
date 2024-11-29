const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const statusFilter = document.getElementById("statusFilter");
const viewTasksBtn = document.getElementById("viewTasksBtn");
const editTaskModal = document.getElementById("editTaskModal");
const editTaskForm = document.getElementById("editTaskForm");
const closeModalBtn = document.querySelector(".close-modal");
const editTaskIdInput = document.getElementById("editTaskId");
const editTitleInput = document.getElementById("editTitle");
const editDescriptionInput = document.getElementById("editDescription");
const editDueDateInput = document.getElementById("editDueDate");
const editStatusSelect = document.getElementById("editStatus");


// Fetch Tasks function
async function fetchTasks() {
  try {
    const response = await fetch(`task/viewtasks`);
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    alert("Failed to fetch tasks");
  }
}

// Render Tasks function
function renderTasks(tasks) {
  const filterValue = statusFilter.value;
  taskList.innerHTML = ""; // Clear existing tasks

  tasks.forEach((task) => {
    // Apply filter
    if (filterValue !== "all" && task.status !== filterValue) return;

    const taskElement = document.createElement("div");
    taskElement.classList.add("task-item");
    if (task.status === "Completed") {
      taskElement.classList.add("task-completed");
    }

    taskElement.innerHTML = `
            <div class="task-details">
                <h3>${task.title}</h3>
                <p>${task.description || "No description"}</p>
                <p>Due: ${task.due_date || "No due date"}</p>
                <div class="status-toggle">
                    <label class="toggle-switch">
                        <input type="checkbox" 
                               ${task.status === "Completed" ? "checked" : ""} 
                               onchange="toggleTaskStatus(${
                                 task.id
                               }, this.checked)">
                        <span class="slider"></span>
                    </label>
                    <span>${
                      task.status === "Completed" ? "Completed" : "Pending"
                    }</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn" onclick="editTask(${task.id})">Edit</button>
                <button class="btn" onclick="deleteTask(${
                  task.id
                })">Delete</button>
            </div>
        `;

    taskList.appendChild(taskElement);
  });
}

// View Tasks Button Event Listener
viewTasksBtn.addEventListener("click", fetchTasks);

// Add Task
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;

  try {
    const response = await fetch(`task/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        dueDate,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    // Reset form and refresh tasks
    taskForm.reset();
    fetchTasks();
  } catch (error) {
    console.error("Error:", error);
  }
});

// Edit Task
async function editTask(id) {
  try {
    const response = await fetch(`task/viewtasks`);
    const tasks = await response.json();
    const task = tasks.find((task) => task.id === id);

    // Populate the edit modal with task details
    editTaskIdInput.value = task.id;
    editTitleInput.value = task.title;
    editDescriptionInput.value = task.description || "";
    editDueDateInput.value = task.due_date || "";
    editStatusSelect.value = task.status || "Pending";

    // Show the modal
    editTaskModal.style.display = "flex";
  } catch (error) {
    console.error("Error:", error);
  }
}

// Close Modal Function
function closeModal() {
  editTaskModal.style.display = "none";
}

// Close modal when clicking the close button
closeModalBtn.addEventListener("click", closeModal);

// Close modal when clicking outside the modal
window.addEventListener("click", (event) => {
  if (event.target === editTaskModal) {
    closeModal();
  }
});

// Edit Task Form Submission
editTaskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = editTaskIdInput.value;
  const title = editTitleInput.value;
  const description = editDescriptionInput.value;
  const dueDate = editDueDateInput.value;
  const status = editStatusSelect.value;

  try {
    const response = await fetch(`task/updatetask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        dueDate,
        status,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }

    // Close modal and refresh tasks
    closeModal();
    fetchTasks();
  } catch (error) {
    console.error("Error:", error);
  }
});

// Delete Task
async function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) return;

  try {
    const response = await fetch(`task/deletetask/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    fetchTasks();
  } catch (error) {
    console.error("Error:", error);
  }
}

// Toggle Task Status
async function toggleTaskStatus(id, isCompleted) {
  try {
    const response = await fetch(`task/updatetask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: isCompleted ? "Completed" : "Pending",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update task status");
    }

    fetchTasks();
  } catch (error) {
    console.error("Error:", error);
  }
}

// Filter Tasks
statusFilter.addEventListener("change", fetchTasks);

// Initial fetch of tasks
//fetchTasks();

// Initial page load - hide task list initially
statusFilter.addEventListener("change", fetchTasks);
