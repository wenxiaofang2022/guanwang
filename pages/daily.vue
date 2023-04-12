<template>
  <div class="container" ref="container" :class="bodyScrollHide?'hide':'auto'">
    <PushDown/>
    <!-- <CommonBottom @gotopbtn="goTop"/> -->
  </div>
</template>

<script>
export default {
  name: 'DailyPage',
  components: {
    PushDown:()=>import('@/components/PushDown'),
    CommonBottom:()=>import('@/components/CommonBottom'),
  },
  computed:{
    bodyScrollHide(){
      return this.$store.state.bodyScrollHide;
    }
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
.container {
  // width: 100vw;
  width:375px;
  height: 100vh;
  // padding-top: 55px;
  // padding-top: 48px;
  overflow-x:hidden;
  padding-bottom: 0px;
  // position: fixed;
  // left: 0px;
  // top: 0px;
  // padding-bottom: 96px;
  // .head_div{
  //   width: 100%;
  //   height: 48px;
  // }
  &.hide{
    overflow-y: hidden;
  }
  &.auto{
    overflow-y: auto;
  }
}
</style>
