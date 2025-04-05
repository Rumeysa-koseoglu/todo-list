//* Initial references 

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");


runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        alert("Please enter a value");
    } else {
        addTodoUI(inputText);
    }

    e.preventDefault();
}

function addTodoUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justufy-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#"
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}