<!-- 侧边栏 -->
<script setup>
import {LocationInformation, Plus,ArrowDown,Delete,ArrowRight} from '@element-plus/icons-vue'
import {onUpdated,ref,defineProps, onMounted,watch,computed} from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { getNoteTypesAPI,deleteNoteTypeAPI } from '../../../../api/note';

const prop=defineProps(['usr'])
const showMode=ref(true)
const hideMode=ref(false)
const store = useStore()   

//通过localStorage获取token
const token = localStorage.getItem('token');

//通过computed获取vue里面的笔记分类数据，从而实现响应式
const noteTypes = computed(()=>store.state.noteTypes)

//挂载的时候就获取笔记分类
onMounted(()=>{
    //axios获取笔记分类
    getNoteTypesAPI(token).then(data=>{
        store.commit('updateNoteTypes',data)
    })
    console.log('获取笔记分类中');
})

// 添加笔记分类
function addType(){
    store.commit('openTypeDialog')
}

// 删除笔记分类 
function deleteType(index){
    //axios删除笔记分类
    deleteNoteTypeAPI(noteTypes.value[index],token).then(response=>{
        //axios再次获取笔记分类
        getNoteTypesAPI(token).then(data=>{
            store.commit('updateNoteTypes',data)
        })
    })
}

//折叠侧边栏
function changeShowMode(){
    showMode.value = !showMode.value
    hideMode.value = !hideMode.value
}
</script>   

<template>
    <div id="SideBar">
        <!-- 侧边栏标题（笔记分类） -->
        <div class="SideBarTitle">
            <el-icon class="SideBarTitleIcon"><LocationInformation/></el-icon>
            <p class="SideBarTitleWord">笔记分类</p>
            <div class="SideBarTitleTools">
                <el-icon class="SideBarTitleIcon" @click="addType"><Plus/></el-icon>
                <el-icon class="SideBarTitleIcon" @click="changeShowMode">
                    <ArrowDown v-if="showMode"/>
                    <ArrowRight v-if="hideMode"/>
                </el-icon>
            </div>
        </div>
        <!-- 侧边栏内容 笔记分类的类别 -->
        <div class="SideBarList">
            <ul >
                <div class="SideBarListLi" v-if="showMode">
                    <li v-for=" (item,index) in noteTypes" :key="index">
                        <div class="SideBarListItem">{{ item }}</div>
                        <div class="SideBarListIcon">
                            <el-icon  @click="deleteType(index)"><Delete/></el-icon>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
    </div>
</template>

<style scoped>
#SideBar{
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
}
/* 侧边栏标题 */
.SideBarTitle{
    width: 300px;
    height: 60px;
    background-color: pink;
    color: #FFF ;
    font-size: large;
    padding-left:10px;
    padding-top: 15px;
    display: flex;
    flex-direction: row;
}
.SideBarTitleIcon{
    margin-left: 10px;
    margin-top: 5px;
    transition: all 0.3s ease-in-out;
}
.SideBarTitleIcon :hover{
    color: rgb(219,112,147);
    cursor: pointer;
    transform: scale(1.3);
    transform: translateY(-2px);
}
.SideBarTitleWord{
    margin-left: 10px;
}
.SideBarTitleTools{
  margin-left: 100px ;
}
/* 侧边栏笔记类别具体内容 */
.SideBarList{
    width: 300px;
    color: #FFF ;
    height: 0;
}
.SideBarListItem{ 
    width: 180px;
    margin-right: 10px;
    overflow: hidden;
}
.SideBarList ul{
    padding-left: 0;
    width: 300px;
    overflow: hidden;
}
.SideBarList ul li{
    display: flex;
    flex-direction: row;
    width: 300px;
    color: pink;
    margin-left: 5px;
    padding-left: 50px;
    font-size: 18px;
    list-style: none;
    height: 30px;
    margin-top: 10px;
    border-left: solid 7px pink;
    transition: all 0.2s ease-in-out;
}
.SideBarList ul li:hover{
    transform: scale(1.1);
    border-left: solid 7px #FFF;
    background-color: rgba(255,192,203,0.6);
    color: #FFF;
}
.SideBarListIcon{
    float: right;
    margin-top: 5px;
    margin-right: 30px;
    transition: all 0.2s ease-in-out;
}
.SideBarListIcon :hover{
    transform: translateY(-1px);
    cursor: pointer;
}

</style>