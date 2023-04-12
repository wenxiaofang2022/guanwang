<template>
  <div class="common-bottom-box">
    <div class="bottom-line-bg"></div>
    <div class="bottom-bg"></div>
    <div class="bottom-btn" @click="goTop"></div>
  </div>
</template>
<script>
  export default {
    name:'CommonBottom',
    data() {
      return{
        back_ground:"url("+this.$store.state.sourcRoot+"/image/bottom/bg.png)",
        back_ground1:"url("+this.$store.state.sourcRoot+"/image/bg.png)",
        back_ground2:"url("+this.$store.state.sourcRoot+"/image/bottom/btn.png)",
      }
    },
    methods:{
      goTop(){
        this.$emit('gotopbtn');
      }
    }
  }
</script>
<style lang="scss">
.common-bottom-box{
  // width: 100%;
  width:375px;
  height: 107px;
  position:fixed;
  // left: 0px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0px;
  z-index:102;
  .bottom-bg{
    width: 100%;
    height: 107px;
    background: v-bind(back_ground);
    background-repeat:no-repeat;
    background-size: 100% auto;
    position:absolute;
    z-index: 101;
  }
  .bottom-line-bg{
    width: 100%;
    height: 96px;
    background: v-bind(back_ground1);
    background-repeat:no-repeat;
    background-position: 0px 0px;
    background-size:100% auto;
    background-color: #fff;
    position: absolute;
    z-index:0;
    bottom:0px;
    left: 0px;
  }
  .bottom-btn{
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    width:67px;
    height: 66px;
    background: v-bind(back_ground2);
    background-repeat:no-repeat;
    background-size: 100% auto;
    // position: fixed;
    position:absolute;
    right: 22px;
    bottom: 18px;
    z-index: 102;
  }
}
</style>
