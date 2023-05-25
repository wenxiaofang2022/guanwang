<template>
  <div class="container">
    <IndexTopTextPc/>
    <HomeCloudNewPc/>
    <!-- <BottomBgPc/> -->
  </div>
</template>

<script>
export default {
  layout:'loadingpc',
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
  data(){
    return{
      // isReload: true,
    }
  },
  // provide() {
  //   return {
  //     reload: this.reload,
  //   };
  // },
  components: {
    IndexTopTextPc:()=>import('@/components/IndexTopTextPc'),
    HomeCloudNewPc:()=>import('@/components/HomeCloudNewPc'),
    // BottomBgPc:()=>import('@/components/BottomBgPc'),
  },
  methods:{
    // async reload() {
    //   this.isReload = false;
    //   await this.$nextTick();
    //   this.isReload = true;
    // },
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  // width:375px;
  height: 100vh;
  // padding-top: 55px;
  overflow-x:hidden;
  overflow-y: hidden;
  position: relative;
}
</style>
