<template>
  <div class="creative-alert-box" v-if="showAlert">
   <div class="modal-box">
    <div class="modal-bg"></div>
    <div class="modal-content">
      <!-- <div class="modal-tit"></div> -->
      <img :src="sourceUrl+'/image/alert/email.png'"/>
      <div class="btn" @click="CloseModal"></div>
    </div>
   </div>
  </div>
</template>
<script>
  export default {
    name:'CreativeAlert',
    props:['showAlert'],
    data() {
      return{
        sourceUrl:this.$store.state.sourcRoot,
      }
    },
    computed:{
      
    },
    watch:{
      
    },
    methods:{
      CloseModal(){
        this.$emit('closemodal');
      }
    }
  }
</script>
<style lang="scss">
  @keyframes goBottom {
    from{margin-top: -259px;}
    to{margin-top: 0px;}
  }
  @-moz-keyframes goBottom{
    from{margin-top: -259px;}
    to{margin-top: 0px;}
  }
  @-webkit-keyframes goBottom{
    from{margin-top: -259px;}
    to{margin-top: 0px;}
  }
  @-o-keyframes goBottom{
    from{margin-top: -259px;}
    to{margin-top: 0px;}
  }
  .creative-alert-box{
    .modal-box{
      // width: 100vw;
      width:375px;
      height: 100vh;
      position: fixed;
      left: 0px;
      top: 0px;
      z-index: 1000;
      .modal-bg{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
      }
      .modal-content{
        width: 339px;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        img{
          width: 339px;
          height: auto;
          display: block;
        }
        .btn{
          width: 148px;
          height: 36px;
          position: absolute;
          left: 50%;
          // top: 126px;
          // bottom: 52px;
          bottom: 23px;
          transform: translateX(-50%);
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
      }
    }
  }
  // &.goBottom{
  //   margin-top: 0px;
  //   animation: goBottom 0.5s 1;
  //   -moz-animation:goBottom 0.5s 1;
  //   -webkit-animation:goBottom 0.5s 1;
  //   -o-animation:goBottom 0.5s 1;
  // }

</style>
