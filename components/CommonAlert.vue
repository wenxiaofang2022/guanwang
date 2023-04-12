<template>
  <div class="common-alert-box">
    <div class="common-alert-wrapper">
      <div class="common-alert-bg"></div>
      <div class="common-alert-content">
        <div class="common-alert-title">{{content.title}}</div>
        <div class="common-alert-text">{{content.text}}</div>
        <div class="common-alert-btns">
          <div class="common-alert-btn" v-for="(btn,m) in content.btns" @click="btn.fn" :key="'common_alert_btn_'+m">
          {{btn.text}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['type','content','btns'],
    name:'CommonAlert',
    data() {
      return{
        
      }
    },
    methods:{
      
    }
  }
</script>
<style lang="scss">
.common-alert-box{
  
}
</style>
