<template>
  <div class="banner-oil-box" id="banner-oil-box">
    <div class="webgl-banner-container">
      <div id="webglDom_banner" ref="webglDom_banner"></div>
      <div class="sticker-box">
        <div :class="[{active:stickerIndex===m},{prev:stickerPrevIndex===m},{next:stickerNextIndex===m},'sticker-img']" v-for="(item,m) in stickerList" :key="'sticker_'+m">
          <img :src="sourceUrl+item"/>
        </div>
      </div>
      <div class="banner-btns">
        <div class="left-btn btn" @click="showSticker($event,'next')"></div>
        <div class="right-btn btn" @click="showSticker($event,'prev')"></div>
      </div>
    </div>
    <div class="fog-box"></div>
  </div>
</template>

<script>
// 引入threejs核心模块
import * as THREE from "three"
// 引入OrbitControls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
// 引入GLTFLoader
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import gsap from "gsap"; 
export default {
  name: 'BannerOilBox',
  data () {
    return {
      clickable:true,
      pivotPoint:null,
      group:null,
      scene: null,
      camera: null,
      renderer: null,
      textloader: null,
      width: 0,
      height: 0,
      onPointerDownPointerX:0,
      onPointerDownPointerY:0,
      // rotationZ:Math.PI/2,
      rotationZ:Math.PI,
      meshList:[],
      stickerIndex:null,//默认贴纸坐标
      stickerNextIndex:null,//下一个
      stickerPrevIndex:null,//上一个
      sourceUrl:this.$store.state.sourcRoot,
      stickerList:['/caseimg/01.png','/caseimg/02.png','/caseimg/03.png','/caseimg/04.png','/caseimg/05.png',
      '/caseimg/06.png','/caseimg/07.png','/caseimg/08.png','/caseimg/09.png','/caseimg/10.png','/caseimg/11.png',
      '/caseimg/12.png','/caseimg/13.png','/caseimg/14.png','/caseimg/15.png','/caseimg/16.png','/caseimg/17.png',
      '/caseimg/18.png','/caseimg/19.png','/caseimg/20.png','/caseimg/21.png','/caseimg/22.png','/caseimg/23.png',
      '/caseimg/24.png','/caseimg/25.png','/caseimg/26.png','/caseimg/27.png','/caseimg/28.png',
      // '/caseimg/29.png',
      '/caseimg/30.png'
      ],
      indexPage:{
        0:"lego",1:"city",2:"jinyu",3:"tmall",4:"changjiang",5:"tokyo2020",
        6:"vans",7:"nostop",8:"fliggy",9:"heydesign",10:"tmall2",11:"farfetch",
        12:"goodlife",13:"nostop2021",14:"utalent",15:"tmallnew",16:"taobaotop",
        17:"oppoo.moji",18:"ali.apsara",19:"mixplace",20:"vipfarfetch",21:"taobao2022",
        22:"taobao.superwindow",23:"mcdonald.nft",24:"taobao.memory",25:"tmall.live",
        26:"apsara.2020",27:"ali.adic",
        // 28:"apsara.2022",
        29:"tmall.global"
      },
      pageIndex:[
        "lego","city","jinyu","tmall","changjiang","tokyo2020","vans","nostop","fliggy",
        "heydesign","tmall2","farfetch","goodlife","nostop2021","utalent","tmallnew",
        "taobaotop","oppoo.moji","ali.apsara","mixplace","vipfarfetch","taobao2022",
        "taobao.superwindow","mcdonald.nft","taobao.memory","tmall.live","apsara.2020",
        "ali.adic",
        //"apsara.2022",
        "tmall.global"
      ],
      // onPointerDownLon:0,
      // onPointerDownLat:0,
      back_ground:"url("+this.$store.state.sourcRoot+"/image/aboutus/arrow-right.png)",
    }
  },
  watch: {
    
  },
  mounted () {
    //确定 stickerIndex 的默认值
    this.pageIndex.map((item,index)=>{
      // console.log("caselistitem",'/caselist/'+item);
      console.log("this.$route.path",this.$route.path);
      if('/caselist/'+item+'/'==this.$route.path||'/caselist/'+item==this.$route.path){
        // console.log('aaa',this.$route.path);
        // this.stickerIndex = index;
        if(index==0){
          this.stickerIndex = this.stickerList.length-1;
        }
        // else if(index==this.stickerList.length-1){
        //   this.stickerIndex = index - 1;
        // }
        else{
          this.stickerIndex = index - 1;
        }
        this.showSticker(null,'next');
      }
    })
    this.$nextTick(this.init);
  },
  methods: {
    showSticker(event,type){
      if(!this.clickable)return;
      this.clickable = false;
      if(event){
        event.stopPropagation();
      }
      if(type=='next'){
        this.rotationZ = this.rotationZ - Math.PI/2;
        if(this.stickerIndex+1 > this.stickerList.length-1){
          this.stickerIndex = 0;
        }
        else{
          this.stickerIndex = this.stickerIndex+1;
        }
      }
      else if(type=='prev'){
        this.rotationZ = this.rotationZ + Math.PI/2;
        if(this.stickerIndex-1>-1){
          this.stickerIndex = this.stickerIndex-1;
        }
        else{
          this.stickerIndex = this.stickerList.length-1;
        }
      }
      //前一个和后一个
      if(this.stickerIndex + 1 > this.stickerList.length-1){
        this.stickerNextIndex = 0;
      }
      else{
        this.stickerNextIndex = this.stickerIndex + 1;
      }
      if(this.stickerIndex == 0){
        this.stickerPrevIndex = this.stickerList.length - 1;
      }
      else{
        this.stickerPrevIndex = this.stickerIndex - 1;
      }

      // gsap.to(this.scene.rotation,{z:this.rotationZ,duration:1});
      // let tmp = Math.abs((this.rotationZ/(Math.PI/2))%4);
      // console.log("this.rotationZ",this.rotationZ);
      // console.log("tmp",tmp);
      this.meshList.map((mesh)=>{
        // mesh.rotation.set(1.56,0.1,this.rotationZ);
        gsap.to(mesh.rotation,{z:this.rotationZ,duration:0.9});
        // if((tmp>0&&tmp<1)||tmp==0){
        //   gsap.to(mesh.rotation,{x:1.52,y:0.14,z:this.rotationZ,duration:1});
        // }
        // else if((tmp>1&&tmp<2)||tmp==1){
        //   gsap.to(mesh.rotation,{x:1.54,y:0.11,z:this.rotationZ,duration:1});
        // }
        // else if((tmp>2&&tmp<3)||tmp==2){
        //   gsap.to(mesh.rotation,{x:1.58,y:0.11,z:this.rotationZ,duration:1});
        // }
        // else if((tmp>3&&tmp<4)||tmp==3){
        //   gsap.to(mesh.rotation,{x:1.55,y:0.14,z:this.rotationZ,duration:1});
        // }
      })

      //修改path
      // console.log("this.stickerIndex",this.stickerIndex);
      let tmppath = this.pageIndex[this.stickerIndex];
      // console.log("tmppath",tmppath);
      this.$router.push({
        path:'/caselist/'+tmppath,
        replace:true
      });

      //防止重复点击
      this.timer = setTimeout(()=>{
        this.clickable = true;
      },1000)
      // if(this.stickerIndex==5){
      //   console.log("type",type);
      //   console.log("this.stickerList.length",this.stickerList.length);
      //   console.log("stickerPrevIndex",this.stickerPrevIndex);
      //   console.log("stickerIndex",this.stickerIndex);
      //   console.log("stickerNextIndex",this.stickerNextIndex);
      // }
    },
    init () {
      // 初始化画布宽高
      const container = this.$refs.webglDom_banner;
      this.width = container.offsetWidth;
      this.height = container.offsetHeight;

      // 场景
      this.scene = new THREE.Scene();
      // this.scene.fog = new THREE.Fog(0x005577, 1, 2800)
      // this.scene.fog = new THREE.Fog(0xffffff, 1, 2800)
      this.textloader = new THREE.TextureLoader();

      // 相机
      //this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
      this.camera = new THREE.OrthographicCamera( this.width / - 2, this.width / 2, this.height / 2, this.height / - 2, 1, 1000); //正投影相机
      // this.camera.position.set(860, 470, 720);
      this.camera.position.set(600, 100, 100);
      // this.camera.rotation.set(1.52,0.14,0);
      // this.camera.up = new THREE.Vector3(1, 0, 0);
      this.add(this.camera);
      this.camera.lookAt(this.scene.position);

      this.group = new THREE.Group();

      //添加转轴
      this.pivotPoint = new THREE.Object3D();
      this.pivotPoint.position.set(0,0,0);
 
      this.scene.add(this.pivotPoint);

      // AxesHelper 三维坐标轴
      // let axisHelper = new THREE.AxesHelper(100, 100);
      // this.add(axisHelper);

      // const axesHelper = new THREE.AxesHelper(700);
      // this.add(axesHelper);

      // 添加灯光
      this.addLight();
      // this.addBox();
      this.loadModel();

      // 渲染器
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      })

      // this.renderer.physicallyCorrectLights = true;
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;//aces标准
      this.renderer.toneMappingExposure = 1.0;//色调映射曝光度
      this.renderer.shadowMap.enabled = true;//阴影就不用说了
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;//阴影类型（处理运用Shadow Map产生的阴影锯齿）
      // this.textureEncoding = THREE.sRGBEncoding;

      // this.renderer.setClearColor(new THREE.Color('#000000'), 0);
     
      // this.renderer.outputEncoding = THREE.sRGBEncoding;

      this.renderer.setClearColor(new THREE.Color('#ffffff'), 1);

      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setSize(this.width, this.height);
      document.getElementById("webglDom_banner").appendChild(this.renderer.domElement);

      const environment = new RoomEnvironment();

      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      this.scene.environment = pmremGenerator.fromScene(environment).texture;

      //事件
      //document.getElementById("webglDom_banner").addEventListener('click', onDocumentClick, false);
      document.getElementById("banner-oil-box").addEventListener('mousedown', this.onDocumentMouseDown, false);
      document.getElementById("banner-oil-box").addEventListener('mousemove', this.onDocumentMouseMove, false);
      document.getElementById("banner-oil-box").addEventListener('mouseup', this.onDocumentMouseUp, false);
      document.getElementById("banner-oil-box").addEventListener('touchstart', this.onDocumentTouchDown, false);
      document.getElementById("banner-oil-box").addEventListener('touchmove', this.onDocumentTouchMove, false);
      document.getElementById("banner-oil-box").addEventListener('touchend', this.onDocumentTouchEnd, false);

      // OrbitControls
      let controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.enableZoom = false;
      controls.minAzimuthAngle = 0;
      controls.maxAzimuthAngle = 0;
      // 上下旋转范围
      controls.minPolarAngle = 0;//默认0
      controls.maxPolarAngle = 0;//默认Math.PI
      controls.enableRotate = false;
      controls.enablePan = false;
      controls.enable = false;
      this.render();
      // this.stickerIndex = 0;
    },
    onDocumentMouseDown(event){
      //console.log('onDocumentMouseDown',event);
      this.onPointerDownPointerX = event.clientX;
      // this.onPointerDownPointerY = event.clientY;
    },
    onDocumentMouseMove(event){
      this.onPointerDownPointerX = event.clientX;
      //console.log('onDocumentMouseMove',event);
      //console.log("event.clientX",event.clientX);
      //console.log("event.clientY",event.clientY);
    },
    onDocumentMouseUp(event){
      this.onPointerDownPointerX = event.clientX;
      //console.log('onDocumentMouseUp',event);
      // console.log("this.onPointerDownPointerX",this.onPointerDownPointerX);
      // console.log("event.clientX",event.clientX);
    },
    onDocumentTouchDown(event){
      //console.log('onDocumentTouchDown',event);
      this.onPointerDownPointerX = event.touches[0].pageX;
      // this.onPointerDownPointerY = event.touches[0].pageY;
    },
    onDocumentTouchMove(event){
      //根据滑动距离计算滑动角度
      //this.onPointerDownPointerX = event.touches[0].pageX;
    },
    onDocumentTouchEnd(event){
      //event.stopPropagation();
      //滑动距离
      // console.log('event',event.changedTouches[0].pageX);
      // console.log("this.onPointerDownPointerX",this.onPointerDownPointerX);
      let nowPageX = event.changedTouches[0].pageX;
      if(Math.abs(nowPageX - this.onPointerDownPointerX)>10){
        if(this.onPointerDownPointerX>event.changedTouches[0].pageX){
        //向左滑动
        // console.log('prev');
        // this.rotationZ = this.rotationZ + Math.PI/2;
          //贴纸跃然纸上
          this.showSticker(event,'prev');
        }
        else{
          // console.log('next');
          //向右滑动
          // this.rotationZ = this.rotationZ - Math.PI/2;
          //贴纸跃然纸上
          this.showSticker(event,'next');
        }

        //gsap.to(this.scene.rotation,{z:this.rotationZ,duration:1});
        // let tmp = Math.abs((this.rotationZ/(Math.PI/2))%4);
        // console.log("tmp",tmp);
        // this.meshList.map((mesh)=>{
          // if((tmp>0&&tmp<1)||tmp==0){
          //   gsap.to(mesh.rotation,{x:1.52,y:0.14,z:this.rotationZ,duration:1});
          // }
          // else if((tmp>1&&tmp<2)||tmp==1){
          //   gsap.to(mesh.rotation,{x:1.54,y:0.11,z:this.rotationZ,duration:1});
          // }
          // else if((tmp>2&&tmp<3)||tmp==2){
          //   gsap.to(mesh.rotation,{x:1.58,y:0.11,z:this.rotationZ,duration:1});
          // }
          // else if((tmp>3&&tmp<4)||tmp==3){
          //   gsap.to(mesh.rotation,{x:1.55,y:0.14,z:this.rotationZ,duration:1});
          // }
          // gsap.to(mesh.rotation,{z:this.rotationZ,duration:1});
          // mesh.rotation.set(1.56,0.1,this.rotationZ);
        // })
      }
    },

    loadModel(){
      let that = this 
      let loader = new GLTFLoader();
      //const dataurl = this.$store.state.sourcRoot+'/caseimg/detail1_bak.glb';
      const dataurl = 'https://kasakii0428.oss-cn-shanghai.aliyuncs.com/caseimg/detail1_bak.glb';
      //const dataurl = '/caseimg/detail1_bak.glb';
      loader.load(dataurl,(gltf) => {
        console.log("gltf", gltf);
        // const object = gltf.scene || gltf.scenes[0];
        // this.group.add(object);
        // this.add(this.group);

        //方法

        // var mesh_glb = gltf.scene.children[0];
        // //console.log("mesh_glb",mesh_glb);
        // mesh_glb.traverse(function (node) {//获取其中对象
        //   if(node.isMesh){
        //     //console.log("node",node);
        //     // node.material.metalness =  0.0;
        //     // node.material.roughness = 0.0;
        //     // node.frustumCulled = false;
        //     // //模型阴影
        //     // node.castShadow = true;
        //     // //模型自发光
        //     // node.material.emissive =  node.material.color;
        //     // node.material.emissiveMap = node.material.map;

        //     node.position.set(0,0,0);
        //     node.scale.set(4.4,4.4,4.4);
        //     node.rotation.set(1.56,0.1,0);
        //     that.meshList.push(node);
        //     that.add(node);
        //   }
        // });
        
        const mao = gltf.scene.children[0];
        mao.position.set(0,0,0);
        mao.scale.set(4.4,4.4,4.4);
        mao.rotation.set(1.56,0.1,Math.PI/2);
        // mao.rotation.set(1.52,0.14,0);
        // mao.rotation.set(1.54,0.11,Math.PI/2);
        // mao.rotation.set(1.58,0.11,Math.PI);
        // mao.rotation.set(Math.PI/2,Math.PI/20,Math.PI*1.5);
        // mao.translateX(1);
        that.meshList.push(mao);
        that.add(mao);

        // const child_list = gltf.scene.children[0].children;
        // child_list.map(child => {
        //   if(child.type=="Mesh"){
        //     const geometry = child.geometry;
        //     const material = child.material;
        //     let mesh = new THREE.Mesh(geometry,material);

        //     // mesh.frustumCulled = false;
        //     // // 模型阴影
        //     // mesh.castShadow = true;
        //     // // 模型自发光
        //     // mesh.material.emissive =  mesh.material.color;
        //     // mesh.material.emissiveMap = mesh.material.map;

        //     mesh.position.set(0,0,0);
        //     mesh.scale.set(4.4,4.4,4.4);
        //     mesh.rotation.set(1.56,0.1,0);
        //     that.meshList.push(mesh);
        //     that.add(mesh);
        //   }
        // })
      })
    },

    addLight () {
      const common_num = 1000;
      const rate = 0.5;
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff,rate);
      this.add(ambientLight);

      // 平行光（太阳光）正面
      const directionalLight = new THREE.DirectionalLight(0xffffff,rate);
      directionalLight.position.set(0, common_num, common_num);
      // directionalLight.castShadow = true;
      this.add(directionalLight);

      // 左侧
      const directionalLight2 = new THREE.DirectionalLight(0xffffff,rate);
      directionalLight2.position.set(0-common_num, common_num, common_num);
      this.add(directionalLight2);

      // 右侧
      const directionalLight3 = new THREE.DirectionalLight(0xffffff,rate);
      directionalLight3.position.set(common_num, common_num, common_num);
      this.add(directionalLight3);

      // 背面
      const directionalLight4 = new THREE.DirectionalLight(0xffffff,rate);
      directionalLight4.position.set(0, common_num, 0-common_num);
      this.add(directionalLight4);

      const directionalLight5 = new THREE.DirectionalLight(0xffffff,rate);
      directionalLight5.position.set(0, 0-common_num, 0-common_num);
      this.add(directionalLight5);

      // // 环境光
      // const ambientLight = new THREE.AmbientLight(0xffffff,rate);
      // this.add(ambientLight);

      // // 平行光（太阳光）正面
      // const directionalLight = new THREE.DirectionalLight(0xffffff,rate);
      // directionalLight.position.set(0, common_num, common_num);
      // this.add(directionalLight);

      // // 左侧
      // const directionalLight2 = new THREE.DirectionalLight(0xffffff, rate);
      // directionalLight2.position.set(0-common_num, common_num, common_num);
      // this.add(directionalLight2);

      // // 右侧
      // const directionalLight3 = new THREE.DirectionalLight(0xffffff,rate);
      // directionalLight3.position.set(common_num, common_num, common_num);
      // this.add(directionalLight3);

      // // 背面
      // const directionalLight4 = new THREE.DirectionalLight(0xffffff, rate);
      // directionalLight4.position.set(0, common_num, 0-common_num);
      // this.add(directionalLight4);
    },
    add (obj) {
      this.scene.add(obj);
    },
    update(){

    },
    render () {
      // this.update();
      // TWEEN.update();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// .webgl-banner-container {
//   width:375px;
//   height: 600px;
//   overflow: hidden;
//   transform: translateX(-50%);
//   position:relative;
//   left: 50%;
// }
#webglDom_banner,
.webgl-banner-container{
  // width: 100%;
  // width: 375px;
  width: 390PX;
  height:600px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: -20px;
}
#webglDom_banner{
  // margin-top: -150PX;
  margin-top: -20PX;
}
.banner-oil-box{
  // width: 100vw;
  width:375px;
  height:213px;
  margin: 0 auto;
  overflow: hidden;
  // position: relative;
  position: absolute;
  left: 0px;
  top: 190px;
  // z-index:1;
}
.fog-box{
  width: 339px;
  height: 35px;
  background: linear-gradient(360deg, #FFFFFF 41.67%, rgba(255, 255, 255, 0) 100%);
  opacity: 0.96;
  position: absolute;
  z-index:100;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
}
.sticker-box{
  position:absolute;
  bottom:0px;
  // width:100%;
  // width: 339px;
  // width: 300px;
  width: 300PX;
  height:213px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  .sticker-img{
    height:130px;
    margin:51px auto 31px;
    // margin:41px auto;
    // display:none;
    // opacity: 0;
    position:absolute;
    left:0px;
    top:0px;
    width:100%;
    img{
      transform: translateX(-300px) rotateX(10deg) rotateY(100deg) rotateZ(10deg);
      height:130px;
      display:block;
      margin:0 auto;
      transition:all 1.0s;
      opacity: 0;
    }
    // &.next{
    //   img{
    //     opacity: 1;
    //     transform: translateX(-300px) rotateX(10deg) rotateY(100deg) rotateZ(10deg);
    //   }
    // }
    &.active{
      img{
        opacity: 1;
        transform: translateX(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
      }
    }
    &.prev{
      img{
        opacity: 0;
        transform: translateX(300px) rotateX(-10deg) rotateY(100deg) rotateZ(-10deg);
      }
    }
  }
}
.banner-btns{
  position:absolute;
  top:50%;
  // padding:0 36px;
  height: 36px;
  // width: 300PX;
  width: 290PX;
  left:50%;
  transform: translateX(-50%) translateY(-50%);
  .btn{
    width:22px;
    height:36px;
    background:v-bind(back_ground);
    background-repeat: no-repeat;
    background-size: 22px 36px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    &.left-btn{
      transform: rotateY(180deg);
    }
    &.right-btn{
      // transform: translateX(280px) translateY(-36px);
      transform:translateY(-36px);
      margin-left: calc(100% - 24px);
    }
  }
}
</style>