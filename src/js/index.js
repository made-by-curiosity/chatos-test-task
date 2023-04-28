import storage from './storage.js';

const refs = {
  tableHead: document.querySelector('table.users-table thead'),
  tableBody: document.querySelector('table.users-table tbody'),
  nameInput: document.querySelector('input.user-name'),
  emailInput: document.querySelector('input.user-email'),
  ageInput: document.querySelector('input.user-age'),
  addBtn: document.querySelector('button.add-btn'),
  saveBtn: document.querySelector('button.save-btn'),
};
const STORAGE_KEY = 'saved-users';
const savedUsersState = storage.load(STORAGE_KEY) || {};
console.log(savedUsersState);

populateTable(getUsers());

refs.addBtn.addEventListener('click', onAddBtnClick);
refs.tableBody.addEventListener('click', onUserButtonsClick);
refs.saveBtn.addEventListener('click', onSaveBtnClick);

function onAddBtnClick() {
  let currentUserId = getCurrentId();
  const users = getUsers();
  const userName = refs.nameInput.value;
  const userEmail = refs.emailInput.value;
  const userAge = refs.ageInput.value;

  const newUser = {
    id: currentUserId,
    name: userName,
    email: userEmail,
    age: userAge,
  };

  users.push(newUser);

  currentUserId += 1;

  saveUsers(currentUserId, users);
  renderUser(newUser);

  resetForm();
}

function renderUser({ id, name, email, age }) {
  const markup = `<tr data-id="${id}">
            <td>${id}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${age}</td>
            <td><button type="button" data-action="edit">edit</button>/<button type="button" data-action="delete">delete</button></td>
          </tr>`;

  refs.tableBody.insertAdjacentHTML('beforeend', markup);
}

function populateTable(users) {
  if (users === []) {
    return;
  }

  users.forEach(renderUser);
}

function onUserButtonsClick(e) {
  const userToInteract = e.target.parentElement.parentElement;
  if (e.target.dataset.action === 'delete') {
    deleteUser(userToInteract);
  }

  if (e.target.dataset.action === 'edit') {
    userToInteract.setAttribute('data-status', 'in-edit');
    editUser(userToInteract);
  }
}

function deleteUser(userToDelete) {
  const userIdToDelete = Number(userToDelete.dataset.id);
  const currentUsers = getUsers();

  currentUsers.forEach(user => {
    if (user.id === userIdToDelete) {
      const indexToDelete = currentUsers.indexOf(user);

      currentUsers.splice(indexToDelete, 1);

      saveUsers(getCurrentId(), currentUsers);

      userToDelete.remove();

      return;
    }
  });

  if (
    refs.addBtn.classList.contains('is-hidden') &&
    !refs.saveBtn.classList.contains('is-hidden')
  ) {
    refs.addBtn.classList.toggle('is-hidden');
    refs.saveBtn.classList.toggle('is-hidden');

    resetForm();
  }
}

function resetForm() {
  if (
    refs.addBtn.classList.contains('is-hidden') &&
    !refs.saveBtn.classList.contains('is-hidden')
  ) {
    refs.addBtn.classList.toggle('is-hidden');
    refs.saveBtn.classList.toggle('is-hidden');
  }
  refs.nameInput.value = '';
  refs.emailInput.value = '';
  refs.ageInput.value = '';
}

function editUser(user) {
  const userIdToEdit = Number(user.dataset.id);
  populateInputs(userIdToEdit);
  refs.saveBtn.setAttribute('data-id', userIdToEdit);

  if (
    !refs.addBtn.classList.contains('is-hidden') &&
    refs.saveBtn.classList.contains('is-hidden')
  ) {
    refs.addBtn.classList.toggle('is-hidden');
    refs.saveBtn.classList.toggle('is-hidden');
  }
}

function onSaveBtnClick(e) {
  const userIdToEdit = Number(e.target.dataset.id);
  const currentUsers = getUsers();
  const userName = refs.nameInput.value;
  const userEmail = refs.emailInput.value;
  const userAge = refs.ageInput.value;

  const updatedUser = {
    id: userIdToEdit,
    name: userName,
    email: userEmail,
    age: userAge,
  };

  currentUsers.forEach(user => {
    if (user.id === userIdToEdit) {
      const indexToEdit = currentUsers.indexOf(user);

      currentUsers.splice(indexToEdit, 1, updatedUser);

      saveUsers(getCurrentId(), currentUsers);

      const userRowToUpdate = document.querySelector('tr[data-status="in-edit"]');

      userRowToUpdate.children[0].innerText = userIdToEdit;
      userRowToUpdate.children[1].innerText = userName;
      userRowToUpdate.children[2].innerText = userEmail;
      userRowToUpdate.children[3].innerText = userAge;
      userRowToUpdate.removeAttribute('data-status');

      return;
    }
  });

  refs.saveBtn.removeAttribute('data-id');
  resetForm();
}

function populateInputs(userId) {
  const currentUsers = getUsers();
  currentUsers.forEach(user => {
    if (user.id === userId) {
      refs.nameInput.value = user.name;
      refs.emailInput.value = user.email;
      refs.ageInput.value = user.age;
      return;
    }
  });
}

function saveUsers(id, users) {
  const updatedUsersInfo = {
    currentId: id,
    users,
  };

  storage.save(STORAGE_KEY, updatedUsersInfo);
}

function getUsers() {
  return storage.load(STORAGE_KEY)?.users || [];
}

function getCurrentId() {
  const users = getUsers();
  if (users.length === 0) {
    return 1;
  }
  return storage.load(STORAGE_KEY)?.currentId || 1;
}
