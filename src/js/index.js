import storage from './storage.js';

const refs = {
  userForm: document.querySelector('form.user-form'),
  // nameInput: document.querySelector('input.user-name'),
  // emailInput: document.querySelector('input.user-email'),
  // ageInput: document.querySelector('input.user-age'),
  // addBtn: document.querySelector('button.add-btn'),
};
const STORAGE_KEY = 'users';
const users = storage.load(STORAGE_KEY);
console.log(users);

let userId = 1;

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
  const newUsers = { ...users, newUser };

  storage.save(STORAGE_KEY, newUsers);

  e.target.reset();
  userId += 1;
}

function populateOnLoad() {}
