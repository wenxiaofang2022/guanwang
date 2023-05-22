<template>
  <div class="common-load-box" v-show="showLoading">
    <div class="common-load-wrapper">
      <div class="common-load-content">
        <div class="loading-box">
          <img :src="sourceUrl+'/image/loading.png'"/>
        </div>
        <!-- <div class="main-box">
          <div class="load-top" :style="{width:processW}">
            <img :src="sourceUrl+'/image/loading/black.png'"/>
          </div>
          <div class="load-bottom">
            <img :src="sourceUrl+'/image/loading/gray.png'"/>
          </div>
        </div> -->
      </div>
      <div class="copyright">
        <img :src="sourceUrl+'/image/copyright.png'"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['loadRate'],
    name:'CommonLoad',
    data() {
      return{
        sourceUrl:this.$store.state.sourcRoot,
        processW:'0%',
        timer:null,
        tmpRate:0,
        back_ground:"url("+this.$store.state.sourcRoot+"/image/bg.png)",
        // showLoading:this.$store.state.showLoading,
      }
    },
    computed:{
      showLoading(){
        return this.$store.state.showLoading;
      }
    },
    mounted(){
      
    },
    watch:{
      loadRate:{
        immediate:true,
        handler(newVal){
          this.changeRate(newVal);
        },
        deep:true
      }
    },
    methods:{
      changeRate(rate){
        // console.log("rate555",rate);
        if(rate==100||rate>100){
          this.$store.state.showLoading = false;
        }
        // console.log("tmpRate",this.tmpRate);
        // console.log("processW",Number(this.processW.replace('%','')));
        //processW
        // this.processW = Number(100 - Number(rate))+'%';
        // if(rate>Number(this.processW.replace('%',''))){
        //   this.processW = Number(rate)+'%';
        // }
        // if(rate==0){
        //   this.processW = '0%';
        //   this.tmpRate = rate;
        // }
        // if(rate>this.tmpRate){
        //   this.processW = Number(this.tmpRate)+'%';
        //   this.tmpRate = rate;
        // }
        // if(rate==100||rate>100){
        //   this.processW = '100%';
        //   //推迟半秒钟
        //   if(this.timer){
        //     clearTimeout(this.timer);
        //   }
        //   this.timer = setTimeout(()=>{
        //     this.tmpRate = 0;
        //     this.$store.state.showLoading = false;
        //   },500)
        // }
      }
    }
  }
</script>
<style lang="scss" scoped>
.common-load-box{
  // width:100vw;
  width:375px;
  height:100vh;
  background: v-bind(back_ground);
  background-repeat:no-repeat;
  background-position: 0px 0px;
  background-size:100% auto;
  position:fixed;
  left:0px;
  top:0px;
  // background:rgba(0,0,0,0.3);
  background-color: #fff;
  z-index:100;
  .common-load-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    .common-load-content{
      width: 339px;
      height: 191px;
      position:absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      .loading-box{
        width: 339px;
        height: 191px;
        img{
          width:100%;
          display:block;
        }
      }
      .main-box{
        width: 314px;
        height: 64px;
        position: relative;
      }
      .load-top{
        z-index: 1;
      }
      .load-top,.load-bottom{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        overflow: hidden;
        img{
          width: 314px;
          height: 64px;
          display: block;
        }
      }
    }
    .copyright{
      bottom:21px;
      position:fixed;
      width:129px;
      left:50%;
      transform:translateX(-50%);
      img{
        width:129px;
        display: block;
      }
    }
  }
}
</style>
