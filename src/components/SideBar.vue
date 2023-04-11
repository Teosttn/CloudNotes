<script setup>
import {LocationInformation, Plus,ArrowDown,Delete} from '@element-plus/icons-vue'
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()   

const NoteTypes = computed(()=>store.state.NoteTypes)    


function AddType(){
    store.commit('openTypeDialog')
}
function DeleteType (num){
    console.log(num);
    NoteTypes.value.splice(num,1)
}


</script>   

<template>
    <div id="SideBar">
        <div class="SideBarTitle">
            <el-icon class="SideBarTitleIcon"><LocationInformation/></el-icon>
            <p class="SideBarTitleWord">笔记分类</p>
            <div class="SideBarTitleTools">
                <el-icon class="SideBarTitleIcon" @click="AddType"><Plus/></el-icon>
                <el-icon class="SideBarTitleIcon" ><ArrowDown/></el-icon>
            </div>
        </div>
        <div class="SideBarList">
            <ul >
                <div class="SideBarListLi">
                    <li v-for="(item,index) in NoteTypes">
                        <div class="SideBarListItem">
                            {{ item.name }}
                        </div>
                        <div class="SideBarListIcon">
                            <el-icon  @click="DeleteType(index)"><Delete/></el-icon>
                        </div>
                    </li>
                </div>
            </ul>
        </div>
    </div>
</template>

<style scoped>
#SideBar{
    width: 300px;
}
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
}
.SideBarTitleIcon :hover{
    color: rgb(219,112,147);
    /* box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 1.8px 3.5px rgba(0, 0, 0, 0.225),
    0 3.7px 7.3px rgba(0, 0, 0, 0.280),
    0 10px 20px rgba(0, 0, 0, 0.4); */
}
.SideBarTitleWord{
    margin-left: 10px;
}
.SideBarTitleTools{
  margin-left: 100px ;
}
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
}
.SideBarList ul li:hover{
    border-left: solid 7px #FFF;
    background-color: rgba(255,192,203,0.6);
    color: #FFF;
}
.SideBarListIcon{
    float: right;
    margin-top: 5px;
    margin-right: 30px;
}
</style>