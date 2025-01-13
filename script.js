/**
 * TODO:
 *  - Implementare i task:
 *    - Creare un oggetto dove ci saranno tutti i task, poi mi creo un altra variabile dove mi modifico il task in quel momento
 *  - implementare le categorie dinamiche
 */
const btnOppenModal = document.getElementById("btn-open-modal");
const btnCloseModal = document.getElementById("close-modal-btn");
const btnModalSubmit = document.getElementById("submit");
const switchDarkLight = document.getElementById("switch-dark-light");
const taskModal = document.getElementById("modal-overley");
const modulo = document.getElementById("modulo");
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
  description: undefined,
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

modulo.addEventListener("submit", (e) => {
  e.preventDefault();

  pickTask();
});

// Takes the values ​​of the inputs
const pickTask = () => {
  currentTask.toDO = inputTask.value.trim();
  currentTask.description = inputDescription.value.trim();
  currentTask.date = inputDeadline.value;

  if (btnModalSubmit.textContent === "Edit task") {
    const taskEditIndex = allTask.findIndex((item) => item.id === currentTask.id);
    allTask[taskEditIndex] = { ...currentTask };
  } else {
    currentTask.id = `${Date.now()}`;
    allTask.unshift({ ...currentTask });
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
  containerTask.innerHTML += allTask
    .map(({ id, toDO, description, date, isComplited }) => {
      return `
    <li id="${id}" class="task ${isComplited ? "task-complited" : ""}">
      <section class="container-check-box">
        <div class="checkbox-wrapper-15">
          <input onclick="checkTask(this)" class="inp-cbx" id="cbx-${id}" type="checkbox" style="display: none" ${isComplited ? "checked" : ""}/>
          <label class="cbx" for="cbx-${id}">
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
          <h3>${toDO}</h3>
        </div>
        ${
          description || date
            ? `
            <div class="main-task">
              ${
                description
                  ? `
                  <div class="container-description">
                    <p>${description}</p>
                  </div>
                  `
                  : ""
              }
              ${
                date
                  ? `
                  <div class="container-date">
                    <span>${date}</span>
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
    })
    .join("");
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