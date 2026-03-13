const apiBase = window.location.origin;

function createUserListItem(user) {
  const item = document.createElement('li');
  item.className = 'user-list__item';

  const meta = document.createElement('div');
  meta.className = 'user-list__meta';

  const name = document.createElement('span');
  name.className = 'user-list__name';
  name.textContent = user.name;

  const email = document.createElement('span');
  email.className = 'user-list__email';
  email.textContent = user.email;

  meta.append(name, email);

  const createdAt = document.createElement('span');
  createdAt.className = 'user-list__created-at';
  createdAt.textContent = `Created: ${new Date(user.created_at).toLocaleString()}`;

  item.append(meta, createdAt);
  return item;
}

async function fetchUsers() {
  const response = await fetch(`${apiBase}/api/users`);
  if (!response.ok) {
    throw new Error('Failed to load users');
  }

  const users = await response.json();
  return users;
}

async function createUser(payload) {
  const response = await fetch(`${apiBase}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  const user = await response.json();
  return user;
}

async function loadUsers() {
  try {
    const users = await fetchUsers();
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    for (const user of users) {
      const item = createUserListItem(user);
      userList.appendChild(item);
    }
  } catch (error) {
    console.error('Failed to load users', error);
    alert('Failed to load users. Check the console for details.');
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const payload = Object.fromEntries(formData);

  try {
    await createUser(payload);
    event.target.reset();
    await loadUsers();
  } catch (error) {
    console.error('Failed to create user', error);
    alert('Failed to create user. Check the console for details.');
  }
}

document.getElementById('userForm').addEventListener('submit', handleFormSubmit);

// Load users on page load
loadUsers();