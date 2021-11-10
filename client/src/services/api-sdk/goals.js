import {request} from './client';

const model = 'Goals';
const goals = {
  get: (filter) => request('get',`/${model}`, null, {filter}),
  getById: (id, filter) => request('get',`/${model}/${id}`, null, {filter}),
  create: (goal) => request('post',`/${model}`, goal),
  update: (id, goal) => request('patch',`/${model}/${id}`, goal),
  complete: (id) => request('put',`/${model}/${id}/complete`),
  delete: (id) => request('delete',`/${model}/${id}`),
  createStep: (id, step) => request('post', `/${model}/${id}/steps`, step),
  getNextSteps: () => request('get', `/${model}/next-steps`)
};

export default goals;
