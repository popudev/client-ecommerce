export function add(type, payload) {
  return {
    type: 'add_' + type,
    payload,
  };
}

export function del(type, payload) {
  return {
    type: 'delete_' + type,
    payload,
  };
}
