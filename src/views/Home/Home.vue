<script setup>
import { User,Key } from '@element-plus/icons-vue'
import {ref} from 'vue'
import { useRouter} from 'vue-router'

const router = useRouter()
const Username =ref('');
const Password =ref('');
        
function SubmitAccount() {
    router.push('/Main')
}
</script>

<template>
    <div id="Content">
        <div id="Login">
            <div class="Title">
                <h2 class="TitleName">云端笔记</h2>
            </div>
            <div class="InputBox">
                <el-input 
                    class="UserInput"
                    v-model="Username" 
                    placeholder="账号" 
                    :prefix-icon="User"
                />
                <el-input 
                    class="PasswordInput"
                    v-model="Password" 
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
                <el-button type="primary" class="LoginButton" @click="SubmitAccount">
                    登录
                </el-button>
            </div>
        </div>  
    </div>
</template>

<style scoped>
#Content{
  background: url('../../assets/img/RegisterPage.jpg') no-repeat center;
  background-size: cover;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
}
#Login{ 
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