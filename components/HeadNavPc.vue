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
    watch:{
      
    },
    methods:{
      
    }
  }
</script>
<style lang="scss">
.common-head-nav-pc{
  width:100%;
  height: 66PX;
  background: v-bind(back_ground);
  background-repeat:repeat-x;
  background-size: 100% 100%;
  position: relative;
  .logo-btn{
    position: absolute;
    width:131PX;
    height:43PX;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: v-bind(back_ground1);
    background-repeat:no-repeat;
    background-size: 100% 100%;
  }
}
</style>