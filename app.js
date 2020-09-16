//selectors
const input= document.querySelector(".todo-input");
const todoButton= document.querySelector(".todo-btn");
const todoList=document.querySelector(".todoList");
const selectOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', additem);
todoList.addEventListener('click',deleteCheck);
selectOption.addEventListener('click',filterList);
//functions
function additem(event){
  //to prevent submit action
  event.preventDefault();

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todoDiv');
  const todoitem=document.createElement('li');
  todoitem.innerText=input.value;
  todoitem.classList.add("todoitem")

  const checked = document.createElement('button');
  checked.innerHTML='<i class="fa fa-check"></i>';
  checked.classList.add('check-btn');

  const trash = document.createElement('button');
  trash.innerHTML='<i class="fa fa-trash"></i>';
  trash.classList.add('trash-btn');

  todoDiv.appendChild(todoitem);
  todoDiv.appendChild(checked);
  todoDiv.appendChild(trash);

  todoList.appendChild(todoDiv);
  //Save to local storage
  saveLocalTodos(input.value);
  //clear the input
  input.value="";
}

function deleteCheck(e){
  const item=e.target;
  //Delete item
  if(item.classList[0]==='trash-btn'){
    const todo=item.parentElement;
    //Animation
    todo.classList.add('fall');
    removeLocaltodo(todo);
    todo.addEventListener('transitionend',function(){
      todo.remove();
    });
  }
  else if(item.classList[0]==='check-btn'){
    const todo=item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterList(e){
  const todos=todoList.childNodes;
  todos.forEach(function(todo){
    let c=e.target.value;
    switch (c) {
      case "all":
       todo.style.display="flex";
        break;

      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display="flex";
        }
        else{
          todo.style.display="none";
        }
        break;
      case "uncompleted":
      if (todo.classList.contains('completed')) {
        todo.style.display="none";
      }
      else{
        todo.style.display="flex";
      }
        break;

    }
  })

}

function saveLocalTodos(todo){
//  console.log("in local storage");
  let todos;
  //check if localStorage already has todos
  if(localStorage.getItem('todos')===null){
    todos=[];
  }else {
    todos=JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
  let todos;
  if(localStorage.getItem('todos')===null){
    todos=[];
  }else {
    todos=JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todoDiv');
    const todoitem=document.createElement('li');
    todoitem.innerText=todo;
    todoitem.classList.add("todoitem")

    const checked = document.createElement('button');
    checked.innerHTML='<i class="fa fa-check"></i>';
    checked.classList.add('check-btn');

    const trash = document.createElement('button');
    trash.innerHTML='<i class="fa fa-trash"></i>';
    trash.classList.add('trash-btn');

    todoDiv.appendChild(todoitem);
    todoDiv.appendChild(checked);
    todoDiv.appendChild(trash);

    todoList.appendChild(todoDiv);
  })

}

function removeLocaltodo(todo){
  let todos;
  //check if localStorage already has todos
  if(localStorage.getItem('todos')===null){
    todos=[];
  }else {
    todos=JSON.parse(localStorage.getItem('todos'));
  }
  const indexEle=todo.children[0].innerText;
  todos.splice(todos.indexOf(indexEle),1);
  localStorage.setItem("todos",JSON.stringify(todos));
}
