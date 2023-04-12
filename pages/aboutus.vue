<template>
  <div class="container" ref="container">
    <aboutusBox/>
    <BottomBgV/>
  </div>
</template>

<script>
export default {
  name: 'AboutusPage',
  components: {
    aboutusBox:()=>import('@/components/aboutusBox'),
    BottomBgV:()=>import('@/components/BottomBgV'),
  },
  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
.container {
  // width: 100vw;
  width:375px;
  min-height: 100vh;
  padding-top: 55px;
  overflow-x:hidden;
  overflow-y: hidden;
}
</style>
