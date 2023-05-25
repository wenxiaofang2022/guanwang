<template>
  <div class="container" ref="container">
    <aboutusBox/>
    <BottomBgV/>
  </div>
</template>

<script>
export default {
  name: 'AboutusPage',
  head() {
      return {
          title:'KASAKII，您的创意给油所，我们专注于提供颠覆性创意服务和品牌战略，全方位为品牌赋能。',
          meta:[{
                  hid: 'description',
                  name: 'description',
                  content: '详细介绍我们的优势，业务范围，服务客户和所获奖项。'
              },
              {
                  hid: 'keywords',
                  name: 'keywords',
                  content: '专注创意服务，品牌战略，品牌赋能'
              },
          ]
      }
  },
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
