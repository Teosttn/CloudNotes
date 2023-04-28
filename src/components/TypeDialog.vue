<!-- 添加笔记类型 -->
<script setup>
import {ref,computed,watch} from 'vue'
import { useStore } from 'vuex';
import axios from 'axios';
import router from '../router';
import { addNoteTypeAPI,getNoteTypesAPI } from '../api/note'
import { messageBox } from '../utils/common';

//通过localStorage获取token
const token = localStorage.getItem('token');

//初始化
const store = useStore()
const NewType=ref({
    name:''
})


//控制添加笔记分类的窗口所绑定的值
const dialogVisible=computed({
    get:() => store.state.typeDialogVisible,
    set:(newValue) => {
        // console.log(newValue);
    }
})

//添加新的笔记分类
function pushType(){
    const TempType=Object.assign({},NewType.value) 

    //axios添加笔记分类,并更新到store//向后端发送删除请求
    addNoteTypeAPI(TempType.name,token).then(response=>{
        getNoteTypesAPI(token).then(data=>{
            store.commit('updateNoteTypes',data)
        })
    })

    NewType.value.name=''
    //关闭对话框 
    store.commit('closeTypeDialog')
    messageBox('添加笔记类型成功','success')
}

//更新store里面控制对话框的值为false
function cancelType(){
    store.commit('closeTypeDialog')
}

</script>

<template>
    <div>
        <el-dialog
            v-model="dialogVisible"
            title="新建分类"
            width="30%"
            align-center
            @close="cancelType()"
        >
            <div class="dialogContainer">
                <div class="DialogTitle">
                    <p class="TypeName">分类名称</p>
                    <el-input class="TypeNameInput" v-model="NewType.name"></el-input>
                </div>
                <div class="DialogButtonBox">
                    <el-button color="rgb(244,159,180)" class="dialogButton" @click="cancelType()">取消</el-button>
                    <el-button color="rgb(61,100,169)" class="dialogButton" @click="pushType()">添加</el-button>
                </div>
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