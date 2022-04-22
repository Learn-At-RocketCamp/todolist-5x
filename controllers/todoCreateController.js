import { apiTodoCreate } from '../scripts/api.js';
import { showTodoPage } from '../controllers/pagesController.js';
import { printResMsg } from '../utility/printResMsg.js';

// import { showTodoPage } from '../controllers/pagesController.js';

const btnAddTodo = document.querySelector('.btn-addTodo');

const sendCreateTodo = async (todo) => {
  try {
    const res = await apiTodoCreate(todo);
    // const { data, status, statusText, headers, config } = res;
    const { data, statusText, headers } = res;
    console.table(data);

    if (data.id) {
      printResMsg(statusText);
      showTodoPage();
    }
  } catch (err) {
    console.log(err);
  }
};

btnAddTodo.addEventListener(
  'click',
  (e) => {
    e.preventDefault();
    // console.dir(e.target);

    const inputValue = e.target.previousElementSibling.value.trim();
    e.target.previousElementSibling.value = '';
    console.log(inputValue);

    const todo = {
      content: inputValue,
    };

    sendCreateTodo(todo);
  },
  'false'
);
