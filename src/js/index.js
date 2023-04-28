import { saveUsers, getUsers, getCurrentId } from './storage.js';
import { sortAscNumbers, sortDescNumbers, sortAscString, sortDescString } from './table-sort.js';
import { refs } from './refs.js';
import { renderUser, populateTable } from './render-table.js';
import { resetForm } from './form-service.js';
import { updateUserInfo, createUser, editUser, deleteUser } from './user-service.js';

populateTable(getUsers());

refs.addBtn.addEventListener('click', onAddBtnClick);
refs.saveBtn.addEventListener('click', onSaveBtnClick);
refs.tableBody.addEventListener('click', onUserButtonsClick);
refs.tableHead.addEventListener('click', onSortButtonsClick);

function onAddBtnClick() {
  if (
    refs.nameInput.value.trim() === '' ||
    refs.emailInput.value.trim() === '' ||
    refs.ageInput.value.trim() === ''
  ) {
    refs.emptyMessage.classList.remove('is-hidden');
    setTimeout(() => {
      refs.emptyMessage.classList.add('is-hidden');
    }, 3000);
    return;
  }

  let currentUserId = getCurrentId();
  const users = getUsers();
  const newUser = createUser(currentUserId);

  users.push(newUser);

  currentUserId += 1;

  saveUsers(currentUserId, users);
  renderUser(newUser);

  resetForm();
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

function onSaveBtnClick(e) {
  const userIdToEdit = Number(e.target.dataset.id);
  const updatedUser = createUser(userIdToEdit);

  updateUserInfo(updatedUser, userIdToEdit);

  refs.saveBtn.removeAttribute('data-id');
  resetForm();
}

function onSortButtonsClick(e) {
  const rows = [...refs.tableBody.rows];
  const columnNames = refs.tableHead.children[0].children;

  [...columnNames].forEach(cell => {
    if (cell.children[0].classList.contains('sorted')) {
      cell.children[0].classList.remove('sorted');
    }
  });

  e.target.classList.add('sorted');

  if (e.target.dataset.sort === 'desc') {
    e.target.setAttribute('data-sort', 'asc');
  } else {
    e.target.setAttribute('data-sort', 'desc');
  }

  if (e.target.dataset.type === 'id') {
    if (e.target.dataset.sort === 'asc') {
      const idAscSort = sortAscNumbers(rows, 0);
      refs.tableBody.append(...idAscSort);

      return;
    }

    const idDescSort = sortDescNumbers(rows, 0);
    refs.tableBody.append(...idDescSort);
  }

  if (e.target.dataset.type === 'name') {
    if (e.target.dataset.sort === 'asc') {
      const nameAscSort = sortAscString(rows, 1);
      refs.tableBody.append(...nameAscSort);
      return;
    }

    const nameDescSort = sortDescString(rows, 1);
    refs.tableBody.append(...nameDescSort);
  }

  if (e.target.dataset.type === 'email') {
    if (e.target.dataset.sort === 'asc') {
      const emailAscSort = sortAscString(rows, 2);
      refs.tableBody.append(...emailAscSort);
      return;
    }

    const emailDescSort = sortDescString(rows, 2);
    refs.tableBody.append(...emailDescSort);
  }

  if (e.target.dataset.type === 'age') {
    if (e.target.dataset.sort === 'asc') {
      const ageAscSort = sortAscNumbers(rows, 3);
      refs.tableBody.append(...ageAscSort);
      return;
    }

    const ageDescSort = sortDescNumbers(rows, 3);
    refs.tableBody.append(...ageDescSort);
  }
}
