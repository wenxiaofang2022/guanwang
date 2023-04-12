<template>
  <div class="swebgl-container">
    <div class="webgl-box">
      <div class="oil_content_box">
        <div class="absolute_box">
          <div class="oil_content" v-if="activeIndex===0">
            <div class="jag_up">
              <img :src="sourcRootUrl+'/image/aboutus/jag_up.png'"/>
            </div>
            <div class="content-box">
              <div class="detail-top-tit">
                <div class="bigtit">
                  <img :src="sourcRootUrl+'/image/aboutus/contact_us_tit01.png'"/>
                </div>
              </div>
              <div class="detail-txt-content">
                <div class="txt">欢迎停靠KASAKII创意给油所，我们坚持以反差的手法洞察和思考，专注于提供颠覆性创意服务和品牌战略，全维度为品牌赋能。业务包含</div>
                <div class="btn-list">
                  <div class="btn" @click="goUrl('/caselist',0)"><span>整合营销<i>+</i></span></div>
                  <div class="btn" @click="goUrl('/caselist',1)"><span>创意表达<i>+</i></span></div>
                  <div class="btn" @click="goUrl('/caselist',2)"><span>互动体验<i>+</i></span></div>
                </div>
              </div>
            </div>
            <div class="jag_down">
              <img :src="sourcRootUrl+'/image/aboutus/jag_down.png'"/>
            </div>
          </div>
          <div class="oil_content" v-if="activeIndex===1">
            <div class="jag_up">
              <img :src="sourcRootUrl+'/image/aboutus/jag_up.png'"/>
            </div>
            <div class="content-box">
              <div class="detail-top-tit">
                <div class="bigtit">
                  <img :src="sourcRootUrl+'/image/aboutus/contact_us_tit02.png'"/>
                  <!-- <div class="bigtit-chinese">业务详情</div>
                  <div class="bigtit-english">OUR service</div> -->
                </div>
              </div>
              <div class="detail-txt-content">
                <img :src="sourcRootUrl+'/image/aboutus/aboutus_tab_2.png'"/>
              </div>
            </div>
            <div class="jag_down">
              <img :src="sourcRootUrl+'/image/aboutus/jag_down.png'"/>
            </div>
          </div>
          <div class="oil_content" v-if="activeIndex===2">
            <div class="jag_up">
              <img :src="sourcRootUrl+'/image/aboutus/jag_up.png'"/>
            </div>
            <div class="content-box">
              <div class="detail-top-tit">
                <div class="bigtit">
                  <img :src="sourcRootUrl+'/image/aboutus/contact_us_tit03.png'"/>
                  <!-- <div class="bigtit-chinese">服务客户</div>
                  <div class="bigtit-english">clientS</div> -->
                </div>
              </div>
              <div class="detail-txt-content">
                <img :src="sourcRootUrl+'/image/aboutus/aboutus_tab_3.png'"/>
              </div>
            </div>
            <div class="jag_down">
              <img :src="sourcRootUrl+'/image/aboutus/jag_down.png'"/>
            </div>
          </div>
          <div class="oil_content" v-if="activeIndex===3">
            <div class="jag_up">
              <img :src="sourcRootUrl+'/image/aboutus/jag_up.png'"/>
            </div>
            <div class="content-box">
              <div class="detail-top-tit">
                <div class="bigtit">
                  <img :src="sourcRootUrl+'/image/aboutus/contact_us_tit04.png'"/>
                  <!-- <div class="bigtit-chinese">所获奖项</div>
                  <div class="bigtit-english">awards</div> -->
                </div>
              </div>
              <div class="detail-txt-content">
                <img :src="sourcRootUrl+'/image/aboutus/aboutus_tab_4.png'"/>
              </div>
            </div>
            <div class="jag_down">
              <img :src="sourcRootUrl+'/image/aboutus/jag_down.png'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="oilbox_nav">
      <div class="oilbox_item" :class="activeIndex==0?'active':''" @click="loadModel(0)">关于我们</div>
      <div class="oilbox_divider"></div>
      <div class="oilbox_item" :class="activeIndex==1?'active':''" @click="loadModel(1)">业务详情</div>
      <div class="oilbox_divider"></div>
      <div class="oilbox_item" :class="activeIndex==2?'active':''" @click="loadModel(2)">服务客户</div>
      <div class="oilbox_divider"></div>
      <div class="oilbox_item" :class="activeIndex==3?'active':''" @click="loadModel(3)">所获奖项</div>
    </div>
    <div class="blank_space"></div>
  </div>
</template>

<script>
export default {
  name: 'aboutusBox',
  data () {
    return {
      prevIndex:0,
      activeIndex:0,
      notfirst:false,
      clickable:true,
      direction:null,
      startLocation:'left',
      prevDis:'0px',
      activeDis:'0px',
      timer:null,
      timer1:null,
      rateTime:this.$store.state.rateTime,
      sourcRootUrl:this.$store.state.sourcRoot,
      back_ground:"url("+this.$store.state.sourcRoot+"/image/aboutus/jag_center.png)",
      back_ground1:"url("+this.$store.state.sourcRoot+"/image/aboutus/aboutus_bottom.png)",
      back_ground2:"url("+this.$store.state.sourcRoot+"/image/aboutus/btn.png)",
      back_ground3:"url("+this.$store.state.sourcRoot+"/image/caselist/option_bg.png)",
      back_ground4:"url("+this.$store.state.sourcRoot+"/image/caselist/checked.png)",
      back_ground5:"url("+this.$store.state.sourcRoot+"/image/caselist/divider.png)",
    }
  },
  watch: {
    
  },
  components: {
    
  },
  mounted () {
    
  },
  methods: {
    loadModel(index){
      if(index==this.activeIndex)return;
      if(!this.clickable)return;
      this.notfirst = true;
      let tmp = this.activeIndex;
      this.prevIndex = tmp;
      this.activeIndex = index;
      let tmpI = this.direction;
      this.direction = null;
      this.clickable = false;
      clearTimeout(this.timer1);
      if(this.prevIndex>this.activeIndex){//向左移动
        //重置为0
        this.startLocation = 'left';
        this.timer = setTimeout(()=>{
          // this.startLocation = null;
          this.direction = 'left';
          // this.clickable = true;
          clearTimeout(this.timer);
        },0)
      }
      else{
        //重置为-100%
        this.startLocation = 'right';
        this.timer = setTimeout(()=>{
          // this.startLocation = null;
          this.direction = 'right';
          // this.clickable = true;
          clearTimeout(this.timer);
        },0)
      }
      //1s后才可以点击其他按钮
      this.timer1 = setTimeout(()=>{
        this.clickable = true;
      },500)
    },
    goUrl(path,index){
      //重置 state
      // loadRate
      this.$store.state.loadRate = 0;
      // rateTime
      this.$store.state.rateTime = 0;
      // this.showNavPoup = null;
      // this.hideNavPoup = false;
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
        if(this.timer1){
          clearTimeout(this.timer1);
        }
        this.timer1 = setTimeout(() => {
          this.$router.push({
            path:path,
            query:{
              activeIndex:index
            }
          });
        },500);
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.swebgl-container{
  // width: 100%;
  width: calc(100% - 46px);
  height:calc(100vh - 55px);
  // height:594px;
  margin: 0 auto;
  position:relative;
  // padding-bottom: 71px;
  padding-bottom: 62px;
  position: relative;
}
.webgl-box{
  width: calc(100% + 46px);
  // height:100%;
  // height: 611px;
  height:100%;
  margin-left: -23px;
  position: relative;
  z-index:100;
  .oil_content_box{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    
    .absolute_box{
      width: 400%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      white-space: nowrap;
      display: flex;
      justify-content: space-between;
      .oil_content{
        width: 25%;
        height: 100%;
        padding-top:5px;
        .jag_up,.jag_down{
          width:336px;
          margin:0 auto;
          img{
            width:100%;
            display:block;
          }
        }
        .jag_down{
          margin-top:-12px;
          position:relative;
          z-index:1;
        }
        .content-box{
          width:336px;
          // height:446px;
          height:calc(100% - 46px);
          background: v-bind(back_ground);
          background-repeat: repeat-y;
          background-position: center;
          background-size:100%;
          margin:0 auto;

          .detail-top-tit{
            padding: 20px 18px 0px;
            .bigtit{
              color: #000;
              overflow: hidden;
              img{
                // height:87px;
                height:64px;
                margin-left:-14px;
                // margin-left:-18px;
              }
              .bigtit-chinese{
                font-size: 34px;
                line-height: 51px;
                font-family:'syht Heavy';
              }
              .bigtit-english{
                font-size: 24px;
                line-height: 28px;
                white-space: nowrap;
                font-family:'aotf Heavy';
                text-transform: uppercase;
              }
            }
          }

          .detail-txt-content{
            width:100%;
            padding:0 11px;
            img{
              width:100%;
              display: block;
            }
            .txt{
              color: #484848;
              font-size: 12px;
              line-height: 146%;
              white-space: pre-wrap;
              padding:0 6px;
              font-family:'syht Normal';
              margin-top:9px;
            }
            .btn-list{
              padding-top:6px;
              .btn{
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                width:309px;
                height:86px;
                background: v-bind(back_ground2);
                background-repeat: no-repeat;
                background-position: center;
                background-size:100%;
                margin-top:9px;
                font-size: 12.9134px;
                line-height: 86px;
                text-align: center;
                color: #FFFFFF;
                font-family:'syht Heavy';
                position:relative;
                cursor: pointer;
                span{
                  position: relative;
                  i{
                    position: absolute;
                    top:0px;
                    font-size: 7.6px;
                    line-height: 10px;
                    font-family:'aotf Heavy';
                    font-style: normal;
                  }
                }
              }
            }
            .itemlist{
              padding:0 6px;
              .listitem{
                padding-top:20px;
                .shortname{
                  color: #9A9A9A;
                  font-size: 10.1256px;
                  line-height: 104%;
                  font-family: "syht Normal";
                }
                .desc{
                  color: #5B5B5B;
                  font-size: 12px;
                  line-height: 139%;
                  font-family: "syht Normal";
                  white-space: pre-wrap;
                }
                .divider{
                  height: 3px;
                  background: #D9D8D8;
                  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.11), inset 0px 1px 1px rgba(241, 240, 240, 0.78), inset 0px -0.5px 1px rgba(0, 0, 0, 0.28);
                  border-radius: 14px;
                  margin-top:3px;
                }
              }
            }
          }
        }
      }
      &.start_right{
        margin-left: -100%;
      }
      &.start_left{
        margin-left: 0px;
      }
      &.notfirst{
        width: 200%;
        .oil_content{
          width: 50%;
        }
      }
    }
  }
}
.oilbox_nav{
  height:38px;
  width:100%;
  background: v-bind(back_ground3);
  background-repeat: no-repeat;
  background-position: center;
  background-size:100%;
  display: flex;
  justify-content: space-between;
  padding-left: 2px;
  padding-top: 1px;
  // margin-top:20px;
  .oilbox_item{
    width:85px;
    height:36px;
    font-family:'syht Heavy';
    font-size: 13.75px;
    color: #D0D0D0;
    text-align: center;
    line-height: 36px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    // cursor: pointer;
    &.active{
      color: #fff;
      background: v-bind(back_ground4);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
    }
  }
  .oilbox_divider{
    width:3px;
    height:100%;
    background: v-bind(back_ground5);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% auto;
    margin-right:3px;
  }
}
.blank_space{
  width: 100%;
  height: 62px;
}
</style>