import { apiLogin } from '../scripts/api.js';
import { sendCheck } from './authController.js';
import { getInputsValue } from '../utility/getInputsValue.js';
import { showTodoPage } from '../controllers/pagesController.js';

const btnLogin = document.querySelector('.btn-login');

const sendLogin = async (user) => {
  // console.table(user);
  try {
    console.log('try-Login');
    const res = await apiLogin(user);
    // const { data, status, statusText, headers, config } = res;
    const { data, headers } = res;

    if (data.message === '登入成功') {
      console.log('1st-OK!');
      // # NOTE: 'a' is lowerCase
      // sendCheck(headers.Authorization);
      console.log(headers.authorization);
      sendCheck(headers.authorization);
      showTodoPage();
    }
  } catch (err) {
    console.log(err);
    // console.error(err.response);
    // handleError(error);
    // goHome();
  }
};

btnLogin.addEventListener(
  'click',
  () => {
    const inputs = [...document.querySelectorAll('#form-login input')];
    // console.log(inputs);
    const user = getInputsValue(inputs);
    console.table(user);
    sendLogin(user);
  },
  'false'
);
