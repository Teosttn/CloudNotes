<script setup>
import {ref,onBeforeMount,watch, compile} from 'vue'
import {Edit,Delete} from '@element-plus/icons-vue'
import { indexOf } from 'lodash';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useStore()

const startNum = computed(() => store.state.startNum) 
const endNum = computed(() => store.state.startNum+7)
const noteData = computed({ 
    get: () => store.state.noteData.slice(startNum.value, endNum.value),
    set: (value) => {}
})

watch(()=>startNum,(newValue,oldValue)=>{
    // noteData.value = store.state.noteData.slice(newValue, newValue + 6) 
    console.log(newValue);
},{deep:true,immediate:true})

function DeleteNote (num){
    store.commit('openConfirmDelete',startNum.value+num)
}
function EditNote (num){
    router.push({path:'/Main/EditNote',query:{id:startNum.value+num}})
}
</script>   

<template>
    <div class="NoteList">
            <el-table v-model:data="noteData" style="width: 1100px" class="NoteList">
                <el-table-column prop="choice"  label="操作" width="180">
                    <template #default="scope">
                        <el-checkbox v-model="scope.row.choice" size="large" class="NoteListItemCheckbox"/>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" width="180" />
                <el-table-column prop="classify" label="分类" width="180" />
                <el-table-column prop="createTime" label="创建时间" width="180" />
                <el-table-column prop="situ" label="状态" width="180">
                    <template #default="scope">
                        <el-switch v-model="scope.row.situ"/>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="200">
                    <template #default="scope">
                        <div class="TableTools">
                            <div class="TableSingleEdit" @click="EditNote(scope.$index)">
                                <div>
                                    <el-icon><Edit/></el-icon>
                                    编辑
                                </div>
                            </div>
                            <div class="TableSingleDelete" @click="DeleteNote(scope.$index)">
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
.NoteList{
    opacity: 0.9;
    border-radius: 6px;
    /* backdrop-filter: blur(5px); */
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