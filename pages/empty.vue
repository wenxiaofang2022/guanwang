<template>
  <div class="container">
    <!-- <IndexTopTextPc/> -->
    <!-- <HomeCloudNewPc v-if="isReload"/> -->
    <!-- <BottomBgPc/> -->
  </div>
</template>
<script>
export default {
  layout:'loadingpc',
  name: 'Empty',
  data(){
    return{
      
    }
  },
  mounted(){
    this.$router.replace(`/indexpc`,()=>{},()=>{});
  },
  components: {
    // IndexTopTextPc:()=>import('@/components/IndexTopTextPc'),
    // HomeCloudNewPc:()=>import('@/components/HomeCloudNewPc'),
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