import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import vuetify from './plugins/vuetify'

Vue.use(VueSweetalert2);
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
