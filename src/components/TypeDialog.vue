<!-- 添加笔记类型 -->
<script setup>
import {ref,computed,watch} from 'vue'
import { useStore } from 'vuex';
import axios from 'axios';
import router from '../router';


//通过localStorage获取token
const token = localStorage.getItem('token');

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
    addNoteType(TempType.name)
    NewType.value.name=''
    store.commit('closeTypeDialog')
    ElMessage({
    message: '添加笔记类型成功',
    type: 'success',
    })
}

//更新store里面控制对话框的值为false
function cancelType(){
    store.commit('closeTypeDialog')
}
//更新store里面控制对话框的值
function addNoteType(notebooksType){
    axios({
    method:'post',
    url:'api/notebooks/saveType/',
    params:{
        notebookType:notebooksType,
    },
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':`${token}`
    }
    }).then(response=>{
        console.log('新建笔记分类成功');
      }).catch(error=>{
        console.error(error);
      })
    router.go(0)
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