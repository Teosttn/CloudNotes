<!-- 删除笔记 -->
<script setup>
import {computed} from 'vue'
import { useStore } from 'vuex';
import axios from 'axios';

const store = useStore()
//从store获取与确认删除对话框绑定的值
const confirmVisible = computed({
    get:() => store.state.confirmDeleteVisible,
    set:(newValue) => { }
})


//关闭对话框，取消删除
function cancelDelete(){
    store.commit('closeConfirmDelete')
}

//确认删除且关闭对话框
function deleteNote(){
    
    //向后端发送删除请求
    axios({
    method:'delete',
    url:'api/notebooks/delete',
    params:{
        notebookTitle:store.state.noteToDelete
    }
    }).then(response=>{
        console.log(response);
        console.log('删除笔记成功');
        return response;
      }).catch(error=>{
        console.error(error);
      })

    //关闭对话框
    store.commit('closeConfirmDelete')
    ElMessage({
    message: '删除成功',
    type: 'success',
  })
}
</script>

<template>
    <div class="confirmDialog">
        <el-dialog
            v-model="confirmVisible"
            title="提示"
            width="30%"
            align-center
            @close="cancelDelete()"
        >
            <div class="attentionWord">
                <h3>请确认是否删除此笔记</h3>
            </div>
            <div class="attentionButtons">
                <el-button @click="cancelDelete()">取消</el-button>
                <el-button type="primary" @click="deleteNote()">确定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<style scoped>
.attentionButtons{
    float: right;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>