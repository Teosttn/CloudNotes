<script setup>
import { MostlyCloudy,User,ArrowDown,Search } from '@element-plus/icons-vue'
import { useRouter} from 'vue-router'
import axios from 'axios';
import { ref,computed } from 'vue';
import { defineProps } from 'vue';
import { useStore } from 'vuex';


//通过localStorage获取token
const token = localStorage.getItem('token');

const prop = defineProps(['usr'])
const router = useRouter()
const store = useStore()

//登出账号
function loginOut(){
    axios({
    method:'post',
    url:'api/users/logout',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    }
    }).then(response=>{
        console.log(response);
      }).catch(error=>{
        console.error(error);
      })
}
function handleLogOut(){
  loginOut()
  router.push('/')
}

//控制搜索功能

const searchModeController = computed(()=>store.state.searchMode)
const searchNotebookTitle = ref('')

function searchNotebook(){
  store.commit('updateSearchNotebook',searchNotebookTitle.value)
  axios({
    method:'get',
    url:'api/notebooks/getNotebookByTitle',
    headers:{
      'Authorization':`${token}`
    },
    params:{
      notebookTitle:searchNotebookTitle.value
    }
  }).then(response=>{
    console.log('搜索成功');
    store.commit('updateNoteData',response.data.data)
    console.log(response);
  }).catch(error=>{
    console.error(error);
  })
}

</script>

<template>

    <div class="headerContainer">
      <!-- logo -->
      <div class="Logo">
        <h2 class="LogoWord">
          <el-icon>
            <MostlyCloudy />
          </el-icon>
          云端笔记
        </h2>
      </div>

      <!-- 内容 -->
      <div class="headerContent">
        <!-- 搜索部分 -->
        <div class="searchContainer" >

          <div class="searchMain" v-if="searchModeController">
            <h3 class="searchTitle">标题</h3>
            <el-input
            v-model="searchNotebookTitle"
            class="searchInput"
            placeholder="请输入标题"
            :prefix-icon="Search"
            />
            <el-button color="rgb(61,100,169)" class="searchButton" @click="searchNotebook">搜索</el-button>
          </div>

        </div>
        
        <!-- 用户部分 -->
        <div class="UserInf">

          <el-icon :size="25"><User /></el-icon>
          <el-dropdown class="UserInfDrop">
            <el-icon :size="25"><ArrowDown /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleLogOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
          </el-dropdown> 

        </div>
      </div>

    </div>
</template>

<style scoped>


.headerContainer{
  width: 100%;
}
.headerContent{
  display: flex;
  flex-direction: row;
}
.searchContainer{
  flex: 17;
  display: flex;
  flex-direction: row;
}
.searchMain{
  display: flex;
  flex-direction: row;
}
/* 左上角logo部分 */
.Logo{
  background-color: palevioletred;
  width: 300px;
  height: 60px;
  float: left;
  box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 5.0px 10px rgba(0, 0, 0, 0.225),
    0 3.7px 7.3px rgba(0, 0, 0, 0.280),
    0 10px 20px rgba(0, 0, 0, 0.4);
}
.LogoWord{
  margin-top: 10px;
  text-align: center;
  color: #FFF;
  margin-right: 10px;
}

/* 用户退出登录部分 */
.UserInf{
  right: 0px;
  flex: 1;
  display: flex;
  padding-top: 20px;
  color: #FFF;
  
}
.UserInf :hover{
  color: rgb(219,112,147);
}
.UserInfDrop{
  float: right;
  color: #FFF;
}
.searchContainer{
  margin-top: 15px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.searchTitle{
  width: 40px;
  color: #FFF;
}
.searchInput{
  margin-left: 10px;
  width: 300px;
}
.searchButton{
  margin-left: 10px;
}
</style>