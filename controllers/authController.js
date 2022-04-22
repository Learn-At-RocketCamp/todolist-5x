import { apiCheckAuth } from '../scripts/api.js';
import { goHome, showTodoPage } from '../controllers/pagesController.js';
import { printResMsg } from '../utility/printResMsg.js';

const setLocalStorage = (token) => {
  // localStorage.setItem('5xUser', data.email);
  // localStorage.setItem('5xToken', headers.authorization);
  localStorage.setItem('5xToken', token);
  localStorage.setItem('5xExp', Date.now());
  // console.log(new Date(1650381168221).toISOString().split('T')[0])
};

export const sendCheck = async (token) => {
  /**
   * if 'OK!' => setLocalStorage => goPageTodo
   */
  try {
    console.log('try-Check');
    const res = await apiCheckAuth(token);
    // const { data, status, statusText, headers, config } = res;
    const { data, headers } = res;

    if (data.message === 'OK!') {
      printResMsg(data.message);
      setLocalStorage(token);
      showTodoPage();
    }
  } catch (err) {
    localStorage.clear();
    goHome();
    console.error(err);
    // handleError(error);
  }
};

export const checkLocalStorage = () => {
  if (localStorage.getItem('5xExp') && localStorage.getItem('5xToken')) {
    const logTimeStamp = Number(localStorage.getItem('5xExp'));
    const logDate = new Date(logTimeStamp).getDate();
    // console.log(logDate);

    const theDay = new Date();
    const today = theDay.getDate();
    // console.log(today);
    if (logDate === today) {
      return showTodoPage();
    }
    return localStorage.clear();
  }
  return sendCheck(localStorage.getItem('5xToken'));
};
