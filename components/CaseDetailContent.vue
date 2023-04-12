<template>
  <div class="detail-text-content" v-if="caseList&&caseList[caseName]">
    <div class="content-author" v-html="caseList[caseName].contentauthor"></div>
    <div :class="[{black:caseName=='jinyu'},'content-text']" v-if="caseList[caseName].source">
      <div :class="[{paddingtop:item.type=='img'},'source-item']"  v-for="(item,m) in caseList[caseName].source" :key="'source_'+m">
        <div class="img-box" v-if="item.type=='img'">
          <img v-lazy="sourceUrl+item.src"/>
          <div v-if="item.tit" v-html="item.tit"></div>
        </div>
        <video v-else-if="item.type=='video'" controls x5-video-player-type="h5-page" x5-video-orientation="landscape|portrait" webkit-playsinline="true" playsinline="true" :autoplay="item.autoplay" :muted="item.autoplay">
          <source :src="sourceUrl+item.src" type="video/mp4">
        </video>
        <template v-else-if="item.type=='text'">
          <h4 class="content-tit" v-if="item.tit" v-html="item.tit"></h4>
          <p v-for="(p,n) in item.contenttext" :key="'text_'+m+'_'+n" v-html="p"></p>
        </template>
        <template v-else-if="item.type=='tips'">
          <div class="tips" v-html="item.tit"></div>
        </template>
        <template v-else-if="item.type=='tittxt'">
          <div class="tittxt">
            <div class="tit" v-html="item.tit"></div>
            <div class="txt" v-html="item.txt"></div>
          </div>
        </template>
        <template v-else-if="item.type=='blank'">
          <div class="blank"></div>
        </template>
      </div>
    </div>
    <div class="divider">
      <img v-lazy="sourceUrl+'/image/works/divider.png'"/>
    </div>
    <div class="bottom-author" v-if="caseList[caseName].bottomauthor">
      <p v-for="(item,m) in caseList[caseName].bottomauthor" :key="('author_'+m)" v-html="item"></p>
    </div>
  </div>
</template>
<script>
  import cases from '@/static/json/case.json';
  export default {
    name:'CaseDetailContent',
    props:['caseName'],
    data() {
      return{
       caseList:cases,
       sourceUrl:this.$store.state.sourcRoot,
      }
    },
    mounted(){
      // console.log("caseList",this.caseList);
    },
    methods:{
      judgeStatus(event){
        // console.log("event",event);
        // console.log(event.srcElement.src);
        let tmp = event.srcElement.src;
        if(tmp.split('image/loading.png').length>1){
          return 'unactive';
        }
        else{
          return 'active';
        }
      }
    }
  }
</script>
<style lang="scss">
.detail-text-content{
  padding: 11px 18px 0px;
  .content-author{
    // font-size: 12px;
    // line-height: 15px;
    font-size: 10px;
    line-height: 123%;
    letter-spacing: 0.04em;
    color: #9A9A9A;
    padding-bottom: 10px;
    border-bottom: 1px solid #9A9A9A;
    font-family:'syht Normal';
  }
  .content-text{
    font-family:'syht Normal';
    padding-top: 36px;
    font-size: 13px;
    line-height: 21px;
    text-align: justify;
    letter-spacing: 0.04em;
    color: #333333;
    &.black{
      background: #000;
      padding-top: 0px;
    }
    .source-item{
      display: block;
      &.paddingtop{
        padding-top: 8px;
      }
      .img-box{
        img.unactive{
          background: #F5F5F5;
        }
        div{
          color: #333;
          font-size: 13px;
          line-height:163%;
          padding-top: 8px;
        }
      }
      .tips{
        color: #898989;
        text-align: center;
        font-size: 10px;
        line-height: 163%;
        padding-top:8px;
      }
      .tittxt{
        .tit{
          padding: 8px 0px;
          color: #666666;
          font-size: 16px;
          line-height: 163%;
        }
        .txt{
          color: #333333;
          font-size: 13px;
          line-height: 163%;
        }
      }
      .blank{
        height:26px;
      }
      p{
        padding-bottom: 21px;
      }
      .content-tit{
        text-align: center;
        font-weight: bold;
        color: rgb(255, 51, 102);
        font-size:18px;
      }
      img,video{
        width: 100%;
        display: block;
        height: auto;
      }
      video{
        background:#000;
      }
    }
  }
  .divider{
    width: 100%;
    display: block;
    img{
      display: block;
      width: 100%;
    }
  }
  .bottom-author{
    // font-style: normal;
    // font-weight: 400;
    font-family:'syht Medium';
    font-size: 12px;
    line-height: 17px;
    /* or 143% */
    color: #B7B7B7;
    p{
      padding-bottom: 20px;
    }
  }
}
</style>
