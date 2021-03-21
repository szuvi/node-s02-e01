const router = require('./expressWannabe');
const Users = require('./Users');

function serveHome(req, res) {
  res.send(
    'Welcome, avaiable commands: /show - show all users /show?id="id" - show single user /add?user="name"&username="username"&email="email" - add user /delete?id="id" - delete user ',
    'text/plain',
    200,
  );
}

function serveUsers(req, res) {
  const {
    params: { id },
  } = req;
  if (id != null) {
    const user = Users.get(id);

    if (user) {
      res.send(JSON.stringify(user), 'application/json', 200);
    } else {
      res.send('Content not found');
    }
  } else {
    res.send(JSON.stringify(Users.getAll()), 'application/json', 200);
  }
}

function areValidUserData(params) {
  // should be more robust!
  return params.every((param) => param != null);
}

function addUser(req, res) {
  const { name, username, email } = req.params;
  if (areValidUserData([name, username, email])) {
    const id = Users.add(name, username, email);
    res.send(id, 'text/plain', 200);
  } else {
    res.send('Incorrect user data');
  }
}

function deleteUser(req, res) {
  const { id } = req.params;
  if (id) {
    const dbRes = Users.del(id);
    if (dbRes) {
      res.send('Success', 'text/plain', 200);
    } else {
      res.send('No such user!');
    }
  } else {
    res.send('User Id required');
  }
}

router.get('/', serveHome);
router.get('/show', serveUsers);
router.post('/add', addUser);
router.del('/delete', deleteUser);

router.listen(4700);
