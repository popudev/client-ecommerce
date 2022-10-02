export const getAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken ? JSON.parse(accessToken) : '';
};

export const setAccessToken = (accessToken) => {
  if (accessToken) localStorage.setItem('accessToken', JSON.stringify(accessToken));
  else localStorage.removeItem('accessToken');
};

export const getRememberUsername = () => {
  return JSON.parse(localStorage.getItem('remember')) || false;
};

export const setRememberUsername = (remember) => {
  localStorage.setItem('remember', JSON.stringify(remember));
};
