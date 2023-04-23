import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state(){
        return{
            //笔记分类
            noteTypes:[],
            //控制添加笔记类型的对话框
            typeDialogVisible:false,
            //控制确认删除笔记的对话框
            confirmDeleteVisible:false,
            noteToDelete:'',
            //后端传过来的token令牌
            token:'',   
            //当前的笔记页数
            currentPage:1,
        }
    },
    mutations:{

        //更新token
        updateToken(state,token){
            state.token=token
        },

        //开闭添加笔记类型的对话框
        openTypeDialog(state){
            state.typeDialogVisible=true
        },
        closeTypeDialog(state){
            state.typeDialogVisible=false
        },

         //开闭确认删除的对话框
        openConfirmDelete(state,payload){
            state.confirmDeleteVisible=true
            state.noteToDelete=payload
        },
        closeConfirmDelete(state){
            state.confirmDeleteVisible=false
        },

        //更新笔记类型
        updateNoteTypes(state,noteTypes){
            state.noteTypes = noteTypes
        },
        //更新当前分页
        updateCurrentPage(state,newPage){
            state.currentPage = newPage
        }
    }
});


export default store