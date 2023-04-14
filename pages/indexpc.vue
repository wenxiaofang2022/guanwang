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
  components: {
    IndexTopTextPc:()=>import('@/components/IndexTopTextPc'),
    HomeCloudNewPc:()=>import('@/components/HomeCloudNewPc'),
    // BottomBgPc:()=>import('@/components/BottomBgPc'),
  },
  methods:{
    
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
