<template>
  <div class="webglDomB" ref="webglDomB"></div>
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
let scene,camera,renderer,controls,_object;
export default {
  name: 'OilContentD',
  data () {
    return {
      sourcRootUrl:this.$store.state.sourcRoot,
      textloader: null,
      group:null,
      width: 0,
      height: 0,
      center:null,
      activeIndex:0,
      onPointerDownPointerX:null,
      onPointerDownPointerY:null,
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
    }
  },
  watch: {
    
  },
  mounted () {
    this.$nextTick(this.init);
  },
  methods: {
    init () {
      // 初始化画布宽高
      const container = this.$refs.webglDomB;
      this.width = container.offsetWidth;
      // this.height = container.offsetHeight;
      this.height = container.offsetHeight;
      // 场景
      scene = new THREE.Scene();
      this.textloader = new THREE.TextureLoader();

      this.group = new THREE.Group();

      // 相机
      camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.01, 10000);
      camera.position.set(0,0,0);
      camera.lookAt(0,0,0);
      scene.add(camera);

      // const axesHelper = new THREE.AxesHelper(700);
      // this.add(axesHelper);

      // 添加灯光
      // this.addLight();
      // this.addBox();
      this.loadModel();
      container.addEventListener('mousedown',this.onDocumentMouseDown,false);
      document.addEventListener('touchstart', this.onDocumentTouchDown, false);
      document.addEventListener('touchend',this.onDocumentTouchUp,false);
      document.addEventListener('touchmove',this.onDocumentTouchMove, false);
      // document.addEventListener('mouseup',this.onDocumentMouseUp,false);
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
            path:'/caselist/'+path
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
      let intersects = rayCaster.intersectObjects(this.group.children, true);
      //返回选中的对象
      return intersects;
    },

    changeCamera(gltf){
      _object = gltf.scene || gltf.scenes[0];

      const box = new THREE.Box3().setFromObject(_object);
      const size = box.getSize(new THREE.Vector3(0,0,0)).length();
      const center = box.getCenter(new THREE.Vector3(0,0,0));

      _object.position.x += (_object.position.x - center.x);
      _object.position.y += (_object.position.y - center.y);
      _object.position.z += (_object.position.z - center.z);

      _object.scale.set(0.96,0.96,0.96);
      _object.translateY(0.1);

      camera.near = size / 100;
      camera.far = size * 100;

      camera.position.copy(center);

      camera.position.x += (size / 2.0);
      camera.position.y += (size / 5.0);
      camera.position.z += (size / 2.0);
      camera.lookAt(center);

      camera.up = new THREE.Vector3(0, 1, 0);
      camera.updateProjectionMatrix();

      this.group.add(_object);
      scene.add(this.group);
      
        // 渲染器
      renderer = new THREE.WebGLRenderer({
        antialias: true
      })

      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;//aces标准
      renderer.toneMappingExposure = 1.2;//色调映射曝光度
      renderer.shadowMap.enabled = true;//阴影就不用说了
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;//阴影类型（处理运用Shadow Map产生的阴影锯齿）
      // this.textureEncoding = THREE.sRGBEncoding;

      renderer.setClearColor(new THREE.Color('#000000'), 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(this.width, this.height);

      this.$refs.webglDomB.appendChild(renderer.domElement);

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
    },

    loadModel(){
      const loader = new GLTFLoader();
      // Draco 解码库
      const dracoLoader = new DRACOLoader();
      const path = this.sourcRootUrl+'/js/libs/draco/';
      dracoLoader.setDecoderPath(path);
      dracoLoader.setDecoderConfig({ type: 'js' });
      dracoLoader.preload();

      loader.setDRACOLoader(dracoLoader);
      const glburl = this.$store.state.sourcRoot+'/caseimg/02_new.glb';
      loader.load(glburl, (gltf) => {
        // console.log("gltf", gltf);
        //方法四
        this.changeCamera(gltf);
      })
    },

    printGraph (node) {
      // console.log("node.children.length",node.children.length);
      console.group(' <' + node.type + '> ' + node.name);
      node.children.forEach((child) => this.printGraph(child));
      console.groupEnd();
    },
    addLight () {
      const common_num = 1000;
      // 环境光
      const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
      this.add(ambientLight);

      // 平行光（太阳光）正面
      const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
      directionalLight.position.set(0, common_num, common_num);
      // directionalLight.castShadow = true;
      this.add(directionalLight);

      // 左侧
      const directionalLight2 = new THREE.DirectionalLight(0xffffff,0.5);
      directionalLight2.position.set(0-common_num, common_num, common_num);
      this.add(directionalLight2);

      // 右侧
      const directionalLight3 = new THREE.DirectionalLight(0xffffff,0.5);
      directionalLight3.position.set(common_num, common_num, common_num);
      this.add(directionalLight3);

      // 背面
      const directionalLight4 = new THREE.DirectionalLight(0xffffff,0.5);
      directionalLight4.position.set(0, common_num, 0-common_num);
      this.add(directionalLight4);

      const directionalLight5 = new THREE.DirectionalLight(0xffffff,0.5);
      directionalLight5.position.set(0, 0-common_num, 0-common_num);
      this.add(directionalLight5);
    },
    add (obj) {
      scene.add(obj);
    },
    render () {
      renderer.render(scene,camera);
      requestAnimationFrame(this.render);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.webglDomBB{
  width: 100%;
  height:100%;
  position: relative;
  z-index: 1;
  // padding-bottom: 10px;
  // height:calc(100% + 100px);
  // overflow: hidden;
}
</style>