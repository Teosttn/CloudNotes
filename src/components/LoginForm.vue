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
      <router-link to="/Register">立即注册</router-link>
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

const router = useRouter()

const username=ref('')
const password=ref('')

function submitAccount() {
  router.push('/Main')
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