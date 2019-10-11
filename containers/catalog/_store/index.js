import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  devices: [],
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
