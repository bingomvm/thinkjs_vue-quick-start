import Vue from 'vue';
import './styles/global.scss';
import Home from './home.vue';
import store from '@store';
import router from '@router';
import filters from '@utils/filters';

Vue.config.productionTip = false;
Object.keys(filters).map(key => Vue.filter(key, filters[key]));

// element ui
import EleButton from '@elecomp/button';
import EleMessageBox from '@elecomp/message-box';
import EleMessage from '@elecomp/message';


Vue.use(EleButton);

Vue.mixin({
  methods: {
    resetInitialProp: function() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
  },
});

Vue.prototype.$msgbox = EleMessageBox;
Vue.prototype.$msg = EleMessage;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Home },
  store,
  router,
  template: '<Home />',
});
