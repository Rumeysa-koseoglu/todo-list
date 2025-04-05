//* Initial references 

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

//we will store todo tasks in this
let todos = [];


runEvents();

//events
function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoFromUI);
    clearButton.addEventListener("click", clearAllTodos);
    filterInput.addEventListener("keyup",filter);
}

//run after page loads for the first time
function pageLoaded() {
    //call this function after page load
    checkTodosFromStorage();
    //allows us to perform operations on each element of the todos array
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoList = document.querySelectorAll(".list-group-item");

    if(todoList.length > 0) {
        todoList.forEach(function(todo) {
            if(todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display : block");//we display the todo task if its text content contains filter value
            }else {//if it doesnt contain it , we hide it
                todo.setAttribute("style", "display : none !important");
            }
        });
    }else {//if there are no tasks in todo list, and the user still trying to filter we warn the user
        showAlert("warning","There must be at least one task to filter")
    }
}

function clearAllTodos() {
    const todoListItems = document.querySelectorAll(".list-group-item");//select all task in todo list
    if (todoListItems.length > 0) {//if there is at least one task in todo list , run this code
        todoListItems.forEach(function(todo) {
            todo.remove();//remve each task from the DOM(screen)
        });

        todos = [];//clean todos array
        localStorage.setItem("todos",JSON.stringify(todos));//store todos array in localStorage
        showAlert("success","deleted successfully")
    } else {
        showAlert("warning", "There must be at least one task");
    }
}

function removeTodoFromUI(e) {
    //check if the clicked element is a delete icon
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement.parentElement;//go to the two container elements above the delete icon, reach the <li> element
        todo.remove();//remove this todo form DOM

        removeTodoFromStorage(todo.textContent);//remove removed todo from localStorage too
        showAlert("succes", "Todo successfully deleted");//when a task is removed from the task list, show a success notification to the user
    }
}

function removeTodoFromStorage(removeTodo) {
    checkTodosFromStorage();//check and update previous todos from localStorage
    //check each todos. if found the todo that we want to delete , remove the todo from array with todos.splice()
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1)
        }
    });
    //store updated array to localstorage
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
    //get text from input field
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Please do not leave blank")//if inputText is empty or null, warn user with a notification
    } else {
        //call addTodoToUI function to display newly added todo in the interface
        addTodoToUI(inputText);
        //this function will store new todo to localStorage
        addTodoToStorage(inputText);
        showAlert("success", "Todo added");
    }

    e.preventDefault();//prevent page refreshing when form is submitted
}

function addTodoToUI(newTodo) {
    //create a new 'li', set its classes write its text
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    //we add the delete button (a and i) to 'li'. then we add it to 'ul'. we clear the input 
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

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//add new todo to todo list and store it to localStorage
function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
//create a new div element. this is the element where we display the alert
    const div = document.createElement("div");
    // div.className = "alert alert-" + type; //*alternative way to assign dynamic class
    div.className = `alert alert-${type}`;//add a dynamic class to the div
    div.role = "alert";
    div.textContent = message;

    //add the alert to the firstCardBody element
    firstCardBody.appendChild(div);

    //remove alert after 2 seconds
    setTimeout(() => {
        div.remove();
    }, 2000);
}