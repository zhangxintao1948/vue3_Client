import {reqAddress,reqCategorys,reqShops} from '../api'
import {REQ_ADDRESS,REQ_CATEGORYS,REQ_SHOPS,REQ_USER,REQ_LOGOUT}  from './mutations-types'
import { Cookies } from "js-cookie";
export default{
  async getAddress({commit,state}){
    const {latitude,longitude} = state
    const result =await reqAddress(latitude,longitude)
    if(result.code===0){
       commit(REQ_ADDRESS,result.data)
    }
  },
  async getCategorys({commit}){
    const result =await reqCategorys()
    if(result.code===0){
       commit(REQ_CATEGORYS,result.data)
    }
  },
  async getShops({commit,state}){
    const {latitude,longitude} = state
    const result =await reqShops({latitude,longitude})
    if(result.code===0){
       commit(REQ_SHOPS,result.data)
    }
  },

  loginIn({commit},user){
    //将用户保存到localstorage中
    localStorage.setItem('token_key',user.token)
    //保存在状态中
    commit(REQ_USER,user)
  },

  logOut({commit}){
     //将localstorage中的token干掉
     localStorage.removeItem('token_key')
     //将cookie中的user_id清除
     Cookies.remove('user_id')
     //将状态中的user删除
     commit(REQ_LOGOUT)
  }

}
