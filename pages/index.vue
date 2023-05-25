<template>
  <div class="container">
    <IndexTopText/>
    <!-- <HomeCloud @getrate="getRate"/> -->
    <HomeCloudNew @getrate="getRate"/>
    <!-- <BottomBox/> -->
    <BottomBg/>
  </div>
</template>

<script>
export default {
  layout:'loading',
  name: 'IndexPage',
  head() {
      return {
          title:'欢迎进入给油所，请自取灵感能量！',
          meta:[{
                  hid: 'description',
                  name: 'description',
                  content: '无奇不有的灵感补给站。'
              },
              {
                  hid: 'keywords',
                  name: 'keywords',
                  content: 'KASAKII，给油所'
              },
          ]
      }
  },
  components: {
    IndexTopText:()=>import('@/components/IndexTopText'),
    // HomeCloud:()=>import('@/components/HomeCloud'),
    HomeCloudNew:()=>import('@/components/HomeCloudNew'),
    // BottomBox:()=>import('@/components/BottomBox'),
    BottomBg:()=>import('@/components/BottomBg'),
  },
  methods:{
    getRate(rate){
      // console.log("rate",rate);
      // this.loadRate = rate;
      // debugger
      // this.$emit('setrate',rate);
      this.$store.state.loadRate = rate;
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
  overflow-x:hidden;
  overflow-y: hidden;
  position: relative;
}
</style>
