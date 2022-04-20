const showSignup = document.querySelector('.js-show-signup');
const home = document.querySelector('.home');
const pageTodos = document.querySelector('#page-todos');
const formSignup = document.querySelector('#form-signup');
const formLogin = document.querySelector('#form-login');
const btnLogin = document.querySelector('.btn-login');

const baseURL = 'https://todoo.5xcamp.us';

let config = {
  method: 'get',
  url: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const handleError = (error) => {
  const { data } = error.response;
  const motto = document.querySelector('.motto');
  motto.innerHTML = data.message;
};

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
  console.log('templateTodos::', todosData);

  return `
    <li>
      <div class="item-todo">
        <div class="todo-txt" data-id="${todosData.id}">
          <input type="checkbox" ${doneChecker(
            todosData.completed_at
          )}  name="" id="">
          <p>${todosData.content}</p>
        </div>
        <a href="#" class="btn-remove">X</a>
      </div>
    </li>
  `;
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

const displayTodos = (todosData, htmlContent = '') => {
  console.log('displayTodos:', todosData);

  htmlContent += todosData.map(templateTodos).join('');
  // console.log(htmlContent);
  const ul = document.querySelector('.card-ul');
  ul.innerHTML = htmlContent;

  ul.addEventListener(
    'click',
    (e) => {
      if (e.target.matches('.todo-txt p')) {
        const target = e.target;
        console.dir(target);
        const targetID = e.target.parentElement.dataset.id;
        console.log(targetID);
        const targetValue = todosData.find((item) => {
          return item.id === targetID;
        });
        console.log(targetValue.content);
        target.innerHTML = `
          <input type="text" name="todo" class="edit-todo" value="${targetValue.content}">
          </input>
        `;

        /**
         * #FIXME:
         */
        if (e.target.matches('.item-todo')) {
          const editValue = document.querySelector('.edit-todo');
          target.innerHTML = `<p>${editValue.value}</p>`;
          console.log(editValue);

          const todo = {
            content: editValue,
          };
          config = {
            method: 'put',
            url: `${baseURL}/todos/${targetID}`,
            headers: {
              'Content-Type': 'application/json',
            },
            data: JSON.stringify({ todo }),
          };
          console.log(config);

          axios(config)
            .then((res) => {
              const { data } = res;
              console.log(data);
              showTodoPage();
              // if (data.completed_at) {
              // }
            })
            .catch((error) => {
              console.log(error);
              handleError(error);
            });
        }
      }
      if (e.target.matches('.btn-remove')) {
        const targetID = e.target.previousElementSibling.dataset.id;

        config = {
          method: 'delete',
          url: `${baseURL}/todos/${targetID}`,
          headers: {
            'Content-Type': 'application/json',
          },
        };
        console.log(config);

        axios(config)
          .then((res) => {
            const { data } = res;
            console.log(data);
            showTodoPage();
            // if (data.completed_at) {
            // }
          })
          .catch((error) => {
            console.log(error);
            handleError(error);
          });
      }
      if (e.target.matches('input')) {
        const targetID = e.target.parentElement.dataset.id;
        console.log(targetID);

        config = {
          method: 'patch',
          url: `${baseURL}/todos/${targetID}/toggle`,
          headers: {
            'Content-Type': 'application/json',
          },
        };
        console.log(config);

        axios(config)
          .then((res) => {
            const { data } = res;
            console.log(data);
            showTodoPage();
            // if (data.completed_at) {
            // }
          })
          .catch((error) => {
            console.log(error);
            handleError(error);
          });
      }
      // console.log(e.target);
      // return showTodoPage();
    },
    'false'
  );
};
/* end of displayTodos(todosData) */

const getTodos = () => {
  config = {
    method: 'get',
    url: `${baseURL}/todos`,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(config);

  axios(config)
    .then((res) => {
      const { data } = res;
      console.log(data);
      displayTodos(data.todos);
      displayCount(data.todos);
      // displayTodos(sampleData.todos);
      // return sampleData.todos;

      const todoTabs = document.querySelector('.card-tabs');
      todoTabs.addEventListener(
        'click',
        (e) => {
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

          const partTodos = filterTodos(data.todos, tab);
          // console.log(partTodos.length);
          displayTodos(partTodos);
        },
        'false'
      );
      /* end of todoTabs.addEventListener() */
    })
    .catch((error) => {
      console.log(error);
      handleError(error);
    });
};
/* end of getTodos() */

const showTodoPage = () => {
  pageTodos.style.display = 'block';
  home.style.display = 'none';

  getTodos();

  const btnAddTodo = document.querySelector('.btn-addTodo');
  btnAddTodo.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      console.dir(e.target);
      const inputValue = e.target.previousElementSibling.value.trim();
      e.target.previousElementSibling.value = '';
      console.log(inputValue);

      const todo = {
        content: inputValue,
      };

      config = {
        method: 'post',
        url: `${baseURL}/todos`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ todo }),
      };
      console.log(config);

      axios(config)
        .then((res) => {
          const { data } = res;
          console.log(data);
          showTodoPage();
        })
        .catch((error) => {
          console.log(error);
          handleError(error);
        });
    },
    'false'
  );
};

const checkLogin = (token) => {
  config = {
    method: 'get',
    url: `${baseURL}/check`,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };

  axios(config)
    .then((res) => {
      // console.log(res);
      const { data } = res;
      if (data.message === 'OK!') {
        axios.defaults.headers.common.Authorization = token;
        showTodoPage();
      }
    })
    .catch((error) => {
      console.log(error);
      handleError(error);
    });
};

const checkToken = () => {
  if (localStorage.getItem('5xExp') && localStorage.getItem('5xToken')) {
    const logTimeStamp = Number(localStorage.getItem('5xExp'));
    const logDate = new Date(logTimeStamp).getDate();
    // console.log(logDate);

    const theDay = new Date();
    const today = theDay.getDate();
    // console.log(today);
    if (logDate === today) {
      return checkLogin(localStorage.getItem('5xToken'));
    }
    return localStorage.clear();
  }
};
/** end of todos() */

const goHome = () => {
  formLogin.style.display = 'flex';
  formSignup.style.display = 'none';
};

// const emailChecker = (email) => {
//   return email && email.includes('@');
// };

const getInputValue = (inputs) => {
  return inputs.reduce((target, item) => {
    target[item.name] = item.value.trim();
    return target;
  }, {});
};

btnLogin.addEventListener(
  'click',
  (e) => {
    const inputs = [...document.querySelectorAll('#form-login input')];
    // console.log(inputs);
    const user = getInputValue(inputs);
    console.log(user);

    config = {
      method: 'post',
      url: `${baseURL}/users/sign_in`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ user }),
    };
    console.log(config);

    axios(config)
      .then((res) => {
        console.dir(res);
        const { data, headers } = res;
        if (data.message === '登入成功') {
          localStorage.setItem('5xUser', data.email);
          localStorage.setItem('5xToken', headers.authorization);
          localStorage.setItem('5xExp', Date.now());
          // console.log(new Date(1650381168221).toISOString().split('T')[0])
          checkToken();
          showTodoPage();
        }
      })
      .catch((error) => {
        console.log(error);
        handleError(error);
        goHome();
      });
  },
  'false'
);
/* end of home */

const btnSignup = document.querySelector('.btn-signup');
btnSignup.addEventListener(
  'click',
  (e) => {
    const inputs = [...document.querySelectorAll('#form-signup input')];
    const user = getInputValue(inputs);
    console.log(user);

    config = {
      method: 'post',
      url: `${baseURL}/users`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ user }),
    };
    console.log(config);

    axios(config)
      .then((res) => {
        const { data } = res;
        console.log(data);
        goHome();
      })
      .catch((error) => {
        console.log(error);
        handleError(error);
      });
  },
  'false'
);

showSignup.addEventListener(
  'click',
  (e) => {
    e.preventDefault();
    formSignup.style.display = 'flex';
    formLogin.style.display = 'none';
  },
  'false'
);

// Main
checkToken();
// localStorage.clear();
