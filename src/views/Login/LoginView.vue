<template>
  <LoginBackground />
  <div class="login_input">
    <van-form @submit="onSubmit">
      <div class="login_content">
        <div class="login_input_phone">
          <van-field v-model="user.userPhone" name="userName" left-icon="user-o" placeholder="请输入绑定钉钉手机号"
            class="transparent-input">
            <template #left-icon>
              <van-icon class="iconfont ico_size" class-prefix="icon" name="phone" size="0.5rem"></van-icon>
            </template>
          </van-field>
        </div>
        <div class="login_input_code">
          <van-field v-model="user.smsCode" type="text" left-icon="comment-o" name="userPwd" placeholder="请输入验证码"
            class="transparent-input">
            <template #left-icon>
              <van-icon class="iconfont ico_size" class-prefix="icon" name="message_fill" size="0.5rem"></van-icon>
            </template>
            </van-field>
          <van-button type="primary" :disabled=disabled class="login_getcode"
            @click="onPush">{{ buttonText }}</van-button>
        </div>
      </div>
      <van-button plain hairline type="primary" native-type="submit" class="login_button">
        登 录</van-button>
    </van-form>    
  </div>
   <div>
    <van-dialog v-model:show="dialogShow" title="发送成功，添加至浮窗，复制验证码" confirmButtonText="我知道了">
      <img src="@/assets/picture/smscode_Remind.png"  class="dialog_img"/>
    </van-dialog>
   </div>
   
   
 

</template>


<script setup lang="ts">

import { reactive, defineAsyncComponent, ref, watchEffect, onMounted } from "vue";
// import { FieldRule, FieldValidateTrigger, FieldRuleValidator } from 'vant'
//引入login从API
import { onLogin, getCode } from "@/api/userLogin";
//引入pinia的Store
import { useLoginStore } from "@/stores";
//引入类型
import { User } from "@/types/types";
//引入请求相关
import axios from "axios";
import { useRouter } from "vue-router";
//引入vant的组件
import {
  showLoadingToast,
  showToast,
  showDialog
} from "vant";

import 'vant/es/toast/style';

//获取pinia的Store
const LoginStore = useLoginStore();

//引入背景组件  
//@ts-ignore
const LoginBackground = defineAsyncComponent(() => import("@/components/BackGround.vue"));

//短信按钮是否可用
const disabled = ref(false);
if (LoginStore.loginUser.userPhone === "") {
  disabled.value = true;
}


//检查手机号，当手机号正确时生效获取验证码的按钮（文本框失去焦点或者是按回车）
const changeDisabled = () => {
  if (/^1[3456789]\d{9}$/.test(user.userPhone)) {
    disabled.value = false;
  } else {
    disabled.value = true;
  }
};
//组件加载完成后执行
onMounted(() => {
  //监听文本变化改变验证码按钮状态
  watchEffect(() => {
    // 模拟一个 blur 事件      
    changeDisabled();
  });
});


//判断短信按钮是否被点击了
const isPush = ref(false);
const buttonText = ref('获取验证码');
//短信最短60秒内获取一次
const wait = ref(60);

//短信倒计时读秒
const countDown = () => {
  isPush.value = true;
  if (wait.value == 0) {
    disabled.value = false;
    buttonText.value = "获取验证码";
    wait.value = 60;
  } else {
    disabled.value = true;
    buttonText.value = `${wait.value} 秒后重新发送`;
    wait.value--;
    setTimeout(function () {
      countDown();
    }, 1000);
  }
};

const dialogShow = ref(false);


const onPush = () => {

  //向服务器请求随机验证码
  getCode(user.userPhone).then((res) => {
    if (res.data.code === 0) {
      dialogShow.value=true;
    } else if (res.data.code === -2) {
      dialogShow.value=true;      
    } else {
      showToast({
        message: "该手机未注册\n请联系管理员注册手机号！",
        duration: 6000,
      });
    }
  }).catch((err) => {
    console.log(err);
  });
  //开始倒计时
  countDown();

};


//实例化user类型实例
let user: User = reactive<User>(new User());
user.userPhone = LoginStore.loginUser.userPhone;
user.smsCode = "";
user.token = LoginStore.loginUser.token;
//let user: User = reactive(LoginStore.loginUser);

const router = useRouter();

//如下代码用于验证码框失去焦点自动处理非数字的字符
// const onBlur = () => {
//   user.userPwd = user.userPwd.replace(/\D/g, '').trim();
// };

//登录表单提交事件函数
const onSubmit = async () => {
  //获取IP地址
  // axios.get('https://api.ipify.org?format=json')
  //   .then(response => {
  //     console.log('Public IP Address:', response.data.ip);
  //   })
  //   .catch(error => {
  //     console.error('Error getting IP address:', error);
  //   });
  if (loginValid()) {
    //如果网络慢会在登录时出现登录中的提示图标
    showLoadingToast({
      message: "登录中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    //调用API接口登录方法
    onLogin(user)
      .then((res) => {
        //判断返回响应代码是否为0，,0为成功，其它为失败
        if (res.data.code === 0) {
          showToast({
            message: "  登录成功",
            icon: "smile"
          });
          //将登录成功后的用户信息保存到pinia中
          console.log(res.data.smsCode);
          LoginStore.setUserData(res.data);
          //将登录界面中的输入框清空
          //user = Object.assign(user, new User());
          router.push({
            name: "FlowForm",
            //replace: true
          });
        } else {
          LoginStore.setUserData(res.data);
          showToast({
            message: "  验证码错误",
            icon: "close",
          });
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log("Other error", error.message);
          // 处理其他错误
        }
      });
  }
};

//定义登录表单验证规则
const loginValid = () => {
  if (user.userPhone === "") {
    showToast("请输入手机号");
    return false;
  } else if (!/^1[3456789]\d{9}$/.test(user.userPhone)) {
    showToast("手机号格式不正确");
    return false;
  }
  if (user.smsCode === "") {
    if (!disabled.value && !isPush.value) {
      showToast("请获取验证码");
      return false;
    } else {
      showToast("请输入验证码");
      return false;
    }

  } else if (!/^[0-9]{6}$/.test(user.smsCode)) {
    showToast("验证码格式不正确");
    return false;
  }
  return true;
};




</script>

<style scoped lang="scss">
.login_input {
  position: absolute;
  transform: translate(48px, -520px);
  width: 660px;
  height: 400px;
  border-radius: 60px;
  /* 圆角处理 */
  background-color: rgba(85, 86, 87, 0.2);
  padding-left: 2px;
}

.login_content,
.login_button,
.login_input_code,
.login_input_phone,
.login_getcode,
.van-cell {
  background-color: transparent;
  color: aliceblue;
  font-size: 30px;
}

.van-button.login_button {
  border: none;
  height: 50px;
  padding-left: 40px;
  width: 600px;
}

.van-button.login_getcode {
  border: none;
  height: 50px;
  padding-left: 0px;
  width: 600px;
}

/* 手机输入框样式 */
.van-cell.van-field {
  font-size: 30px;
  color: aliceblue;
  width: 100%;
}

/* 输入文本框字体样式 */
:deep(input) {
  color: aliceblue;
}

/* 验证码区域 */
.login_input_code .van-cell.van-field {
  font-size: 30px;
  width: 100%;
}

.login_input_code {
  display: flex;
  align-items: center;
}

/* 文本框内的横线样式去除 */
div.van-cell.van-field.transparent-input::after {
  border: none;
}

/* 验证码区域样式 */
.login_input_code {
  display: flex;
  align-items: center;
}

/* 输入文本内容与登录背景的样式 */
.login_input_code,
.login_input_phone {
  padding-left: 50px;
  padding-top: 25px;
}

/* 输入文本框与图标的距离样式 */
:deep(input.van-field__control) {
  margin-left: 25px;
}

/* 登录按钮样式 */
:deep(.van-button.van-button--primary.van-button--normal.van-button--plain.van-button--hairline.van-hairline--surround) {
  width: 450px;
  height: 90px;
  margin-left: 105px;
  margin-top: 35px;
}
// show_dialog样式
:deep(.van-dialog){
width: 90%;
height: 88%; 
}

:deep(.van-dialog__content){ 
  height: 80%;
  justify-content: space-around; 
  display: flex; 
}
.dialog_img{
  width: 70%; 
}
 
</style>
