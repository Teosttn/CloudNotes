<script setup>

import {ref,computed,watch,onMounted} from 'vue'
import { useStore } from 'vuex';
import {
  MostlyCloudy,
  User,
  ArrowDown,
  Plus,
  Edit,
  Delete,
  Download, 
} from '@element-plus/icons-vue'
import NoteList from '../../components/NoteList.vue'
import SideBar from '../../components/SideBar.vue'
import { useRouter } from 'vue-router'
import TypeDialog from '../../components/TypeDialog.vue'
import ConfirmDelete from '../../components/ConfirmDelete.vue'

const router = useRouter()
const store = useStore()



function addNote() {
  router.push('/Main/AddNote')
}
function deleteNotes(){
  store.commit('deleteChosenNotes')
  var sum=computed(()=>store.state.chosenNotes)
  if(sum.value==0){
    ElMessage({
      message: '请选中要删除的笔记！',
      type: 'warning',
    })
  }
  else{
    ElMessage({
      message: '批量删除笔记成功！',
      type: 'success',
    })
  }
  store.commit('resetChosenNotes')
}
function outPutNotes(){
  ElMessage({
    message: '暂无此功能',
    type: 'error',
  })
}
function editNote(){
  store.commit('editChosenNotes')
  var sum=computed(()=>store.state.chosenNotes)
  console.log(sum.value);
  if(sum.value==0){
    ElMessage({
      message: '请选中要修改的笔记！',
      type: 'warning',
    })
  }
  else if(sum.value==1){
    var editId = computed(()=>store.state.chosenNoteOrder)
    router.push({ path: '/Main/EditNote', query: { id:editId.value} })
  }
  else {
    ElMessage({
      message: '仅支持修改单个笔记！',
      type: 'error',
    })
  }
  store.commit('resetChosenNotes')
}
const currentPage = ref(1)

watch(() => currentPage.value, (newValue, oldValue) => {
  // console.log(currentPage)
  store.commit('changeStartNum',newValue)
  // console.log(store.state.startNum)
},{immediate:true})

</script>

<template>
  <TypeDialog></TypeDialog>
  <ConfirmDelete></ConfirmDelete>
  <div id="Container">
    <div id="Header">
      <div class="Logo">
        <h2 class="LogoWord">
          <el-icon>
            <MostlyCloudy />
          </el-icon>
          云端笔记
        </h2>
      </div>
      <div class="UserInf">
        <el-icon :size="25"><User /></el-icon>
        <el-dropdown class="UserInfDrop">
          <el-icon :size="25"><ArrowDown /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
        </el-dropdown>
      </div>
    </div>

    <div id="Main">
      <div class="Aside">
        <!-- v-on监听SideBar组件里面的add-new-type事件，并触发addType事件 -->
        <SideBar></SideBar>
      </div>

      <div class="Content">
        <div class="ToolBox">
          <el-button color="rgb(242,209,102)" :icon="Plus" class="ToolButton" @click="addNote">新增</el-button>
          <el-button color="rgb(244,159,180)" :icon="Edit" class="ToolButton" @click="editNote">修改</el-button>
          <el-button color="rgb(223,75,87)" :icon="Delete" class="ToolButton" @click="deleteNotes">删除</el-button>
          <el-button color="rgb(61,100,169)" :icon="Download" class="ToolButton" @click="outPutNotes">导出</el-button>
        </div>
        <div class="Information">
          <div class="InfTable">
            <NoteList></NoteList>
          </div>
          <el-pagination 
            class="pageNoteList"
            background:true
            background layout="prev, pager, next" 
            v-model:current-page="currentPage"
            :total="20"
            :page-size="1"
          />
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
#Container{
  overflow: auto;
  background: url("../../assets/img/NoteList3.jpg") no-repeat center;
  background-size: cover;
  background-position: center -50px;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
}
#Header{
  height: 60px;
  background-color: rgba(255,192,203,0.8);
  backdrop-filter: blur(25px);
  /* opacity: 0.9; */
  box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 5.0px 10px rgba(0, 0, 0, 0.225),
    0 3.7px 7.3px rgba(0, 0, 0, 0.280),
    0 10px 20px rgba(0, 0, 0, 0.4);
  
}
#Main{
  height: 100%;
  display: flex;
  flex-direction: row;
  /* background-color: rgb(244,246,249); */
}

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
  
}
.UserInf{
  float: right;
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
.Aside{
  width: 300px;
  height: 100%;
  /* background-color:; */
  /* opacity: 0.9; */
  backdrop-filter:  blur(15px);
  box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 5.0px 10px rgba(0, 0, 0, 0.225),
    0 3.7px 7.3px rgba(0, 0, 0, 0.280),
    0 10px 20px rgba(0, 0, 0, 0.4);
}
.Content{
  height: 100%;
  padding: 40px;
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
.AsideListTitle{
  font-size: 30; 
  text-align: center;
  color: #FFF;
}
.AsideList{
  background-color: aqua;
  font-size:large;
  color: #FFF;
}
.NoteTypesList{
  list-style: none;
}
.Information{
  /* background-color: ; */
  margin-top: 20px;
  /* height: 100%; */
  /* backdrop-filter: blur(5px); */
}

.pageNoteList{
  position: fixed;
  bottom: 30px;
  /* right: 230px; */
}
.InfTable{
  backdrop-filter: blur(5px);
}
</style>