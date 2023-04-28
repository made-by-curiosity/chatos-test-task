import { refs } from './refs.js';

export function renderUser({ id, name, email, age }) {
  const markup = `<tr data-id="${id}">
            <td>${id}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${age}</td>
            <td><button type="button" data-action="edit">edit</button>/<button type="button" data-action="delete">delete</button></td>
          </tr>`;

  refs.tableBody.insertAdjacentHTML('beforeend', markup);
}

export function populateTable(users) {
  if (users === []) {
    return;
  }

  users.forEach(renderUser);
}
