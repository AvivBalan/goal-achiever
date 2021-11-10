import {request} from './client';

const model = 'Users';
const users = {
  login: function (email, password, captchaValue) {
    return request('post', `/${model}/login`, {email, password, captchaValue}, { include: 'User' });
  },
  logout: function () {
    return request('post', `/${model}/logout`);
  }
};

export default users;
