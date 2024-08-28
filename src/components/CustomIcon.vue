
<template>
  <i :class="['iconfont', iconclass,'icon-size']" :style="`font-size:${size}`" />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  iconclass: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '20px'
  }
})
</script>

<style scoped></style>

<!-- <template #left-icon>   
  //其中#left-icon是插槽名称，在父组件中定义插槽，在子组件中通过插槽名称获取插槽内容  
  //icon-InitiatedIt是图标名称，在父组件中定义图标，在子组件中通过图标名称获取图标内容
  //size是图标大小，在父组件中定义图标大小，在子组件中通过图标大小获取图标大小
  <CustomIcon icon-class="icon-InitiatedIt" size="0.5rem"></CustomIcon>               
 </template> -->
