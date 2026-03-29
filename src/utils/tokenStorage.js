const TOKEN_KEY = 'expense_tracker_token';
const USER_KEY  = 'expense_tracker_user';

export const tokenStorage = {

  saveToken: (token) =>
    localStorage.setItem(TOKEN_KEY, token),

  getToken: () =>
    localStorage.getItem(TOKEN_KEY),

  removeToken: () =>
    localStorage.removeItem(TOKEN_KEY),

  saveUser: (user) =>
    localStorage.setItem(USER_KEY, JSON.stringify(user)),

  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  removeUser: () =>
    localStorage.removeItem(USER_KEY),

  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};