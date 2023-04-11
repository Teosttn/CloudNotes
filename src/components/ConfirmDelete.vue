<script setup>
import {ref,computed,watch} from 'vue'
import { useStore } from 'vuex';

const store = useStore()
const confirmVisible = computed({
    get:() => store.state.confirmDeleteVisible,
    set:(newValue) => {
        console.log(newValue);
    }
})

function cancelDelete(){
    store.commit('closeConfirmDelete')
}
function deleteNote(){
    store.commit('deleteNote',store.state.deleteNoteOrder)
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