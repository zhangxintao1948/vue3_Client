import store from '../store'
import router from '../router'
import axios from 'axios'
const qs = require('qs')



//请求拦截的时间
axios.defaults.timeout = 20000  //一般大于10s

//添加请求拦截器
axios.interceptors.request.use(function (config) {
  const {method,data} = config
  if(method.toUpperCase ==='POST'&& data && typeof data ==='object'){
     config.data = qs.stringify(data)
  }
  //判断是否有token
  const token = localStorage.getItem('token_key')
  if(token){
    config.headers.Authorization = token;  //将token设置成请求头
  }
  return config;
}, function (error) {
  //return Promise.reject(error);
  if(response.data.status===401){//未授权,token过期
    //退出登录
    store.dispatch('logOut')
    //到登录界面
    router.replace('/login')
    alert(response.data.message)
  }else if(response.data.status===404){
    alert('请求资源不存在')
  }else{
    alert('请求错误'+error.message)
  }
  return new Promise(()=>{})//不进入
});

//添加响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data;
});

export default axios
