import api from '../_api';

const getDevices = context => {
  api.fetchDevices
    .then(response => {
      context.commit('DEVICES_UPDATED', response);
    })
    .catch(error => {
      // eslint-disable-next-line
      console.error(error);
    });
};

export default {
  getDevices,
};
