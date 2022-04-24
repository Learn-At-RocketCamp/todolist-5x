import { init } from '../controllers/todosController.js';
import { sendTestCheck } from '../helpers/authHelper.js';

const showSignup = document.querySelector('.js-show-signup');
const showHome = document.querySelector('.js-show-home');
const formSignup = document.querySelector('#form-signup');
const formLogin = document.querySelector('#form-login');
const pageTodos = document.querySelector('#page-todos');
const home = document.querySelector('.home');

export const showTodoPage = () => {
  pageTodos.style.display = 'block';
  home.style.display = 'none';
  init();
};

export const goHome = () => {
  home.style.display = 'flex';
  formLogin.style.display = 'flex';

  formSignup.style.display = 'none';
  pageTodos.style.display = 'none';
};

// #HACK:
const showFormSignUp = () => {
  formLogin.style.display = 'none';
  formSignup.style.display = 'flex';
};

showSignup.addEventListener(
  'click',
  (e) => {
    e.preventDefault();
    showFormSignUp();
  },
  'false'
);

showHome.addEventListener(
  'click',
  (e) => {
    e.preventDefault();
    goHome();
  },
  'false'
);

sendTestCheck().then((result) => {
  console.warn('sendTestCheck-finally-result:::', result);

  if (result.status === 401) {
    console.log('goHome');
    goHome();
  }

  if (result.status === 200) {
    showTodoPage();
  }
  // showOutput(result);
});
