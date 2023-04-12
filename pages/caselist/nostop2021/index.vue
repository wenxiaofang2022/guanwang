<template>
  <div>
    <CaseDetailTopTit :caseName="caseName"/>
    <CaseDetailContent :caseName="caseName"/>
  </div>
</template>

<script>
export default {
  layout:'detail',
  name: 'CaseDetailPage',
  data(){
    return{
      caseName:'nostop2021'
    }
  },
  components: {
    CaseDetailTopTit:()=>import('@/components/CaseDetailTopTit'),
    CaseDetailContent:()=>import('@/components/CaseDetailContent'),
  },
  methods:{
    
  }
}
</script>
<style lang="scss" scoped>
</style>
