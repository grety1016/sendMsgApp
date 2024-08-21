<!--这里创建一个vantajs的挂载区域-->
<template>
   <div class="vanta_area" ref="Area">
      <img class="login" src="../assets/logo/logo.png" />
      <img class="login2" src="../assets/logo/logo3.png" />    
    </div>
</template>
<script setup> </script>
<style lang="less" scoped>
.vanta_area {
  width: 100vw; /* 设置宽度为视口宽度 */
  height: 100vh; /* 设置高度为视口高度 */ 
  background:url("../assets/logo/bg.png");
  background-size: cover; /* 背景图片��满整个容器 */
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
