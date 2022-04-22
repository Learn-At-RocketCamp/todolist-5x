const BASE_URL = 'https://todoo.5xcamp.us';

const usersReq = axios.create({
  baseURL: `${BASE_URL}/users`,
  timeout: 1000,
});

const todosReq = axios.create({
  baseURL: `${BASE_URL}/todos`,
  timeout: 1000,
});

// const config = {
//   method: 'get',
//   url: `${baseURL}/check`,
//   headers: {
//     Authorization: token,
//     'Content-Type': 'application/json',
//   },
// };

const token = localStorage.getItem('5xToken');

if (token) {
  axios.defaults.headers.common.Authorization = token;
  todosReq.defaults.headers.common.Authorization = token;
  console.log(todosReq);
  console.log(axios.defaults);
}

export const apiCheckAuth = (token) => {
  return axios.get(`${BASE_URL}/check`);
};

/**
 * @param { {email: String, password: String, nickname: String} } user
 * @returns
 */
// * @param { Object } user
// * @property { String } email
// * @property { String } password
// * @property { String } nickname
export const apiRegister = (user) => {
  // #XXX:
  // const userData = JSON.stringify({ user });
  // return usersReq.post('', user);
  return usersReq.post('', { user });
};

export const apiLogin = (user) => {
  return usersReq.post('/sign_in', { user });
};

export const apiTodo = () => {
  console.log(todosReq);
  return todosReq.get();
};

export const apiTodoCreate = (todo) => {
  return todosReq.post('', { todo });
};

export const apiTodoToggle = (id) => {
  return todosReq.patch(`/${id}/toggle`);
};

export const apiTodoDelete = (id) => {
  return todosReq.delete(`/${id}`);
};
