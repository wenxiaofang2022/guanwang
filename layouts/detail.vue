<template>
  <!-- <div class="body-container" :class="activeBack?'active':''"> -->
  <div class="body-container">
    <HeadNav/>
    <div class="container" ref="container">
      <BannerOilBox/>
      <nuxt/>
    </div>
    <CommonBottom @gotopbtn="goTop"/>
  </div>
</template>
<script>
export default {
  layout: "detail",
  data(){
    return{
      back_ground:"url("+this.$store.state.sourcRoot+"/image/bg.png)",
    }
  },
  components: {
    HeadNav:()=>import('@/components/HeadNav'),
    // CaseDetailTopTit:()=>import('@/components/CaseDetailTopTit'),
    BannerOilBox:()=>import('@/components/BannerOilBox'),
    CommonBottom:()=>import('@/components/CommonBottom'),
    // CaseDetailContent:()=>import('@/components/CaseDetailContent'),
    // CommonBottom:()=>import('@/components/CommonBottom'),
  },
  computed:{
    // activeBack(){
    //   return this.$store.state.activeBack;
    // }
  },
  mounted(){
    
  },
  methods:{
    goTop(){
      //进入到顶部
      let container = this.$refs.container;
      container.scrollTo({
          top: 0,
          behavior: "smooth"
      });
    }
  }
}
</script>
<style lang="scss" scoped>
 @-webkit-keyframes BgFadeIn{
    0%{background-color:rgba(126,126,126,0);}
    100%{background-color:rgba(126,126,126,1);}
  }
  @keyframes BgFadeIn{
    0%{background-color:rgba(126,126,126,0);}
    100%{background-color:rgba(126,126,126,1);}
  }
  @-webkit-keyframes BgFadeIn{
    0%{background-color:rgba(126,126,126,0);}
    100%{background-color:rgba(126,126,126,1);}
  }
  @keyframes BgFadeIn{
    0%{background-color:rgba(126,126,126,0);}
    100%{background-color:rgba(126,126,126,1);}
  }
.body-container{
  // width: 100vw;
  width:375px;
  margin:0 auto;
  height: 100vh;
  background: v-bind(back_ground);
  background-repeat:no-repeat;
  background-position: 0px 0px;
  background-size:100% auto;
  overflow-x:hidden;
  background-color: #fff;
  &.active{
    background-color:rgb(183, 158, 158);
    animation: 2s ease 1s 1 normal both running BgFadeIn;
  }
  // .container{
  //   position: relative;
  //   padding-top: 55px;
  //   padding-bottom: 96px;
  // }
  .container {
    // width: 100vw;
    width:375px;
    height: 100vh;
    padding-top: 55px;
    overflow-y: auto;
    overflow-x:hidden;
    padding-bottom: 96px;
    position: relative;
  }
}
</style>
