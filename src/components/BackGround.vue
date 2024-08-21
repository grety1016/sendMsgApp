<!--这里创建一个vantajs的挂载区域-->
<template>
   <div class="vanta_area" ref="Area">
      <img class="login" src="../assets/logo/logo.png" />
      <img class="login2" src="../assets/logo/logo3.png" />    
    </div> 
</template>
<script setup>
//导入vanta.js和three.js，以及ref等hooks
import * as THREE from 'three'
import GLOBE from 'vanta/src/vanta.GLOBE'
import { onMounted, onBeforeUnmount, ref } from 'vue'

//使用ref引用挂载区域
const Area = ref(null)
//创建一个全局的变量来使用vanta.js
/**
 *因为在vue2中，是使用this.vantaEffect来创建指定的3d动画模板的
 *但是vue3 setup中是没有this，所以要另外创建一个
 **/
let vantaEffect = null
//在两个生命周期钩子内创建vantaEffect
onMounted(() => {
  vantaEffect = GLOBE({
    el: Area.value,
    THREE: THREE,
    //如果需要改变样式，要写在这里
    mouseControls: false,
    touchControls: false,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1,
    scaleMobile: 2,
    size:0.8,
    //因为这里vantaEffect是没有setOptions这个方法的
  })
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>
<style lang="less" scoped>
.vanta_area {
  width: 100vw; /* 设置宽度为视口宽度 */
  height: 100vh; /* 设置高度为视口高度 */ 
}
.login {
  width: 140px;
  height: 100px;
  position: absolute;
  top: 20px;
  left: 20px;
}
.login2 {
  width: 220px;
  height: 104px;
  position: absolute;
  top: 20px;
  left: 155px;
}
</style>
