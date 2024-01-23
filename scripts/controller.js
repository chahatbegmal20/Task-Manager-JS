//DOM
import { taskOperations } from "./modules/Task_operations.js"; //Destructuring of taskoperations.
import { showAlert } from "./utilites/dialog.js";

window.addEventListener("load", init);

function init() {
  showCount();
  bindEvents();
  focus("id");
}

function save(){
  let tasks = taskOperations.getAllTask();
  console.log("JSON is",JSON.stringify(tasks));
  console.log("Tasks are ",tasks);
  if(window.localStorage){
    localStorage.tasks = JSON.stringify(tasks);
    showAlert("Record saved successfully....")
  }
  else{
    showAlert("Browser does not support loacl storage.....");
  }
}

function load(){
  if(localStorage){
    let tasks = JSON.parse(localStorage.tasks);
    taskOperations.tasks = tasks;
    showCount();
    printTask(taskOperations.tasks);
  }
  else{
    showAlert("Browser does not support loacl storage.....");
  }

}

function bindEvents() {
  document.querySelector("#save").addEventListener("click",save);
  document.querySelector("#load").addEventListener("click",load);
  document.querySelector("#delete").addEventListener("click",deleteTask);
  document.querySelector("#add").addEventListener("click", addTask);
}

function deleteTask(){
  let tasks = taskOperations.deletedMarked();
  showCount();
  printTasks(tasks);
}


function showCount() {
  document.querySelector("#total").innerText= taskOperations.tasks.length;
  document.querySelector("#marktotal").innerText = taskOperations.countMarked();
  document.querySelector("#unmarktotal").innerText =
    taskOperations.countUnmarked();
}

function edit() {
  console.log("edited", this.getAttribute("task-id"));
}

function toggleDelete() {
  console.log("Deleted", this.getAttribute("task-id"));
  const icon = this;
  const id = icon.getAttribute("task-id");
  const tr = icon.parentNode.parentNode;
  tr.classList.toggle("alert-danger"); //yeah agr class hai toh hatadega using classlist ke toggle but agr nahi hai toh using classlist ke toogle hi woh ladega classko
  taskOperations.mark(id);
  showCount();
}

//dynamically hi attribute bana rahe hai,,, dynamically hi classname accesss kar rahe hai,,, dynamically hi event laga rahe hai aur dynamically hi ek attribute bana rahe hai
function createIcon(className, fn, id) {
  let icon = document.createElement("i");
  icon.className = `fa fa-${className} mr-3 hand`;
  icon.addEventListener("click", fn);
  icon.setAttribute("task-id", id); // custom attributes bana sakte hai so that humein uske bare me pata hai koi bhi random banda aake change na kar pai
  return icon;
}

function addTask() {
  //read Fields
  let id = document.querySelector("#Id").value;
  let name = document.querySelector("#Name").value;
  let desc = document.querySelector("#Descr").value;
  let date = document.querySelector("#Date").value;
  let URL = document.querySelector("#URL").value;

  const task = taskOperations.add(id, name, desc, date, URL);
  printTask(task);
  showCount();
  clearAll();
  focus('id');
}

function printTasks(tasks){
  const tbody = document.querySelector("#tasks");
  tbody.innerHTML = ""; 
  tasks.forEach((task) => printTask(task));
} 

// to print the added object on screen
function printTask(task) {
  const tbody = document.querySelector("#tasks");
  const tr = tbody.insertRow();
  let id = task.id;
  //object traversal
  let cellIndex = 0;
  for (let key in task) {
    if (key == "isMarked" || typeof task[key]==="function") {      //key isliye nahi lagaya kyuki woh uska naam hai jo ki string hota yeah uss object ki value hai i.e key uska khudka custom function hai 
      continue;
    }
    let value = task[key];
    let td = tr.insertCell(cellIndex);
    td.innerText = value;
    cellIndex++;
  }
  let td = tr.insertCell(cellIndex);
  td.appendChild(createIcon("edit", edit, id));
  td.appendChild(createIcon("trash", toggleDelete, id));
}

// function clearAll(){
//   let textBoxes = document.querySelectorAll('.form-control');
//   textBoxes.forEach((textBox)=>(textBox.value =""));
// }

const clearAll = () =>
  document.querySelectorAll(".form-control").forEach((taskBox)=>(taskBox.value =""));

const focus = (fieldId)=>document.querySelector('#id'+fieldId).focus();
