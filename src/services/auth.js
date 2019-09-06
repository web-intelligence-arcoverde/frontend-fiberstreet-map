export const TOKEN_KEY = "@fiberstreet-token";

/**
 * O parâmetro isAuthenticated verificará o localStorage
 * se existe um token JWT retornado do servidor backend */
export const isAuthenticated = () => true; //true;
export const isAuthenticatedServer = () =>
  localStorage.getItem(TOKEN_KEY) !== null;

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => localStorage.removeItem(TOKEN_KEY);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
