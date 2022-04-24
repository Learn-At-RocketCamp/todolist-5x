import { apiTodosGet, apiTodosPost } from './apis.js';
import { apiTodosDelete, apiTodosToggle } from './apis.js';
import { apiTodosPut } from './apis.js';

import { showOutput } from '../views/devView.js';
import { showTodoListItem } from '../views/devView.js';
console.log('This is [storeHelper.js].');

// const todo = {
//   content: `--/--[${Date.now()}]-hi!`,
// };
// const id = '07282f623a1e690dfe190d31d7821d85';

export const getTodos = async () => {
  const res = await apiTodosGet().catch((err) => {
    // console.error('await-catch:::', err);

    return err.response;
  });

  const isOK = res.status === 200;
  console.log(isOK);

  return await res;
};

export const addTodo = async ({ todo }) => {
  const res = await apiTodosPost({ todo }).catch((err) => {
    // console.error('await-catch:::', err);

    return err.response;
  });

  const isCreated = res.status === 201;
  console.log(isCreated);

  return await res;
};

export const deleteTodo = async ({ id }) => {
  const res = await apiTodosDelete({ id }).catch((err) => {
    // console.error('await-catch:::', err);

    return err.response;
  });

  const isOK = res.status === 200;
  console.log(isOK);

  return await res;
};

export const toggleTodo = async ({ id }) => {
  const res = await apiTodosToggle({ id }).catch((err) => {
    // console.error('await-catch:::', err);

    return err.response;
  });

  const isOK = res.status === 200;
  console.log(isOK);

  return await res;
};

export const updateTodo = async ({ id, todo }) => {
  const res = await apiTodosPut({ id, todo }).catch((err) => {
    // console.error('await-catch:::', err);

    return err.response;
  });

  const isOK = res?.status === 200;
  console.log(isOK);

  return await res;
};

// document.getElementById('get').addEventListener('click', () => {
//   getTodos().then((result) => {
//     console.log('finally-result:', result);

//     if (result.status === 401) {
//       // goHome()
//       console.log('goHome');
//     }

//     console.log(result);
//     showOutput(result);
//     showTodoListItem(result.data.todos);
//   });
// });
// /* end of getTodos() */

// document.getElementById('post').addEventListener('click', () => {
//   addTodo({ todo }).then((result) => {
//     console.log('finally-result:', result);

//     if (result.status === 401) {
//       // goHome()
//       console.log('goHome');
//     }

//     showOutput(result);
//   });
// });
// /* end of addTodo() */

// document.getElementById('toggle').addEventListener('click', () => {
//   toggleTodo({ id }).then((result) => {
//     console.log('finally-result:', result);

//     if (result.status === 401) {
//       // goHome()
//       console.log('goHome');
//     }

//     showOutput(result);
//   });
// });
// /* end of toggleTodo() */

// document.getElementById('delete').addEventListener('click', () => {
//   deleteTodo({ id }).then((result) => {
//     console.log('finally-result:', result);

//     if (result.status === 401) {
//       // goHome()
//       console.log('goHome');
//     }

//     showOutput(result);
//   });
// });
// /* end of deleteTodo() */

// document.getElementById('update').addEventListener('click', () => {
//   updateTodo({ id, todo }).then((result) => {
//     console.log('finally-result:', result);

//     // 404
//     if (result.status === 401) {
//       // goHome()
//       console.log('goHome');
//     }

//     showOutput(result);
//   });
// });
// /* end of updateTodo() */
