<!-- 分页栏 -->
<template>
    <div>
        <el-pagination 
            class="pageNoteList"
            background:true
            background layout="prev, pager, next" 
            v-model:current-page="currentPage"
            :total="20"
            :page-size="1"
          />
    </div>
</template>

<script setup>
import {ref,watch} from 'vue';
import { useStore } from 'vuex';
const store = useStore()
const currentPage = ref(1)

watch(() => currentPage.value, (newValue, oldValue) => {
  // console.log(currentPage)
  store.commit('changeStartNum',newValue)
  // console.log(store.state.startNum)
},{immediate:true})
</script>

<style scoped>
.pageNoteList{
  position: fixed;
  bottom: 30px;
  right: 230px;
}
</style>