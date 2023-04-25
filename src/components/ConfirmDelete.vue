<!-- 删除笔记 -->
<script setup>
import {computed} from 'vue'
import { useStore } from 'vuex';
import axios from 'axios';
import { useRouter } from 'vue-router';


//通过localStorage获取token
const token = localStorage.getItem('token');

//初始化
const router = useRouter()

//初始化store和从里面获取数据
const store = useStore()
const currentPage = computed(()=>store.state.currentPage)

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
    },
    headers:{
        'Authorization':`${token}`
    }
    }).then(response=>{
        console.log(response);
        console.log('删除笔记成功');
        updateNoteContent()
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

//更新store里面的数据
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