import {request} from './client';

const model = 'Steps';
const steps = {
  get: (filter) => request('get',`/${model}`, null, {filter}),
  getById: (id, filter) => request('get',`/${model}/${id}`, null, {filter}),
  create: (step) => request('post',`/${model}`, step),
  update: (id, step) => request('patch',`/${model}/${id}`, step),
  complete: (id) => request('put',`/${model}/${id}/complete`),
  delete: (id) => request('delete',`/${model}/${id}`),
};

export default steps;
