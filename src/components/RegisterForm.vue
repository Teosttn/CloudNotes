<template>
      <div class="register">
        <div class="Title">
          <h2 class="TitleName">用户注册</h2>
        </div>
        <div class="InputBox">
          <el-input class="UserInput" v-model="Username" placeholder="账号"  :prefix-icon="User" />
          <el-input class="PasswordInput" v-model="Password1" type="password" placeholder="密码" show-password :prefix-icon="Key"  />
          <el-input class="PasswordInput" v-model="Password2" type="password" placeholder="确认密码" show-password :prefix-icon="Key"  />
        </div>
        <div>
          <el-button type="primary" class="RegisterButton" @click="finishRegister">
            注册
          </el-button>
        </div>
      </div>
</template>
  
  <script setup>
import {ref} from 'vue'
import { useRouter} from 'vue-router'
import { User,Key } from '@element-plus/icons-vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { registerAPI } from '../api/user'
import { messageBox } from '../utils/common'

const store = useStore()
//初始化路由
const router = useRouter()

//定义输入框绑定的数据
 const Username = ref('')
 const Password1 = ref('')
 const Password2 = ref('')

//判断输入框的内容
function judgeInput(){
  var flag = true
  if(Password1.value != Password2.value){
    messageBox('两次输入的密码不一致','warning')
    flag = false
  }
  if(!Username.value || !Password1.value || !Password2.value){
    messageBox('账号或密码不能为空','warning')
    flag = false
  }
  
  return flag
}

//提交注册操作  
 function finishRegister(){
  if(judgeInput()){
    register()
  }
 }


// 进行axios请求
function register(){
  registerAPI(Username.value,Password1.value).then(response=>{
    judgeRegister(response)
  })
}

//判断注册是否成功
function judgeRegister(response){
  if(response.data.flag){
    messageBox('注册成功','success')
    router.push('/')
  }
  else{
    messageBox('出现未知错误','error')
  }
}

</script>
  
  <style scoped>
    .register{
        width: 500px;
        height: 450px;
        margin: auto;
        margin-top: 150px;
        padding: 50px;
        border-radius: 10px;
        background-color: rgba(255, 251, 251, 0.763);
        backdrop-filter: blur(20px);
        box-shadow: 
        0 0.3px 0.7px rgba(0, 0, 0, 0.180),
        0 0.9px 1.7px rgba(0, 0, 0, 0.180),
        0 5.0px 10px rgba(0, 0, 0, 0.225),
        0 3.7px 7.3px rgba(0, 0, 0, 0.280),
        0 10px 20px rgba(0, 0, 0, 0.4);
    }
    .UserInput{
        margin-top: 20px;
        width: 400px;
        height:40px;
    }
    .PasswordInput{
        margin-top: 20px;
        width: 400px;
        height:40px;
    }
    .TitleName{
        text-align: center;
        color: gray;
    }
    .RegisterButton{
        margin-top: 50px;
        width: 400px;
        height:40px;
        font-size: large;
    }
</style>
  