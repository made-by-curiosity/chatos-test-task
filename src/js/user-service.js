import { saveUsers, getUsers, getCurrentId } from './storage.js';
import { refs } from './refs.js';
import { resetForm, populateInputs } from './form-service.js';

export function updateUserInfo(updatedUser, userIdToEdit) {
  const currentUsers = getUsers();
  const { name, email, age } = updatedUser;

  currentUsers.forEach(user => {
    if (user.id === userIdToEdit) {
      const indexToEdit = currentUsers.indexOf(user);

      currentUsers.splice(indexToEdit, 1, updatedUser);

      saveUsers(getCurrentId(), currentUsers);

      const userRowToUpdate = document.querySelector('tr[data-status="in-edit"]');

      userRowToUpdate.children[0].innerText = userIdToEdit;
      userRowToUpdate.children[1].innerText = name;
      userRowToUpdate.children[2].innerText = email;
      userRowToUpdate.children[3].innerText = age;
      userRowToUpdate.removeAttribute('data-status');

      return;
    }
  });
}

export function createUser(id) {
  const name = refs.nameInput.value;
  const email = refs.emailInput.value;
  const age = refs.ageInput.value;

  return {
    id,
    name,
    email,
    age,
  };
}

export function editUser(user) {
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

export function deleteUser(userToDelete) {
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
