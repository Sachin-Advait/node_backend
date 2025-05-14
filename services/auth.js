const sessionIdToUserMap = new Map();

export function setUsers(id, user) {
  return sessionIdToUserMap.set(id, user);
}

export function getUser(id) {
  return sessionIdToUserMap.get(id);
}
