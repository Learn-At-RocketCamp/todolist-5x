import { apiRegister } from '../scripts/api.js';
import { sendCheck } from './authController.js';
import { getInputsValue } from '../utility/getInputsValue.js';
import { printResMsg } from '../utility/printResMsg.js';

const sendRegister = async (user) => {
  // console.table(user);
  try {
    const res = await apiRegister(user);
    // const { data, status, statusText, headers, config } = res;
    const { data, headers } = res;
    // 201-Created

    if (data.message === '註冊成功') {
      // data.message => print
      // headers.Authorization => check TOKEN
      sendCheck(headers.authorization);
      printResMsg(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

const btnSignup = document.querySelector('.btn-signup');

btnSignup.addEventListener(
  'click',
  () => {
    const inputs = [...document.querySelectorAll('#form-signup input')];
    // const user = getInputsValue(inputs);
    const { email, password, nickname } = getInputsValue(inputs);
    const user = { email, password, nickname };
    console.table(user);
    sendRegister(user);
    // printResMsg('hi');
    // #NOTE: JSON.stringify({ user }) is Wrong type
    // const data = JSON.stringify(user);
    // const data = JSON.stringify({ user });
    // console.log(data);
    // console.table(data);
    // sendRegister(JSON.stringify({ user }));
    // sendRegister(data);
  },
  'false'
);
