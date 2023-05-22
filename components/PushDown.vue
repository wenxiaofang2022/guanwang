<template>
  <div :class="[{iosH:isiOS&&showCard&&activeIndex==null},{androidH:isAndroid&&showCard&&activeIndex==null},'push-down-box']" id="push-down-box" :style="{height:showCard&&activeIndex!=null?wrapperH+'px':'','--androidh':wrapperH+'px'}">
    <div class="head_div"></div>
    <div class="box-container" id="box-container">
    <!-- <div class="box-container" id="box-container"> -->
      <div class="push-down-card-list" :class="showCard?'active':'hide'" id="push-down-card-list" :style="{marginTop:disH+'px'}">
        <div class="push-down-card-list-box" id="push_down_card_list_box">
          <div class="push-down-card" :id="'push_down_card'+m" :style="{'--height':cardH+'px'}" v-for="(item,m) in cardList" :class="activeIndex==m?'active':'unactive'" :key="'card_'+m">
            <div @click.stop="choseActive($event,m)" :class="['index'+m,'click_div']" v-show="activeIndex!=m||activeIndex==null">
            </div>
            <div class="jag_up">
              <img :src="sourceUrl+'/image/daily/jag_up.png'"/>
              <div :class="[{active:showBtn},'close_btn']" v-if="activeIndex==m" @click.stop="choseActive($event,-1)"></div>
            </div>
            <div class="card-imgs-info-box">
              <div class="card-imgs-info" :id="'card_imgs_info'+m">
                <div class="index-img-box">
                  <img :src="sourceUrl+item.surl"/>
                  <div class="unclick_div"></div>
                </div>
                <div class="img-box" v-for="(p,n) in item.imgs" :key="'img_'+n">
                  <img :src="sourceUrl+p"/>
                </div>
              </div>
              <div :class="[{active:activeIndex==m},{hide:activeIndex!=m},'card-text-info']">
                <div class="left">
                  <div class="subtit">{{item.subtit}}</div>
                </div>
                <div class="right">
                  <div class="title">{{item.title}}</div>
                  <div class="time">{{item.time}}</div>
                </div>
                <div class="slide">
                  <img :src="sourceUrl+'/image/daily/slide.png'"/>
                </div>
              </div>
            </div>
            <div class="jag_down">
              <img :src="sourceUrl+'/image/daily/jag_down.png'"/>
            </div>
          </div>
        </div>
      </div>
      <div class="push-down-card" id="slide_target" @touchstart.stop="TouchStart" @touchmove.stop="TouchMove" @touchend.stop="TouchEnd">
        <img :src="sourceUrl+'/image/daily/card.png'"/>
      </div>
      <div class="push-down-icon" :class="opacityTrans?'hide':'active'">
        <img :src="sourceUrl+'/image/daily/arrow-down.png'" class="dislocated"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'PushDown',
    data() {
      return{
        timer1:null,
        timer2:null,
        sourceUrl:this.$store.state.sourcRoot,
        back_ground:"url("+this.$store.state.sourcRoot+"/image/daily/detail4/t4.png)",
        back_ground1:"url("+this.$store.state.sourcRoot+"/image/daily/detail3/t3.png)",
        back_ground2:"url("+this.$store.state.sourcRoot+"/image/daily/detail2/t2.png)",
        back_ground3:"url("+this.$store.state.sourcRoot+"/image/daily/detail1/t1.png)",
        back_ground4:"url("+this.$store.state.sourcRoot+"/image/daily/close.png)",
        back_ground5:"url("+this.$store.state.sourcRoot+"/image/daily/jag_center.png)",
        touchStartPagY:0,
        touchEndPagY:0,
        touchStartPagY1:0,
        touchEndPagY1:0,
        moveY:0,
        isTouch:false,
        activeIndex:null,
        containerH:null,
        wrapperH:0,
        isiOS:false,
        isAndroid:false,
        disH:null,
        cardH:0,
        timer:null,
        opacityTrans:false,
        showBtn:false,
        cardList:[
          {
            title:'創刊號驚天大爆料！',
            time:'Mar.14,2022',
            subtit:'DAILY 01',
            surl:'/image/daily/detail1/s1.png',
            turl:'/image/daily/detail1/t1.png',
            imgs:[
              '/image/daily/detail1/01.png',
              '/image/daily/detail1/02.png',
              '/image/daily/detail1/03.png',
              '/image/daily/detail1/04.png',
              '/image/daily/detail1/05.png',
              '/image/daily/detail1/06.png',
              '/image/daily/detail1/07.png',
              '/image/daily/detail1/08.png',
              '/image/daily/detail1/09.png',
              '/image/daily/detail1/10.png',
              '/image/daily/detail1/11.png',
              '/image/daily/detail1/12.png',
              '/image/daily/detail1/13.png',
              '/image/daily/detail1/14.png'
            ],
            show:false
          },
          {
            title:'直擊居家日常小秘密！',
            time:'Jun.16,2022',
            subtit:'DAILY 02',
            surl:'/image/daily/detail2/s2.png',
            turl:'/image/daily/detail2/t2.png',
            imgs:[
              '/image/daily/detail2/01.png',
              '/image/daily/detail2/02.png',
              '/image/daily/detail2/03.png',
              '/image/daily/detail2/04.png',
              '/image/daily/detail2/05.png',
              '/image/daily/detail2/06.png',
              '/image/daily/detail2/07.png',
              '/image/daily/detail2/08.png',
              '/image/daily/detail2/09.png',
              '/image/daily/detail2/10.png',
              '/image/daily/detail2/11.png',
              '/image/daily/detail2/12.png',
              '/image/daily/detail2/13.png',
              '/image/daily/detail2/14.png',
              '/image/daily/detail2/15.png',
              '/image/daily/detail2/16.png',
              '/image/daily/detail2/17.png',
              '/image/daily/detail2/18.png'
            ],
            show:false
          },
          {
            title:'给油厂的秋之回忆！',
            time:'Jun.16,2022',
            subtit:'DAILY 03',
            surl:'/image/daily/detail3/s3.png',
            turl:'/image/daily/detail3/t3.png',
            imgs:[
              '/image/daily/detail3/01.png',
              '/image/daily/detail3/02.png',
              '/image/daily/detail3/03.png',
              '/image/daily/detail3/04.png',
              '/image/daily/detail3/05.png',
              '/image/daily/detail3/06.png',
              '/image/daily/detail3/07.png',
              '/image/daily/detail3/08.png',
              '/image/daily/detail3/09.png',
              '/image/daily/detail3/10.png',
              '/image/daily/detail3/11.png',
              '/image/daily/detail3/12.png',
              '/image/daily/detail3/13.png'
            ],
            show:false
          },
          {
            title:'还没想好',
            time:'Jun.16,2022',
            subtit:'DAILY 04',
            surl:'/image/daily/detail4/s4.png',
            turl:'/image/daily/detail4/t4.png',
            imgs:[
            '/image/daily/detail4/01.png',
            '/image/daily/detail4/02.png',
            '/image/daily/detail4/03.png',
            '/image/daily/detail4/04.png'
            ],
            show:false
          },
        ],
        
      }
    },
    computed:{
      showCard(){
        return this.$store.state.showCard;
      }
    },
    watch:{
      showCard:{
        immediate:true,
        handler(newVal){
          // console.log("newVal",newVal);
          if(newVal==false){
            if(document.getElementById("push_down_card_list_box")){
              // var itemH = document.getElementById("push_down_card_list_box").offsetHeight + targetH/2;
              var itemH = document.getElementById("push_down_card_list_box").offsetHeight;
              this.disH = 0 - itemH;
              this.opacityTrans = false;
            }
          }
        },
        deep:true
      }
    },
    mounted(){
      //判断是ios还是android
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      this.isAndroid = isAndroid;
      this.isiOS = isiOS;
      // console.log("isAndroid",isAndroid);
      // console.log("isiOS",isiOS);
      //进入页面就滑动到底部
      //window.scrollIntoView(false);
      this.$nextTick(()=>{
        this.$store.commit('showcard_off');
        // this.$store.commit('changeback_off');
      })
    },
    methods:{
      TouchStart1(e){
        if(!this.$store.state.showCard)return;
        // let e1 = e.currentTarget;
        // let e2 = e.target;
        // console.log("e1",e1);
        // console.log("e2",e2);
        this.touchStartPagY1 = e.changedTouches[0].pageY;
      },
      TouchMove1(e){
        if(!this.$store.state.showCard)return;
        this.moveY = e.changedTouches[0].pageY;
        this.touchEndPagY1 = e.changedTouches[0].pageY;
        if(Math.abs(this.moveY - this.touchStartPagY1)<1){
          this.isTouch  = false;
          this.touchStartPagY1 = 0;
          this.moveY = 0;
          // console.log("click");
          return;
        }
        else{
          this.isTouch  = true;
          // console.log("move");
          return;
        }

        // let dis = this.touchEndPagY1 - this.touchStartPagY1;
        // var disH = document.getElementById("push-down-card-list").offsetHeight - this.targetH*2/3;
        // if(dis<0&&dis>0-disH){
        //   this.disH = dis;
        //   // console.log("this.disH",this.disH);
        //   //箭头颜色变深 背景变淡
        //   // this.opacityTrans = false;
        //   // this.$store.commit('changeback_off');
        // }
      },
      TouchEnd1(e){
        // if(!this.$store.state.showCard)return;
        // if(!this.isTouch)return;
        // this.touchEndPagY1 = e.changedTouches[0].pageY;
        // var boxH = document.getElementById("push-down-box").offsetHeight - this.targetH/2;
        // var disH = document.getElementById("push-down-card-list").offsetHeight - this.targetH*2/3;
        // if(this.touchEndPagY1 - this.touchStartPagY1 < 0 - boxH*3/4){
        //   //展示 封面票
        //   this.$store.commit('showcard_off');
        //   this.$store.commit('changeback_off');
        //   this.opacityTrans = false;
        //   let endH = 0 - disH;//终点值
        //   this.disH = endH;
        // }
        // else{
        //   //回弹到卡片列表页
        //   this.$store.commit('showcard_on');
        //   this.$store.commit('changeback_on');
        //   this.opacityTrans = true;
        //   //回弹
        //   this.$nextTick(()=>{
        //     let dis = this.touchEndPagY - this.touchStartPagY;
        //     this.disH = 0 - dis;//起始值
        //     // let endH = 0 - boxH*3/4;//终点值
        //     let endH = 0;//终点值
        //     console.log("endH",endH);
        //     console.log("dis",dis);
        //     this.timer = setInterval(() => {
        //       if(this.disH<endH){
        //         this.disH = this.disH + 2;
        //       }
        //       else{
        //         this.disH = endH;
        //         clearInterval(this.timer);
        //       }
        //     }, 10);
        //   });
        // }
      },
      TouchStart(e){
        if(this.$store.state.showCard)return;
        this.touchStartPagY = e.changedTouches[0].pageY;
        var targetH = document.getElementById("slide_target").offsetHeight;
        this.targetH = targetH;
      },
      TouchMove(e){
        if(this.$store.state.showCard)return;
        e.preventDefault();
        this.touchEndPagY = e.changedTouches[0].pageY;
        let dis = this.touchEndPagY - this.touchStartPagY;
        var disH = document.getElementById("push-down-card-list").offsetHeight;
        // console.log("disH",disH);

        if(dis>0){
          this.disH = dis - disH;
          //箭头颜色变淡 背景变深
          this.opacityTrans = true;
          // this.$store.commit('changeback_on');
        }
      },
      TouchEnd(e){
        if(this.$store.state.showCard)return;
        e.preventDefault();
        this.touchEndPagY = e.changedTouches[0].pageY;
        var boxH = document.getElementById("push-down-box").offsetHeight;
        var itemH = document.getElementById("push_down_card_list_box").offsetHeight;
        let distance = boxH - this.targetH;
        // console.log("distance",distance);
       
        if(this.touchEndPagY - this.touchStartPagY > distance/2){
          this.$store.commit('showcard_on');
          this.$nextTick(()=>{
           // this.containerH = boxH>itemH?boxH:itemH;//容器 > 内容 ？
            // this.wrapperH = boxH>itemH?boxH+this.targetH/2:itemH+this.targetH/2;
            // console.log("boxH",boxH);
            // console.log("itemH",itemH);
            this.wrapperH = boxH>itemH?boxH+this.targetH/2:itemH+this.targetH/2;
            this.containerH = boxH>itemH?0:boxH - itemH;
            this.cardH = boxH>itemH?this.wrapperH - this.targetH - this.targetH/10:this.wrapperH - this.targetH - this.targetH/2 + 4;
            this.disH = 0;
            this.scrollInto();
          });
        }
        else if(this.touchEndPagY - this.touchStartPagY<distance/2 && this.touchEndPagY - this.touchStartPagY>0){
          this.$store.commit('showcard_off');
          // this.$store.commit('changeback_off');
          this.opacityTrans = false;
          //回弹
          this.$nextTick(()=>{
            let dis = this.touchEndPagY - this.touchStartPagY;
            this.disH = dis - itemH;//起始值
            // let endH = 0 - itemH + targetH/2;//终点值
            let endH = 0 - itemH;//终点值
            this.timer = setInterval(() => {
              if(this.disH>endH){
                this.disH = this.disH - 2;
              }
              else{
                this.disH = endH;
                clearInterval(this.timer);
              }
            }, 10);
          });
        }
      },
      scrollInto(){
        //var box_container = document.getElementById("box-container");
        //box_container.scrollIntoView(false);
        // box_container.scrollTo(0,0);
        // box_container.scrollTop = 0;
        // this.$forceUpdate();
      },
      choseActive(e,m){
        // console.log("m",m);
        // if(this.isTouch)return;
        // e.stopPropagation();
        var push_down_card_list_box = document.getElementById("push_down_card_list_box");
        var push_down_box = document.getElementById("push-down-box");
        push_down_box.scrollIntoView(true);//滚动到浏览器顶部 false 滚动到浏览器底部
        // push_down_box.scrollTo(0,-54);
        var tmpArr = ['card_imgs_info0','card_imgs_info1','card_imgs_info2','card_imgs_info3'];
        tmpArr.map(item=>{
          var box = document.getElementById(item);
          box.scrollTop = 0;
        })
        if(this.timer1){
          clearTimeout(this.timer1);
        }
        if(this.timer2){
          clearTimeout(this.timer2);
        }
        if(m>-1){
          this.$store.commit('bodyscroll_off');
          this.activeIndex = m;
          this.timer1 = setTimeout(() => {
            this.showBtn = true;
          },1000);
          this.$forceUpdate();
        }
        else{
          this.$store.commit('bodyscroll_on');
          this.activeIndex = null;
          this.showBtn = false;
          this.$forceUpdate();
        }
        if(m==-1){
          //关闭时
          this.timer2 = setTimeout(() => {
            //判断是什么状态
            if(push_down_card_list_box.classList.contains('margintop0')){
              //点击 04 不做处理
            }
            else if(push_down_card_list_box.classList.contains('margintop1')){
              //点击 03 
              push_down_card_list_box.classList.add('margintop0_1');
              push_down_card_list_box.classList.remove('margintop1');
              push_down_card_list_box.classList.remove('margintop2');
              push_down_card_list_box.classList.remove('margintop3');
              push_down_card_list_box.classList.remove('margintop0_2');
              push_down_card_list_box.classList.remove('margintop0_3');
            }
            else if(push_down_card_list_box.classList.contains('margintop2')){
              //点击 02
              push_down_card_list_box.classList.add('margintop0_2');
              push_down_card_list_box.classList.remove('margintop1');
              push_down_card_list_box.classList.remove('margintop2');
              push_down_card_list_box.classList.remove('margintop3');
              push_down_card_list_box.classList.remove('margintop0_1');
              push_down_card_list_box.classList.remove('margintop0_3');
            }
            else if(push_down_card_list_box.classList.contains('margintop3')){
              //点击 01
              push_down_card_list_box.classList.add('margintop0_3');
              push_down_card_list_box.classList.remove('margintop1');
              push_down_card_list_box.classList.remove('margintop2');
              push_down_card_list_box.classList.remove('margintop3');
              push_down_card_list_box.classList.remove('margintop0_1');
              push_down_card_list_box.classList.remove('margintop0_2');
            }
          }, 1000);
        }
        if(m==0){
          push_down_card_list_box.classList.add('margintop0');
          push_down_card_list_box.classList.remove('margintop1');
          push_down_card_list_box.classList.remove('margintop2');
          push_down_card_list_box.classList.remove('margintop3');
          push_down_card_list_box.classList.remove('margintop0_1');
          push_down_card_list_box.classList.remove('margintop0_2');
          push_down_card_list_box.classList.remove('margintop0_3');
        }
        if(m==1){
          push_down_card_list_box.classList.add('margintop1');
          push_down_card_list_box.classList.remove('margintop0');
          push_down_card_list_box.classList.remove('margintop2');
          push_down_card_list_box.classList.remove('margintop3');
          push_down_card_list_box.classList.remove('margintop0_1');
          push_down_card_list_box.classList.remove('margintop0_2');
          push_down_card_list_box.classList.remove('margintop0_3');
        }
        if(m==2){
          push_down_card_list_box.classList.add('margintop2');
          push_down_card_list_box.classList.remove('margintop1');
          push_down_card_list_box.classList.remove('margintop0');
          push_down_card_list_box.classList.remove('margintop3');
          push_down_card_list_box.classList.remove('margintop0_1');
          push_down_card_list_box.classList.remove('margintop0_2');
          push_down_card_list_box.classList.remove('margintop0_3');
        }
        if(m==3){
          push_down_card_list_box.classList.add('margintop3');
          push_down_card_list_box.classList.remove('margintop1');
          push_down_card_list_box.classList.remove('margintop2');
          push_down_card_list_box.classList.remove('margintop0');
          push_down_card_list_box.classList.remove('margintop0_1');
          push_down_card_list_box.classList.remove('margintop0_2');
          push_down_card_list_box.classList.remove('margintop0_3');
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.push-down-box{
  padding:7px 6px 0px;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
  &.iosH{
    // height:908px;
    // height: 956px;
    height: 963px;
  }
  &.androidH{
    height: var(--androidh);
  }
  .head_div{
    height: 48px;
  }
  .push-down-card{
    width:100%;
    position: relative;
    z-index: 1;
    img{
      width:100%;
      display: block;
      margin: 0 auto;
    }
    .push-down-text{
      text-align: center;
      font-family:'syht Bold';
      font-size: 12px;
      line-height: 18px;
      color: #757575;
      margin-top:20px;
    }
  }
  @keyframes opacityTrans {
    from{opacity: 1;}
    to{opacity: 0;}
  }
  @-moz-keyframes opacityTrans{
    from{opacity: 1;}
    to{opacity: 0;}
  }
  @-webkit-keyframes opacityTrans{
    from{opacity: 1;}
    to{opacity: 0;}
  }
  @-o-keyframes opacityTrans{
    from{opacity: 1;}
    to{opacity: 0;}
  }

  @keyframes opacityTrans1 {
    from{opacity: 0;}
    to{opacity: 1;}
  }
  @-moz-keyframes opacityTrans1{
    from{opacity: 0;}
    to{opacity: 1;}
  }
  @-webkit-keyframes opacityTrans1{
    from{opacity: 0;}
    to{opacity: 1;}
  }
  @-o-keyframes opacityTrans1{
    from{opacity: 0;}
    to{opacity: 1;}
  }

  .push-down-icon{
    // width: 21px;
    width: 144px;
    margin: 0 auto;
    margin-top: 4px;
    opacity: 1;
    .dislocated{
      position: fixed;
      width: 144px;
      left: 50%;
      transform: translateX(-50%);
      top:268px;
      z-index:0;
    }
    &.active{
      opacity: 1;
      animation: opacityTrans1 1s ease;
      -moz-animation:opacityTrans1 1s ease;
      -webkit-animation:opacityTrans1 1s ease;
      -o-animation:opacityTrans1 1s ease;
    }
    &.hide{
      opacity: 0;
      animation: opacityTrans 1s ease;
      -moz-animation:opacityTrans 1s ease;
      -webkit-animation:opacityTrans 1s ease;
      -o-animation:opacityTrans 1s ease;
    }
  }
}

@keyframes showLow1 {
  from{height:var(--height);}
  to{height:175px;}
}
@-moz-keyframes showLow1{
  from{height:var(--height);}
  to{height:175px;}
}
@-webkit-keyframes showLow1{
  from{height:var(--height);}
  to{height:175px;}
}
@-o-keyframes showLow1{
  from{height:var(--height);}
  to{height:175px;}
}

@keyframes showHigh1 {
  from{height:175px;}
  to{height:var(--height);}
}
@-moz-keyframes showHigh1{
  from{height:175px;}
  to{height:var(--height);}
}
@-webkit-keyframes showHigh1{
  from{height:175px;}
  to{height:var(--height);}
}
@-o-keyframes showHigh1{
  from{height:175px;}
  to{height:var(--height);}
}

@keyframes showItem {
  from{margin-top: -525px;}
  to{margin-top:0px;}
}
@-moz-keyframes showItem{
  from{margin-top: -525px;}
  to{margin-top:0px;}
}
@-webkit-keyframes showItem{
  from{margin-top: -525px;}
  to{margin-top:0px;}
}
@-o-keyframes showItem{
  from{margin-top: -525px;}
  to{margin-top:0px;}
}

@keyframes hideItem {
  from{margin-top:0px;}
  to{margin-top:-700px;}
}
@-moz-keyframes hideItem{
  from{margin-top:0px;}
  to{margin-top:-700px;}
}
@-webkit-keyframes hideItem{
  from{margin-top:0px;}
  to{margin-top:-700px;}
}
@-o-keyframes hideItem{
  from{margin-top:0px;}
  to{margin-top:-700px;}
}

.push-down-card-list{
  margin-top: -700px;
  &.active{
    margin-top: 0px;
    animation: showItem 1s ease;
    -moz-animation:showItem 1s ease;
    -webkit-animation:showItem 1s ease;
    -o-animation:showItem 1s ease;
  }
  &.hide{
    margin-top: -700px;
    animation: hideItem 1s ease;
    -moz-animation:hideItem 1s ease;
    -webkit-animation:hideItem 1s ease;
    -o-animation:hideItem 1s ease;
  }
  //展开
  @keyframes showContent {
    from{margin-top:0px;}
    to{margin-top:-350px;}
  }
  @-moz-keyframes showContent{
    from{margin-top:0px;}
    to{margin-top:-350px;}
  }
  @-webkit-keyframes showContent{
    from{margin-top:0px;}
    to{margin-top:-350px;}
  }
  @-o-keyframes showContent{
    from{margin-top:0px;}
    to{margin-top:-350px;}
  }

  @keyframes showContent1 {
    from{margin-top:0px;}
    to{margin-top:-525px;}
  }
  @-moz-keyframes showContent1{
    from{margin-top:0px;}
    to{margin-top:-525px;}
  }
  @-webkit-keyframes showContent1{
    from{margin-top:0px;}
    to{margin-top:-525px;}
  }
  @-o-keyframes showContent1{
    from{margin-top:0px;}
    to{margin-top:-525px;}
  }

  @keyframes showContent2 {
    from{margin-top:0px;}
    to{margin-top:-175px;}
  }
  @-moz-keyframes showContent2{
    from{margin-top:0px;}
    to{margin-top:-175px;}
  }
  @-webkit-keyframes showContent2{
    from{margin-top:0px;}
    to{margin-top:-175px;}
  }
  @-o-keyframes showContent2{
    from{margin-top:0px;}
    to{margin-top:-175px;}
  }

  // 收起
  @keyframes hideContent {
    from{margin-top:-350px;}
    to{margin-top:0px;}
  }
  @-moz-keyframes hideContent{
    from{margin-top:-350px;}
    to{margin-top:0px;}
  }
  @-webkit-keyframes hideContent{
    from{margin-top:-350px;}
    to{margin-top:0px;}
  }
  @-o-keyframes hideContent{
    from{margin-top:-350px;}
    to{margin-top:0px;}
  }

  @keyframes hideContent1 {
    from{margin-top:-525px;}
    to{margin-top:0px;}
  }
  @-moz-keyframes hideContent1{
    from{margin-top:-525px;}
    to{margin-top:0px;}
  }
  @-webkit-keyframes hideContent1{
    from{margin-top:-525px;}
    to{margin-top:0px;}
  }
  @-o-keyframes hideContent1{
    from{margin-top:-525px;}
    to{margin-top:0px;} 
  }

  @keyframes hideContent2 {
    from{margin-top:-175px;}
    to{margin-top:0px;}
  }
  @-moz-keyframes hideContent2{
    from{margin-top:-175px;}
    to{margin-top:0px;}
  }
  @-webkit-keyframes hideContent2{
    from{margin-top:-175px;}
    to{margin-top:0px;}
  }
  @-o-keyframes hideContent2{
    from{margin-top:-175px;}
    to{margin-top:0px;}
  }
  

  .push-down-card-list-box{
    &.margintop0{
      margin-top: 0px;
    }
    &.margintop1{
      margin-top: -175px;
      animation: showContent2 1s ease;
      -moz-animation:showContent2 1s ease;
      -webkit-animation:showContent2 1s ease;
      -o-animation:showContent2 1s ease;
    }
    &.margintop2{
      margin-top: -350px;
      animation: showContent 1s ease;
      -moz-animation:showContent 1s ease;
      -webkit-animation:showContent 1s ease;
      -o-animation:showContent 1s ease;
    }
    &.margintop3{
      margin-top: -525px;
      animation: showContent1 1s ease;
      -moz-animation:showContent1 1s ease;
      -webkit-animation:showContent1 1s ease;
      -o-animation:showContent1 1s ease;
    }
    &.margintop0_1{
      margin-top: 0px;
      animation: hideContent2 1s ease;
      -moz-animation:hideContent2 1s ease;
      -webkit-animation:hideContent2 1s ease;
      -o-animation:hideContent2 1s ease;
    }
    &.margintop0_2{
      margin-top: 0px;
      animation: hideContent 1s ease;
      -moz-animation:hideContent 1s ease;
      -webkit-animation:hideContent 1s ease;
      -o-animation:hideContent 1s ease;
    }
    &.margintop0_3{
      margin-top: 0px;
      animation: hideContent1 1s ease;
      -moz-animation:hideContent1 1s ease;
      -webkit-animation:hideContent1 1s ease;
      -o-animation:hideContent1 1s ease;
    }
  }
  .push-down-card{
    width:100%;
    padding: 0px;
    position: relative;

    @keyframes opacityChange {
      0%{opacity: 0;}
      80%{opacity: 0;}
      100%{opacity: 1;}
    }
    @-moz-keyframes opacityChange{
      0%{opacity: 0;}
      80%{opacity: 0;}
      100%{opacity: 1;}
    }
    @-webkit-keyframes opacityChange{
      0%{opacity: 0;}
      80%{opacity: 0;}
      100%{opacity: 1;}
    }
    @-o-keyframes opacityChange{
      0%{opacity: 0;}
      80%{opacity: 0;}
      100%{opacity: 1;}
    }
    .click_div{
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      height: 130px;
      width:calc(100% - 44px);
      position: absolute;
      left: 22px;
      top: 22px;
      z-index: 100;
      border-radius: 7.3px;
      box-shadow: inset 0px 0px 18px rgba(0, 0, 0, 0.5);
      animation: opacityChange 1s ease;
      -moz-animation:opacityChange 1s ease;
      -webkit-animation:opacityChange 1s ease;
      -o-animation:opacityChange 1s ease;
      &.index3{
        background:v-bind(back_ground);
        background-repeat: no-repeat;
        background-size: 100% auto;
      }
      &.index2{
        background:v-bind(back_ground1);
        background-repeat: no-repeat;
        background-size: 100% auto;
      }
      &.index1{
        background:v-bind(back_ground2);
        background-repeat: no-repeat;
        background-size: 100% auto;
      }
      &.index0{
        background:v-bind(back_ground3);
        background-repeat: no-repeat;
        background-size: 100% auto;
      }
    }
    .jag_up,.jag_down{
      width: 100%;
      position: relative;
      z-index: 2;
      img{
        display: block;
        width: 100%;
      }
      .close_btn{
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        width: 40px;
        height: 40px;
        position:absolute;
        right: 25px;
        top: 25px;
        background:v-bind(back_ground4);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .jag_down{
      height: 16px;
      img{
        position: absolute;
        bottom: 0px;
        // margin-top: -1px;
      }
    }
    .jag_up{
      height: 21px;
      img{
        position: absolute;
        top: 0px;
      }
    }
    .card-imgs-info-box{
      background:v-bind(back_ground5);
      background-repeat: no-repeat;
      background-size: 100% auto;
      height:calc(100% - 22px - 16px);
      padding: 0px 22px 0px 22px;
      position: relative;
    }
    .card-imgs-info{
      border-radius: 7.3px;
      width: 100%;
    }
    &.active{
      height:var(--height);
      animation: showHigh1 0.8s ease;
      -moz-animation:showHigh1 0.8s ease;
      -webkit-animation:showHigh1 0.8s ease;
      -o-animation:showHigh1 0.8s ease;
      .card-imgs-info{
        height: calc(100% - 53px);
        overflow-x: hidden;
        overflow-y:auto;
      }
    }
    &.unactive{
      height: 175px;
      animation: showLow1 0.8s ease;
      -moz-animation:showLow1 0.8s ease;
      -webkit-animation:showLow1 0.8s ease;
      -o-animation:showLow1 0.8s ease;
      .card-imgs-info{
        height: calc(100% - 7px);
        overflow: hidden;
      }
    }
    .card-img-box{
      width: 100%;
      height: 130px;
      overflow: hidden;
      border-radius: 7.3px;
      img{
        width:100%;
        display: block;
      }
    }

    .card-imgs-info{
      // height: 568px;
      // border-radius: 7.3px;
      position: relative;
      z-index: 1;
      img{
        border-radius: 7.3px;
        width: 100%;
        display: block;
      }
      .index-img-box{
        width: 100%;
        // height: 100%;
        height:auto;
        display: block;
        border-radius: 7.3px;
        position: relative;
        // box-shadow: inset 0px 0px 18px rgba(0, 0, 0, 0.5);
        &>.unclick_div{
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0px;
          top: 0px;
          border-radius: 7.3px;
          box-shadow: inset 0px 0px 18px rgba(0, 0, 0, 0.5);
        }
        img{
          width: 100%;
          display: block;
          // z-index:-1;
          position: relative;
        }
      }
      .img-box{
        width: 100%;
        height:auto;
        display: block;
        border-radius:0px;
        padding-top:14px;
        img{
          border-radius:0px;
          width: 100%;
          display: block;
        }
      }
    }

    @keyframes showText{
      from{margin-top:-38px;}
      to{margin-top:8px;}
    }
    @-moz-keyframes showText{
      from{margin-top:-38px;}
      to{margin-top:8px;}
    }
    @-webkit-keyframes showText{
      from{margin-top:-38px;}
      to{margin-top:8px;}
    }
    @-o-keyframes showText{
      from{margin-top:-38px;}
      to{margin-top:8px;}
    }

    @keyframes hideText{
      from{margin-top:8px;}
      to{margin-top:-38px;}
    }
    @-moz-keyframes hideText{
      from{margin-top:8px;}
      to{margin-top:-38px;}
    }
    @-webkit-keyframes hideText{
      from{margin-top:8px;}
      to{margin-top:-38px;}
    }
    @-o-keyframes hideText{
      from{margin-top:8px;}
      to{margin-top:-38px;}
    }

    .card-text-info{
      color: #757575;
      height: 38px;
      width: 100%;
      position: relative;
      &.active{
        margin-top: 8px;
        animation: showText 1s ease;
        -moz-animation:showText 1s ease;
        -webkit-animation:showText 1s ease;
        -o-animation:showText 1s ease;
        // opacity: 1;
      }
      &.hide{
        margin-top: -38px;
        animation: hideText 1s ease;
        -moz-animation:hideText 1s ease;
        -webkit-animation:hideText 1s ease;
        -o-animation:hideText 1s ease;
        // opacity:0;
      }
      .slide{
        position: absolute;
        right: 13px;
        width: 24px;
        img{
          width: 24px;
          display: block;
        }
      }
      .left{
        float: left;
        width: 103px;
        .subtit{
          padding-top: 4px;
          font-family:'syht Heavy';
          font-size: 17px;
          line-height: 17px;
        }
      }
      .right{
        float: left;
        .title{
          font-family:'syht Heavy';
          font-size: 16px;
          line-height: 24px;
        }
        .time{
          font-family: "syht Normal";
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
