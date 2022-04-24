// import { init } from '../controllers/todosController.js';

axios.interceptors.request.use(
  (config) => {
    console.log(`
      ${config.method.toUpperCase()} request sent to
        [${config.url}]
      ( at ${new Date()} ).
    `);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const BASE_URL = 'https://todoo.5xcamp.us';

// #Step1-createReq
const authReq = axios.create({
  baseURL: `${BASE_URL}/todos`,
  // Sleeping: 6s
  timeout: 9000,
  // const config = {
  //   method: 'get',
  //   url: `${baseURL}/check`,
  //   headers: {
  //     Authorization: token,
  //   },
  // };
});

authReq.interceptors.response.use(
  (response) => {
    /**
     * Any status code that lie within
     *  the range of [2xx] cause this function to trigger
     */
    const { status, config } = response;
    console.log(`
      [${status}] ${config.method.toUpperCase()} request sent to
        [${config.url}]
      ( at ${new Date()} ).
    `);

    // init();

    return response;
  },
  (error) => {
    /**
     * Any status codes that falls outside
     *  the range of [2xx] cause this function to trigger
     */
    return Promise.reject(error);
  }
);

// #Step2-getLocalToken
const JWT = localStorage.getItem('5xJWT');
if (JWT) {
  console.log('APIs-JWT::', JWT);
  authReq.defaults.headers.common.Authorization = JWT;
}

// #Step3-export
/**
 * @param { {email: String, password: String, nickname: String} } user
 */
export const apiUserRegister = ({ user }) => {
  console.log('apiUserRegister:: ', { user });
  return axios.post(`${BASE_URL}/users`, { user });
};

export const apiUserIn = ({ user }) => {
  return authReq.post(`${BASE_URL}/users/sign_in`, { user });
};

export const apiUserBye = () => {
  return authReq.delete(`${BASE_URL}/users/sign_out`);
};

export const apiAuthCheck = () => {
  return authReq.get(`${BASE_URL}/check`);
};

export const apiTodosGet = () => {
  return authReq.get();
};
export const apiTodosPost = ({ todo }) => {
  return authReq.post('', { todo });
};
// end of todos-GET-POST

export const apiTodosToggle = ({ id }) => {
  return authReq.patch(`/${id}/toggle`);
};

export const apiTodosDelete = ({ id }) => {
  return authReq.delete(`/${id}`);
};

export const apiTodosPut = ({ id, todo }) => {
  //
  /**
   * #NOTE:
   * { Object } is good for sending many params
   * cos it could skip orders
   */
  // id { String }
  // todo { Object }
  return authReq.put(`/${id}`, { todo });
};
// end of todosID-DELETE-PUT-PATCH

// export { authReq };
