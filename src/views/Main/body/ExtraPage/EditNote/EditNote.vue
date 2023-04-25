<script setup>
import {ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { computed,onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';



//通过localStorage获取token
const token = localStorage.getItem('token');

//初始化
const store=useStore()
const router = useRouter()
const route = useRoute()
const username = route.query.user

//获取store里面的数据
const noteTypes = computed (()=>store.state.noteTypes)
const currentPage = computed (()=>store.state.currentPage)

const note = ref({
    title:'',
    classify:'',
    situ:'',
    description:'',
    content:'',
})

//进行数据请求
axios({
    method:'get',
    url:`api/notebooks/getNotebook` ,
    headers:{
        'Authorization': `${token}`
    },
    params:{
        notebookTitle:store.state.noteToEdit
    }
    }).then(response=>{
        console.log(response);
        //获取数据
        note.value.title=response.data.data.notebookTitle
        note.value.classify=response.data.data.notebookType
        note.value.situ=response.data.data.notebookState.toString()
        note.value.description=response.data.data.notebookDescription
        note.value.content=response.data.data.notebookContent

      }).catch(error=>{
        console.error(error);
      })
      
      
//取消编辑
function cancelEditNote() {
    router.push({ path: '/Main', query: {usr:username} })
}
//完成编辑
function finishEditNote(){
    axios({
    method:'put',
    url:`api/notebooks/modifyAll` ,
    headers:{
        'Authorization': `${token}`
    },
    params:{
        notebookTitle:store.state.noteToEdit
    },
    data:{
        notebookTitle:note.value.title,
        notebookType:note.value.classify,
        notebookState:parseInt(note.value.situ),
        notebookDescription:note.value.description,
        notebookContent:note.value.content
    }
    }).then(response=>{
        updateNoteContent()
        ElMessage({
            message:'修改笔记成功',
            type:'success'
        })
        //修改成功
      }).catch(error=>{
        console.error(error);
      })
      
      router.push({ path: '/Main', query: {usr:username} })
}
onMounted(()=>{
    console.log(note.value.classify);
})

//更新笔记数据
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
    <div id="Container">
        <div id="Content">
            <div class="Title">
                <h1 class="TitleWord">修改笔记</h1>
            </div>
            <div class="Main">
                <div class="MainForm">
                    <el-form :inline="true" :model="note" label-width="120px">
                        <el-form-item class="titleForm">
                            <template #label>
                                <h2 class="labelWord">标题</h2>
                            </template>
                            <el-input v-model="note.title" placeholder="请输入标题" class="TitleInput"/>
                        </el-form-item>
                        <el-form-item class="classifyForm">
                            <template #label>
                                <h2 class="labelWord">分类</h2>
                            </template>
                            <el-select v-model="note.classify" class="classifyInput" placeholder="请选择" size="large" >
                                <el-option 
                                    v-for="(value ,index) in noteTypes"
                                    :value="value"
                                    :key="index"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item class="choiceForm">
                            <template #label>
                                <h2 class="labelWord">状态</h2>
                            </template>
                            <el-radio-group v-model="note.situ" class="situInput">
                                <el-radio label="1" size="large" >显示</el-radio>
                                <el-radio label="0" size="large" >隐藏</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <el-form  :model="note" label-width="120px">
                        <el-form-item class="desForm" >
                            <template #label>
                                <h2 class="labelWord">描述</h2>
                            </template>
                            <el-input type="textarea" :row="4" class="DesInput" placeholder="请输入描述" v-model="note.situ"/>
                        </el-form-item>
                        <el-form-item class="contentForm">
                            <template #label>
                                <h2 class="labelWord">内容</h2>
                            </template>
                            <textarea  type="textarea" class="ContentInput" placeholder="请输入内容" v-model="note.content"></textarea>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="MainButton">
                    <el-button type="primary" @click="finishEditNote()" class="MainButtonLef">
                        上传
                    </el-button>
                    <el-button @click="cancelEditNote()" class="MainButtonLef">
                        取消
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#Container{
    overflow: auto;
    position: fixed;
    margin: 0px;
    padding-top: 50px;
    /* padding-left: 200px; */
    /* padding-right: 200px; */
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    background: url(../../../../../assets/img/AddNoteBackground.jpg) no-repeat center;
    background-size: cover;
}
#Content{
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 40px;
    border-radius: 20px;
    backdrop-filter: blur(20px);
    padding-bottom: 20px;
    border: solid  rgba(255,192,203,0.8) 8px;
    box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 5.0px 10px rgba(0, 0, 0, 0.225),
    0 3.7px 7.3px rgba(0, 0, 0, 0.280),
    0 10px 20px rgba(0, 0, 0, 0.4);
}
.Title{
    text-align: center;
    margin-bottom: 20px;
    color: rgb(255,192,203);
}
.choiceForm{
    margin-left: 60px;
}
.situInput{
    margin-left: 10px;
    background-color: white;
    padding-left: 10px;
    padding-right: 10px;
    box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 2.0px 5px rgba(0, 0, 0, 0.225),
    0 3.0px 4px rgba(0, 0, 0, 0.280),
    0 4px 3px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 3px;
}
.TitleInput{
    background-color: rgba(255, 251, 251, 0.65);
    box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 2.0px 5px rgba(0, 0, 0, 0.225),
    0 3.0px 4px rgba(0, 0, 0, 0.280),
    0 4px 3px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
}
.DesInput{
    width: 50%;
    background-color: rgba(255, 251, 251, 0.65);
    box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 2.0px 5px rgba(0, 0, 0, 0.225),
    0 3.0px 4px rgba(0, 0, 0, 0.280),
    0 4px 3px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
}
.contentForm{
    margin-top: 20px;
}
.ContentInput{
    width: 80%;
    height: 350px;
    border-radius: 5px;
    border: solid rgb(192,196,204) 2px;
    color: grey;
    padding: 10px;
    font-family: '微软雅黑';
    /* background-color: rgba(255, 251, 251, 0.65); */
    box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 2.0px 5px rgba(0, 0, 0, 0.225),
    0 3.0px 4px rgba(0, 0, 0, 0.280),
    0 4px 3px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
}
.MainButton{
    margin-top: 20px;
    float: right;
    padding-right:200px ;
    
}
.el-form-item[label]{
   color: white;
}
.labelWord{
    color: rgb(255,192,203) ;
    text-align: center;
    background-color: white;
    width: 100px;
    height: 35px;
    border-radius: 5px;
    box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 2.0px 5px rgba(0, 0, 0, 0.225),
    0 3.0px 4px rgba(0, 0, 0, 0.280),
    0 4px 3px rgba(0, 0, 0, 0.1);

}
.TitleWord{
    margin-top: 10px;
    width: 300px;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 2.0px 5px rgba(0, 0, 0, 0.225),
    0 3.0px 4px rgba(0, 0, 0, 0.280),
    0 4px 3px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    
}
.MainButtonLef{
    box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 2.0px 5px rgba(0, 0, 0, 0.225),
    0 3.0px 4px rgba(0, 0, 0, 0.280),
    0 4px 3px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
}
.classifyInput{
    box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 2.0px 5px rgba(0, 0, 0, 0.225),
    0 3.0px 4px rgba(0, 0, 0, 0.280),
    0 4px 3px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
}
</style>