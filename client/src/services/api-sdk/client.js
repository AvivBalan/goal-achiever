const axios = require('axios');
const client = axios.create();
client.defaults.baseURL = 'http://localhost:3000/api';

export function getBaseUrl() {
  return client.defaults.baseURL;
}

export function setAuthToken(authToken) {
  client.defaults.headers.common['Authorization'] = authToken;
}

export function clearAuthData() {
  client.defaults.headers.common['Authorization'] = undefined;
  client.defaults.params = {};
}

export function request(method = 'get', url, data, params = {}, options) {
  Object.assign(params, client.defaults.params);

  const mergedOptions = Object.assign({method, url, data, params}, options);
  const requestPromise = client(mergedOptions);
  requestPromise.catch(err => {
    const error = err.response && err.response.data.error;
    if (error && error.message === 'Invalid Access Token') {
      window.location.reload();
    } else {
      return err;
    }
  });
  return requestPromise.then(res => {
    return res.data;
  });
}