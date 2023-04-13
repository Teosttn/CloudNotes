<!-- 添加笔记类型 -->
<script setup>
import {ref,computed,watch} from 'vue'
import { useStore } from 'vuex';

const store = useStore()
const NewType=ref({
    name:''
})

const dialogVisible=computed({
    get:() => store.state.typeDialogVisible,
    set:(newValue) => {
        console.log(newValue);
    }
})
function pushType(){
    const TempType=Object.assign({},NewType.value)
    store.state.NoteTypes.push(TempType)
    NewType.value.name=''
    store.commit('closeTypeDialog')
    ElMessage({
    message: '添加笔记类型成功',
    type: 'success',
    })
}
function cancelType(){
    store.commit('closeTypeDialog')
}
</script>

<template>
    <div class>
        <el-dialog
            v-model="dialogVisible"
            title="新建分类"
            width="30%"
            align-center
            @close="cancelType()"
        >
            <div class="DialogTitle">
                <p class="TypeName">分类名称</p>
                <el-input class="TypeNameInput" v-model="NewType.name"></el-input>
            </div>
            <div class="DialogButtonBox">
                <el-button class="dialogButton" @click="cancelType()">取消</el-button>
                <el-button class="dialogButton" @click="pushType()">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped>
.DialogTitle{
    display: flex;
    flex-direction: row;
}
.DialogButtonBox{
    height: 50px;
    margin-top: 50px;
}
.dialogButton{
    float: right;
    margin-left: 20px;
}
.TypeNameInput{
    width: 70%;
    margin-left: 10px;
}
.TypeName{
    font-size: 16px;
}
</style>