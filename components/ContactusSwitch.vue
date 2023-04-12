<template>
  <div class="contact-us-switch">
    <div class="switch-btns">
      <div :class="[{active:activeIndex===0},'btn']" @click="activeIndex=0;"><span>一键给油<i>+</i></span></div>
      <div :class="[{active:activeIndex===1},'btn']" @click="activeIndex=1;"><span>加入给油所</span></div>
      <div class="active_bg" :class="activeIndex==0?'leftactive':'rightactive'"></div>
    </div>
    <div class="switch-box">
      <div class="box-item give-box" v-if="activeIndex===0">
        <div class="card-box">
          <div class="stars">
            <div class="star left"></div>
            <div class="star right"></div>
          </div>
          想做酷酷的东西吗？<br/>下brief给卡卅给油所吧！
        </div>
        <div class="info-get">
          <form
            action="https://formspree.io/f/mqkjevep"
            method="POST"
          >
            <div class="company-and-email">
              <div class="company">
                <input placeholder="公司" v-model="subdata.company" @input="changeBreif($event,'company')"/>
              </div>
              <div class="email">
                <input placeholder="邮箱" v-model="subdata.email" @input="changeBreif($event,'email')"/>
              </div>
            </div>
            <div class="brief-box">
              <div class="placeholder-brief" v-if="!subdata.brief&&!showTexArea&&firstBrief" @click="showTexArea=true;">写下需求吧<br/>Write down your brief</div>
              <div class="placeholder-brief" v-if="!subdata.brief&&!showTexArea&&!firstBrief" @click="showTexArea=true;">收到！我们会尽快和你联系！<br/>We got it!<br/>We will reach<br/>you soon!</div>
              <textarea v-model="subdata.brief"  @input="changeBreif($event,'brief')" v-if="subdata.brief||showTexArea" autofocus="true"></textarea>
            </div>
            <div class="send-btn" :class="activeSend?'active':''" v-if="firstBrief" @click="sendMessage">一键给油<i>+</i></div>
            <div class="send-btn" :class="activeSend?'active':''" v-else @click="sendMessage">再写一份<i>+</i></div>
          </form>
        </div>
      </div>
      <div class="box-item join-box" v-if="activeIndex===1">
        <div class="card-box">
        </div>
        <div class="job_list">
          <div class="jag_up">
            <img :src="sourceUrl+'/image/contactus/jag_up1.png'"/>
          </div>
          <div class="job_item" v-for="(item,m) in jobList" :key="'job_item_'+m">
            <div class="job_item_divider" v-show="!item.show">
              <img :src="sourceUrl+'/image/contactus/divider1.png'"/>
            </div>
            <!-- <div v-if="item.show&&m!=jobList.length-1&&m!=0&&!jobList[m-1].show">
              <div class="jag_down" >
                <img :src="sourceUrl+'/image/contactus/jag_down2.png'"/>
              </div>
              <div class="jag_up">
                <img :src="sourceUrl+'/image/contactus/jag_up1.png'"/>
              </div>
            </div> -->
            <div v-if="item.show&&m!=0&&!jobList[m-1].show">
              <div class="jag_down" >
                <img :src="sourceUrl+'/image/contactus/jag_down2.png'"/>
              </div>
              <div class="jag_up">
                <img :src="sourceUrl+'/image/contactus/jag_up1.png'"/>
              </div>
            </div>
            <div class="job_item_content">
              <div class="job_name">
                <div class="job_name_text">{{item.name}}</div>
                <div class="job_english_name">{{item.englishname}}</div>
                <div class="job_btn" :class="item.show?'active':''" @click="changeActiveJob(m)"></div>
              </div>
              <div class="job_desc_box" :class="item.show?'active':'hide'">
                <div class="job_desc">
                  <div :class="[{bigger:desc.indexOf('简历请附作品集')>-1},'desc_item','d'+n]" v-for="(desc,n) in item.descList" :key="'desc_item_'+n"><i></i>{{desc}}</div>
                </div>
              </div>
            </div>
            <div v-if="item.show&&m!=jobList.length-1">
              <div class="jag_down" >
                <img :src="sourceUrl+'/image/contactus/jag_down2.png'"/>
              </div>
              <div class="jag_up">
                <img :src="sourceUrl+'/image/contactus/jag_up1.png'"/>
              </div>
            </div>
          </div>
          <div class="jag_down">
            <img :src="sourceUrl+'/image/contactus/jag_down2.png'"/>
          </div>
        </div>
      </div>
    </div>
    <div class="business_info">
      <div class="info_item">
        <div class="label">商务<br/>Business</div>
        <div class="content">business@kasakii.com</div>
      </div>
      <div class="info_item flex">
        <div class="label">招聘<br/>Recruit</div>
        <div class="content">HR@kasakii.com</div>
      </div>
      <div class="info_item flex">
        <div class="label">电话<br/>Mobile</div>
        <div class="content">+86 19117119493</div>
      </div>
    </div>
    <div class="office_info">
      <div class="info_item flex">
        <div class="label">中国<br/>China</div>
        <div class="content">
          <div class="chinese">上海市徐汇区阳光滨江中心南楼</div>
          <!-- <div class="english">No. 1441, Wanping Road, Kaibin Road, Xuhui District, Shanghai, China</div> -->
          <div class="english">
            <img :src="sourceUrl+'/image/contactus/location.png'"/>
          </div>
        </div>
      </div>
      <div class="info_item flex">
        <div class="label">新加坡<br/>Singapore</div>
        <div class="content">
          <div class="only_english">16 shaw rd., #03-03, kin building, 367954</div>
        </div>
      </div>
    </div>
    <div class="platform_list">
      <div class="platform_links">
        <div class="link_item">
          <a href="https://www.behance.net/binliu6"></a>
        </div>
        <div class="link_item">
          <a class="wechat-box" @click="headNavFn">
            
          </a>
        </div>
        <div class="link_item">
          <a href="https://feellar.zcool.com.cn/"></a>
        </div>
        <div class="link_item">
          <a href="https://www.digitaling.com/company/projects/25234"></a>
        </div>
      </div>
      <img :src="sourceUrl+'/image/contactus/platform_logo.png'"/>
    </div>
    <div class="hover-box" v-if="showNavPoup">
      <div class="hover-box-bg" @click="headNavFn" :class="showNavPoup?'active':'hide'"></div>
      <div class="hover-box-content">
        <img :src="sourceUrl+'/image/contactus/wechat.png'"/>
      </div>
    </div>
    <CreativeAlert :showAlert="showAlert" @closemodal="CloseModal"/>
  </div>
</template>
<script>
  import axios from 'axios';
  import jobs from '@/static/json/job.json'
  export default {
    name:'ContactusSwitch',
    components: {
      CreativeAlert:()=>import('@/components/CreativeAlert')
    },
    data() {
      return{
       showNavPoup:false,
       sourceUrl:this.$store.state.sourcRoot,
       back_ground:"url("+this.$store.state.sourcRoot+"/image/contactus/btns-bg.svg)",
       back_ground1:"url("+this.$store.state.sourcRoot+"/image/contactus/active-btn.png)",
       back_ground2:"url("+this.$store.state.sourcRoot+"/image/contactus/brief-bg.svg)",
       back_ground3:"url("+this.$store.state.sourcRoot+"/image/contactus/star.svg)",
       back_ground4:"url("+this.$store.state.sourcRoot+"/image/contactus/send-default.png)",
       back_ground5:"url("+this.$store.state.sourcRoot+"/image/contactus/send-active.png)",
       back_ground6:"url("+this.$store.state.sourcRoot+"/image/contactus/join-text.png)",
       back_ground7:"url("+this.$store.state.sourcRoot+"/image/contactus/job_bg.jpg)",
       back_ground8:"url("+this.$store.state.sourcRoot+"/image/contactus/status_off.png)",
       back_ground9:"url("+this.$store.state.sourcRoot+"/image/contactus/status_on.png)",
       showAlert:false,
       activeSend:false,
       firstBrief:true,
       activeIndex:0,
       showTexArea:false,
       subdata:{
        company:null,
        email:null,
        brief:null
       },
       jobList:jobs
      }
    },
    mounted(){
      // console.log("jobs",jobs);
    },
    methods:{
      CloseModal(){
        this.showAlert = false;
      },
      changeActiveJob(m){
        //item.show=!item.show
        this.jobList.map((item,n)=>{
          if(m==n){
            item.show = !item.show;
          }
          else{
            item.show = false;
          }
        })
        
      },
      changeBreif(event,name){
        // console.log(event);
        // console.log(name);
        if(this.subdata.company&&this.subdata.email&&this.subdata.brief){
          this.activeSend = true;
        }
      },
      // 发送邮件
      sendMessage() {
        if(!this.subdata.company||!this.subdata.email||!this.subdata.brief){
          return;
        }
        //提前校验
        var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!pattern.test(this.subdata.email)){
          this.showAlert = true;
          return;
        }
        //var email_Regex = new RegExp('^.+@[A-Z0-9a-z]+\.[a-zA-Z]+$');
        // email_Regex.test(this.subdata.email);
        // if(!this.subdata.company){

        // }
        // else if(!this.subdata.email){

        // }
        // else if(!this.subdata.brief){

        // }
        let that = this;
        axios({
            method:'POST',
            url:'https://formspree.io/f/mqkjevep',
            data:this.subdata,
            params:null,
            baseURL: '',
            headers: {},
            /**end */
            withCredentials:false,
        })
        .then(function (res){
          // console.log("res",res);
          if(that.firstBrief){
            that.firstBrief = false;
          }
          that.activeSend = false;
          //清空数据
          that.subdata.company = null;
          that.subdata.email = null;
          that.subdata.brief = null;
          that.showTexArea = false;
        })
        .catch(function (err){
          // console.log("err",err);
        })
      },

      headNavFn(){
        this.showNavPoup = !this.showNavPoup;
      },
    }
  }
</script>
<style lang="scss">
@keyframes goLeft {
  from{left: 50%;}
  to{left: 0%;}
}
@keyframes goRight {
  from{left: 0%;}
  to{left: 50%;}
}
@-moz-keyframes goLeft{
  from{left: 50%;}
  to{left: 0%;}
}
@-moz-keyframes goRight{
  from{left: 0%;}
  to{left: 50%;}
}
@-webkit-keyframes goLeft{
  from{left: 50%;}
  to{left: 0%;}
}
@-webkit-keyframes goRight{
  from{left: 0%;}
  to{left: 50%;}
}
@-o-keyframes goLeft{
  from{left: 50%;}
  to{left: 0%;}
}
@-o-keyframes goRight{
  from{left: 0%;}
  to{left: 50%;}
}

@keyframes showInfo {
  from{height: 0px;}
  to{height: auto;}
}
@-moz-keyframes showInfo{
  from{height: 0px;}
  to{height: auto;}
}
@-webkit-keyframes showInfo{
  from{height: 0px;}
  to{height: auto;}
}
@-o-keyframes showInfo{
  from{height: 0px;}
  to{height:auto;}
}

@keyframes hideInfo {
  from{height: auto;}
  to{height: 0px;}
}
@-moz-keyframes hideInfo{
  from{height: auto;}
  to{height: 0px;}
}
@-webkit-keyframes hideInfo{
  from{height: auto;}
  to{height: 0px;}
}
@-o-keyframes hideInfo{
  from{height: auto;}
  to{height: 0px;}
}

.contact-us-switch{
  // padding:31px 18px 20px;
  padding:20px 18px 20px;
  width: 100%;
  .switch-btns{
    width:100%;
    height: 44px;
    background: v-bind(back_ground);
    background-repeat:no-repeat;
    background-size: 100% auto;
    display: flex;
    justify-content: space-between;
    // padding-top: 1px;
    position: relative;
    .btn{
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      width: 50%;
      height:100%;
      line-height: 44px;
      text-align: center;
      font-size: 18px;
      color: #B3B3B3;
      // color:#fff;
      font-family:'syht Heavy';
      position:relative;
      z-index: 1;
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
      &.active{
        // color: #F1EFF2;
        color:#fff;
      }
    }
    .active_bg{
      position:absolute;
      z-index: 0;
      width: 50%;
      height:100%;
      background: v-bind(back_ground1);
      background-repeat: no-repeat;
      background-color: transparent;
      background-size:100% 100%;
      left:0px;
      // top:0px;
      top: 0.5px;
      &.leftactive{
        left:0px;
        animation: goLeft 0.5s 1;
        -moz-animation:goLeft 0.5s 1;
        -webkit-animation:goLeft 0.5s 1;
        -o-animation:goLeft 0.5s 1;
      }
      &.rightactive{
        left:50%;
        animation: goRight 0.5s 1;
        -moz-animation:goRight 0.5s 1;
        -webkit-animation:goRight 0.5s 1;
        -o-animation:goRight 0.5s 1;
      }
    }
  }

  .switch-box{
    margin-top: 20px;
    .box-item{
      &.give-box{
        .card-box{
          width: 100%;
          height: 96px;
          background: v-bind(back_ground2);
          background-repeat: no-repeat;
          background-size:100%;
          font-size: 17px;
          line-height:20px;
          text-align: center;
          font-family:'syht Heavy';
          color: #313131;
          padding-top:28px;
          .stars{
            position: relative;
            .star{
              width: 27px;
              height: 27px;
              background: v-bind(back_ground3);
              background-repeat: no-repeat;
              background-size: 100%;
              position: absolute;
              top: 6px;
              &.left{
                left: 17px;
              }
              &.right{
                right: 17px;
              }
            }
          }
        }
        .info-get{
          margin-top: 20px;
          .company-and-email{
            height: 36px;
            display: flex;
            justify-content: space-between;
            &>div{
              width: 166px;
              height: 36px;
              background: #D9D9D9;
              border-radius: 5px;
              overflow: hidden;
              padding-left: 12px;
              background: #D9D9D9;
              box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.23);
              border-radius: 5px;
              input{
                outline-style: none;
                width:100%;
                height: 100%;
                border: none;
                background: #D9D9D9;
                font-size: 16px;
                line-height: 36px;
                font-family:'syht Heavy';
                color: #B3B3B3;
                color: #313131;
                background: #D9D9D9;
                background: transparent;
              }
            }
          }
          .brief-box{
            margin-top: 10px;
            width: 100%;
            height: 321px;
            background: #D9D9D9;
            border-radius: 5px;
            position: relative;
            box-shadow: inset 0px 2px 4px rgb(0 0 0 / 25%);
            border-radius: 5px;
            padding: 20px;
            .placeholder-brief{
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              font-family:'syht Heavy';
              font-size: 35px;
              letter-spacing: -0.01em;
              // line-height: 41px;
              line-height:95%;
              color: #B3B3B3;
              text-transform: uppercase;
              // padding: 0px 32px;
              padding: 0px 12px;
              text-align: center;
              background: #D9D9D9;
              // box-shadow: inset 0px 2px 4px rgb(0 0 0 / 25%);
              // border-radius: 5px;
              // height: 100%;
              // width: 100%;
              width: 98%;
              height: auto;
              position: absolute;
              left:50%;
              top:50%;
              transform: translateY(-50%) translateX(-50%);
            }
            textarea{
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              // padding: 20px;
              border-radius: 5px;
              background: #D9D9D9;
              outline-style: none;
              width:100%;
              height: 100%;
              border: none;
              font-size: 16px;
              color: #313131;
              font-family:'syht Heavy';
              // letter-spacing: -0.01em;
              //box-shadow: inset 0px 2px 4px rgb(0 0 0 / 25%);
              border-radius: 5px;
              display: block;
            }
          }
          .send-btn{
            // width: 183px;
            // height: 46px;
            // margin: 0 auto;
            // margin-top: 20px;
            // background: url('/image/contactus/active-btn.png') no-repeat;
            // background-size:100% 100%;
            // color: #F1EFF2;
            // text-align: center;
            // line-height: 44px;
            // font-size: 18px;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            width:342px;
            height: 98px;
            background: v-bind(back_ground4);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin: 0 auto;
            margin-top: 20px;
            // font-style: normal;
            // font-weight: 900;
            font-family:'syht Heavy';
            font-size: 19px;
            text-align: center;
            line-height: 96px;
            color: #B3B3B3;
            &.active{
              background: v-bind(back_ground5);
              background-repeat: no-repeat;
              background-size: 100% 100%;
              color:#fff;
            }
            i{
              font-style: normal;
            }
          }
        }
      }
      &.join-box{
        .card-box{
          width: 100%;
          // background: url("/image/contactus/join-text.svg") no-repeat;
          background: v-bind(back_ground6);
          background-repeat: no-repeat;
          height: 255px;
          background-size: 100% 255px;
        }
        .job_list{
          .jag_up{
            width: 100%;
            height: auto;
            img{
              display: block;
              width:100%;
            }
          }
          .jag_down{
            width: 100%;
            height: auto;
            margin-top: -1px;
            img{
              display: block;
              width:100%;
              // transform: rotateX(180deg);
            }
          }
          .job_item{
            margin-top:-1px;
            .job_item_content{
              // background:#D9D9D9;
              // background: rgba(221,221,220,1);
              // box-shadow: -2px 0px 3px -2px rgba(221,221,220,1) inset,0px 0px 0px 0px transparent,0px 0px 0px 0px transparent,2px 0px 3px -4px transparent inset;
              // padding: 15px 0px;
              width:100%;
              background: v-bind(back_ground7);
              background-repeat: repeat-y;
              background-size: 100% auto;
              // background: url("/image/contactus/job_bg1.png");
              // background-size: 100% 100%;
              // background-repeat: no-repeat;
              margin-top:-1px;
              .job_name{
                // padding: 5px 12px 7px 20px;
                padding: 15px 12px 15px 20px;
                // border-bottom: 1px solid #313131;
                position:relative;
                .job_name_text{
                  // font-style: normal;
                  // font-weight: 900;
                  font-family:'syht Heavy';
                  font-size: 23px;
                  line-height: 26px;
                  color: #313131;
                }
                .job_english_name{
                  // font-style: normal;
                  // font-weight: 900;
                  font-family:'syht Heavy';
                  font-size: 12px;
                  line-height: 13px;
                  color: #313131;
                  margin-top: 5px;
                  text-transform: uppercase;
                }
                .job_btn{
                  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                  // width:80px;
                  // height: 40px;
                  // line-height:40px;
                  position:absolute;
                  right:12px;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 75px;
                  height: 50px;
                  background: v-bind(back_ground8);
                  background-repeat: no-repeat;
                  background-size: 100% auto;
                  &.active{
                    background: v-bind(back_ground9);
                    background-repeat: no-repeat;
                    background-size: 100% auto;
                  }
                }
              }
              .job_desc_box{
                &.active{
                  // animation: showInfo 1s ease;
                  // -moz-animation:showInfo 1s ease;
                  // -webkit-animation:showInfo 1s ease;
                  // -o-animation:showInfo 1s ease;
                  height: auto;
                  .d0{
                      animation: 1s ease 0.1s 1 normal both running fadeInUp;
                  }
                  .d1{
                      animation: 1s ease 0.2s 1 normal both running fadeInUp;
                  }
                  .d2{
                      animation: 1s ease 0.3s 1 normal both running fadeInUp;
                  }
                  .d3{
                      animation: 1s ease 0.4s 1 normal both running fadeInUp;
                  }
                  .d4{
                      animation: 1s ease 0.5s 1 normal both running fadeInUp;
                  }
                  .d5{
                      animation: 1s ease 0.6s 1 normal both running fadeInUp;
                  }
                  .d6{
                      animation: 1s ease 0.7s 1 normal both running fadeInUp;
                  }
                  .d7{
                      animation: 1s ease 0.8s 1 normal both running fadeInUp;
                  }
                  .d8{
                      animation: 1s ease 0.9s 1 normal both running fadeInUp;
                  }
                  .d9{
                      animation: 1s ease 1.0s 1 normal both running fadeInUp;
                  }
                }
                &.hide{
                  animation: hideInfo 1s ease;
                  -moz-animation:hideInfo 1s ease;
                  -webkit-animation:hideInfo 1s ease;
                  -o-animation:hideInfo 1s ease;
                  height:0px;
                  .d0{
                    animation: 2s ease 0.1s 1 normal both running fadeOut;
                  }
                  .d1{
                      animation: 1s ease 0.2s 1 normal both running fadeOut;
                  }
                  .d2{
                      animation: 1s ease 0.3s 1 normal both running fadeOut;
                  }
                  .d3{
                      animation: 1s ease 0.4s 1 normal both running fadeOut;
                  }
                  .d4{
                      animation: 1s ease 0.5s 1 normal both running fadeOut;
                  }
                  .d5{
                      animation: 1s ease 0.6s 1 normal both running fadeOut;
                  }
                  .d6{
                      animation: 1s ease 0.7s 1 normal both running fadeOut;
                  }
                  .d7{
                      animation: 1s ease 0.8s 1 normal both running fadeOut;
                  }
                  .d8{
                      animation: 1s ease 0.9s 1 normal both running fadeOut;
                  }
                  .d9{
                      animation: 1s ease 1.0s 1 normal both running fadeOut;
                  }
                  // padding:17px 12px 4px;
                }
                overflow: hidden;
                .job_desc{
                  padding:17px 12px 4px;
                }
                
                @-webkit-keyframes fadeOut{
                  0%{opacity:1;}
                  100%{opacity:0;}
                }
                @keyframes fadeOut{
                  0%{opacity:1;}
                  100%{opacity:0;}
                }
                @-webkit-keyframes fadeOut{
                  0%{opacity:1;}
                  100%{opacity:0;}
                }
                @keyframes fadeOut{
                  0%{opacity:1;}
                  100%{opacity:0;}
                }
                
                @-webkit-keyframes fadeInUp{
                    0%{opacity:0;transform:translate3d(0,100%,0)}
                    100%{opacity:1;transform:none}
                    // 0%{opacity:0;}
                    // 100%{opacity:1;}
                }
                @keyframes fadeInUp{
                    0%{opacity:0;transform:translate3d(0,100%,0)}
                    100%{opacity:1;transform:none}
                    // 0%{opacity:0;}
                    // 100%{opacity:1;}
                }
                @-webkit-keyframes fadeInDown{
                    0%{opacity:0;transform:translate3d(0,-100%,0)}
                    100%{opacity:1;transform:none}
                    // 0%{opacity:0;}
                    // 100%{opacity:1;}
                }
                @keyframes fadeInDown{
                    0%{opacity:0;transform:translate3d(0,-100%,0)}
                    100%{opacity:1;transform:none}
                    // 0%{opacity:0;}
                    // 100%{opacity:1;}
                }
                .desc_item{
                  // font-style: normal;
                  // font-weight: 400;
                  font-family: "syht Normal";
                  font-size: 13px;
                  line-height:22px;
                  color: #313131;
                  position: relative;
                  padding-left: 16px;
                  &.bigger{
                    font-family:'syht Bold';
                  }
                  i{
                    width: 3.6px;
                    height: 3.6px;
                    border-radius: 50%;
                    background-color:#313131;
                    position: absolute;
                    left:8px;
                    top: 10px;
                  }
                }
              }
            }
            .job_item_divider{
              // width:calc(100% - 24px);
              // height: 1px;
              // background: #333;
              // margin: 0 auto;
              // margin-top: -1px;
              width: 100%;
              width:calc(100% - 1.5px);
              margin:0 auto;
              img{
                width:100%;
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .business_info{
    .info_item{
      padding-top: 7px;
      border-bottom: 1px solid #B3B3B3;
      &.flex{
        display: flex;
        justify-content: space-between;
      }
      .label{
        font-size: 10px;
        line-height:11px;
        color: #9A9A9A;
        font-family: "syht Normal";
        padding-top: 5px;
      }
      .content{
        font-family:'syht Heavy';
        line-height: 29px;
        font-size:27px;
        color: #313131;
        text-transform: uppercase;
        padding-bottom: 3px;
        text-align:right;
      }
    }
  }
  .office_info{
    margin-top: 27px;
    .info_item{
      padding-top: 9.6px;
      border-bottom: 1px solid #B3B3B3;
      &.flex{
        display: flex;
        justify-content: space-between;
      }
      .label{
        font-size: 10px;
        line-height:11px;
        color: #9A9A9A;
        font-family: "syht Normal";
        padding-top: 5px;
      }
      .content{
        text-align: right;
        text-transform: uppercase;
        color: #313131;
        .chinese{
          font-family:'syht Heavy';
          font-size: 12px;
          line-height:12px;
        }
        .english{
          font-family:'syht Heavy';
          font-size: 7px;
          line-height: 16px;
          height:16px;
          img{
            display: block;
            height: 8px;
            margin-top: 7px;
          }
        }
        .only_english{
          font-size: 10px;
          line-height: 16px;
          font-family:'syht Heavy';
          padding-top: 11px;
          padding-bottom: 12px;
        }
      }
    }
  }
  .platform_list{
    margin-top:27px;
    position:relative;
    img{
      width:100%;
    }
    .platform_links{
      position:absolute;
      // width:100%;
      width:calc(100% + 40px);
      transform: translateX(-20px);
      height:100%;
      display: flex;
      justify-content: space-between;
      .link_item{
        cursor: pointer;
        a{
          width:100%;
          height:100%;
          display: block;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        &:nth-child(1){
          width: 20%;
        }
        &:nth-child(2){
          width: 22%;
        }
        &:nth-child(3){
          width: 33%;
        }
        &:nth-child(4){
          width: 25%;
        }
        .wechat-box{
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
      }
    }
  }

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

  .hover-box{
    position:fixed;
    // width:100vw;
    width:375px;
    height:100vh;
    top:0px;
    left:0px;
    .hover-box-bg{
      width:100%;
      height:100%;
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
    .hover-box-content{
      width:60vw;
      height:60vw;
      position: absolute;
      left:50%;
      top:50%;
      transform: translateX(-50%) translateY(-50%);
      img{
        width:100%;
        display: block;
      }
    }
  }
}
</style>
