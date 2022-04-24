import { sendRegister } from '../helpers/authHelper.js';
import { sendLogout, sendLogin } from '../helpers/authHelper.js';
import { getInputsValue } from '../utility/getInputsValue.js';
import { showTodoPage, goHome } from '../views/toggleView.js';

// import { showOutput } from '../views/devView.js';
console.log('This is [usersControllers.js].');

document.getElementById('register').addEventListener(
  'click',
  (e) => {
    e.preventDefault();

    const inputs = [...document.querySelectorAll('#form-signup input')];
    // console.log(inputs);
    const { email, password, nickname } = getInputsValue(inputs);
    const user = { email, password, nickname };
    console.table(user);

    sendRegister({ user }).then((result) => {
      console.log('finally-result:::', result);
      showTodoPage();
      history.go(0);

      // showOutput(result);
    });
  },
  'false'
);

document.getElementById('login').addEventListener(
  'click',
  (e) => {
    e.preventDefault();

    const inputs = [...document.querySelectorAll('#form-login input')];
    // console.log(inputs);
    const { email, password } = getInputsValue(inputs);
    const user = { email, password };
    console.table(user);

    sendLogin({ user }).then((result) => {
      console.log('finally-result:::', result);
      showTodoPage();
      history.go(0);

      // showOutput(result);
    });
  },
  'false'
);

document.querySelector('.btn-logout').addEventListener(
  'click',
  () => {
    sendLogout().then((result) => {
      console.log('finally-result:::', result);
      goHome();
      // showOutput(result);
    });
  },
  'false'
);
