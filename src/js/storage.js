const STORAGE_KEY = 'saved-users';

export const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

export const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export function saveUsers(id, users) {
  const updatedUsersInfo = {
    currentId: id,
    users,
  };

  save(STORAGE_KEY, updatedUsersInfo);
}

export function getUsers() {
  return load(STORAGE_KEY)?.users || [];
}

export function getCurrentId() {
  const users = getUsers();
  if (users.length === 0) {
    return 1;
  }
  return load(STORAGE_KEY)?.currentId || 1;
}
