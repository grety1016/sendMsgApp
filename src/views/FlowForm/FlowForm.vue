<template>
  <van-tabs v-model:active="CurrentPage" @change="onTabChange" class="fixed-top">
    <van-tab title="待办项"
      ><template #title
        >待办项<van-icon
          class="iconfont"
          class-prefix="icon"
          name="TodoList"
          size="0.45rem" /></template
    ></van-tab>
    <van-tab title="已办项"
      ><template #title
        >已办项<van-icon
          class="iconfont"
          class-prefix="icon"
          name="Completed"
          size="0.45rem" /></template
    ></van-tab>
    <van-tab title="我发起"
      ><template #title
        >我发起<van-icon
          class="iconfont"
          class-prefix="icon"
          name="InitiatedIt"
          size="0.45rem" /></template
    ></van-tab>
  </van-tabs>

  <div class="item_list">
    <van-pull-refresh
      v-model="isLoading_todo"
      success-text="刷新成功"
      @refresh="onRefresh"
      class="item_list"
    >
      <!-- //列表加载项 -->
      <van-list v-model:loading="loading" :finished="finished" @load="onRefresh">
        <van-cell v-for="item in ItemListLocal" :key="item.fProcinstID">
          <template v-slot:title>
            <div>
              <div>{{ item.fNumber }}</div>
              <div>{{ item.fDisplayName }}</div>
              <div v-show="isDisplay">{{ item.fName }}</div>
              <div>{{ item.fStatus }}</div>
              <div>{{ item.fFormType }}</div>
              <div>{{ item.fCreateTime }}</div>
            </div>
          </template>
        </van-cell>
        <van-cell v-for="item in list" :key="item" :title="item" />

        <van-back-top />
      </van-list>

      <!-- //列表加载项 -->
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
// import { useLoginStore } from '@/stores/index'
// import { useRouter } from 'vue-router';
import { onMounted, ref, computed } from 'vue'
//vant
import { showLoadingToast, closeToast } from 'vant'
import 'vant/lib/pull-refresh/style'
import 'vant/es/toast/style'
//piniaStore
import { useLoginStore } from '@/stores'
//httpAPI
import { getItemList } from '@/api/sendMsg'

//types
import type { IGeetItemList, IFlowItemList } from '@/types/types_d'

//列表变量
const ItemListLocal = ref([] as IFlowItemList[])
const loading = ref(false)
const finished = ref(false)

const isLoading_todo = ref(false)

//引入本地缓存loginstore对象用来读取userphone
const loginStore = useLoginStore()
//实时监听当前页面
const CurrentPage = ref<number>(loginStore.currentPageCode) //0:todo(待办项) 1：done(已办项) 2：initiated(我发起)
const isDisplay = computed(() => {
  return !(CurrentPage.value === 2)
})

//保存当前页面码及用户手机号用于发起请求列表参数
const getItemParam = computed<IGeetItemList>(() => ({
  userPhone: loginStore.loginUser.userPhone,
  itemStatus: CurrentPage.value as 0 | 1 | 2
}))

// const loginStore = useLoginStore();
// const router = useRouter();
onMounted(async () => {
  await onRefresh()
})

//页签刷新数据方法
const onRefresh = async () => {
  getItemList(getItemParam.value)
    .then((res) => {
      ItemListLocal.value = res.data
      console.log(ItemListLocal.value)
      isLoading_todo.value = false
      finished.value = true
    })
    .catch((e) => {
      console.log(e)
      closeToast()
    })
}

const onTabChange = async () => {
  // 显示加载中的提示
  showLoadingToast({
    message: '加载中...',
    forbidClick: true
  })

  await onRefresh() //调用页签刷新数据方法
  closeToast()

  loginStore.currentPageCode = CurrentPage.value //切换页签时把页码回写到本地缓存
}
</script>

<style scoped>
:deep(.van-tab__text--ellipsis) {
  font-size: 38px;
}

.item_list {
  width: 100vw;
  margin-top: 1.5rem;
}
.fixed-top {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff; /* 背景颜色可以根据需要调整 */
  z-index: 1000; /* 确保元素在其他内容之上 */
}
</style>
