<template>
  <div class="index-bottom-bg" v-show="showBottomBg">
    <img :src="sourceUrl+'/image/index/absolutebottom1.png'"/>
  </div>
</template>
<script>
  export default {
    name:'BottomBg',
    data() {
      return{
        sourceUrl:this.$store.state.sourcRoot,
        showBottomBg:false,
      }
    },
    mounted(){
      //判断背景是否展示
      // console.log(window.innerHeight);
      let tmp = window.innerHeight - 70 - 280 - 350;
      // console.log(tmp);
      if(tmp>0){
        this.showBottomBg = true;
      }
      else{
        this.showBottomBg = false;
      }
    },
    methods:{

    }
  }
</script>
<style lang="scss">
.index-bottom-bg{
  position: absolute;
  bottom: 0px;
  // bottom:20PX;
  left:0px;
  width: 100%;
  img{
    width: 100%;
    display: block;
    margin: 0 auto;
  }
}
</style>
