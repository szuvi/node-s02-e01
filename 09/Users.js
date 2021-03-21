const { v4: uuidv4 } = require('uuid');

let users = [];

function add(name, username, email) {
  const id = uuidv4();
  users.push({ id, name, username, email });
  return id;
}

function get(id) {
  return users.find((user) => user.id === id);
}

function getAll() {
  return users;
}

function del(id) {
  const newUsers = users.filter((user) => user.id !== id);
  if (newUsers.length === users.length) {
    return false;
  }
  users = newUsers;
  return true;
}

module.exports = { add, get, del, getAll };
