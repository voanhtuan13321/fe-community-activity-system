export const localStorages = {
  getToken: () => localStorage.getItem('token'),
  setToken: token => localStorage.setItem('token', token),
  removeToken: () => localStorage.removeItem('token'),
}
