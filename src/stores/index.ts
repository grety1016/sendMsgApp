import { createPinia, defineStore } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { reactive,ref } from 'vue'
import { User } from '@/types/types'
// import useWebSocket  from 'vue-native-websocket-vue3'

export const pinia = createPinia().use(piniaPluginPersistedstate)


//LoginView页面的store
export const useLoginStore = defineStore(
  'useLoginStore',
  () => {
    //定义一个userLoginStore重置方法
    const reset = () => {
      //重置loginUser
      loginUser.reset()
    }

    //定义userLoginStore变量
    let loginUser:User = reactive(new User());

    //定义userLoginStore函数
    const setUserData = (data: User) => {
      loginUser = Object.assign(loginUser, data)
      loginUser.smsCode = ''
      //另外一种展开语法  loginUser = { ...loginUser, ...data };这种方法要求被复制的对象也有跟新的对象有相同的方法方可

    }

  //FlowForm页面store
    const currentPageCode = ref(0); //0:todo(待办项) 1：done(已办项) 2：initiated(我发起)

    //将变量及方法暴露出去
    return {
      //公共方法
      reset,
      //loginUser变量及方法
      loginUser,
      setUserData,
      currentPageCode,
    }
  },
  {
    persist: [
      {
        key: 'localStorage',
        storage: window.localStorage,
        paths: ['loginUser','currentPageCode']
      }
      // ,{
      //     key:'sessionStorage',
      //     storage:window.sessionStorage,
      //     paths:['loginUser']}
    ]
  }
)

// export const useWebSocketStore =defineStore('useWebSocketStore',()=>{
//     const { status, data, send, open, close } = useWebSocket('ws://websocketurl')
// },{
//     persist:{
//         key:'useWebSocketStore',
//         storage:window.localStorage,
//     }
// });
