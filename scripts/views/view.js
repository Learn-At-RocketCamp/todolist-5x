console.log('This is [view.js].');

// #HACK:
export const filterTodos = (todosData, tab = null) => {
  return todosData.filter((item) => {
    console.log(tab);
    if (tab === null) {
      return !item.completed_at;
    }
    return item.completed_at;
  });
};
/* end of filterTodos(todosData, tab) */

const calcTodos = (todosData) => {
  return todosData.filter((item) => {
    return !item.completed_at;
  }).length;
};
/* end of calcTodos(todosData) */

export const templateCount = (todosData) => {
  return `
    <p>
      ${calcTodos(todosData)} 個待完成項目
    </p>
  `;
};
/* end of templateCount(todosData) */

const doneChecker = (completed) => {
  return completed ? 'checked' : '';
};
/* end of doneChecker(completed) */

const templateTodos = (todosData) => {
  // console.log('templateTodos::', todosData);
  return `
  <li class=""  data-id="${todosData.id}">
    <div class="todo-item">
      <input type="checkbox" class="toggle"
        ${doneChecker(todosData.completed_at)}  
        name="" id="${todosData.id}"
      >
      <label class="todo-txt">
        ${todosData.content}
      </label>

    </div>
    <a href="#" class="btn-remove">X</a>
  </li>
  `;
};
/* end of templateTodos(todosData) */

export const displayTodos = (todosData, htmlContent = '') => {
  // console.log('displayTodos:', todosData);

  htmlContent += todosData.map(templateTodos).join('');
  // console.log(htmlContent);
  // ul.innerHTML = htmlContent;
  document.querySelector('.card-ul').innerHTML = htmlContent;
};
/* end of displayTodos(todosData) */
