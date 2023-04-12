<template>
  <div class="index-bottom-text">
    <img :src="sourceUrl+'/image/index/bottomnew.png'"/>
    <div class="copyright-text">Copyright © KASAKII.All Rights Reserved.<a href="https://beian.miit.gov.cn/#/Integrated/index" target="blank">粤ICP备20012453号</a></div>
  </div>
</template>
<script>
  export default {
    name:'BottomBox',
    data() {
      return{
        sourceUrl:this.$store.state.sourcRoot,
        back_ground1:"url("+this.$store.state.sourcRoot+"/image/index/copyright.png)",
        back_ground2:"url("+this.$store.state.sourcRoot+"/image/index/logo.png)",
      }
    },
    methods:{

    }
  }
</script>
<style lang="scss">
.index-bottom-text{
  img{
    width: 301px;
    display: block;
    margin: 0 auto;
  }
  .copyright-text{
    color: #C1C1C1;
    // font-family: 'PingFang SC';
    // font-style: normal;
    // font-weight: 600;
    font-family:'syht Medium';
    font-size: 7px;
    line-height: 10px;
    text-align: center;
    position: relative;
    z-index: 1000;
    a{
      color: #C1C1C1;
      text-decoration: none;
    }
  }
  // // padding-top: 45px;
  // // padding-top: 100px;
  // text-align: center;
  // color: #000;
  // position: relative;
  // .absolute-logo{
  //   position: absolute;
  //   width: 57px;
  //   height: 57px;
  //   right: 50px;
  //   top: 36px;
  //   background:v-bind(back_ground2);
  //   background-repeat: no-repeat;
  //   background-position: center center;
  //   background-size: 100% auto;
  // }
  // .img-text{
  //   width: 232px;
  //   display: block;
  //   margin:0 auto;
  // }
  // .chinese-desc{
  //   // font-weight: 900;
  //   font-size: 21px;
  //   line-height: 24px;
  //   // margin-top: 12px;
  // }
  // .english-desc{
  //   // font-weight: 900;
  //   font-size: 17px;
  //   line-height: 22px;
  // }
  // .copy-right{
  //   background:v-bind(back_ground1);
  //   background-repeat: no-repeat;
  //   background-position: center center;
  //   background-size: 100% auto;
  //   height: 23px;
  //   width: 129px;
  //   margin: 0 auto;
  // }
}
// .bottom-box{
//   width:100%;
//   height: 78px;
//   .orange-line-mogu{
//     height: 4px;
//     background: #FF5C00;
//     position: relative;
//     .circle-mogu{
//       width: 57px;
//       height: 57px;
//       border-radius: 50%;
//       background: #FF5C00;
//       position: absolute;
//       top:-25px;
//       right: 16px;
//       img{
//         width:37px;
//         margin: 12px auto;
//         display: block;
//       }
//     }
//   }
//   .black-box{
//     width: 100%;
//     height: 34px;
//     background: #313131;
//     color:#fff;
//     // padding:5px 76px 5px 79px;
//     padding: 0 76px;
//     box-sizing: border-box;
//     font-size: 14px;
//     line-height: 28px;
//     letter-spacing: 0.08em;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     .center{
//       padding-top:8px;
//       background:v-bind(back_ground);
//       background-repeat: no-repeat;
//       background-position: 0px 0px;
//       background-size: 100% auto;
//       img{
//         display: block;
//         width: 100%;
//       }
//       // width: 64px;
//     }
//   }
//   .copy-right{
//     background:v-bind(back_ground1);
//     background-repeat: no-repeat;
//     background-position: center center;
//     background-size: 100% auto;
//     height: 23px;
//     width: 129px;
//     margin: 0 auto;
//   }
// }
</style>
