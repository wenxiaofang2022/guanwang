<template>
  <!-- <div class="body-container" :class="activeBack?'active':''"> -->
  <div class="body-container">
    <HeadNav/>
    <nuxt/>
    <!-- <CommonLoad :loadRate="loadRate"/> -->
  </div>
</template>
<script>
export default {
  layout: "blog",
  data(){
    return{
      back_ground:"url("+this.$store.state.sourcRoot+"/image/bg.png)",
    }
  },
  components: {
    HeadNav:()=>import('@/components/HeadNav'),
    //CommonLoad:()=>import('@/components/CommonLoad'),
  },
  computed:{
    // activeBack(){
    //   return this.$store.state.activeBack;
    // },
    loadRate(){
      return this.$store.state.loadRate;
    }
  },
  mounted(){
    
  },
  methods:{
    // setRate(rate){
    //   console.log("rate1111",rate);
    //   this.loadRate = rate;
    // }
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
    background-color:rgba(126,126,126,1);
    animation: 2s ease 1s 1 normal both running BgFadeIn;
  }
}
</style>
