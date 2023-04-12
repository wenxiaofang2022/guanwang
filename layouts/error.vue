<template>
  <div class="error-box">
    <template v-if="error.statusCode === 404">
      <h1 class="txt-404">您访问的页面走丢了...</h1>
      <a href="/" class="btn-404">回到首页</a>
    </template>
    <template v-else>
      <h1 class="txt-404" style="padding-top:200px;">应用发生错误异常</h1>
      <span @click="reload" class="btn-err">刷新页面</span>
    </template>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "blog", // 你可以为错误页面指定自定义的布局
  mounted() {},
  methods: {
    
  }
};
</script>
<style lang="scss" scoped>
.error-box {
  height: 100vh;
  padding-top: 20%;
  .img_404 {
    width: 80%;
    display: block;
    margin: 30px auto;
  }
  .txt-404 {
    text-align: center;
    font-size: 40px;
    color: #666;
    margin: 30px 0;
  }
  .btn-404 {
    display: block;
    width: 80%;
    text-align: center;
    margin: 10px auto;
    border-radius: 60px;
    line-height: 90px;
    font-size: 40px;
    font-weight: 900;
    color: #fff;
    background-color: #6a9cf6;
  }
  .btn-err {
    display: block;
    width: 80%;
    text-align: center;
    margin: 10px auto;
    border-radius: 60px;
    line-height: 90px;
    font-size: 40px;
    font-weight: 900;
    color: #fff;
    background-color: #00d3ff;
  }
}
</style>