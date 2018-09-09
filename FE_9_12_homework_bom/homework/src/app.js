/*  Function for creating element */
const createElement = (tag, parent, className, content) => {
  const elem = document.createElement(tag);
  elem.className = className;
  elem.textContent = content;
  parent.appendChild(elem);
  return elem;
};

/*  setup DONE status for Task and move to the end of the list  */
const setDoneStatus = (event) => {
  if (event.target.closest('.wrapperStatus').firstElementChild.style.display === 'none') {
    event.target.closest('.wrapperStatus').firstElementChild.style.display = 'inline-block';
    event.target.closest('.wrapperStatus').firstElementChild.nextElementSibling.style.display = 'none';
    event.target.closest('.wrapperStatus').nextElementSibling.style.backgroundColor = '#807f7f';
    let targetTodoElem = +event.target.closest('.todoElem').id;
    let element ={};
    todoItems.forEach((elem,i) => {
      if (elem.id === targetTodoElem) {
        todoItems[i].isDone = true;
        element = elem;
      }
    });
    todoItems = todoItems.filter((elem) => {
      return elem.id !== targetTodoElem;
    });
    todoItems.push(element);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    let parent = event.target.closest('.listTasks');
    parent.insertBefore(event.target.closest('.todoElem'), parent.lastElementChild.nextSibling);
  }
};

/*  Creating Main page (page 1) */
const mainPage = () => {
  const wrapper = createElement('div', rootNode, 'wrapper');
  const caption = createElement('h1', wrapper, 'caption', 'Simple TODO Task');
  const btnAddNewTask = createElement('button', wrapper, 'btnAddNewTask','Add new task');
  if (todoItems.length) {
    const listTasks = createElement('div', wrapper, 'listTasks');
    // Render Tasks
    for ( let i = 0; i < todoItems.length; i++ ) {
      const todoElem = createElement('div', listTasks, 'todoElem');
      todoElem.id = todoItems[i].id;
      const wrapperStatus = createElement('div', todoElem, 'wrapperStatus');
      wrapperStatus.addEventListener('click', setDoneStatus);
      const statusDone = createElement('img', wrapperStatus, 'statusDone');
      statusDone.src = './assets/img/done-s.png';
      const statusTODO = createElement('img', wrapperStatus, 'statusTODO');
      statusTODO.src = './assets/img/todo-s.png';
      const action = createElement('span', todoElem, 'action');
      action.textContent = todoItems[i].description;
      action.addEventListener('click', (event) => {
        let elem = event.target.closest('.todoElem').id; // if task "isDone = True" then don't modify the task
        todoItems.forEach((el) => {
          if (el.id === +elem) {
            if (!el.isDone) {
              location.hash = '/modify/' + elem;
            }
          }
        });
      });
      const taskRemove = createElement('img', todoElem, 'taskRemove');
      taskRemove.src = './assets/img/remove-s.jpg';
      if (todoItems[i].isDone) {
        statusDone.style.display = 'inline-block';
        action.style.backgroundColor = '#807f7f';
        statusTODO.style.display = 'none';
      } else {
        statusDone.style.display = 'none';
        statusTODO.style.display = 'inline-block';
      }
      taskRemove.addEventListener('click', (event) => {
        const parent = event.target.parentElement;
        parent.remove();
        let targetTodoElem = +event.target.closest('.todoElem').id;
        todoItems = todoItems.filter((elem) => {
           return elem.id !== targetTodoElem;
        });
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
        if (!todoItems.length) {
          const emptyMessage = createElement('p', wrapper, 'emptyMessage','Todo is empty');
        }
      });
    }
  } else {
    const emptyMessage = createElement('p', wrapper, 'emptyMessage','Todo is empty');
  }
  btnAddNewTask.addEventListener('click', () => {
    location.hash = '/add';
  });
  return wrapper;
};

const saveTask = (length, value) => {
  let pos;
  for (let i = 0; i < todoItems.length; i++ ){
    if (todoItems[i].isDone === false) {
      pos = i;
    }
  }
  todoItems.splice(pos+1, ITEMS_FOR_DELETE, {isDone:false, id: length, description: value});
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};

const addNewTask = () => {
  const wrapperTask = document.createElement('div');
  wrapperTask.className = 'wrapperTask';
  const caption = createElement('h1', wrapperTask, 'caption', 'Add Task');
  const inputTask = createElement('input', wrapperTask, 'inputTask');
  inputTask.type = 'text';
  const btnWrapper = createElement('div',wrapperTask,'btnWrapper');
  const btnCancel = createElement('button',btnWrapper,'btnCancel','Cancel');
  btnCancel.addEventListener('click',() => {
    rootNode.replaceChild(mainPage(), rootNode.firstChild);
    history.pushState('', document.title, window.location.pathname);
  });
  const btnSaveChanges = createElement('button',btnWrapper,'btnSaveChanges','Save Changes');
  btnSaveChanges.addEventListener('click', () => {
      if (!inputTask.value.trim()) {
        alert('Input Task');
        return;
      }
      saveTask(id, inputTask.value);
      id++;
      localStorage.setItem('id', id);
      inputTask.value = '';
      rootNode.replaceChild(mainPage(), rootNode.firstChild);
      history.pushState('', document.title, window.location.pathname);
  });
  return wrapperTask;
};

const modifyTask = (idMod) => {
  const wrapperModifyTask = document.createElement('div');
  wrapperModifyTask.className = 'wrapperModifyTask';
  const caption = createElement('h1', wrapperModifyTask, 'caption', 'Modify item');
  const inputTask = createElement('input', wrapperModifyTask, 'inputTask');
  inputTask.type = 'text';
  inputTask.value = document.getElementById(idMod).children[1].textContent;
  console.log(todoItems);
  const btnWrapper = createElement('div',wrapperModifyTask,'btnWrapper');
  const btnCancel = createElement('button',btnWrapper,'btnCancel','Cancel');
  btnCancel.addEventListener('click',() => {
    rootNode.replaceChild(mainPage(), rootNode.firstChild);
    history.pushState('', document.title, window.location.pathname);
  });
  const btnSaveChanges = createElement('button',btnWrapper,'btnSaveChanges','Save Changes');
  btnSaveChanges.addEventListener('click', () => {
    if (!inputTask.value.trim()) {
      alert('Input Task');
      return;
    }
    todoItems.forEach((elem) => {
      if (elem.id === Number(idMod)) {
        elem.description = inputTask.value;
      }
    });
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    inputTask.value = '';
    rootNode.replaceChild(mainPage(), rootNode.firstChild);
    history.pushState('', document.title, window.location.pathname);
  });
  return wrapperModifyTask;
};

const HASH_ID_POSITION = 7;
const ITEMS_FOR_DELETE = 0;
const INITIAL_ID = 0;
const rootNode = document.getElementById('root');
let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
let id = Number(localStorage.getItem('id')) || INITIAL_ID; //element id in array todoItems
rootNode.appendChild(mainPage());

window.addEventListener('hashchange', function() {
  if (location.hash === '#/add') {
    rootNode.replaceChild(addNewTask(),rootNode.firstChild);
  } else {
    if (/modify/.test(location.hash)) {
      let idModifiedElem = location.hash.slice(location.hash.indexOf('modify/') + HASH_ID_POSITION);
      rootNode.replaceChild(modifyTask(idModifiedElem),rootNode.firstChild);
    }
  }
});








