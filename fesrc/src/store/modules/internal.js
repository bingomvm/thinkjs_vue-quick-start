const originStates = {
  comment: {
    prevPage: 1,
  },
};

const state = {
  ...originStates,
};

const getters = {
  internalState: state => state,
};

const actions = {
  // 权限添加
  internalUpdate: ({ commit }, payload) => {
    commit('internalStateUpdate', payload);
  },
};

const mutations = {
  internalStateUpdate: (state, payload) => {
    state[payload.module][payload.key] = payload.value;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
