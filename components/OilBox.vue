<template>
  <div class="webgl-container">
    <div class="webgl-box">
      <div class="top_bg"></div>
      <div class="center_bg"></div>
      <div class="bottom_bg"></div>
      <div class="oil_content_box">
        <!-- <div class="absolute_box" :class="needAnimate?'active':''"> -->
        <div class="absolute_box">
          <div class="oil_content">
            <div id="webglDomA" class="webglDomA" ref="webglDomA"></div>
            <div class="loading-box" v-if="loadFlag">
              <img :src="sourcRootUrl+'/image/static.png'"/>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="bottom_tips"></div> -->
    </div>
    <div class="oilbox_nav">
      <div class="oilbox_item" :class="activeIndex==0?'active':''" @click="loadModel(0)">整合营销</div>
      <div class="oilbox_divider"></div>
      <div class="oilbox_item" :class="activeIndex==1?'active':''" @click="loadModel(1)">创意表达</div>
      <div class="oilbox_divider"></div>
      <div class="oilbox_item" :class="activeIndex==2?'active':''" @click="loadModel(2)">互动体验</div>
      <div class="oilbox_divider"></div>
      <div class="oilbox_item" :class="activeIndex==3?'active':''" @click="loadModel(3)">独家出品</div>
    </div>
    <div class="blank_space"></div>
  </div>
</template>

<script>
// 引入threejs核心模块
import * as THREE from "three"
// 引入OrbitControls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
// 引入GLTFLoader
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
let scene,camera,renderer,controls,_object,_group;
export default {
  name: 'OilBox',
  data () {
    return {
      needAnimate:false,
      sourcRootUrl:this.$store.state.sourcRoot,
      width: 0,
      height: 0,
      center:null,
      activeIndex:0,
      onPointerDownPointerX:null,
      onPointerDownPointerY:null,
      loadFlag:false,
      logopath:{
        //桶1
        "云栖盲盒":"apsara.2020",
        "伸爪":"vans",
        "天猫live":"tmall.live",
        "天猫国际全球好物课代表":"tmall.global",
        "天生艺术":"utalent",
        "淘宝回忆":"taobao.memory",
        //桶2
        "ADIC":"ali.adic",
        "HEY_DESIGN":"heydesign",
        "OMOJI":"oppoo.moji",
        "十大商品6":"taobaotop",
        "发发奇":"farfetch",
        "发发奇会员":"vipfarfetch",
        "天猫主题店2":"tmall2",
        "天猫主题店第一期":"tmall",
        "宝藏新品牌":"tmallnew",
        "超级视窗":"taobao.superwindow",
        "飞猪2":"fliggy",
        "麦当劳":"mcdonald.nft",
        //桶3
        "东京奥运会":"tokyo2020",
        "乐高":"lego",
        "云栖大会2021":"ali.apsara",
        // "云栖大会2022":"apsara.2022", 暂时不要
        "城市缝隙迷行贴纸":"city",
        "观夏":"mixplace",
        "造物节":"taobao2022",
        "长江":"changjiang",
        //桶4
        "不完全命理指南":"jinyu",
        "节日不打烊2020":"nostop",
        "节日不打烊2021":"nostop2021",
        "菇得来福":"goodlife"
      },

      prevIndex:0,
      activeIndex:this.$route.query.activeIndex||0,
      notfirst:false,
      clickable:true,
      direction:null,
      startLocation:'left',
      prevDis:'0px',
      activeDis:'0px',
      timer:null,
      timer1:null,
      timer2:null,
      rateTime:this.$store.state.rateTime,
      back_ground:"url("+this.$store.state.sourcRoot+"/image/caselist/top_bg.png)",
      back_ground1:"url("+this.$store.state.sourcRoot+"/image/caselist/bottom_bg.png)",
      back_ground2:"url("+this.$store.state.sourcRoot+"/image/caselist/arrow.png)",
      back_ground3:"url("+this.$store.state.sourcRoot+"/image/caselist/option_bg.png)",
      back_ground4:"url("+this.$store.state.sourcRoot+"/image/caselist/checked.png)",
      back_ground5:"url("+this.$store.state.sourcRoot+"/image/caselist/divider.png)",
      back_ground6:"url("+this.$store.state.sourcRoot+"/image/caselist/bottom_tips.png)",
      isIOS16:false,
    }
  },
  watch: {
    
  },
  components: {
    
  },
  mounted () {
    //修复部分纹理随机黑色问题
    //======================
    this.judgeIOSversion();
    //=======================
    this.$nextTick(this.init);
  },
  methods: {
    judgeIOSversion(){
      var str= navigator.userAgent.toLowerCase();
      // console.log("str: "+str);
      // alert("str: "+str);
      var ver=str.match(/cpu iphone os (.*?) like mac os/);
      // var ver;
      if(!ver){
        ver = str.split("version/");
        //console.log("ver ",ver);
      }
      // console.log("ver: "+ver);
      // alert("ver: "+ver);
      if(ver){
        var iosv = parseInt(ver[1].replace(/_/g,"."));
        //console.log('ios版本为：'+iosv);
        // alert('ios版本为：'+iosv);
        if(iosv==16){
          this.isIOS16 = true;
          window.createImageBitmap = undefined;
        }
      }
    },
    loadModel(index){
      if(index==this.activeIndex)return;
      if(!this.clickable)return;
      this.needAnimate = false;
      this.activeIndex = index;
      this.clickable = false;
      //清除前一个模型
      // 递归遍历组对象group释放所有后代网格模型绑定几何体占用内存
      if(_object){
        _object.traverse(function(_obj) {
          // console.log("_obj",_obj);
          if (_obj.type === 'Mesh') {
            _obj.geometry.dispose();
            _obj.material.dispose();
          }
        })
        // 删除场景对象scene的子对象group
        scene.remove(_object);
      }
      if(_group){
        _group.traverse(function(_obj) {
          // console.log("_obj",_obj);
          if (_obj.type === 'Mesh') {
            _obj.geometry.dispose();
            _obj.material.dispose();
          }
        })
        // 删除场景对象scene的子对象group
        scene.remove(_group);
      }
      let webglDomA = document.getElementById('webglDomA');
      // console.log("webglDomA",webglDomA);
      if(webglDomA&&webglDomA.firstChild){
        webglDomA.removeChild(webglDomA.firstChild);
      }

      // let canvas = renderer.domElement;
      // let gl = canvas.getContext('webgl');
      // console.log("gl",gl);
      //使用下面的扩展插件，手动销毁WebGL context对象。
      // gl.getExtension('WEBGL_lose_context').loseContext();

      scene.traverse((child) => {
				if (child.material) {
					child.material.dispose();
				}
				if (child.geometry) {
					child.geometry.dispose();
				}
				child = null;
			});
      if (renderer) {
        renderer.forceContextLoss();
        renderer.dispose();
        renderer.domElement = null;
        renderer = null;
      };

      if (scene) {
        scene.clear();
        scene = null;
      };
      if(_group){
        _group.clear();
        _group = null;
      }
      _group = new THREE.Group();
      _object = null;
      // scene = null;
      camera = null;
      renderer = null;
      controls = null;
      this.init();
    },

    init () {
      // 初始化画布宽高
      const container = this.$refs.webglDomA;
      this.width = container.offsetWidth;
      this.height = container.offsetHeight;
      if(this.timer){
        clearTimeout(this.timer);
      }
      this.loadFlag = true;
      // 场景
      scene = new THREE.Scene();

      _group = new THREE.Group();

      // 相机
      camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.01, 10000);
      camera.position.set(0,0,0);
      camera.lookAt(0,0,0);
      scene.add(camera);

      // 添加灯光
      if(this.isIOS16){
        this.addLight();
      }

      this.loadGlb();

      container.addEventListener('mousedown',this.onDocumentMouseDown,false);
      document.addEventListener('touchstart', this.onDocumentTouchDown, false);
      document.addEventListener('touchend',this.onDocumentTouchUp,false);
      document.addEventListener('touchmove',this.onDocumentTouchMove, false);
    },

    // 鼠标控制
    onDocumentTouchDown(event){
      this.startX = event.touches[0].pageX;
      this.startY = event.touches[0].pageY;
      this.onPointerDownPointerX = event.touches[0].pageX;
      this.onPointerDownPointerY = event.touches[0].pageY;
    },
    onDocumentTouchMove(event){
      this.onPointerDownPointerX = event.touches[0].pageX;
      this.onPointerDownPointerY = event.touches[0].pageY;
      this.endX = event.touches[0].pageX;
      this.endY = event.touches[0].pageY;
    },
    onDocumentTouchUp(event){
      
    },
    onDocumentMouseDown(event) {
      //获取raycaster和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
      let intersects = this.getIntersects(event);
      // console.log("intersects",intersects);

      //获取选中最近的Mesh对象
      //instance坐标是对象，右边是类，判断对象是不是属于这个类的
      if (intersects.length !== 0 && intersects[0].object.type === 'Mesh') {
          let selectObject = intersects[0].object;
          let path = this.logopath[selectObject.name];
          if(!path)return;
          this.$router.push({
            path:'/caselist/'+path,
            replace:true
          });
      } else {
          // console.log('未选中 Mesh!');
      }
    },
    //获取与射线相交的对象数组
    getIntersects(event,type) {
      if(!type){
        event.preventDefault();// 阻止默认的点击事件执行, https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault
      }
      //声明 rayCaster 和 mouse 变量
      let rayCaster = new THREE.Raycaster();
      let mouse = new THREE.Vector2();
      //通过鼠标点击位置，计算出raycaster所需点的位置，以屏幕为中心点，范围-1到1
      if(type){
        if(!event.clientX){
          mouse.x = (this.onPointerDownPointerX / window.innerWidth)*2 -1;
          mouse.y = -(this.onPointerDownPointerY / window.innerHeight)*2 +1;
        }
        else{
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
      }
      else{
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }
      //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
      rayCaster.setFromCamera(mouse,camera);
      //获取与射线相交的对象数组， 其中的元素按照距离排序，越近的越靠前。
      //+true，是对其后代进行查找，这个在这里必须加，因为模型是由很多部分组成的，后代非常多。
      let intersects = rayCaster.intersectObjects(_group.children, true);
      //返回选中的对象
      return intersects;
    },

    changeCamera(gltf){
      if(this.isIOS16){
        //======================================================================================================================
        //              处理模型变黑
        //======================================================================================================================
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
              // 1.2
                child.material.roughness = 0.0;
                child.material.metalness = 1.0;
                // child.frustumCulled = false;
                child.material.emissiveIntensity = 1;
                child.material.emissive = child.material.color;
                child.material.emissiveMap = child.material.map;
                // child.material.transparent = true;
                // child.isLineSegments = true;
                // child.material.wireframe = false;
                // child.material.alphaTest = 0.2
            }
        });
        //======================================================================================================================
        //              处理模型变黑
        //======================================================================================================================
      }

      // console.log("gltf",gltf);
      _object = gltf.scene || gltf.scenes[0];
      const box = new THREE.Box3().setFromObject(_object);
      const size = box.getSize(new THREE.Vector3(0,0,0)).length();
      const center = box.getCenter(new THREE.Vector3(0,0,0));

      _object.position.x += (_object.position.x - center.x);
      _object.position.y += (_object.position.y - center.y);
      _object.position.z += (_object.position.z - center.z);

      _object.scale.set(0.96,0.96,0.96);
      _object.translateY(0.1);
      // _object.translateY(-1);

      camera.near = size / 100;
      camera.far = size * 100;

      camera.position.copy(center);

      camera.position.x += (size / 2.0);
      camera.position.y += (size / 5.0);
      camera.position.z += (size / 2.0);
      camera.lookAt(center);

      camera.up = new THREE.Vector3(0, 1, 0);
      camera.updateProjectionMatrix();

      _group.add(_object);
      scene.add(_group);
      
        // 渲染器
      renderer = new THREE.WebGLRenderer({
        antialias: true
      })

      if(this.isIOS16){
        renderer.physicallyCorrectLights = true;
        // renderer.outputEncoding = THREE.sRGBEncoding;//不能有，有的话就会整个黑掉
        renderer.toneMapping = THREE.ACESFilmicToneMapping;//aces标准
        renderer.toneMappingExposure = 1.0;//色调映射曝光度
        renderer.shadowMap.enabled = true;//阴影就不用说了
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;//阴影类型（处理运用Shadow Map产生的阴影锯齿）
      }
      else{
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;//aces标准
        renderer.toneMappingExposure = 1.2;//色调映射曝光度
        renderer.shadowMap.enabled = true;//阴影就不用说了
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;//阴影类型（处理运用Shadow Map产生的阴影锯齿）
        // this.textureEncoding = THREE.sRGBEncoding;
      }
      

      renderer.setClearColor(new THREE.Color('#000000'), 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(this.width, this.height);

      let container = this.$refs.webglDomA;
      // console.log("container===",container);
      container.appendChild(renderer.domElement);

      const environment = new RoomEnvironment();

      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(environment).texture;

      // // OrbitControls
      controls = new OrbitControls(camera, renderer.domElement);

      controls.enablePan = false;
      controls.enableZoom = false;
      // controls.enableDamping = true;
      controls.minPolarAngle = Math.PI/3;//默认0
      controls.maxPolarAngle = Math.PI/2;//默认Math.PI

      this.render();
      this.needAnimate = true;
      this.clickable = true;
    },

    loadGlb(){
      let activeIndex = this.activeIndex;
      const loader = new GLTFLoader();
      // Draco 解码库
      const dracoLoader = new DRACOLoader();
      const path = this.sourcRootUrl+'/js/libs/draco/';
      dracoLoader.setDecoderPath(path);
      dracoLoader.setDecoderConfig({ type: 'js' });
      dracoLoader.preload();

      loader.setDRACOLoader(dracoLoader);
      let glburl;
      let tmproot = "https://kasakii0428.oss-cn-shanghai.aliyuncs.com";
      // let tmproot = this.sourcRootUrl;
      // let tmproot = '';
      if(activeIndex==0){
        glburl = tmproot+'/caseimg/01_new.glb';
      }
      else if(activeIndex==1){
        glburl = tmproot+'/caseimg/02_new.glb';
      }
      else if(activeIndex==2){
        glburl = tmproot+'/caseimg/03_new.glb';
      }
      else if(activeIndex==3){
        glburl = tmproot+'/caseimg/04_new.glb';
      }
      loader.load(glburl, (gltf) => {
        // console.log("gltf", gltf);
        //方法四
        this.changeCamera(gltf);
      },(xhr)=>{
        var _onProgress = Math.floor(xhr.loaded / xhr.total * 100);
        if(_onProgress==100){
          this.timer = setTimeout(() => {
            this.loadFlag = false;
          }, 500);
        }
      })
    },

    addLight () {
      const common_num = 1000;
      const rate = 0.5;
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, rate);
      this.add(ambientLight);

      // 平行光（太阳光）正面
      const directionalLight = new THREE.DirectionalLight(0xffffff, rate);
      directionalLight.position.set(0, common_num, common_num);
      // directionalLight.castShadow = true;
      this.add(directionalLight);

      // 左侧
      const directionalLight2 = new THREE.DirectionalLight(0xffffff, rate);
      directionalLight2.position.set(0 - common_num, common_num, common_num);
      this.add(directionalLight2);

      // 右侧
      const directionalLight3 = new THREE.DirectionalLight(0xffffff, rate);
      directionalLight3.position.set(common_num, common_num, common_num);
      this.add(directionalLight3);

      // 背面
      const directionalLight4 = new THREE.DirectionalLight(0xffffff, rate);
      directionalLight4.position.set(0, common_num, 0 - common_num);
      this.add(directionalLight4);

      const directionalLight5 = new THREE.DirectionalLight(0xffffff, rate);
      directionalLight5.position.set(0, 0 - common_num, 0 - common_num);
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

      // const common_num = 1000;
      // // 环境光
      // const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
      // this.add(ambientLight);

      // // 平行光（太阳光）正面
      // const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
      // directionalLight.position.set(0, common_num, common_num);
      // // directionalLight.castShadow = true;
      // this.add(directionalLight);

      // // 左侧
      // const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.5);
      // directionalLight2.position.set(0-common_num, common_num, common_num);
      // this.add(directionalLight2);

      // // 右侧
      // const directionalLight3 = new THREE.DirectionalLight(0xffffff,0.5);
      // directionalLight3.position.set(common_num, common_num, common_num);
      // this.add(directionalLight3);

      // // 背面
      // const directionalLight4 = new THREE.DirectionalLight(0xffffff,0.5);
      // directionalLight4.position.set(0, common_num, 0-common_num);
      // this.add(directionalLight4);

      // const directionalLight5 = new THREE.DirectionalLight(0xffffff,0.5);
      // directionalLight5.position.set(0, 0-common_num, 0-common_num);
      // this.add(directionalLight5);
    },
    add (obj) {
      scene.add(obj);
    },
    render () {
      if(scene&&camera&&renderer){
        renderer.render(scene,camera);
        requestAnimationFrame(this.render);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.webgl-container{
  width: calc(100% - 46px);
  height:calc(100vh - 55px);
  margin: 0 auto;
  position:relative;
  padding-bottom: 62px;
  position: relative;
}

@keyframes goBottom {
  from{top:-100%;}
  to{top:0;}
}
@-moz-keyframes goBottom{
  from{top:-100%;}
  to{top:0;}
}
@-webkit-keyframes goBottom{
  from{top:-100%;}
  to{top:0;}
}
@-o-keyframes goBottom{
  from{top:-100%;}
  to{top:0;}
}
.webgl-box{
  width: calc(100% + 46px);
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
      width: 100%;
      height: 100%;
      position: absolute;
      // top:-100%;
      top:0;
      left:0px;
      white-space: nowrap;
      display: flex;
      justify-content: space-between;
      //css动画
      &.active{
        top:0;
        animation: goBottom 0.5s 1;
        -moz-animation:goBottom 0.5s 1;
        -webkit-animation:goBottom 0.5s 1;
        -o-animation:goBottom 0.5s 1;
      }
      .oil_content{
        width: 100%;
        height: 100%;
        position:relative;
        .webglDomA{
          width: 100%;
          height:100%;
          position: relative;
          z-index: 1;
          margin-top:-10px;
        }
        .loading-box{
          // width: 100%;
          width:88px;
          height:88px;
          position: absolute;
          z-index: 1;
          left:50%;
          top:50%;
          transform: translateX(-50%) translateY(-50%);
          img{
            width: 100%;
            transform:translateY(50%);
          }
        }
      }
    }
  }
  .top_bg{
    width: 330px;
    height: 123px;
    background: v-bind(back_ground);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
  }
  .center_bg{
    display: none;
    width: 331px;
    height: 329px;
    // background: url('/image/caselist/center_bg.png') no-repeat;
    // background-size: 100% auto;
    position: absolute;
    z-index: 0;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .bottom_bg{
    width: 330px;
    height: 72px;
    background: v-bind(back_ground1);
    background-repeat: no-repeat;
    background-size: 100% auto;
    position: absolute;
    // bottom:62px;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
  }
  .bottom_tips{
    width: 113px;
    height: 13px;
    background: v-bind(back_ground6);
    background-repeat: no-repeat;
    background-position: center;
    background-size:100%;
    position:absolute;
    // bottom:36px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index:0;
  }
}
.oilbox_arrow{
  width: 255px;
  height: 98px;
  background: v-bind(back_ground2);
  background-repeat: no-repeat;
  background-position: center;
  background-size:100%;
  position:absolute;
  // bottom:36px;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index:0;
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
  .oilbox_item{
    width:85px;
    height:36px;
    font-family:'syht Heavy';
    font-size: 13.75px;
    color: #D0D0D0;
    text-align: center;
    line-height: 36px;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
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