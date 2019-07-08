import { REQ_ADDRESS,REQ_CATEGORYS,REQ_SHOPS,REQ_USER,REQ_LOGOUT }  from './mutations-types'
export default {
  [REQ_ADDRESS](state,address){
    state.address = address
  },
  [REQ_CATEGORYS](state,categorys){
    state.categorys = categorys
  },
  [REQ_SHOPS](state,shops){
    state.shops = shops
  },
  [REQ_USER](state,user){
    state.user = user
  },
  [REQ_LOGOUT](state){
    state.user ={}
  }
}
