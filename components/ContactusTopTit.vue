<template>
  <div class="detail-top-tit">
    <div class="bigtit">
      <img :src="sourcRootUrl+'/image/contactus/title_02.png'"/>
      <!-- <div class="bigtit-chinese">联系给油所</div>
      <div class="bigtit-english">CONTACT US</div> -->
    </div>
  </div>
</template>
<script>
  export default {
    name:'ContactusTopTit',
    data() {
      return{
       sourcRootUrl:this.$store.state.sourcRoot,
      }
    },
    methods:{

    }
  }
</script>
<style lang="scss" scoped>
.detail-top-tit{
  padding: 20px 18px 0px;
  .bigtit{
    color: #000;
    overflow: hidden;
    img{
      height:87px;
    }
    .bigtit-chinese{
      // font-weight: 700;
      // font-size: 36px;
      // line-height: 36px;
      font-size: 34px;
      line-height: 51px;
      font-family:'syht Heavy';
    }
    .bigtit-english{
      // font-weight: 800;
      // font-size: 36px;
      // line-height: 36px;
      font-size: 24px;
      line-height: 28px;
      white-space: nowrap;
      font-family:'aotf Heavy';
    }
  }
}
</style>
