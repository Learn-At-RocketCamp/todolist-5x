import {
  getTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
} from '../helpers/storeHelper.js';
import { editMode } from '../controllers/updateTodo.js';

import { getInputsValue } from '../utility/getInputsValue.js';
// import { printResMsg } from '../utility/printResMsg.js';

import { displayTodos, templateCount, filterTodos } from '../views/view.js';

import { showTodoPage, goHome } from '../views/toggleView.js';
// import { showOutput } from '../views/devView.js';
console.log('This is [todosControllers.js].');

const targetID = (e) => {
  return e.target.closest('li').dataset.id;
};

const displayCount = (todosData) => {
  const todoCount = document.querySelector('.todo-count');
  // console.log(templateCount(todosData));
  todoCount.innerHTML = templateCount(todosData);
};
/* end of displayCount(todosData) */

document.getElementById('btn-todo-post').addEventListener('click', (e) => {
  e.preventDefault();

  const inputTodo = document.querySelector('.input-todo');
  const todo = {
    content: inputTodo.value.trim(),
  };
  console.table(todo);

  addTodo({ todo }).then((result) => {
    console.log('finally-result:', result);

    if (result.status === 401) {
      // goHome()
      console.log('goHome');
    }

    init();
    // showOutput(result);
    inputTodo.value = '';
  });
});
/* end of addTodo() */

const ul = document.querySelector('.card-ul');
ul.addEventListener(
  'click',
  (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('eventPhase:::::', e.eventPhase);

    const elRemove = e.target.matches('.btn-remove');
    const elInput = e.target.matches('input');
    const elLabel = e.target.matches('li label');

    // if (!elRemove && !elInput) {
    //   return console.log('!Wrong Target!!!');
    // }

    if (elRemove) {
      console.log(targetID(e));
      const id = targetID(e);

      return deleteTodo({ id }).then((result) => {
        console.log('finally-result:', result);

        if (result.status === 401) {
          // goHome()
          console.log('goHome');
        }

        // showOutput(result);
        init();
      });
    }

    if (elInput) {
      // const targetID = e.target.parentElement.dataset.id;
      // console.log(targetID);
      console.log(targetID(e));
      const id = targetID(e);

      return toggleTodo({ id }).then((result) => {
        console.log('finally-result:', result);

        if (result.status === 401) {
          // goHome()
          console.log('goHome');
        }

        // showOutput(result);
        init();
      });
    }

    if (elLabel) {
      console.log('editMode:::', e.target);
      editMode(e.target);
    }
  },
  'false'
);

const todoTabs = document.querySelector('.card-tabs');
const isNull = null;

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

    const tab = isNullClass ? isNull : !isNull;

    getTodos().then((result) => {
      console.log('finally-result:::', result);

      if (result.status === 401) {
        console.log('goHome');
        return goHome();
      }

      const partTodos = filterTodos(result.data.todos, tab);
      // const partTodos = filterTodos(data.todos, tab);
      // console.log(partTodos.length);
      displayTodos(partTodos);
    });
  },
  'false'
);
/* end of todoTabs.addEventListener() */

document.querySelector('.btn-clear').addEventListener(
  'click',
  (e) => {
    e.preventDefault();

    getTodos().then((result) => {
      console.log('finally-result:::', result);

      if (result.status === 401) {
        console.log('goHome');
        return goHome();
      }

      const doneTodos = filterTodos(result.data.todos, !isNull);
      console.log('doneTodos::: ', doneTodos);
      doneTodos.forEach((item) => {
        console.log(item.id);
        const id = item.id;

        deleteTodo({ id }).then((result) => {
          console.log('finally-result:', result);

          if (result.status === 401) {
            // goHome()
            console.log('goHome');
          }
          init();
        });
      });
    });
  },
  'false'
);

export const init = () => {
  getTodos().then((result) => {
    console.log('finally-result:::', result);

    if (result.status === 401) {
      console.log('goHome');
      return goHome();
    }

    // showOutput(result);
    displayTodos(result.data.todos);
    displayCount(result.data.todos);
    // showTodoListItem(result.data.todos);
  });
};
// init();
