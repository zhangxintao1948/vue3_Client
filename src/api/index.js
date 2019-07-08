import ajax from './ajax'

const BASE = '/api'

//根据经纬度获取位置详情
export const reqAddress = (latitude,longitude) =>ajax(BASE+`/position/${latitude},${longitude}`)

//获取食品分类列表
export const reqCategorys = () => ajax(BASE + '/index_category')

//根据经纬度获取商铺列表
export const reqShops = ({latitude,longitude})=>ajax({
  url:BASE+"/shops",
  params: {
    latitude,
    longitude
  }
})
//获取短信验证码
export const reqCode = (phone)=>ajax({
  url:BASE+"/sendcode",
  params: {
    phone
  }
})

//密码登录
export const reqPwdLogin =({name,pwd,captcha})=>ajax({
  method:'POST',
  url:BASE+"/login_pwd",
  data: { name,pwd,captcha }
})

//手机验证码登录
export const reqSmsLogin =(phone,code)=>ajax({
  method:'POST',
  url:BASE+"/login_sms",
  data: {
    phone,
    code
  }
})