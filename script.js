class Task {
  constructor(typeOfTask, id, toDO, description, date, isComplited) {
    this._typeOfTask = typeOfTask;
    this._id = id;
    this._toDO = toDO;
    this._description = description;
    this._date = date;
    this._isComplited = isComplited;
  }

  get typeOfTask() {
    return this._typeOfTask;
  }

  get id() {
    return this._id;
  }

  get toDO() {
    return this._toDO;
  }

  get description() {
    return this._description;
  }

  get date() {
    return this._date;
  }

  get isComplited() {
    return this._isComplited;
  }

  set typeOfTask(typeOfTask) {
    this._typeOfTask = typeOfTask;
  }

  set toDO(toDO) {
    this._toDO = toDO;
  }

  set description(description) {
    this._description = description;
  }

  set date(date) {
    this._date = date;
  }

  set isComplited(isComplited) {
    this._isComplited = isComplited;
  }

  changeIsComplited() {
    this._isComplited = !this._isComplited;
  }

  renderingHTML() {
    return `
    <li id="${this._id}" class="task ${this._isComplited ? "task-complited" : ""}">
      <section class="container-check-box">
        <div class="checkbox-wrapper-15">
          <input onclick="checkTask(this)" class="inp-cbx" id="cbx-${this._id}" type="checkbox" style="display: none" ${this._isComplited ? "checked" : ""}/>
          <label class="cbx" for="cbx-${this._id}">
            <span>
              <svg width="12px" height="9px" viewbox="0 0 12 9">
                <polyline points="1 5 4 8 11 1"></polyline>
              </svg>
            </span>
          </label>
        </div>
      </section>
      <section class="container-task">
        <div class="container-ToDo">
          <h3>${this._toDO}</h3>
        </div>
        ${
          this._description || this._date
            ? `
            <div class="main-task">
              ${
                this._description
                  ? `
                  <div class="container-description">
                    <p>${this._description}</p>
                  </div>
                  `
                  : ""
              }
              ${
                this._date
                  ? `
                  <div class="container-date">
                    <span>${this._date}</span>
                  </div>
                  `
                  : ""
              }
            </div>
          `
            : ""
        }
      </section>
      <section class="container-btn-ico">
      <button class="btn-ico" type="button" onclick="editTask(this)" aria-label="edit task button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          <path d="m15 5 4 4" />
        </svg>
      </button>
      <button class="btn-ico" type="button" onclick="removeTask(this)" aria-label="delet task button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash">
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>
    </section>
    </li>
    `;
  }
}

class TaskList {
  constructor(typeOfTask, id, toDO, descriptionList, date, isComplited) {
    this._typeOfTask = typeOfTask;
    this._id = id;
    this._toDO = toDO;
    this._descriptionList = descriptionList;
    this._date = date;
    this._isComplited = isComplited;
  }

  get typeOfTask() {
    return this._typeOfTask;
  }

  get id() {
    return this._id;
  }

  get toDO() {
    return this._toDO;
  }

  get descriptionList() {
    return this._descriptionList;
  }

  get date() {
    return this._date;
  }

  get isComplited() {
    return this._isComplited;
  }

  set typeOfTask(typeOfTask) {
    this._typeOfTask = typeOfTask;
  }

  set toDO(toDO) {
    this._toDO = toDO;
  }

  set descriptionList(descriptionList) {
    this._descriptionList = descriptionList;
  }

  set date(date) {
    this._date = date;
  }

  set isComplited(isComplited) {
    this._isComplited = isComplited;
  }

  changeIsComplited() {
    this._isComplited = !this._isComplited;
  }

  changeTaskIsComplited(indexTask, value) {
    this._descriptionList[indexTask].isComplited = value;
  }

  renderingDescriptionList() {
    const descriptionListHTML = this._descriptionList
      .map((item) => {
        return `
        <div class="checkbox-wrapper-4">
          <input class="inp-cbx" id="${item.id}" type="checkbox" onclick="checkListTask(this)" ${item.isComplited ? "checked" : ""}/>
          <label class="cbx" for="${item.id}">
            <span>
              <svg width="12px" height="10px"></svg>
            </span>
            <span class="${item.isComplited ? "task-list-comlited" : ""}">${item.item}</span>
          </label>
          <svg class="inline-svg">
          <symbol id="check-4" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </symbol>
        </svg>
        </div>
      `;
      })
      .join("");
    return descriptionListHTML;
  }

  renderingHTML() {
    return `
    <li id="${this._id}" class="task ${this._isComplited ? "task-complited" : ""}">
      <section class="container-check-box">
        <div class="checkbox-wrapper-15">
          <input onclick="checkTask(this)" class="inp-cbx" id="cbx-${this._id}" type="checkbox" style="display: none" ${this._isComplited ? "checked" : ""}/>
          <label class="cbx" for="cbx-${this._id}">
            <span>
              <svg width="12px" height="9px" viewbox="0 0 12 9">
                <polyline points="1 5 4 8 11 1"></polyline>
              </svg>
            </span>
          </label>
        </div>
      </section>
      <section class="container-task">
        <div class="container-ToDo">
          <h3>${this._toDO}</h3>
        </div>
        ${
          this._descriptionList || this._date
            ? `
            <div class="main-task">
              ${
                this._descriptionList
                  ? `
                  <div class="container-description">
                    <ul id="descriptionList-${this._id}">
                      ${this.renderingDescriptionList()}
                    </ul>
                  </div>
                  `
                  : ""
              }
              ${
                this._date
                  ? `
                  <div class="container-date">
                    <span>${this._date}</span>
                  </div>
                  `
                  : ""
              }
            </div>
          `
            : ""
        }
      </section>
      <section class="container-btn-ico">
      <button class="btn-ico" type="button" onclick="editTask(this)" aria-label="edit task button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          <path d="m15 5 4 4" />
        </svg>
      </button>
      <button class="btn-ico" type="button" onclick="removeTask(this)" aria-label="delet task button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash">
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      </button>
    </section>
    </li>
    `;
  }
}

const btnOppenModal = document.getElementById("btn-open-modal");
const btnCloseModal = document.getElementById("close-modal-btn");
const btnModalSubmit = document.getElementById("submit");
const btnDescriptionList = document.getElementById("dectiption-list");
const switchDarkLight = document.getElementById("switch-dark-light");
const taskModal = document.getElementById("modal-overley");
const modulo = document.getElementById("modulo");
const titleModal = document.getElementById("title-modal");
const inputTask = document.getElementById("input-title");
const inputDescription = document.getElementById("input-description");
const inputTitle = document.getElementById("input-title");
const inputDeadline = document.getElementById("input-deadline");
const containerTask = document.getElementById("container-task");
const counterTaskToDo = document.getElementById("counter-task-ToDo");
let allTask = [];
let currentTaskId = undefined;

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (savedTheme) {
    switchDarkLight.checked = savedTheme === "dark";
  }

  allTask = loadTaskFromLocalStorage();
  if (allTask) tasksDisplay();
});

switchDarkLight.addEventListener("click", () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

btnOppenModal.addEventListener("click", () => {
  btnModalSubmit.textContent = "Add Todo";
  btnModalSubmit.setAttribute("data-action", "add");
  taskModal.classList.toggle("modal-overley-view");
});

btnCloseModal.addEventListener("click", () => {
  resetModalInput();
});

btnDescriptionList.addEventListener("click", (e) => {
  if (e.currentTarget.checked) {
    titleModal.textContent = "Add Task List";
    inputDescription.placeholder = "Write a list es: Bread, Milk, Apple, ...";
  } else {
    titleModal.textContent = "Add Task";
    inputDescription.placeholder = "Add a description";
  }
});

modulo.addEventListener("submit", (e) => {
  e.preventDefault();

  pickTask();
});

const createDescriptionList = (input) => {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .map((item) => ({
      id: `${item}-${Date.now()}`,
      item: item,
      isComplited: false,
    }));
};

const updateTask = (task, updates) => {
  task.typeOfTask = updates.typeOfTask;
  task.toDO = updates.toDO;
  task.description = updates.description;
  task.descriptionList = updates.descriptionList || [];
  task.date = updates.date;
};

const createTaskObject = (type, id, toDO, description, descriptionList, date, isComplited) => {
  if (type === "taskList") {
    return new TaskList(type, id, toDO, descriptionList, date, isComplited);
  } else {
    return new Task(type, id, toDO, description, date, isComplited);
  }
};

const pickTask = () => {
  const action = btnModalSubmit.getAttribute("data-action");
  const descriptionTaskObj = btnDescriptionList.checked ? createDescriptionList(inputDescription.value) : null;

  if (action === "edit") {
    const taskEdit = allTask.find((item) => item.id === currentTaskId);
    const taskEditIndex = allTask.findIndex((item) => item.id === currentTaskId);
    if (taskEdit) {
      updateTask(taskEdit, {
        toDO: inputTask.value.trim(),
        description: btnDescriptionList.checked ? null : inputDescription.value.trim(),
        descriptionList: descriptionTaskObj,
        date: inputDeadline.value,
      });
      if ((btnDescriptionList.checked ? "taskList" : "task") !== taskEdit.typeOfTask) {
        const newTask = createTaskObject(btnDescriptionList.checked ? "taskList" : "task", `${Date.now()}`, inputTask.value.trim(), btnDescriptionList.checked ? null : inputDescription.value.trim(), descriptionTaskObj, inputDeadline.value || "", false);
        allTask[taskEditIndex] = newTask;
      }
    } else {
      console.error("Errore: Task da modificare non trovato.");
    }
  } else {
    const newTask = createTaskObject(btnDescriptionList.checked ? "taskList" : "task", `${Date.now()}`, inputTask.value.trim(), btnDescriptionList.checked ? null : inputDescription.value.trim(), descriptionTaskObj, inputDeadline.value || "", false);
    allTask.unshift(newTask);
  }

  resetModalInput();
  tasksDisplay();
};

const resetModalInput = () => {
  inputTask.value = "";
  inputDescription.value = "";
  inputDeadline.value = "";

  currentTaskId = undefined;

  taskModal.classList.toggle("modal-overley-view");
};

const tasksDisplay = () => {
  containerTask.innerHTML = "";
  containerTask.innerHTML = allTask.map((task) => task.renderingHTML()).join("");
  countTaskToDo();
  saveLocalData();
};

const removeTask = (task) => {
  const taskDeleteIndex = allTask.findIndex((item) => item.id === task.parentElement.parentElement.id);
  task.parentElement.parentElement.remove();
  allTask.splice(taskDeleteIndex, 1);
  tasksDisplay();
};

const editTask = (task) => {
  const taskEdit = allTask.find((item) => item.id === task.parentElement.parentElement.id);
  currentTaskId = task.parentElement.parentElement.id;

  inputTask.value = taskEdit.toDO;
  inputDeadline.value = taskEdit.date;
  if (taskEdit.typeOfTask === "task") {
    inputDescription.value = taskEdit.description;
  } else if (taskEdit.typeOfTask === "taskList") {
    taskEdit.descriptionList.forEach((item, index) => {
      inputDescription.value += item.item;
      if (index < taskEdit.descriptionList.length - 1) {
        inputDescription.value += ", ";
      }
    });
    btnDescriptionList.checked = true;
  }
  btnModalSubmit.textContent = "Edit task";
  btnModalSubmit.setAttribute("data-action", "edit");
  taskModal.classList.toggle("modal-overley-view");
};

const updateTaskState = (taskId, isComplited) => {
  const taskIndex = allTask.findIndex((item) => item.id === taskId);
  allTask[taskIndex].isComplited = isComplited;
};

const updateDOMForTask = (taskElement, isComplited) => {
  taskElement.classList.toggle("task-complited", isComplited);
  // Aggiorna checkbox o altre classi qui
};

const findTaskById = (id) => allTask.findIndex((task) => task.id === id);

const findSubTaskById = (task, subTaskId) => task.descriptionList.findIndex((item) => item.id === subTaskId);

const checkTask = (task) => {
  const taskElement = task.closest(".task");
  if (allTask[findTaskById(taskElement.id)].typeOfTask === "task") {
    updateTaskState(taskElement.id, !allTask[findTaskById(taskElement.id)].isComplited);
    updateDOMForTask(taskElement, allTask[findTaskById(taskElement.id)].isComplited);
    countTaskToDo();
    saveLocalData();
    return;
  }
  const subTask = document.querySelector(`#descriptionList-${taskElement.id}`);
  Array.from(subTask.children).forEach((child) => {
    child.children[0].checked = true;
    checkListTask(child.children[0]);
  });
};

const checkListTask = (task) => {
  const taskElement = task.closest(".task");
  const taskIndex = findTaskById(taskElement.id);
  const subTaskIndex = findSubTaskById(allTask[taskIndex], task.id);
  const parentCheckbox = document.querySelector(`#cbx-${allTask[taskIndex].id}`);

  if (task.checked) {
    allTask[taskIndex].changeTaskIsComplited(subTaskIndex, true);
  } else {
    allTask[taskIndex].changeTaskIsComplited(subTaskIndex, false);
  }

  if (task.checked) {
    task.nextElementSibling.children[1].classList.add("task-list-comlited");
  } else {
    task.nextElementSibling.children[1].classList.remove("task-list-comlited");
  }

  if (task.nextElementSibling.children[1].classList.contains("task-list-comlited")) {
    task.checked = true;
  }

  const allCompleted = allTask[taskIndex].descriptionList.every((subTask) => subTask.isComplited);
  parentCheckbox.checked = allCompleted;

  if (allCompleted) {
    updateTaskState(taskElement.id, true);
    updateDOMForTask(taskElement, true);
  } else {
    updateTaskState(taskElement.id, false);
    updateDOMForTask(taskElement, false);
  }
  countTaskToDo();
  saveLocalData();
};

const countTaskToDo = () => {
  let counter = 0;
  allTask.forEach((item) => {
    item.isComplited ? counter++ : null;
  });
  counterTaskToDo.textContent = allTask.length - counter;
};

const loadTaskFromLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("allTask")) || [];
  const restoredTask = tasks
    .map((task) => {
      switch (task._typeOfTask) {
        case "task":
          return new Task(task._typeOfTask, task._id, task._toDO, task._description, task._date, task._isComplited);
        case "taskList":
          return new TaskList(task._typeOfTask, task._id, task._toDO, task._descriptionList, task._date, task._isComplited);
        default:
          console.warn("Tipo di task sconosciuto:", task);
          return null;
      }
    })
    .filter(Boolean);
  return restoredTask;
};

const saveLocalData = () => {
  localStorage.setItem("allTask", JSON.stringify(allTask));
};
