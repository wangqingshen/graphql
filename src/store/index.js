import vue from 'vue';
import vuex from 'vuex';
import home from './modules/home';
vue.use(vuex);
export default new vuex.Store({
  modules: {
    home
  },
  state: {

  },
  mutations: {

  },
  actions: {}
});