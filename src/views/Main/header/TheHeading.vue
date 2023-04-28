<script setup>
import { MostlyCloudy,User,ArrowDown,Search } from '@element-plus/icons-vue'
import { useRouter} from 'vue-router'
import axios from 'axios';
import { ref,computed } from 'vue';
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import { loginOutAPI } from '../../../api/user';
import { searchNotebookAPI } from '../../../api/note'

//通过localStorage获取token
const token = localStorage.getItem('token');

const prop = defineProps(['usr'])
const router = useRouter()
const store = useStore()

//处理登出操作
function handleLogOut(){
  loginOutAPI().then((response=>{
    //清除token
    localStorage.removeItem('token');
  }))
  router.push('/')
}

//控制搜索功能

const searchModeController = computed(()=>store.state.searchMode)
const searchNotebookTitle = ref('')
const currentPageForSearch = computed(()=>store.state.currentPageForSearch)

function searchNotebook(){
  store.commit('changePageTurnMode')
  store.commit('updateSearchNotebook',searchNotebookTitle.value)
  searchNotebookAPI(searchNotebookTitle.value,currentPageForSearch.value,token).then(response=>{
    store.commit('updateNoteData',response.data.data.records)
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
            <div ><img src="../../../assets/img/searchTitle.gif" class="searchTitle"/></div>
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
  border-radius: 5px;
  width: 40px;
  color: #FFF;
}
.searchInput{
  margin-left: 10px;
  height: 35px;
  width: 300px;
}
.searchButton{
  margin-left: 10px;
}
</style>