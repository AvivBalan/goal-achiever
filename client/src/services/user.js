import sdk from './api-sdk';
const authDataPropertyName = 'GoalAchieverUser';

let currentUserAuthData = getStoredAuthData();
if (currentUserAuthData) {
  sdk.setAuthToken(currentUserAuthData.id);
}

function getStoredAuthData() {
  const authData = localStorage.getItem(authDataPropertyName);
  return authData && JSON.parse(authData);
}

function getUserData() {
  return currentUserAuthData && currentUserAuthData.user;
}

function isLoggedIn() {
  return !!currentUserAuthData;
}

function hasToken() {
  return !!currentUserAuthData;
}

function login(email, password){
  return sdk.users.login(email, password).then(res => {
    currentUserAuthData = res;
    sdk.setAuthToken(res.id);
    localStorage.setItem(authDataPropertyName, JSON.stringify(res));
    return currentUserAuthData;
  });
}

function logout() {
  currentUserAuthData = null;
  localStorage.removeItem(authDataPropertyName);
  return sdk.users.logout().finally(()=>{
    sdk.clearAuthData();
  });
}


export default {
  getUserData,
  isLoggedIn,
  login,
  logout,
  hasToken
};