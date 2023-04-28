<script setup>
import {watch,ref, getCurrentInstance} from 'vue'
import {Edit,Delete} from '@element-plus/icons-vue'
import { computed,onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router'
import { defineProps } from 'vue';
import { getNoteContentAPI,changeNotebookStateAPI } from '../../../../api/note';

//初始化
const prop = defineProps(['usr'])
const router = useRouter()
const store = useStore()

//通过localStorage获取token
const token = localStorage.getItem('token');

//从store里面获取数据
const currentPage = computed(()=>store.state.currentPage)

const noteData = computed(()=>store.state.noteData)

//处理更改状态的问题
function handleStateChange(title,state){
    console.log(title,state);
    changeNotebookStateAPI(title,state,token)
}

//删除笔记，同时删除后台笔记数据
function deleteSingleNote(index){
    store.commit('openConfirmDelete',noteData.value[index].notebookTitle)
}

//编辑笔记
function editSingleNote(index){
    store.commit('updateNoteToEdit',noteData.value[index].notebookTitle)
    router.push({path:'/editNote',query:{user:prop.usr}})
}


//初始化界面
onBeforeMount(() => {
    console.log('获取表格数据中')
    //axios获取笔记数据
    getNoteContentAPI(currentPage.value, token).then(records => {
        store.commit('updateNoteData',records)
    })
})

watch(currentPage,(newValue,oldValue)=>{
    console.log(newValue);
    //axios获取笔记数据
    getNoteContentAPI(currentPage.value, token).then(records => {
        store.commit('updateNoteData',records)
    })
})

//批量操作笔记，处理多选问题
function handleSelectionChange(val){
    store.commit('updateChosenNotes',val)
}
</script>   

<template>
    <div class="Inf">
            <el-table 
                v-model:data="noteData"  
                class="NoteList" 
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column  label="选择"  type="selection" width="100" >
                </el-table-column>
                <el-table-column prop="notebookTitle" label="标题">
                </el-table-column>
                <el-table-column prop="notebookType" label="分类"  />
                <el-table-column prop="notebookCreatedTime" label="创建时间"  />
                <el-table-column prop="notebookState" label="状态"   >
                    <template #default="scope">
                        <el-switch 
                            v-model="scope.row.notebookState"
                            @change="handleStateChange(scope.row.notebookTitle,scope.row.notebookState)"
                            active-value='1'
                            inactive-value='0'
                        />
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" header-align="center">
                    <template #default="scope">
                        <div class="TableTools">
                            <div class="TableSingleEdit" @click="editSingleNote(scope.$index)">
                                <div>
                                    <el-icon><Edit/></el-icon>
                                    编辑
                                </div>  
                            </div>
                            <div class="TableSingleDelete" @click="deleteSingleNote(scope.$index)">
                                <div>
                                    <el-icon><Delete/></el-icon>
                                    删除
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
    </div>
</template>

<style scoped>
.Inf{
    width: calc(100% - 50px);
    /* height: 100vh; */
}
.infRow{
    height: 50px;
    width: 100%;
}
.NoteList{
    display: flex;
    justify-self: center;
    opacity: 0.8;
    border-radius: 6px;
    backdrop-filter: blur(5px);
    box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 1.8px 3.5px rgba(0, 0, 0, 0.225),
    0 3.7px 7.3px rgba(0, 0, 0, 0.280),
    0 10px 20px rgba(0, 0, 0, 0.4);
}
.TableTools{
    display: flex;
    flex-direction: row;
}
.TableSingleEdit{
    width: 70px;
    height: 30px;
    text-align: center;
    color: rgb(61,100,169);
    left: 0px;
}
.TableSingleDelete{
    width: 70px;
    text-align: center;
    color: rgb(223,75,87);
    margin-left: 20px;
    right:0px
}
.TableSingleDelete :hover{
    background-color: rgb(219,112,147);
    color: white;
    box-shadow:
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 2.0px 4px rgba(0, 0, 0, 0.225),
    0 1.7px 4.3px rgba(0, 0, 0, 0.280),
    0 10px 20px rgba(0, 0, 0, 0.4);
}
.TableSingleEdit :hover{
    background-color: rgb(61,100,169);
    color: white;
    box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 2.0px 4px rgba(0, 0, 0, 0.225),
    0 1.7px 4.3px rgba(0, 0, 0, 0.280),
    0 10px 20px rgba(0, 0, 0, 0.4);
}
</style>