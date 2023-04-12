<template>
  <div class="detail-top-tit" v-if="caseTitles&&caseTitles[caseName]">
    <!-- <div class="scroll-txt" id="scrollbox"></div> -->
    <div class="bigtit">
      <div class="bigtit-chinese autotxt">{{caseTitles[caseName].chinesetit}}</div>
      <div class="bigtit-english autotxt">{{caseTitles[caseName].englishtit}}</div>
    </div>
    <div class="subtit">
      <div class="subtit-chinese autotxt">{{caseTitles[caseName].chinesesub}}</div>
      <div class="subtit-english autotxt">{{caseTitles[caseName].englishsub}}</div>
    </div>
  </div>
</template>
<script>
import casetits from '@/static/json/casetit.json'
  export default {
    name:'CaseDetailTopTit',
    props:['caseName'],
    data() {
      return{
        caseTitles:casetits,
        timer:null,
      }
    },
    mounted(){
      // this.scrollTxt();
    },
    methods:{
      scrollTxt(){
        this.timer = setTimeout(() => {
          let box = document.getElementById("scrollbox");
          box.scrollTo({
              top:0,
              left:1000,
              behavior: "smooth"
          });
          clearTimeout(this.timer);
        }, 5000);
      }
    }
  }
</script>
<style lang="scss" scoped>
.detail-top-tit{
  padding: 20px 18px 0px;
  padding-bottom:213px;
  overflow: hidden;
  .scroll-txt{
    // padding: 0px 2px 13px;
    // width: 100%;
    // height: 100%;
    // overflow-y: hidden;
    // overflow-x: auto;
  }
  .autotxt{
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {display: none;}
  }
  .bigtit{
    color: #313131;
    overflow: hidden;
    .bigtit-chinese{
      font-size: 34px;
      line-height: 51px;
      font-family:'syht Heavy';
      white-space: nowrap;
    }
    .bigtit-english{
      // font-weight: 800;
      font-size:24px;
      line-height: 48px;
      white-space: nowrap;
      font-family:'aotf Heavy';
      margin-top: -16px;
      text-transform: uppercase;
    }
  }
  .subtit{
    // color: #757575;
    color: #9A9A9A;
    overflow: hidden;
    font-family:'syht Heavy';
    .subtit-chinese{
      font-size: 12px;
      line-height: 18px;
      white-space: nowrap;
    }
    .subtit-english{
      font-size: 12px;
      line-height: 18px;
      margin-top: -3px;
      white-space: nowrap;
      text-transform: uppercase;
    }
  }
}
</style>
