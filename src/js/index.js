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

function onSortButtonsClick(e) {
  const rows = [...refs.tableBody.rows];

  if (e.target.dataset.sort === 'asc') {
    e.target.dataset.sort = 'desc';
    return;
  }
  e.target.setAttribute('data-sort', 'asc');

  if (e.target.dataset.type === 'id') {
    const idAscSort = sortAscNumbers(rows, 0);
    const idDescSort = sortDescNumbers(rows, 0);
    console.log(idAscSort);
    console.log(idDescSort);
  }

  if (e.target.dataset.type === 'name') {
    const nameAscSort = sortAscString(rows, 1);
    const nameDescSort = sortDescString(rows, 1);
    console.log(nameAscSort);
    console.log(nameDescSort);
  }

  if (e.target.dataset.type === 'email') {
    const emailAscSort = sortAscString(rows, 2);
    const emailDescSort = sortDescString(rows, 2);
    console.log(emailAscSort);
    console.log(emailDescSort);
  }

  if (e.target.dataset.type === 'age') {
    const ageAscSort = sortAscNumbers(rows, 3);
    const ageDescSort = sortDescNumbers(rows, 3);
    console.log(ageAscSort);
    console.log(ageDescSort);
  }
}

function onAddBtnClick() {
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
