import { apiTodo, apiTodoToggle, apiTodoDelete } from '../scripts/api.js';
import { showTodoPage } from '../controllers/pagesController.js';
const ul = document.querySelector('.card-ul');

// export const showTodoPage = () => {
//   pageTodos.style.display = 'block';
//   home.style.display = 'none';
//   // getTodos();
// };

// #HACK:
const filterTodos = (todosData, tab = null) => {
  return todosData.filter((item) => {
    console.log(tab);
    if (tab === null) {
      return !item.completed_at;
    }
    return item.completed_at;
  });
};
/* end of filterTodos(todosData, tab) */

const calcTodos = (todosData) => {
  return todosData.filter((item) => {
    return !item.completed_at;
  }).length;
};
/* end of calcTodos(todosData) */

const templateCount = (todosData) => {
  return `
    <p>
      ${calcTodos(todosData)} 個待完成項目
    </p>
  `;
};
/* end of templateCount(todosData) */

const doneChecker = (completed) => {
  return completed ? 'checked' : '';
};
/* end of doneChecker(completed) */

const templateTodos = (todosData) => {
  // console.log('templateTodos::', todosData);
  return `
    <li data-id="${todosData.id}">
      <div class="item-todo">
        <div class="todo-txt">
          <input type="checkbox" ${doneChecker(
            todosData.completed_at
          )}  name="" id="${todosData.id}">          
          <p>${todosData.content}</p>
        </div>
        <a href="#" class="btn-remove">X</a>
      </div>
    </li>
  `;
  // <p>${todosData.content}</p>;

  //   <li>
  //   <div class="item-todo">
  //     <div class="todo-txt">
  //       <input type="checkbox" name="" id="">
  //       <p>把冰箱發霉的檸檬拿去丟</p>
  //     </div>
  //     <a href="#" class="btn-remove">X</a>
  //   </div>
  // </li>
};
/* end of templateTodos(todosData) */

const displayCount = (todosData) => {
  const todoCount = document.querySelector('.todo-count');
  // console.log(templateCount(todosData));
  todoCount.innerHTML = templateCount(todosData);
};
/* end of displayCount(todosData) */

const sendKillTodo = async (id) => {
  try {
    const res = await apiTodoDelete(id);
    const { statusText } = res;
    console.log('kill::', res);

    if (statusText === 'OK') {
      showTodoPage();
    }
  } catch (error) {
    console.log(error);
  }
};

const sendToggleTodo = async (id) => {
  try {
    const res = await apiTodoToggle(id);
    const { statusText } = res;
    console.log('toggle::', res);
    if (statusText === 'OK') {
      showTodoPage();
    }
  } catch (error) {
    console.log(error);
  }
};

const targetID = (e) => {
  return e.target.closest('li').dataset.id;
};

const displayTodos = (todosData, htmlContent = '') => {
  // console.log('displayTodos:', todosData);

  htmlContent += todosData.map(templateTodos).join('');
  // console.log(htmlContent);
  ul.innerHTML = htmlContent;
};
/* end of displayTodos(todosData) */

let dataBox = [];

export const getTodos = async () => {
  try {
    const res = await apiTodo();
    const { data } = res;
    console.log(data.todos);
    displayTodos(data.todos);
    displayCount(data.todos);

    dataBox = data.todos;
    // return dataBox;
    // displayTodos(sampleData.todos);
    // return sampleData.todos;
  } catch (error) {
    console.log(error);
  }
};
/* end of getTodos() */

// getTodos();
// console.log(getTodos());
// console.log('getTodos();');
// const todosData = getTodos();
// console.log(todosData);
// displayTodos(todosData);
// displayCount(todosData);

const todoTabs = document.querySelector('.card-tabs');
todoTabs.addEventListener(
  'click',
  (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.target.matches('.tab-all')) {
      return showTodoPage();
    }
    // console.log(e.target);
    const target = e.target;
    // console.log(target.className);

    const isNullClass = target.className === 'tab-todo';
    // console.log(isNullClass);

    const isNull = null;
    const tab = isNullClass ? isNull : !isNull;

    const partTodos = filterTodos(dataBox, tab);
    // const partTodos = filterTodos(data.todos, tab);
    // console.log(partTodos.length);
    displayTodos(partTodos);
  },
  'false'
);
/* end of todoTabs.addEventListener() */

ul.addEventListener(
  'click',
  (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('eventPhase:::::', e.eventPhase);

    const elRemove = e.target.matches('.btn-remove');
    const elInput = e.target.matches('input');
    // if (!elRemove && !elInput) {
    //   return console.log('!Wrong Target!!!');
    // }

    if (elRemove) {
      console.log(targetID(e));
      const todoID = targetID(e);
      return sendKillTodo(todoID);
    }

    if (elInput) {
      // const targetID = e.target.parentElement.dataset.id;
      // console.log(targetID);
      const todoID = targetID(e);
      return sendToggleTodo(todoID);
    }
  },
  'false'
);

const listenForDoubleClick = (element) => {
  element.contentEditable = true;
  setTimeout(() => {
    if (document.activeElement !== element) {
      element.contentEditable = false;
    }
  }, 300);
};

ul.addEventListener(
  'dblclick',
  (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.target.matches('.item-todo')) {
      const itemTodo = document.querySelector('.item-todo p');
      console.dir(itemTodo);
      console.log(itemTodo.innerText);
      const tmpValue = itemTodo.innerText;
      // const parent = itemTodo.parentElement;
      itemTodo.innerHTML = `
        <input type="text" class="input-todo" value="${tmpValue}">
      `;
      itemTodo.focus();
    }
  },
  'false'
);
