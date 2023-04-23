import { ref } from "vue";
import axios from "axios";
import {useStore} from 'vuex'

const store = useStore()

export function getNoteTypes(){
    axios({
    method:'get',
    url:'api/notebooks/showType',
    }).then(response=>{
        console.log('获取笔记分类成功');
        const NoteTypes=Object.values(response.data.data)
        store.commit('updateNoteTypes',NoteTypes) 
      }).catch(error=>{
        console.error(error);
      })
}
