<template>
  <div class="container">
    <OilBox @getrate="getRate"/>
    <Navigation/>
  </div>
</template>

<script>
export default {
  layout:'loading',
  name: 'CaseListPage',
  components: {
    Navigation:()=>import('@/components/Navigation'),
  },
  methods:{
    getRate(rate){
      this.$store.state.loadRate = rate;
    }
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
