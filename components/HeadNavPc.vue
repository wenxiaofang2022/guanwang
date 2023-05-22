<template>
  <div class="common-head-nav-pc">
    <div class="logo-btn"></div>
  </div>
</template>
<script>
  export default {
    name:'HeadNavPc',
    data() {
      return{
        back_ground:"url("+this.$store.state.sourcRoot+"/image/indexpc/headbg.png)",
        back_ground1:"url("+this.$store.state.sourcRoot+"/image/indexpc/headbtn.png)",
      }
    },
    computed:{
     
    },
    mounted(){
      //判断是pc还是移动
      let userAgentInfo = navigator.userAgent;
      let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
      let getArr = Agents.filter(i => userAgentInfo.includes(i));
      // return getArr.length ? true : false;
      // console.log("getArr",getArr.length);
      if(getArr.length){
        this.$router.push({path: '/', replace: true})
      }
    },
    watch:{
      
    },
    methods:{
      
    }
  }
</script>
<style lang="scss">
.common-head-nav-pc{
  width:100%;
  height: 48PX;
  background: v-bind(back_ground);
  background-repeat:repeat-x;
  background-size: 100% 100%;
  position: relative;
  .logo-btn{
    position: absolute;
    width:82PX;
    height:25PX;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: v-bind(back_ground1);
    background-repeat:no-repeat;
    background-size: 100% 100%;
  }
}
</style>