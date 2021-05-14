/*
 * @Description: 
 * @Date: 2019-08-14 14:12:24
 * @LastEditTime: 2019-09-12 18:16:55
 */
import Vue from 'vue'
import App from './App'
import fly from './utils/fly'
Vue.prototype.$http = fly;
const apiHost = 'http://114.215.196.117:9290';
// const apiHost = 'http://www.hwhsh.cn';
Vue.prototype.$apiHost = apiHost;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount()
Vue.prototype.globalData = getApp().globalData
