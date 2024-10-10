<template>
  <div class="title_bar">
    <div class="flex_left" @click="onPrePage"><上一条</div>
    <div class="flex_left">|</div>
    <div class="flex_left" @click="onNextPage">下一条></div>
  </div>
  <div class="content">
    <div class="title">
      <img :src="title_icon" class="title_icon"></img>
      <div class="title_type">{{ loginStore.ItemList[loginStore.currentItem].fFormType }}</div>
      <div class="title_number">{{ loginStore.ItemList[loginStore.currentItem].fNumber }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref,computed } from 'vue'
import { useLoginStore } from '@/stores'
import { useRouter } from 'vue-router'


import { showToast } from 'vant'
import 'vant/es/toast/style'
//使用路由来改变当前流程url
const router = useRouter()
//引入流程标题图标
import PendingApprovalIcon from '@/assets/icon/PendingApproval.png';
import ApprovedIcon from '@/assets/icon/Approved.png';
import IInitiateIcon from '@/assets/icon/IInitiate.png';

const title_icon = computed(()=>{
  return loginStore.currentPageCode===0?PendingApprovalIcon:(loginStore.currentPageCode===1?ApprovedIcon:IInitiateIcon)
})
 
 

//接收流程列表传递的流程ID
const fProcinstID = defineProps({
  fProcinstID: String
})

 
 
//从后台请求回来的流程列表个数 
const maxIndex = computed(()=>{
  return loginStore.ItemList.length-1
})
 

//引入本地缓存loginstore对象用来读取userphone
const loginStore = useLoginStore()
loginStore.currentItem  = loginStore.ItemList.findIndex(
  (item) => item.fProcinstID === fProcinstID.fProcinstID
)
 
//上一条按钮
const onPrePage = async () => {
  if (loginStore.currentItem === 0) {
    showToast({
      message: '已经是第一条数据',
      duration: 1000
    })
  } else {
    if (loginStore.currentItem > 0) {
      loginStore.currentItem -= 1
      await router.replace({ name: 'FlowDetail', params: { fProcinstID: loginStore.ItemList[loginStore.currentItem].fProcinstID } })      
    }
  }
}
//下一条按钮
const onNextPage = async () => {
  if (loginStore.currentItem === maxIndex.value) {
    showToast({
      message: '已经是最后一条数据',
      duration: 600
    })
  } else {
    if (loginStore.currentItem < maxIndex.value) {
      loginStore.currentItem += 1
      await router.replace({ name: 'FlowDetail', params: { fProcinstID: loginStore.ItemList[loginStore.currentItem].fProcinstID } })
    }
  }
} 
onMounted(()=>{  
   
})
</script>

<style scoped>
.title_bar {
  height: 30px;
  width: 100%;
  font-size: 45px;
  color: rgb(32, 149, 226);
}
.flex_left {
  float: left;
  margin-left: 100px;
  margin-top: 0px;
}
.content {
  height: 100%;
  width: 100%;
  margin-top: 30px;
}
.title {
  margin-top: 70px;
  padding-bottom: 15px;
  margin-left: 60px;
  margin-right: 60px;
  font-size: 35px;
  border-bottom: 1.5px dashed #d8a2a2; 
}
.title_type {
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 10px;
}
.title_number {
  font-size: 26px;
  color: darkgray;
}
.title_icon {
  width: 90px;
  height: 90px;
  float: right;
  margin-right: 10px;
}
</style>
