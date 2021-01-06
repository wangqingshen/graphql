import * as types from './types';
export default {
  namespaced: true,
  state: {
    [types.NEWS_LIST]: []
  },
  mutations: {
    [types.NEWS_LIST]: (state, res) => {
      state[types.NEWS_LIST] = res;
    }
  },
  actions: {
    [types.NEWS_LIST]: ({
      commit
    }, params) => {
      const res = params || [];
      return commit(types.NEWS_LIST, res);
    }
  },
  getters: {
    getNewsResponse(state) {
      return state[types.NEWS_LIST];
    }
  }

};