<template>
  <section class="msite">
        <!--首页头部-->
    <Header :title="address.name">
      <a class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </a>
       <a class="header_login" slot="right">
        <span class="header_login_text" @click="$router.push('/login')">登录|注册</span>
      </a>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- 有一个categorysArr的数组获取到的商家列表，遍历 -->
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                 <img :src="imgBaseUrl+category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList/>
  </section>
</template>

<script type="text/ecmascript-6">

import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import ShopList from '../../components/ShopList/ShopList'

import {mapState} from 'vuex'
  export default {
    data(){
      return{
        imgBaseUrl:'https://fuss10.elemecdn.com'
      }
    },
    computed:{
       ...mapState(['address','categorys']),
       categorysArr(){
        const {categorys} = this
        let smallArr =[]
        const bigArr = []
        categorys.forEach(c => {
          if(smallArr.length===0){
             bigArr.push(smallArr)
          }
          smallArr.push(c)
          if(smallArr.length===8){
             smallArr = []
          }
        });
        return bigArr
      }
    },
    async mounted(){
      //分发地址，商品信息
      this.$store.dispatch('getAddress')
      await this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
      this.$nextTick(()=>{
          new Swiper ('.swiper-container', {
          loop: true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          }
        })
      })
    },
    components:{
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'

  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
