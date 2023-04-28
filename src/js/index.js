import storage from './storage.js';

const refs = {
  userForm: document.querySelector('form.user-form'),
  tableBody: document.querySelector('table.users-table tbody'),
  // nameInput: document.querySelector('input.user-name'),
  // emailInput: document.querySelector('input.user-email'),
  // ageInput: document.querySelector('input.user-age'),
  // addBtn: document.querySelector('button.add-btn'),
};
const STORAGE_KEY = 'saved-users';
const savedUsersState = storage.load(STORAGE_KEY) || {};
console.log(savedUsersState);

let users = storage.load(STORAGE_KEY)?.users || [];
console.log(users);
let userId = storage.load(STORAGE_KEY)?.currentId || 1;
console.log(userId);

populateTableOnLoad(users);

refs.userForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const userName = e.target.elements.name.value;
  const userEmail = e.target.elements.email.value;
  const userAge = e.target.elements.age.value;

  const newUser = {
    id: userId,
    name: userName,
    email: userEmail,
    age: userAge,
  };

  users.push(newUser);

  userId += 1;
  const usersInfoToSave = {
    currentId: userId,
    users,
  };

  storage.save(STORAGE_KEY, usersInfoToSave);
  renderUser(newUser);

  e.target.reset();
}

function renderUser({ id, name, email, age }) {
  const markup = `<tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${age}</td>
            <td>edit/delete</td>
          </tr>`;

  refs.tableBody.insertAdjacentHTML('beforeend', markup);
}

function populateTableOnLoad(users) {
  if (users === []) {
    return;
  }

  users.forEach(renderUser);
}
