<template>
  <van-tabs v-model:active="active" @change="onTabChange">
    <van-tab title="待办项" name="todo"><template #title>待办项<van-icon class="iconfont" class-prefix="icon" name="TodoList"
          size="0.45rem" /></template></van-tab>
    <van-tab title="已办项" name="done"><template #title>已办项<van-icon class="iconfont" class-prefix="icon" name="Completed"
          size="0.45rem" /></template></van-tab>
    <van-tab title="我发起" name="myInitiation"><template #title>我发起<van-icon class="iconfont" class-prefix="icon"
          name="InitiatedIt" size="0.45rem" /></template></van-tab>
  </van-tabs>
   


  <div v-show="loaded_todo" class="item_list">
    <van-pull-refresh v-model="isLoading_todo"  success-text="刷新成功" @refresh="onRefresh" class="item_list">
      <p>请按住我下拉刷新内容</p>
      <p>刷新次数: {{ count }}</p> 
    </van-pull-refresh>
  </div>






</template>

//
<script setup lang="ts">
// import { useLoginStore } from '@/stores/index'
// import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { showLoadingToast, closeToast } from 'vant';
import 'vant/lib/pull-refresh/style';
import 'vant/es/toast/style';
import CustomIcon from '@/components/CustomIcon.vue';



 

// const loginStore = useLoginStore();
// const router = useRouter();

const count = ref(0);
const isLoading_todo = ref(false);
const onRefresh = () => {
  setTimeout(() => { 
    isLoading_todo.value = false; 
    count.value++;   
  }, 300);
};

const active = ref('todo');
const loaded_todo = ref(true); 

const onTabChange = async () => {
  loaded_todo.value = false;
  // 显示加载中的提示
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
  }); 
  // 模拟异步加载数据
  setTimeout(async () => {
    // 取消显示加载中的提示
    closeToast();
    loaded_todo.value = true;
  }, 300);
};





</script>

<style scoped>
:deep(.van-tab__text--ellipsis) {
  font-size: 35px;
}

.item_list {
  width: 100vw;
  height: 100vh;
}
</style>