<template>
  <div class="home-box" >
    <div class="home-cloud-box" id="home-cloud-box">
      <div id="webglDom_home" ref="webglDom_home"></div>
    </div>
    <div class="voice">
      <audio controls muted preload="auto" ref="v_ki_0">
        <source :src="v_ki[0]" type="audio/mpeg">
      </audio>
      <audio controls muted preload="auto" ref="v_ki_1">
        <source :src="v_ki[1]" type="audio/mpeg">
      </audio>
      <audio controls muted preload="auto" ref="v_ki_2">
        <source :src="v_ki[2]" type="audio/mpeg">
      </audio>
      <audio controls muted preload="auto" ref="v_ki_3">
        <source :src="v_ki[3]" type="audio/mpeg">
      </audio>
      <audio controls muted preload="auto" ref="v_ki_4">
        <source :src="v_ki[4]" type="audio/mpeg">
      </audio>
      <audio controls muted preload="auto" ref="v_ki_5">
        <source :src="v_ki[5]" type="audio/mpeg">
      </audio>
      <audio controls muted preload="auto" ref="v_ki_6">
        <source :src="v_ki[6]" type="audio/mpeg">
      </audio>

      <audio controls muted preload="auto" ref="v_sa_0">
        <source :src="v_sa[0]" type="audio/mpeg">
      </audio>
      <audio controls muted preload="auto" ref="v_sa_1">
        <source :src="v_sa[1]" type="audio/mpeg">
      </audio>
      <audio controls muted preload="auto" ref="v_sa_2">
        <source :src="v_sa[2]" type="audio/mpeg">
      </audio>
      <audio controls muted preload="auto" ref="v_sa_3">
        <source :src="v_sa[3]" type="audio/mpeg">
      </audio>
      <audio controls muted preload="auto" ref="v_sa_4">
        <source :src="v_sa[4]" type="audio/mpeg">
      </audio>
      <audio controls muted preload="auto" ref="v_sa_5">
        <source :src="v_sa[5]" type="audio/mpeg">
      </audio>
      <audio controls muted preload="auto" ref="v_sa_6">
        <source :src="v_sa[6]" type="audio/mpeg">
      </audio>
    </div>
    <div class="index-bottom-text">
      <img :src="sourcRootUrl+'/image/index/bottomnew.png'"/>
      <div :class="[{active:cloudNative},'copyright-text']">Copyright © KASAKII.All Rights Reserved.<a href="https://beian.miit.gov.cn/#/Integrated/index" target="blank">粤ICP备20012453号-1</a></div>
    </div>
    <div v-if="showModal" class="click-modal" @click="showModal=false;">
      我是一个弹窗
    </div>
  </div>
</template>

<script>
// 引入threejs核心模块
import * as THREE from "three"
// 引入GLTFLoader
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
// import * as dat from 'dat.gui';
// import gsap from "gsap"; 
import fragmentShaderSnorlax from "./snorlax/fragment.js";
import vertexShaderSnorlax from "./snorlax/vertex.js";
let scene,camera,renderer;
export default {
  name: 'HomeCloudNew',
  data () {
    return {
      showModal:false,
      back_ground1:"url("+this.$store.state.sourcRoot+"/image/index/copyright.png)",
      back_ground2:"url("+this.$store.state.sourcRoot+"/image/index/logo.png)",
      cloudNative:true,

      sourcRootUrl:this.$store.state.sourcRoot,
      isDragging:false,
      mouse:null,
      raycaster:null,
      time:0,
      active:{
        backgroundColor:"linear-gradient(0deg, rgb(68 99 49) 0%, rgb(163 174 255) 100%)",
        gltfLoader:null,
        material:null,
        shape:null,
        textureLoader:null,
      },
      material:null,
      meshList:[],
      touchTarget:null,
      startPosition:null,

      textloader: null,
      width: 0,
      height: 0,
      mao:null,
      clock:null,
      group:null,
      morphTargetInfluences:null,
      morphTargetDictionary:null,
      onPointerDownPointerX:null,
      onPointerDownPointerY:null,
      startX:null,
      startY:null,
      endX:null,
      endY:null,
      outsideModel:true,
      timer:null,
      direction:null,
      strength:0,
      back_ground:"url("+this.$store.state.sourcRoot+"/image/index/text-bg.png)",
      v_steps:3,
      v_ki:[
        this.$store.state.sourcRoot+"/voice/1.mp3",
        this.$store.state.sourcRoot+"/voice/2.mp3",
        this.$store.state.sourcRoot+"/voice/3.mp3",
        this.$store.state.sourcRoot+"/voice/4.mp3",
        this.$store.state.sourcRoot+"/voice/5.mp3",
        this.$store.state.sourcRoot+"/voice/6.mp3",
        this.$store.state.sourcRoot+"/voice/7.mp3"
      ],
      v_sa:[
        this.$store.state.sourcRoot+"/voice/Sa1.mp3",
        this.$store.state.sourcRoot+"/voice/Sa2.mp3",
        this.$store.state.sourcRoot+"/voice/Sa3.mp3",
        this.$store.state.sourcRoot+"/voice/Sa4.mp3",
        this.$store.state.sourcRoot+"/voice/Sa5.mp3",
        this.$store.state.sourcRoot+"/voice/Sa6.mp3",
        this.$store.state.sourcRoot+"/voice/Sa7.mp3",
      ],
      v_target:1,
      start_y:null,
      target_src:this.$store.state.sourcRoot+"/voice/Kii1.mp3",
    }
  },
  watch: {
    
  },
  mounted () {
    this.$nextTick(this.init);
    //修复部分纹理随机黑色问题
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS){
      window.createImageBitmap = undefined;
    }
  },
  methods: {
    init () {
      // 初始化画布宽高
      const container = this.$refs.webglDom_home;
      // this.width = container.offsetWidth;
      // this.height = container.offsetHeight;
      // this.width = 390;
      this.width = window.innerWidth;
      this.height = 1000;

      // 场景
      scene = new THREE.Scene();
      this.textloader = new THREE.TextureLoader();

      // 相机
      // camera = new THREE.OrthographicCamera( this.width / - 2, this.width / 2, this.height / 2, this.height / - 2, 1, 1000); //正投影相机
      // camera.position.set(400,200,400);

      // camera = new THREE.PerspectiveCamera(
      //   65,
      //   this.width / this.height,
      //   0.1,
      //   1000
      // );
      // camera.position.z = 3;


      camera = new THREE.OrthographicCamera( this.width / - 2, this.width / 2, this.height / 2, this.height / - 2, 1, 1000); //正投影相机
      // camera.position.set(400,200,400);
       camera.position.set(0,200,400);
      // camera.position.set(0,0,0);

      this.add(camera);
      camera.lookAt(scene.position);

      this.group = new THREE.Group();
      this.clock = new THREE.Clock();
      this.mouse = new THREE.Vector2();
      this.raycaster = new THREE.Raycaster();

      // 添加灯光
      this.addLight();

      // 渲染器
      renderer = new THREE.WebGLRenderer({
        antialias: true
      })

      // const axesHelper = new THREE.AxesHelper(700);
      // this.add(axesHelper);

      this.touchTarget = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 2000),
        new THREE.MeshBasicMaterial({
          depthTest:false,
          opacity: 1,
          transparent: false,
          depthWrite: false,
        })
      );

      renderer.physicallyCorrectLights = true;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;//aces标准
      renderer.toneMappingExposure = 1.2;//色调映射曝光度
      renderer.shadowMap.enabled = true;//阴影就不用说了
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;//阴影类型（处理运用Shadow Map产生的阴影锯齿）
      // this.textureEncoding = THREE.sRGBEncoding;

      // renderer.shadowMapEnabled = true; // 启用阴影选项

      renderer.setClearColor(new THREE.Color('#ffffff'), 0);

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(this.width, this.height);
      document.getElementById("webglDom_home").appendChild(renderer.domElement);

      //事件
      // document.getElementById("webglDom_home").addEventListener('mousedown', this.onDocumentMouseDown, false);
      document.getElementById("webglDom_home").addEventListener('touchstart', this.onMouseDown, false);
      document.getElementById("webglDom_home").addEventListener('touchmove', this.onMouseMove, false);
      document.getElementById("webglDom_home").addEventListener('touchend', this.onMouseUp, false);
      // document.getElementById("webglDom_home").addEventListener("mousedown", this.onMouseDown,false);
      // document.getElementById("webglDom_home").addEventListener("mousemove", this.onMouseMove,false);
      // document.getElementById("webglDom_home").addEventListener("mouseup", this.onMouseUp,false);
      this.loadModel();
      this.render();
    },

    inner_onMouseDown(position) {
      this.material.uniforms.uDragStart.value.copy(position);
      this.material.uniforms.uDragTarget.value.copy(position);
      this.material.uniforms.uDragRelease.value = false;
    },

    inner_onMouseMove(position) {
      this.material.uniforms.uDragTarget.value.copy(position);
    },

    inner_onMouseUp(time) {
      this.material.uniforms.uDragReleaseTime.value = time;
      this.material.uniforms.uDragRelease.value = true;
    },

    //鼠标控制新
    onMouseDown(event) {
      // console.log('event',event);
      var width = window.innerWidth;
      var height = window.innerHeight;
      // var marginLeft = (width - 390)/2;
      var marginLeft = 0;
      var marginTop = 0;
      // var marginTop = 70;
      this.mouse.x = ((event.touches[0].pageX - marginLeft) / width) * 2 - 1;
      this.mouse.y = -((event.touches[0].pageY - marginTop) / height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, camera);

      const intersect = this.raycaster.intersectObjects(this.meshList,true);
      // console.log("intersect",intersect);
      if (intersect.length) {
        this.isDragging = true;
        // if(intersect[0].point.x<0){
        //   intersect[0].point.x = 400 + intersect[0].point.x;
        // }
        // intersect[0].point.z = 0;
      
        const startPosition = intersect[0].point;
        // console.log("this.mouse.y",this.mouse.y);
        this.start_y = startPosition.y;
        this.inner_onMouseDown(startPosition);
        this.cloudNative = false;
      }
      else{
        event.preventDefault();
      }
    },
    onMouseMove(event) {
      var width = window.innerWidth;
      var height = window.innerHeight;
      // var marginLeft = (width - 390)/2;
      var marginLeft = 0;
      // var marginTop = 70;
      var marginTop = 0;
      this.mouse.x = ((event.touches[0].pageX - marginLeft) / width) * 2 - 1;
      this.mouse.y = -((event.touches[0].pageY - marginTop) / height) * 2 + 1;

      // this.active.shape.rotation.y = this.mouse.x * 0.15;
      // this.active.shape.rotation.x = this.mouse.y * 0.15;
      // if (!this.isDragging) return;
      this.raycaster.setFromCamera(this.mouse, camera);
      const intersect = this.raycaster.intersectObject(this.touchTarget);
      // console.log("intersect",intersect);
      if (intersect.length) {
        // if(intersect[0].point.x<0){
        //   intersect[0].point.x = 400 + intersect[0].point.x;
        // }
        // if(intersect[0].point.z<0){
        //   intersect[0].point.z = 0 - intersect[0].point.z;
        // }
        // if(intersect[0].point.x<0&&intersect[0].point.y<0){
        //   intersect[0].point.z = 0;
        //   // intersect[0].point.y = 0 - intersect[0].point.y;
        // }
        // intersect[0].point.z = 200;
        // intersect[0].point.z = 0;
        const target = intersect[0].point;
        // console.log("target_y",target.y);
        // console.log("start_y",this.start_y);
        // let tmp = Math.abs(target.y - this.start_y);
        // // console.log("tmp",tmp);
        // this.playAudio(tmp);
        this.inner_onMouseMove(target);
      }
      else{
        event.preventDefault();
      }
    },
    playAudio(tmp){
      //0-49 
      let v_target = Math.ceil(tmp/50);
      if(v_target>7){
        v_target = 7;
      }
      v_target = v_target - 1;
      this.v_target = v_target;
      let arr = ['v_ki_0','v_ki_1','v_ki_2','v_ki_3','v_ki_4','v_ki_5','v_ki_6'];
      for(let m=0;m<arr.length;m++){
        if(m==v_target){
          this.$refs[arr[m]].play();
          this.$refs[arr[m]].muted = false;
        }
        else{
          this.$refs[arr[m]].pause();
        }
      }
    },
    onMouseUp() {
      if (!this.isDragging) return;
      this.isDragging = false;
      // if(this.timer){
      //   clearTimeout(this.timer);
      // }
      // this.timer = setTimeout(() => {
        
      // }, 1000);
      this.closeAudio();
      this.inner_onMouseUp(this.time);
      this.cloudNative = true;
    },
    closeAudio(){
      // let v_target = this.v_target;
      // let arr = ['v_sa_0','v_sa_1','v_sa_2','v_sa_3','v_sa_4','v_sa_5','v_sa_6'];
      // for(let m=0;m<arr.length;m++){
      //   if(m==v_target){
      //     this.$refs[arr[m]].play();
      //     this.$refs[arr[m]].muted = false;
      //   }
      //   else{
      //     this.$refs[arr[m]].pause();
      //   }
      // }
    },
    loadModel(){
      let that = this;
      const path = this.sourcRootUrl+'/js/libs/basis/';
      const ktx2Loader = new KTX2Loader()
					.setTranscoderPath(path)
					.detectSupport( renderer );
      let loader = new GLTFLoader().setCrossOrigin('anonymous')
        .setKTX2Loader( ktx2Loader )
				.setMeshoptDecoder( MeshoptDecoder );

      // let loader = new GLTFLoader();
      // const dataurl = this.$store.state.sourcRoot+'/caseimg/snorlax_222.glb';
      const dataurl = 'https://kasakii0428.oss-cn-shanghai.aliyuncs.com/caseimg/snorlax_222.glb';
      // const dataurl = '/caseimg/snorlax_222.glb';
      loader.load(dataurl, (gltf) => {
        // console.log("gltf",gltf);
        that.mao = gltf.scene.children[0];
        // console.log("that.mao",that.mao);

        // that.mao.position.set(0,0,0);
        that.mao.position.set(0,0,0);
        // that.mao.position.set(400,200,400);
        that.mao.rotation.y = 0;
        that.mao.rotation.z = -0.01;
         that.mao.scale.set(2.2,2.2,2.2);
        // that.mao.scale.set(2.6,2.6,2.6);
        // that.mao.scale.set(2.6,2.6,2.6);
        // that.mao.rotation.set(0,Math.PI/36,0);
        //that.mao.rotation.set(0-Math.PI/6,0-Math.PI/6,0);
        // that.mao.castShadow = true; // cast投射，方块投射阴影 
        // that.mao.receiveShadow = true; // 物体接收阴影

        // that.mao.rotation.set(0,1.4,0);

        // that.group.add(that.mao);
        // that.add(that.mao);

        let textureLoader = new THREE.TextureLoader();
        textureLoader.textureEncoding = THREE.sRGBEncoding;
        const dataurl = this.$store.state.sourcRoot+'/caseimg/snorlax_texture.png';
        // const dataurl1 = this.$store.state.sourcRoot+'/caseimg/sk-uv-new.png';
        const dataurl1 = '/caseimg/sk-uv-new.png';
        let param_v = location.href.split("?v=")[1];
        // let _dataurl = param_v=='1'?dataurl1:dataurl;
        let _dataurl = dataurl1;
        // console.log("_dataurl",_dataurl);
        const map = textureLoader.load(_dataurl);
        map.flipY = false;

        let material = new THREE.ShaderMaterial({
          // depthTest:false,
          vertexShader: vertexShaderSnorlax,
          fragmentShader: fragmentShaderSnorlax,
          uniforms: {
            uTime: { value: 0 },
            uDragStart: { value: new THREE.Vector3() },
            uDragTarget: { value: new THREE.Vector3() },
            uDragReleaseTime: { value: 0 },
            uDragRelease: { value: 1 },
            uReleaseDecay: { value: 10 },
            uReleaseFrequency: { value: 55 },
            uMap: { value: map },
          },
          transparent: true,
        });
        that.material = material;

        let shape = that.mao;
        shape.material = that.material;
        that.active = {
          backgroundColor:"linear-gradient(0deg, rgb(68 99 49) 0%, rgb(163 174 255) 100%)",
          gltfLoader:new GLTFLoader(),
          material:that.material,
          shape:shape,
          textureLoader:new THREE.TextureLoader(),
        }
        // that.group.add(that.active.shape);
        that.meshList.push(that.active.shape);
        that.add(that.active.shape);
        // that.$forceUpdate();
      },(xhr)=>{
        var _onProgress = Math.floor(xhr.loaded / xhr.total * 100);
        if(_onProgress==100){
          that.$emit('getrate',_onProgress);
        }
      })
    },
    addLight () {
      // return;
      const common_num = 1000;
      const rate = 1;

      // // 平行光（太阳光）正面
      // const directionalLight = new THREE.DirectionalLight(0xffffff,rate);
      // directionalLight.position.set(0, common_num, common_num);
      // directionalLight.castShadow = true;
      // this.add(directionalLight);

      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff,rate);
      // directionalLight.castShadow = true;
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
    },
    add (obj) {
      scene.add(obj);
    },
    update(time) {
      this.material.uniforms.uTime.value = time;
    },
    render () {
      // this.time += 0.001;
      this.time += 0.01633;
      if(this.material){
        this.update(this.time);
      }
      // console.log("this.active",this.active);
      // this.active.shape.update(this.time);

      renderer.render(scene, camera);
      requestAnimationFrame(this.render);
    }
  }

}
</script>


<style lang="scss" scoped>
.home-box{
  audio{
    opacity: 0;
  }
  .voice{
    width:0px;
    height:0px;
  }
  .click-modal{
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0px;
    top: 0px;
    z-index: 1000;
    background: rgba(0,0,0,0.3);
    text-align: center;
    color: #fff;
    line-height: 100vh;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
  }
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
      z-index: 0;
      &.active{
        z-index: 1000;
      }
      a{
        color: #C1C1C1;
        text-decoration: none;
      }
    }
  }
}
.home-cloud-box{
  // width: 100%;
  width:100%;
  height:280PX;
  // padding: 0px;
  // overflow: hidden;
  position: relative;
  z-index: 10;
  background:v-bind(back_ground);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 110% auto;
  // padding: 0.1PX;
  //height: calc(100vh - 100px - 251px - 78px);
  #webglDom_home{
    // width:100%;
    // height: 100%;
    // width:390PX;
    // height: 320PX;
    // height: 370PX;
    // height:100vh;
    // margin-top: -55PX;

    width:100%;
    height:1000PX;
    margin-top:-356PX;
    position: fixed;
    z-index: 1000;
    // height: 370PX;
    // margin-top: -55PX;
    // position:absolute;

    z-index:10;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>