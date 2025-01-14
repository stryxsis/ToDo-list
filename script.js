class Task {
  constructor(id, toDO, description, date, isComplited) {
    this._id = id;
    this._toDO = toDO;
    this._description = description;
    this._date = date;
    this._isComplited = isComplited;
  }

  get editTask() {
    this._toDO, this._description, this._date;
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

  isComplited() {
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
  constructor(id, toDO, descriptionList, date, isComplited) {
    this._id = id;
    this._toDO = toDO;
    this._descriptionList = descriptionList;
    this._date = date;
    this._isComplited = isComplited;
  }

  get editTask() {
    return this._toDO, this._descriptionList, this._date;
  }

  set toDO(toDO) {
    this._toDO = toDO;
  }

  set description(descriptionList) {
    this._description = descriptionList;
  }

  set date(date) {
    this._date = date;
  }

  isComplited() {
    this._isComplited = !this._isComplited;
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
let currentTask = {
  id: null,
  toDO: "",
  description: "",
  date: "",
  isComplited: false,
};

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  allTask = JSON.parse(localStorage.getItem("allTask")) || [];
  tasksDisplay();
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

// Takes the values ​​of the inputs
// const pickTask = () => {
//   currentTask.toDO = inputTask.value.trim();
//   currentTask.description = inputDescription.value.trim();
//   currentTask.date = inputDeadline.value;

//   if (btnModalSubmit.textContent === "Edit task") {
//     const taskEditIndex = allTask.findIndex((item) => item.id === currentTask.id);
//     allTask[taskEditIndex] = { ...currentTask };
//   } else {
//     currentTask.id = `${Date.now()}`;
//     allTask.unshift({ ...currentTask });
//   }

//   resetModalInput();
//   tasksDisplay();
// };

const pickTask = () => {
  if (btnDescriptionList.checked) {
    //TODO: Implementare il taskList
    null;
  } else {
    const newTask = new Task(`${Date.now()}`, inputTask.value.trim(), inputDescription.value.trim() || "", inputDeadline.value || "", false);
    allTask.unshift(newTask);
  }

  resetModalInput();
  tasksDisplay();
};

const resetModalInput = () => {
  inputTask.value = "";
  inputDescription.value = "";
  inputDeadline.value = "";

  currentTask.id = null;
  currentTask.toDO = "";
  currentTask.description = undefined;
  currentTask.date = "";
  currentTask.isComplited = false;

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
  const taskEditIndex = allTask.findIndex((item) => item.id === task.parentElement.parentElement.id);
  currentTask = { ...allTask[taskEditIndex] };

  inputTask.value = currentTask.toDO;
  inputDescription.value = currentTask.description;
  inputDeadline.value = currentTask.date;
  btnModalSubmit.textContent = "Edit task";
  taskModal.classList.toggle("modal-overley-view");
};

const checkTask = (task) => {
  const checkTaskIndex = allTask.findIndex((item) => item.id === task.parentElement.parentElement.parentElement.id);
  allTask[checkTaskIndex].isComplited = !allTask[checkTaskIndex].isComplited;
  task.parentElement.parentElement.parentElement.classList.toggle("task-complited");
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

const saveLocalData = () => {
  localStorage.setItem("allTask", JSON.stringify(allTask));
};
