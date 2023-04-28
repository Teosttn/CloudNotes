import { createStore } from 'vuex'

const store = createStore({
    state(){
        return{
            //当前页的笔记内容
            noteData:[],

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
            pageTurnMode:1,
            currentPage:1,
            currentPageForSearch:1,

            //控制要编辑的笔记
            noteToEdit:'',
    
            //控制批量管理笔记
            chosenNotes:[],
            
            //搜索笔记板块
            searchMode:false,
            searchNotebook:''

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
        updateNoteTypes(state,payload){
            state.noteTypes = payload
        },

        //更新笔记内容
        updateNoteData(state,noteData){
            for(var i=0;i<noteData.length;i++){
                //将notebookState转化为字符类型，这样才能正常不被switch绑定的时候覆写，也才能正常实现绑定
                noteData[i].notebookState = noteData[i].notebookState.toString()
                
                //将notebookCreateTime截取，只显示日期
                noteData[i].notebookCreatedTime = noteData[i].notebookCreatedTime.slice(0,10)
            }
            
            state.noteData = noteData
        },
        
        //更新当前分页
        updateCurrentPage(state,currentPage){
            state.currentPage=currentPage
        },
        updateCurrentPageForSearch(state,currentPageForSearch){
            state.currentPageForSearch=currentPageForSearch
        },
        changePageTurnMode(state){
            state.pageTurnMode=0
        },

        //更新要编辑的笔记
        updateNoteToEdit(state,notebookTitle){
            state.noteToEdit=notebookTitle
        },

        //批量管理笔记
        updateChosenNotes(state,chosenNotes){
            state.chosenNotes=chosenNotes
        },

        //管理笔记搜索功能
        changeSearchMode(state){
            state.searchMode = !state.searchMode
        },
        updateSearchNotebook(state,notebookTitle){
            state.searchNotebook = notebookTitle
        }
    }
});


export default store