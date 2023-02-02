const users = [];

// This is the function that will be called when a user joins a room
const addUser = ({id, name, room}) => {
  // Clean the data
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Store user
  const user = {id, name, room};
  users.push(user);
  return {user};
}

// This is the function that will be called when a user leaves a room
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// This is the function that will be called when a user sends a message
const getUser = (id) => users.find((user) => user.id === id);

// This is the function that will be called when a user sends a message
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {addUser, removeUser, getUser, getUsersInRoom};