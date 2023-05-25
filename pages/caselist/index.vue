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
  head() {
      return {
          title:'有求必应很少打烊的卡卅给油所！',
          meta:[{
                  hid: 'description',
                  name: 'description',
                  content: '案例分为整合营销，创意表达，互动体验，独家出品四大类。'
              },
              {
                  hid: 'keywords',
                  name: 'keywords',
                  content: '案例列表，快速预览，精选项目'
              },
          ]
      }
  },
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
