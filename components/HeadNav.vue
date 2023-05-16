<template>
  <!-- <div class="head-div">
    
  </div> -->
  <div class="common-head-nav">
    <div class="head-nav-bg" @click="headNavFn" :class="showNavPoup===true?'active':showNavPoup===false?'hide':''" v-show="hideNavPoup"></div>
    <div class="head-nav" :class="showNavPoup?'active':''">
      <div v-show="commonNav" class="head-left" @click="goUrl('/')"></div>
      <div v-show="!commonNav" class="head-left works-detail" @click="goUrl('/caselist')"></div>
      <div class="head-center-box">
        <div class="head-center">
          <span class="left">给油量：</span>
          <!-- {{getNum(geiyouCount)}}L -->
          <div class="num_span_box">
            <div class="num_span">
              <!-- <span class="right right_div">0123456789</span>
              <span class="middle middle_div">0123456789</span>
              <span class="left left_div">0123456789</span> -->
              <span class="right left_div">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
              </span>
              <span class="middle middle_div">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
              </span>
              <span class="left right_div">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
              </span>
            </div>
          </div>L
        </div>
      </div>
      <div :class="[{active:showNavPoup},'head-right']" @click="headNavFn"></div>
    </div>
    <div :class="showNavPoup===true?'goBottom':showNavPoup===false?'goTop':''" class="head-nav-poup">
    <!-- <div :class="showNavPoup?'goBottom':'goTop'" class="head-nav-poup"> -->
        <div class="btn-nav works" @click="goUrl('/caselist')">
          <img :src="sourceUrl+'/image/head/WORKS.png'"/>
        </div>
        <div class="btn-list">
          <div class="btn-nav aboutus" @click="goUrl('/aboutus')">
            <img :src="sourceUrl+'/image/head/ABOUT.png'"/>
          </div>
          <div class="btn-nav contactus" @click="goUrl('/contactus')">
            <img :src="sourceUrl+'/image/head/CONTACT.png'"/>
          </div>
        </div>
        <div class="btn-nav daily" @click="goUrl('/daily')">
          <img :src="sourceUrl+'/image/head/DAILY.png'"/>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'HeadNav',
    data() {
      return{
        commonNav:true,
        showNavPoup:null,
        hideNavPoup:false,
        timer1:null,
        sourceUrl:this.$store.state.sourcRoot,
        back_ground:"url("+this.$store.state.sourcRoot+"/image/head/head-bg.png)",
        back_ground1:"url("+this.$store.state.sourcRoot+"/image/head/head-bg1.png)",
        back_ground2:"url("+this.$store.state.sourcRoot+"/image/head/icon-logo.png)",
        back_ground3:"url("+this.$store.state.sourcRoot+"/image/head/icon-nav.png)",
        back_ground4:"url("+this.$store.state.sourcRoot+"/image/head/icon-close.png)",
        back_ground5:"url("+this.$store.state.sourcRoot+"/image/head/head-nav-bg2.png)",
        back_ground6:"url("+this.$store.state.sourcRoot+"/image/head/icon-logo-works.png)",
        // geiyouCount:this.$store.state.counter,
      }
    },
    computed:{
      geiyouCount(){
        return this.$store.state.counter;
      }
    },
    watch:{
      $route: {
        handler:  function (newVal, oldVal){
          if(newVal){
            console.log(newVal.name);
            let index = newVal.name.indexOf("caselist-");
            console.log("index",index);
            if(index>-1){
              this.commonNav = false;
            }
            else{
              this.commonNav = true;
            }
          }
        },
        // 深度观察监听
        deep:  true,
        immediate:true
      },
      geiyouCount:{
        // immediate:true,
        handler(newVal){
          if(newVal){
            this.getNum(newVal);
          }
        },
        // deep:true
      }
    },
    mounted(){
      //判断是pc还是移动
      let userAgentInfo = navigator.userAgent;
      let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
      let getArr = Agents.filter(i => userAgentInfo.includes(i));
      // return getArr.length ? true : false;
      console.log("getArr",getArr.length);
      // if(!getArr.length){
      //   this.$router.push({path: '/indexpc', replace: true})
      // }
    },
    methods:{
      animateNum(newNum){
        // console.log("newNum",newNum);
        //首先 比较数字的变化
        let left_div = document.getElementsByClassName("left_div")[0];
        let middle_div = document.getElementsByClassName("middle_div")[0];
        let right_div = document.getElementsByClassName("right_div")[0];
        let tmp_left = 'margintop'+newNum[0];
        // left_div.classList.add(tmp_left);
        this.removeAddClass(left_div.classList,tmp_left);
        let tmp_middle = 'margintop'+newNum[1];
        // middle_div.classList.add(tmp_middle);
        this.removeAddClass(middle_div.classList,tmp_middle);
        let tmp_right = 'margintop'+newNum[2];
        // right_div.classList.add(tmp_right);
        this.removeAddClass(right_div.classList,tmp_right);
      },
      removeAddClass(ele,addclass){
        ele.remove('margintop0');
        ele.remove('margintop1');
        ele.remove('margintop2');
        ele.remove('margintop3');
        ele.remove('margintop4');
        ele.remove('margintop5');
        ele.remove('margintop6');
        ele.remove('margintop7');
        ele.remove('margintop8');
        ele.remove('margintop9');
        ele.add(addclass);
      },
      getNum(num){
        //let newNum = num.toPrecision(3);//1=>1.00
        let newNum = (Array(3).join(0) + num).slice(-3);//1=>001
        // let oldNum = (Array(3).join(0) + old).slice(-3);//1=>001
        setTimeout(()=>{
          this.animateNum(newNum);
        },500)
      },
      goUrl(path){
        //重置 state
        // loadRate
        this.$store.state.loadRate = 0;
        // rateTime
        this.$store.state.rateTime = 0;
        this.showNavPoup = null;
        this.hideNavPoup = false;
        // let nowroute = this.$route;
        // console.log('nowroute',nowroute);
        if(this.$route.path==path&&path!='/daily'){
          return;
        }
        else if(this.$route.path==path&&path=='/daily'){
          // this.$store.commit('changeback_off');
          this.$store.commit('showcard_off');
        }
        else{
          this.$store.commit('increment');
          if(this.$route.path=='/daily'){
            // this.$store.commit('changeback_off');
            this.$store.commit('showcard_off');
          }
          if(this.$route.path=='/caselist'){
            this.$store.state.showLoading = true;
          }
          else{
            this.$store.state.showLoading = false;
          }
          // console.log("path",path);
          this.$router.push({
            path:path,
            replace:true
          });
          // if(this.timer1){
          //   clearTimeout(this.timer1);
          // }
          // this.timer1 = setTimeout(() => {
          //   this.$router.push({
          //     path:path,
          //   });
          // },500);
        }
      },
      headNavFn(){
        if(this.showNavPoup===true){
          this.showNavPoup = false;
        }
        else if(this.showNavPoup===false){
          this.showNavPoup = true;
        }
        else if(this.showNavPoup===null){
          this.showNavPoup = true;
        }
        // this.showNavPoup = !this.showNavPoup;
        //0.5秒后 隐藏
        if(!this.showNavPoup){
          this.hideNavPoup = false;
        }
        else{
          this.hideNavPoup = true;
        }
      }
    }
  }
</script>
<style lang="scss">
@keyframes shwoBg {
  from{
    background: rgba(22, 22, 22, 0);
    backdrop-filter: blur(0px);
  }
  to{
    background: rgba(22, 22, 22, 0.59);
    backdrop-filter: blur(4.5px);
  }
}
@-moz-keyframes shwoBg{
  from{
    background: rgba(22, 22, 22, 0);
    backdrop-filter: blur(0px);
  }
  to{
    background: rgba(22, 22, 22, 0.59);
    backdrop-filter: blur(4.5px);
  }
}
@-webkit-keyframes shwoBg{
  from{
    background: rgba(22, 22, 22, 0);
    backdrop-filter: blur(0px);
  }
  to{
    background: rgba(22, 22, 22, 0.59);
    backdrop-filter: blur(4.5px);
  }
}
@-o-keyframes shwoBg{
  from{
    background: rgba(22, 22, 22, 0);
    backdrop-filter: blur(0px);
  }
  to{
    background: rgba(22, 22, 22, 0.59);
    backdrop-filter: blur(4.5px);
  }
}

@keyframes hideBg {
  from{
    display: block;
    background: rgba(22, 22, 22, 0.59);
    backdrop-filter: blur(4.5px);
  }
  to{
    display: none;
    background: rgba(22, 22, 22, 0);
    backdrop-filter: blur(0px);
  }
}
@-moz-keyframes hideBg{
  from{
    background: rgba(22, 22, 22, 0.59);
    backdrop-filter: blur(4.5px);
  }
  to{
    background: rgba(22, 22, 22, 0);
    backdrop-filter: blur(0px);
  }
}
@-webkit-keyframes hideBg{
  from{
    background: rgba(22, 22, 22, 0.59);
    backdrop-filter: blur(4.5px);
  }
  to{
    background: rgba(22, 22, 22, 0);
    backdrop-filter: blur(0px);
  }
}
@-o-keyframes hideBg{
  from{
    background: rgba(22, 22, 22, 0.59);
    backdrop-filter: blur(4.5px);
  }
  to{
    background: rgba(22, 22, 22, 0);
    backdrop-filter: blur(0px);
  }
}
.head-div{
  height: 48px;
  width: 100%;
}
.common-head-nav{
  // width:100%;
  width:375px;
  height: 55px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top:0px;
  z-index: 1001;
  .head-nav-bg{
    width: 100%;
    height: 100vh;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    &.active{
      // display:block;
      background: rgba(22, 22, 22, 0.59);
      backdrop-filter: blur(4.5px);
      animation: shwoBg 0.5s 1;
      -moz-animation:shwoBg 0.5s 1;
      -webkit-animation:shwoBg 0.5s 1;
      -o-animation:shwoBg 0.5s 1;
    }
    &.hide{
      // display: none;
      background: rgba(22, 22, 22, 0);
      backdrop-filter: blur(0px);
      animation: hideBg 0.5s 1;
      -moz-animation:hideBg 0.5s 1;
      -webkit-animation:hideBg 0.5s 1;
      -o-animation:hideBg 0.5s 1;
    }
  }
  .head-nav{
    width:100%;
    height: 55px;
    // height: 48px;
    // background:#e1e1e1;
    background: v-bind(back_ground);
    background-repeat:no-repeat;
    background-size: 100% auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // position: relative;
    padding: 0 18px;
    box-sizing: border-box;
    // position: relative;
    position: absolute;
    left: 0px;
    top:0px;
    z-index: 1;
    &.active{
      background: v-bind(back_ground1);
      background-repeat:no-repeat;
      background-size: 100% auto;
    }
    .head-left{
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      width:108px;
      height: 32px;
      border-radius: 6px;
      background: v-bind(back_ground2);
      background-repeat:no-repeat;
      background-size: 100%;
      &.works-detail{
        background: v-bind(back_ground6);
        background-repeat:no-repeat;
        background-size: 100%;
      }
    }
    .head-center-box{
      width: 174px;
      height: 27px;
      border-radius: 6px;
      background: #000;
      // padding-top:4px;
    }
    .head-center{
      margin-top:5px;
      width: 174px;
      height: 15px;
      font-size: 15px;
      line-height: 15px;
      color: #FF5C00;
      text-align: center;
      font-family:'xszt Regular';
      position: relative;
      .left{
        width: 62px;
        display: inline-block;
        height: 15px;
        line-height: 15px;
      }
      .num_span_box{
        // width: 48px;
        width: 30px;
        display: inline-block;
        vertical-align: middle;
        position: relative;
        height:15px;
        overflow: hidden;
        margin-top: 2px;
      }
      .num_span {
        position: absolute;
        left: 0px;
        // top: 0px;
        // top:6px;
        // height: 15px;
        // line-height: 15px;
        // width: 48px;
        width: 24px;
        overflow: hidden;
        font-size: 15px;
        // height:27px;
        // line-height:27px;
        // top: -1px;
        height: 15px;
        line-height: 15px;
        // top: 4px;
        top: -1px;
        display: flex;
        justify-content: space-between;
      }
      .num_span>span {
        // height: 270px;
        // line-height:27px;
        height: 150px;
        line-height: 15px;
        // float: right;
        // width: 15px;
        width:8px;
        // writing-mode: vertical-rl;
        // text-orientation: upright;
        margin-top: 0px;
        -webkit-transition: margin-top 1.5s ease-out;
        -o-transition: margin-top 1.5s ease-out;
        transition: margin-top 1.5s ease-out;
        &.margintop0{
          margin-top: 0px;
        }
        &.margintop1{
          margin-top: -15px;
        }
        &.margintop2{
          margin-top: -30px;
        }
        &.margintop3{
          margin-top: -45px;
        }
        &.margintop4{
          margin-top: -60px;
        }
        &.margintop5{
          margin-top: -75px;
        }
        &.margintop6{
          margin-top: -90px;
        }
        &.margintop7{
          margin-top: -105px;
        }
        &.margintop8{
          margin-top: -120px;
        }
        &.margintop9{
          margin-top: -135px;
        }
      }
      .num_span>span>span{
        // height:27px;
        // line-height: 27px;
        height: 15px;
        line-height: 15px;
        display: block;
      }
    }
    .head-right{
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background: v-bind(back_ground3);
      background-repeat:no-repeat;
      background-size: 100%;
      &.active{
        background: v-bind(back_ground4);
        background-repeat:no-repeat;
        background-size: 100%;
      }
    }
  }

  @keyframes goBottom {
    from{margin-top: -372px;}
    to{margin-top: 0px;}
  }
  @keyframes goTop {
    from{margin-top:0px;}
    to{margin-top:-372px;}
  }
  @-moz-keyframes goBottom{
    from{margin-top: -372px;}
    to{margin-top: 0px;}
  }
  @-moz-keyframes goTop{
    from{margin-top:0px;}
    to{margin-top:-372px;}
  }
  @-webkit-keyframes goBottom{
    from{margin-top: -372px;}
    to{margin-top: 0px;}
  }
  @-webkit-keyframes goTop{
    from{margin-top:0px;}
    to{margin-top:-372px;}
  }
  @-o-keyframes goBottom{
    from{margin-top: -372px;}
    to{margin-top: 0px;}
  }
  @-o-keyframes goTop{
    from{margin-top:0px;}
    to{margin-top:-372px;}
  }
  
  .head-nav-poup{
    position: absolute;
    width: 100%;
    // height:259px;
    height: 272px;
    // padding:28px 26px 22px 24px;
    padding-top: 28px;
    background:#f1f1f1;
    background: v-bind(back_ground5);
    background-repeat:no-repeat;
    background-size: 100% auto;
    left:0px;
    top:48px;
    margin-top:-372px;
    &.goBottom{
      margin-top: 0px;
      animation: goBottom 0.5s 1;
      -moz-animation:goBottom 0.5s 1;
      -webkit-animation:goBottom 0.5s 1;
      -o-animation:goBottom 0.5s 1;
    }
    &.goTop{
      margin-top:-372px;
      animation: goTop 0.5s 1;
      -moz-animation:goTop 0.5s 1;
      -webkit-animation:goTop 0.5s 1;
      -o-animation:goTop 0.5s 1;
    }
    .btn-list{
      display: flex;
      justify-content: space-between;
      margin: 0px auto;
      margin-top: 14px;
      padding:0px 23px;
    }
    .works{
      width: 328px;
      height: auto;
      margin: 0 auto;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      img{
        width: 100%;
        display: block;
      }
    }
    .aboutus{
      width: 159px;
      height: auto;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      img{
        width: 100%;
        display: block;
      }
    }
    .contactus{
      width: 159px;
      height: auto;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      img{
        width: 100%;
        display: block;
      }
    }
    .daily{
      width: 328px;
      height: auto;
      margin: 0 auto;
      margin-top:15px;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      img{
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
