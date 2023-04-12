<template>
  <div class="works_nav_box" v-if="showNavigation" @click="hideNav">
    <div class="works_nav_bg" :class="hideNavBg?'hide':''"></div>
    <img class="works_nav_content" :src="sourceUrl+'/image/works/navigation_bar.png'"/>
  </div>
</template>
<script>
  export default {
    name:'Navigation',
    data() {
      return{
        sourceUrl:this.$store.state.sourcRoot,
        hideNavBg:false,
        showNavigation:localStorage.getItem("hasShowNavigation")?false:true,
        timer:null,
      }
    },
    mounted(){},
    methods:{
      hideNav(){
        this.hideNavBg = true;
        if(this.timer){
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.showNavigation=false;
          localStorage.setItem("hasShowNavigation","true");
        }, 1000);
      }
    }
  }
</script>
<style lang="scss">
.works_nav_box{
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width:100%;
  height:100%;
  position:fixed;
  left: 0px;
  top:0px;
  z-index:100;
  @keyframes opacityTrans {
    from{opacity: 1;}
    to{opacity: 0;}
  }
  @-moz-keyframes opacityTrans{
    from{opacity: 1;}
    to{opacity: 0;}
  }
  @-webkit-keyframes opacityTrans{
    from{opacity: 1;}
    to{opacity: 0;}
  }
  @-o-keyframes opacityTrans{
    from{opacity: 1;}
    to{opacity: 0;}
  }
  .works_nav_bg{
    width:100%;
    height:100%;
    background: rgba(24, 24, 24, 0.6);
    backdrop-filter: blur(1px);
    &.hide{
      opacity: 0;
      animation: opacityTrans 1s ease;
      -moz-animation:opacityTrans 1s ease;
      -webkit-animation:opacityTrans 1s ease;
      -o-animation:opacityTrans 1s ease;
    }
  }
  .works_nav_content{
    position:fixed;
    bottom:6px;
    left:0px;
    display:block;
    width:100%;
  }
}
</style>
