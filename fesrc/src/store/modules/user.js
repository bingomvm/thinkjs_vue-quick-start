const originStates = {
  _infoStatus: {
    loaded: false,
  },
  user: {
    name: '',
    qid: '',
    img: '',
    blacklisted: false,
    cleared: false,
    status: '',
    level: 0,
    conflic: false,
    ugc: '',
  },
  granted: [],
};

const state = {
  ...originStates,
};

const getters = {
  userIsLogin: state => !!state.qid,
  userInfo: state => state.user,
  authInfo: state => state.granted,
};

const actions = {
  // 权限添加
  userAddPermissions: ({ commit }, payload) => {
    commit('userMergePermission', payload);
  },
  userUpdateInfo: ({ commit }, payload) => {
    commit('userUpdateInfo', payload);
  },
  // 登出
  userLogout: ({ commit }) => {
    commit('userLogout');
  },
};

const mutations = {
  userMergePermission: (state, payload) => {
    if (!payload) return;
    if (typeof payload === 'string') {
      if (state.granted.includes(payload)) return;
      state.granted = state.granted.concat(payload);
    } else {
      state.granted = state.granted.concat(
        payload.filter(perm => !state.granted.includes(perm))
      );
    }
  },
  userUpdateInfo: (state, payload) => {
    state.user = { ...state.user, ...payload };
  },
  userLogout: state => (state = { ...originStates }),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
