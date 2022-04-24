import { updateTodo } from '../helpers/storeHelper.js';
import { showOutput } from '../views/devView.js';

const editItemExit = ({ li, label, itemEditor, input }) => {
  label.style.display = 'inline-block';
  // alert('editItemExit');
  console.log('label:::', label);
  console.log('itemEditor:::', itemEditor);
  console.log('new value:::', itemEditor.value);

  const newTxt = itemEditor.value.trim();
  li.classList.remove('editing');
  li.removeChild(input);
  document.querySelector('.todo-txt').innerHTML = newTxt;

  const id = label.closest('li').dataset.id;
  console.log(id);
  const todo = {
    content: newTxt,
  };

  updateTodo({ id, todo }).then((result) => {
    console.log('finally-result:', result);

    // 404
    if (result.status === 401) {
      // goHome()
      console.log('goHome');
    }

    showOutput(result);
  });
};

/**
 * #NOTE:
 * li => appendChild => new input => focus
 */
const editItem = (label) => {
  // target === label
  console.log('label === ', label);
  // li === label itself's li
  const li = label.parentElement.parentElement;
  console.log('li:: ', li);
  li.classList.add('editing');

  const input = document.createElement('input');
  input.className = 'edit';
  input.value = label.innerText.trim();

  li.appendChild(input);
  input.focus();
  label.style.display = 'none';
  /* end of label-display */

  const ENTER_KEY = 13;
  const itemEditor = document.querySelector('li .edit');

  if (itemEditor) {
    console.log('if-itemEditor:: ');

    // #XXX:
    // itemEditor.addEventListener('keydown', ({ target, code }) => {
    itemEditor.addEventListener('keydown', ({ target, keyCode }) => {
      // if (code === 'Enter') {
      if (keyCode === ENTER_KEY) {
        target.blur();
        // alert('keydown');
      }
    });

    itemEditor.addEventListener(
      'blur',
      ({ target }) => {
        // alert('blur to save');
        console.log('blur-target === itemEditor === input:::', target);
        // editItemExit(target);
        editItemExit({ li, label, itemEditor, input });

        // #HACK: if(cancel) return
      },
      true
    );
  }
  /** end of if(itemEditor) */
};
/** end of editItem(target) */

export const editMode = (label) => {
  // const itemLabel = document.querySelector('li label');
  const itemLabel = label;
  itemLabel.addEventListener('dblclick', ({ target }) => {
    // alert('dblclick');
    console.log(target);
    editItem(itemLabel);
  });
};
