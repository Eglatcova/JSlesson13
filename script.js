'use srtict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');
let todoData = [{
    value: '',
    completed: false
  }
];

if (localStorage.getItem('localData')) {
  todoData = JSON.parse(localStorage.getItem('localData'));
}

const dataUpdate = function() {
  localStorage.setItem('localData', JSON.stringify(todoData));
};

const render = function () {

  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    if(item.value === '') {
      return;
    }

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<div class="todo-remove"><button class="svg svg__trash"></button></div>' +
      ' <div class="todo-complete"><button class="svg svg__tick"></button></div>' +
      '</div>';
    const svgCompleted = li.querySelector('.svg__tick');
    if (item.completed) {
      todoCompleted.append(li);
      svgCompleted.classList.add('svg__ticked');
      svgCompleted.classList.remove('svg__tick');
    } else {
      todoList.append(li);
    }

    const buttonCompleted = li.querySelector('.todo-complete');

    buttonCompleted.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
      dataUpdate();
    });

    const buttonRemove = li.querySelector('.todo-remove')

    buttonRemove.addEventListener ('click', function(){
      todoData.splice(todoData.indexOf(item), 1);
      li.remove();
      dataUpdate();
    });

    dataUpdate();
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  const newTodo = { 
    value: headerInput.value,
    completed: false
  };
  if (headerInput.value === '') {
    alert('Введите дело');
    return;
  } else {
    todoData.push(newTodo);
    headerInput.value = '';
  }
  render();
});

render();