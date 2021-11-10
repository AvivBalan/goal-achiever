import {request, requestDownload} from './client';

const model = 'eye-of-the-enemy/SilverBullets';
const silverBullets = {
  get: (filter) => request('get',`/${model}`, null, {filter}),
  getById: (id, filter) => request('get',`/${model}/${id}`, null, {filter}),
  create: (bullet) => request('post',`/${model}`, bullet),
  update: (id, bullet) => request('patch',`/${model}/${id}`, bullet),
  delete: (id) => request('delete',`/${model}/${id}`),
  getDocument: (silverBulletId, docName) => request('get', `/${model}/${silverBulletId}/get-document/${docName}`),
  getChartLink: silverBulletId => requestDownload(`/${model}/${silverBulletId}/chart`),
  uploadFile: function (file, silverBulletId, fileType) {
    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append('file',file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    return request('post', `/${model}/${silverBulletId}/document?docType=${fileType}`, formData, config);
  },
  relateAptTag: (silverBulletId, tagId) => request('put',`/${model}/${silverBulletId}/aptTags/rel/${tagId}`),
  relateNewAptTag: (silverBulletId, aptName) => request('post',`/${model}/${silverBulletId}/aptTags`, { aptName }),
  deleteAptTagRelation: (silverBulletId, tagId) => request('delete',`/${model}/${silverBulletId}/aptTags/rel/${tagId}`),
  getPayloads: (silverBulletId, filter) => request('get',`/${model}/${silverBulletId}/payloads`, null, {filter}),
  postPayload: (silverBulletId, payload) => request('post', `/${model}/${silverBulletId}/payloads`, payload),
  downloadPayload: (silverBulletId, payloadId, fileName) => requestDownload(`/${model}/${silverBulletId}/payloads/${payloadId}/download`,fileName),
  sendPayload: (silverBulletId, payloadId) => request('get',`/${model}/${silverBulletId}/payloads/${payloadId}/send`),
  getDefRules: (silverBulletId, filter) => request('get',`/${model}/${silverBulletId}/defenceRules`, null, {filter}),
  postDefRule: (silverBulletId, defRule) => request('post', `/${model}/${silverBulletId}/defenceRules`, defRule),
  downloadDefRule: (silverBulletId, defRuleId, fileName) => requestDownload(`/${model}/${silverBulletId}/defenceRules/${defRuleId}/download`, fileName),
  sendDefRule: (silverBulletId, defRuleId) => request('get',`/${model}/${silverBulletId}/defenceRules/${defRuleId}/send`),
  downloadReport: (format) => requestDownload(`/${model}/report?format=${format}`, `silver-bullets-report.${format}`),
  getDefRuleFile: (silverBulletId, defRuleId) => request('get', `/${model}/${silverBulletId}/defenceRules/${defRuleId}/download`, undefined, undefined, {responseType: 'arraybuffer'})
};

export default silverBullets;
