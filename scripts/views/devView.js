const templateTodos = (item) => {
  return `
    <p>${item.content}</p>
  `;
};

export const showTodoListItem = (todosData) => {
  document.querySelector('ul').innerHTML = todosData
    .map(templateTodos)
    .join('');
};

export const showOutput = (res) => {
  document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>

      <div class="card-body">
        <h6>Msg: ${res.data.message}</h6>
        <p>Error: ${res.data.error}</p>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
};
