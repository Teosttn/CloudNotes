<!-- 删除笔记 -->
<script setup>
import {computed} from 'vue'
import { useStore } from 'vuex';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { deleteNoteAPI,getNoteContentAPI } from '../api/note';
import { messageBox } from '../utils/common';

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
function handleDeleteNote(){
    //进行axios笔记删除请求
    deleteNoteAPI(store.state.noteToDelete,token).then(response=>{
        //更新笔记数据
        getNoteContentAPI(currentPage.value, token).then(records => {
            store.commit('updateNoteData',records)
        })
        messageBox('删除笔记成功','success')
        store.commit('closeConfirmDelete')
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
                <el-button color="rgb(242,209,102)"  @click="cancelDelete()">取消</el-button>
                <el-button color="rgb(223,75,87)" type="primary" @click="handleDeleteNote()">确定</el-button>
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