import { refs } from './refs.js';
import { getUsers } from './storage.js';

export function resetForm() {
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

export function populateInputs(userId) {
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
