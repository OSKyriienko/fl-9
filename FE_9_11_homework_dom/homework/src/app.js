const MAX_ACTIONS = 10;

const createElement = (tag, parent, className) => {
    const elem = document.createElement(tag);
    parent.appendChild(elem);
    elem.className = className;
    return elem;
};

const addNewAction = () => {
    const listRowElem = createElement('div', listActions, 'listRowElem');
    let countAction = document.querySelectorAll('.listRowElem');
    const todoElem = createElement('label', listRowElem, 'todoElem');
    todoElem.draggable = true;
    todoElem.id = 'key' + countAction.length;
    const chkElem = createElement('input', todoElem, 'chkElem');
    chkElem.type = 'checkbox';
    const iconYes = createElement('span', todoElem, 'iconYes');
    iconYes.innerHTML = '<i class="material-icons">check_box</i>';
    const iconNo = createElement('span', todoElem, 'iconNo');
    iconNo.innerHTML = '<i class="material-icons">check_box_outline_blank</i>';
    const action = createElement('span', todoElem, 'action');
    action.textContent = inputAction.value;
    const btnRemoveAction = createElement('button', listRowElem, 'btnRemoveAction');
    btnRemoveAction.innerHTML = '<i class="material-icons">delete</i>';
    btnRemoveAction.addEventListener('click', removeAction);
    let amount = document.querySelectorAll('.listRowElem');
    if (amount.length === MAX_ACTIONS) {
      btnAddAction.disabled = true;
      const warning = document.querySelector('.warning');
      warning.style.opacity = 1;
    }
    inputAction.value = '';
    btnAddAction.disabled = true;
};

const removeAction = event => {
    const parent = event.target.parentElement.parentElement;
    parent.remove();
    let amount = document.querySelectorAll('.listRowElem');
    if (amount.length < MAX_ACTIONS) {
    btnAddAction.disabled = false;
    const warning = document.querySelector('.warning');
    warning.style.opacity = 0;
  }
};

const disableAddAction = () => {
  btnAddAction.disabled = !inputAction.value;
};

const wrapperContent = document.querySelector('.wrapperContent');
const content = createElement('div', wrapperContent, 'content');
const wrapperInputAction = createElement('div', content, 'wrapperInputAction');
const inputAction = createElement('input', wrapperInputAction, 'inputAction');
inputAction.addEventListener('keyup', disableAddAction);
inputAction.placeholder = 'Add New Action';
const btnAddAction = createElement('button', wrapperInputAction, 'btnAddAction');
btnAddAction.disabled = true;
btnAddAction.innerHTML = '<i class="material-icons">add_box</i>';
const listActions = createElement('div', content, 'listActions');
btnAddAction.addEventListener('click', addNewAction);
const paw = createElement('div', wrapperContent, 'paw');
const imgPaw = createElement('img', paw, 'imgPaw');
imgPaw.src = 'assets/img/cat.png';

listActions.addEventListener('dragstart', event => {
  event.dataTransfer.effectAllowed='move';
  event.dataTransfer.setData('text', event.target.id);
  event.target.closest('.listRowElem').classList.add('over');
});

listActions.addEventListener('dragenter', event => {
  event.preventDefault();
  return false;
});

listActions.addEventListener('dragleave', event => {
  event.preventDefault();
  event.target.closest('.listRowElem').classList.remove('over');
  return false;
});

listActions.addEventListener('dragend', event => {
  event.preventDefault();
  let listAct = document.querySelectorAll('.listActions .listRowElem');
  for ( let i = 0; i < listAct.length; i++ ) {
    listAct[i].classList.remove('over');
  }
  return false;
});

listActions.addEventListener('dragover', event => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  event.target.closest('.listRowElem').classList.add('over');
  return false;
});

listActions.addEventListener('drop', event => {
  try {
    let data = event.dataTransfer.getData('text');
    let sourceElem = event.target.closest('.listRowElem');
    let destElem = document.getElementById(data).parentElement;
    event.stopPropagation();
    let listAct = document.querySelectorAll('.listActions .listRowElem');
    let arrListAct = [...listAct];
    let pos1 = arrListAct.indexOf(destElem);
    let pos2 = arrListAct.indexOf(sourceElem);
    if (pos1 < pos2) {
      sourceElem.parentElement.insertBefore(destElem, sourceElem.nextSibling);
    } else {
      sourceElem.parentElement.insertBefore(destElem, sourceElem);
    }
  } catch (error) {
    let listAct = document.querySelectorAll('.listActions .listRowElem');
    for ( let i = 0; i < listAct.length; i++ ) {
      listAct[i].classList.remove('over');
    }
    alert('Pull over only Action at list');
  }
});


