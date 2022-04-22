import '../controllers/registerController.js';
import '../controllers/loginController.js';
import '../controllers/pagesController.js';
import '../controllers/todoCreateController.js';
// import { getTodos } from '../controllers/todoReadController.js';
import { checkLocalStorage } from '../controllers/authController.js';

// const emailChecker = (email) => {
//   return email && email.includes('@');
// };

// Main
// checkToken();
checkLocalStorage();
// localStorage.clear();
