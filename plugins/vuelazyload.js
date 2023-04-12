import Vue from 'vue';
import VueLazyload from "vue-lazyload";
// Vue.use(VueLazyload);
//或者自定义配置插件
// const loadimage = require('./assets/loading.gif')
// const errorimage = require('./assets/logo.png')
const sourceUrl = window.location.hostname=='localhost'?"":"https://kasakii.oss-cn-shanghai.aliyuncs.com";
const errorImg = sourceUrl+'/image/error.png';
const loadImg = sourceUrl+'/image/loading.png';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error:errorImg,
  loading:loadImg,
  attempt: 1
})