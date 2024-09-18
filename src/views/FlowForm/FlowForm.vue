<template>
  <van-tabs v-model:active="CurrentPage" @change="onTabChange">
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
    </van-pull-refresh>
  </div>
</template>

//
<script setup lang="ts">
// import { useLoginStore } from '@/stores/index'
// import { useRouter } from 'vue-router';
import { onMounted, ref, computed } from 'vue'
import { showLoadingToast, closeToast } from 'vant'
import 'vant/lib/pull-refresh/style'
import 'vant/es/toast/style'
import { useLoginStore } from '@/stores'
import { getItemList } from '@/api/sendMsg'
import type { IGeetItemList } from '@/types/types_d'

const loginStore = useLoginStore()
const CurrentPage = ref<number>(0) //0:todo(待办项) 1：done(已办项) 2：initiated(我发起)

const getItemParam = computed<IGeetItemList>(() => ({
  userPhone: loginStore.loginUser.userPhone,
  itemStatus: CurrentPage.value as 0 | 1 | 2
}))

// const loginStore = useLoginStore();
// const router = useRouter();
onMounted(async () => {
  await onRefresh()
})

const isLoading_todo = ref(false)

const onRefresh = async () => {
  getItemList(getItemParam.value)
    .then((res) => {
      console.log(res)
      isLoading_todo.value = false
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
  await onRefresh()
  closeToast()
}
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
