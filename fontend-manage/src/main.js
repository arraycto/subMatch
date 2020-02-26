// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'; // global css
import App from './App'
import router from './router'
import store from './store';
import particlesJS from 'particles.js';
import locale from 'element-ui/lib/locale/lang/zh-CN';
import i18n from './i18n';

Vue.use(ElementUI,{locale});
Vue.use(particlesJS);

Vue.prototype.$routeTo = function(path, params) {
  if (undefined === params || params == null) {
    this.$router.push({ path: path })
  } else this.$router.push({ path: path, query: params })
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  render: h => h(App)
})
