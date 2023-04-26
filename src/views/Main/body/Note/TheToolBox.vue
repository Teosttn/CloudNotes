<!-- 工具箱：对笔记栏进行操作的按钮 -->
<template>
    <div class="buttonsContainer">
      <div class="leftButtons">
        <el-button color="rgb(242,209,102)" :icon="Plus" class="ToolButton" @click="addNote">新增</el-button>
        <el-button color="rgb(244,159,180)" :icon="Edit" class="ToolButton" @click="editNote">修改</el-button>
        <el-button color="rgb(223,75,87)" :icon="Delete" class="ToolButton" @click="deleteNotes">删除</el-button>
        <el-button color="rgb(61,100,169)" :icon="Download" class="ToolButton" @click="outPutNotes">导出</el-button>
      </div>
      <div class="rightButtons">
        <el-button :icon="Search" color="rgb(61,100,169)" @click="changeSearchMode" circle/>
        <el-button :icon="RefreshLeft" color="rgb(61,100,169)" @click="refreshPage" circle/>
      </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed , ref, onMounted } from 'vue';
import {Plus,Edit,Delete,Download,Search,RefreshLeft} from '@element-plus/icons-vue'
import { defineProps } from 'vue';
import axios from 'axios';


//通过localStorage获取token
const token = localStorage.getItem('token');

//初始化
const prop = defineProps(['usr'])
const router = useRouter()
const store = useStore()

//从store里获取数据
const chosenNotes = computed(()=>store.state.chosenNotes)
const currentPage = computed(()=>store.state.currentPage)


// 点击新增按钮，实现笔记的新增
function addNote() {
  router.push({path:'/addNote',query:{user:prop.usr}})
}

// 对操作进行提示
function deleteAttention(num){
  if(num){
    ElMessage({
    message: '批量删除笔记成功',
    type: 'success',
    })
  }
  else{
    ElMessage({
    message: '请选中笔记',
    type: 'warning',
    })
  }
}
//控制编辑操作的提示
function editAttention(num){
  if(num == -1){
    ElMessage({
    message: '编辑笔记成功',
    type: 'success',
    })
  }
  else if(num > 1){
    ElMessage({
    message: '仅支持修改单个笔记',
    })
  }
  else if(num <1){
    ElMessage({
    message: '请选中要修改的笔记',
    type:'warning'
    })
  }
}

// 点击删除按钮，实现笔记批量删除
function deleteNotes(){
    console.log('准备删除笔记');
    deleteAttention(chosenNotes.value.length)
    chosenNotes.value.forEach(element => {
      axios({
        method:'delete',
        url:`api/notebooks/deleteAll`,
        params:{
          notebookTitle:element.notebookTitle
        },
        headers:{
          'Authorization': `${token}`,
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }).then(response=>{
        console.log('删除笔记成功');
        updateNoteContent()
      }).catch(error=>{
        console.error(error);
      })
    });
}

// 点击导出按钮，将笔记表格导出成excel表 ,暂未实现
function outPutNotes(){
  ElMessage({
    message: '暂无此功能',
    type: 'error',
  })
}


// 点击修改按钮，只能实现单个笔记的修改
function editNote(){
  editAttention(chosenNotes.value.length)
  if(chosenNotes.value.length == 1){
    store.commit('updateNoteToEdit',chosenNotes.value[0].notebookTitle)
    router.push({path:'/editNote',query:{user:prop.usr}})
  }
}


//进行操作之后重新进行数据请求
function updateNoteContent(){
    axios({
      method:'get',
      url:`api/notebooks/page/${currentPage.value}/7` ,
      headers:{
          'Authorization': `${token}`
      }
    }).then(response=>{
    console.log('获取表格数据成功');
    //noteData.value=response.data.data.records
    store.commit('updateNoteData',response.data.data.records)
    }).catch (error=>{
    console.error(error);
    })
}


//切换搜索模式
function changeSearchMode(){
  store.commit('changeSearchMode')
}

//刷新界面
function refreshPage(){
  router.go(0)
}
</script>

<style scoped>
.buttonsContainer{
  width: 100%;
  display: flex;
  flex-direction: row;
}
.ToolButton{
  margin-left: 30px;
  width: 90px;
  height: 40px;
  color: #FFF;
  box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 2.0px 5px rgba(0, 0, 0, 0.225),
    0 3.0px 4px rgba(0, 0, 0, 0.280),
    0 4px 3px rgba(0, 0, 0, 0.1);
}
.leftButtons{
  color: #FFF;
  flex:9
}
.rightButtons{
  color: #FFF;
  flex: 1;
}

</style>