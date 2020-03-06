import Vue from 'vue';
import Vuex from 'vuex';
import userStore from './modules/user';
import internalStore from './modules/internal';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userStore,
    internal: internalStore,
  },
  strict: process.env.NODE_ENV !== 'production',
});
