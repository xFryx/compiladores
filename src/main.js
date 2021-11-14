import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import vuetify from './plugins/vuetify'
import i18n from './i18n'

Vue.use(VueSweetalert2);
Vue.config.productionTip = false

new Vue({
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
