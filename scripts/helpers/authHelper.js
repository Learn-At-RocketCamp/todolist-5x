import { apiUserRegister } from './apis.js';
import { apiAuthCheck } from './apis.js';
import { apiUserIn, apiUserBye } from './apis.js';
// import { showOutput } from '../views/devView.js';
console.log('This is [authHelper.js].');

// const user = {
//   email: 'g16@dev',
//   password: '000000',
//   nickname: 'Guest',
// };

const saveJWT = (res) => {
  const JWT = res.headers?.authorization;

  if (JWT) {
    console.log('hasJWT:::', JWT);
    localStorage.setItem('5xJWT', JWT);
  }
};

export const sendTestCheck = async () => {
  // console.log('sendTestCheck-authReq:::', authReq);
  // #HACK: if(getItem)

  const res = await apiAuthCheck().catch((err) => {
    // console.error('await-catch:::', err);
    return err.response;
  });

  const isOK = res.status === 200;
  console.log(isOK);

  if (isOK) {
    saveJWT(res);
  }

  // localStorage.setItem
  // goPageTodos()

  return await res;
};
/* end of sendTestCheck() */

export const sendRegister = async ({ user }) => {
  // console.table(user);
  // console.log(user);
  // console.log({ user });
  // const data = JSON.stringify({ user });
  // console.log(data);

  /**
   * #NOTE: axios-Handling
   * then => (response.data)
   * catch => (error.response.data)
   *
   * #doc:
   * https://axios-http.com/docs/handling_errors
   * https://axios-http.com/docs/res_schema
   */
  const res = await apiUserRegister({ user }).catch((err) => {
    // console.error('await-catch:::', err);
    return err.response;
  });
  console.log('await-res: ', res);
  const isCreated = res.status === 201;
  if (isCreated) {
    saveJWT(res);
  }

  return await res;
};
/* end of sendRegister({ user }) */

export const sendLogin = async ({ user }) => {
  const res = await apiUserIn({ user }).catch((err) => {
    // console.error('await-catch:::', err);
    return err.response;
  });

  const isOK = res.status === 200;
  console.log(isOK);
  if (isOK) {
    saveJWT(res);
  }
  // localStorage.setItem
  // goPageTodos()

  return await res;
};
/* end of sendLogout() */

export const sendLogout = async () => {
  const res = await apiUserBye().catch((err) => {
    // console.error('await-catch:::', err);
    return err.response;
  });

  const isOK = res.status === 200;
  console.log(isOK);
  // localStorage.setItem
  // goPageTodos()

  localStorage.clear();
  return await res;
};
/* end of sendLogout() */

// document.getElementById('test-check').addEventListener('click', () => {
//   sendTestCheck().then((result) => {
//     console.log('finally-result:', result);
//     if (result.status === 401) {
//       // goHome()
//       console.log('goHome');
//     }

//     showOutput(result);
//   });
// });

/**
 * #NOTE:
 * async() => return Promise itself
 */
// document.getElementById('register').addEventListener('click', () => {
//   sendRegister({ user }).then((result) => {
//     console.log('finally-result:', result);
//     showOutput(result);
//   });
// });
