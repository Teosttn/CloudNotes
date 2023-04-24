<!-- 工具箱：对笔记栏进行操作的按钮 -->
<template>
    <div>
        <el-button color="rgb(242,209,102)" :icon="Plus" class="ToolButton" @click="addNote">新增</el-button>
        <el-button color="rgb(244,159,180)" :icon="Edit" class="ToolButton" @click="editNote">修改</el-button>
        <el-button color="rgb(223,75,87)" :icon="Delete" class="ToolButton" @click="deleteNotes">删除</el-button>
        <el-button color="rgb(61,100,169)" :icon="Download" class="ToolButton" @click="outPutNotes">导出</el-button>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import {Plus,Edit,Delete,Download} from '@element-plus/icons-vue'
import { defineProps } from 'vue';

const prop=defineProps(['usr'])
const router = useRouter()
const store = useStore()
// 点击新增按钮
function addNote() {
  router.push({path:'/addNote',query:{user:prop.usr}})
}
// 点击删除按钮
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
// 点击导出按钮
function outPutNotes(){
  ElMessage({
    message: '暂无此功能',
    type: 'error',
  })
}
// 点击修改按钮
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
</script>

<style scoped>
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
</style>