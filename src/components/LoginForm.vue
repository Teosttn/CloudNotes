<template>
  <div class="login">
    <div class="Title">
        <h2 class="TitleName">云端笔记</h2>
    </div>
    <div class="InputBox">
        <el-input 
          class="UserInput"
          v-model="username" 
          placeholder="账号" 
          :prefix-icon="User"
        />
      <el-input 
          class="PasswordInput"
          v-model="password" 
          type="password" 
          placeholder="密码" 
          show-password
          :prefix-icon="Key"
        />
    </div>
    <div class="AttentionLine">
      没有账号？
      <router-link to="/register">立即注册</router-link>
    </div>
    <div>
      <el-button type="primary" class="LoginButton" @click="submitAccount">
                      登录
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { User,Key } from '@element-plus/icons-vue'
import {ref} from 'vue'
import { useRouter} from 'vue-router'
import axios from 'axios';
import { useStore } from 'vuex';
import { loginAPI } from '../api/user';
import { messageBox } from '../utils/common';

//初始化路由，仓库等
const store = useStore()
const router = useRouter()

//定义输入框绑定的数据
const username=ref('')
const password=ref('')


//判断输入框的内容
function judgeInput(){
  var flag = true
  if(!username.value && !password.value){
    messageBox('账号或密码不能为空','warning')
    flag = false
  }
  return flag
}

//提交登录操作
function submitAccount() {
  if(judgeInput()){
    console.log('正在进行登录请求');
    login();
  }
}

//进行axois异步请求
function login(){
  loginAPI(username.value,password.value).then(response=>[
    judgeLogin(response)
  ])
}


//判断登陆是否成功
function judgeLogin(response){
  if(response.data.flag){
    //获取token
    const token = response.data.data;
    //存储token
    localStorage.setItem('token', token);
    console.log('正在打印token'); 
    console.log(token);
    
    //登录验证成功
    console.log('登录请求成功');
    console.log(response);

    //跳转到主界面
    router.push({path:'/main',query:{user:username.value}})
    
    messageBox(response.data.msg,'success')
  }
  else{
    //处理登陆失败的情况
    messageBox(response.data.msg,'error')
  }
}

</script>

<style  scoped>
.login{ 
    backdrop-filter: blur(20px);
    width: 500px;
    height: 400px;
    margin: auto;
    margin-top: 150px;
    padding: 50px;
    border-radius: 10px;
    background-color: rgba(255, 251, 251, 0.763);
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
.AttentionLine{
    margin-top: 20px;
}
.LoginButton{
    margin-top: 30px;
    width: 400px;
    height:40px;
    font-size: large;
}
</style>