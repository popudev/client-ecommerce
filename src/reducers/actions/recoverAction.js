export const updateAccount = (payload) => {
  return {
    type: 'update_account',
    payload,
  };
};

export const updateCodeVia = (payload) => {
  return {
    type: 'update_code_via',
    payload,
  };
};
