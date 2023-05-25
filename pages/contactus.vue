<template>
  <div class="container" ref="container">
    <ContactusTopTit/>
    <ContactusSwitch/>
    <CommonBottom @gotopbtn="goTop"/>
  </div>
</template>

<script>
export default {
  name: 'ContactusPage',
  head() {
      return {
          title:'联系给油所，做出酷酷的东西！给油所期待您的加入！',
          meta:[{
                  hid: 'description',
                  name: 'description',
                  content: '给油所的联系方式和招聘需求展示。'
              },
              {
                  hid: 'keywords',
                  name: 'keywords',
                  content: '下brief，加入我们，给油所'
              },
          ]
      }
  },
  components: {
    ContactusTopTit:()=>import('@/components/ContactusTopTit'),
    ContactusSwitch:()=>import('@/components/ContactusSwitch'),
    CommonBottom:()=>import('@/components/CommonBottom'),
  },
  methods:{
    goTop(){
      //进入到顶部
      let container = this.$refs.container;
      container.scrollTo({
          top: 0,
          behavior: "smooth"
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  // width: 100vw;
  width:375px;
  height: 100vh;
  padding-top: 55px;
  overflow-y: auto;
  overflow-x:hidden;
  padding-bottom: 96px;
}
</style>
