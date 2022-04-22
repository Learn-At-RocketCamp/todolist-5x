import { getTodos } from '../controllers/todoReadController.js';

const showSignup = document.querySelector('.js-show-signup');
const formSignup = document.querySelector('#form-signup');
const formLogin = document.querySelector('#form-login');
const pageTodos = document.querySelector('#page-todos');
const home = document.querySelector('.home');

export const showTodoPage = () => {
  pageTodos.style.display = 'block';
  home.style.display = 'none';
  getTodos();
};

export const goHome = () => {
  formLogin.style.display = 'flex';
  formSignup.style.display = 'none';
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
