<template>
  <div class="index-top-text">
    <div class="art-text">
    </div>
    <div class="marquee-outer-wrapper marquee-box">
      <div class="marquee-inner-wrapper">
        <span class="first-marquee">{{ marqueeTxt+' '+marqueeTxt+' '+marqueeTxt+' '+marqueeTxt }}</span>
        <span class="second-marquee">{{ marqueeTxt+' '+marqueeTxt+' '+marqueeTxt+' '+marqueeTxt }}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'IndexTopTextPc',
    data() {
      return{
       marqueeTxt:'# 欢迎光临卡卅给油所 # Welcome to KASAKII Creative Supply Station # カサキイガソリンスタンドへようこそ',
       timer:null,
       back_ground:"url("+this.$store.state.sourcRoot+"/image/indexpc/headtxt.png)",
       back_ground1:"url("+this.$store.state.sourcRoot+"/image/indexpc/headtxt1.png)",
       back_ground2:"url("+this.$store.state.sourcRoot+"/image/indexpc/headtxt2.png)"
      }
    },
    mounted(){
      // this.runText();
    },
    beforeDestrioy(){
      // this.stopText();
    },
    methods:{
      runText(){
        // 如果timer已经赋值就返回
        if(this.timer){return};
        this.timer = setInterval(() => {
          var arr = this.marqueeTxt.split('');
          // console.log("arr",arr);
          //console.log("arr.shift()",arr.shift());
          arr.push(arr.shift());
          this.marqueeTxt = arr.join('');
        },150)
      },
      stopText(){
        //清除定时器
        clearInterval(this.timer);
        //清除定时器之后，需要重新将定时器置为null
        this.timer = null;
      }
    }
  }
</script>
<style lang="scss" scoped>
.index-top-text{
  padding-top: 30PX;
  text-align: center;
  color: #000;
  .art-text{
    width: 798PX;
    height: 221PX;
    background: v-bind(back_ground);
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 0 auto;
    position: relative;
  }
  .marquee-box{
    width:526PX;
    height:40px;
    line-height:40px;
    background: #1C1C1C;
    box-shadow: inset -3px -3px 7px #000000, inset 5px 5px 8px #000000;
    border-radius: 5px;
    color: #FF5C00;
    text-shadow: 0px 0px 5px #FF5C00;
    font-family:'xszt Regular';
    font-size: 22px;
    margin:0 auto;
    margin-top: -20PX;
    overflow: hidden;

  }

  .marquee-inner-wrapper {
      white-space: nowrap;
      position: relative;
  }
  /* 需要将两个文字内容一样的span放在最右边 */
  
  .marquee-inner-wrapper span {
      position: absolute;
      top: 0;
      left: 100%;
      height: 100%;
  }
  /* 定义第一个span的animation：时长 动画名字 匀速 循环 正常播放 */
  
  .first-marquee {
      -webkit-animation: 80s first-marquee linear infinite normal;
      animation: 80s first-marquee linear infinite normal;
      padding-right: 70%;
  }
  
  @keyframes first-marquee {
      0% {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
      }
      /* 向左移动 */
      100% {
          -webkit-transform: translate3d(-200%, 0, 0);
          transform: translate3d(-200%, 0, 0);
          display: none;
      }
  }
  
  .second-marquee {
      /* 因为要在第一个span播完之前就得出现第二个span，所以就延迟12s才播放 */
      -webkit-animation: 80s first-marquee linear 42s infinite normal;
      animation: 80s first-marquee linear 42s infinite normal;
      padding-right: 53%;
  }
  
  @keyframes second-marquee {
      0% {
          -webkit-transform: translate3d(0%, 0, 0);
          transform: translate3d(0%, 0, 0);
      }
      100% {
          -webkit-transform: translate3d(-200%, 0, 0);
          transform: translate3d(-200%, 0, 0);
          display: none;
      }
  }
}
@media only screen and (max-width: 1200PX) {
.index-top-text{
  .art-text{
    width: 671PX;
    height: 221PX;
    background: v-bind(back_ground2);
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 0 auto;
    position: relative;
  }
  .marquee-box{
    margin-top:0PX;
    width: 505PX;
  }
}
}
@media only screen and (max-width: 830PX) {
.index-top-text{
  .art-text{
    width: 448PX;
    height: 171PX;
    background: v-bind(back_ground1);
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 0 auto;
    position: relative;
  }
  .marquee-box{
    margin-top: -20PX;
    width: 389PX;
  }
}
}
</style>
