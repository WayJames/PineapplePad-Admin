import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import './assets/scss/app.scss'
import Amplify from 'aws-amplify'
import awsconfig from '@/config.js'
import AWS from 'aws-sdk'

// window.LOG_LEVEL = 'DEBUG'

AWS.config.region = 'us-east-1'
Amplify.configure(awsconfig)
store.dispatch('updateUser')

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
