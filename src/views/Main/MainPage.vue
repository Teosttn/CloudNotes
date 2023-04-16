<script setup>
import TheHeading from './header/TheHeading.vue'
import TheToolBox from './body/Note/TheToolBox.vue'
import NoteList from './body/Note/NoteList.vue'
import SideBar from './body/SideBar/SideBar.vue'
import TypeDialog from '../../components/TypeDialog.vue'
import ConfirmDelete from '../../components/ConfirmDelete.vue'
import PageTurnOver from './footer/PageTurnOver.vue'

</script>

<template>
  <TypeDialog></TypeDialog>
  <ConfirmDelete></ConfirmDelete>
  <div id="Container">
    <div id="Header">
      <TheHeading></TheHeading>
    </div>

    <div id="Main">

      <div class="Aside">
        <SideBar></SideBar>
      </div>

      <div class="Content">
        <!-- 工具箱：对笔记栏进行操作的按钮 -->
        <div class="ToolBox">
          <TheToolBox></TheToolBox>
        </div>
        <!-- 笔记内容：笔记列表和分页 -->
        <div class="Information">
          <!-- 笔记列表：详细每一条笔记 -->
          <div class="InfTable">
            <div  class="Note">
            <NoteList ></NoteList>
            </div>
          </div>
          <!-- 分页栏：对笔记进行分页 -->
          <div class="footer">
            <PageTurnOver></PageTurnOver>
          </div>
        </div>
        
      </div>
    </div>
  </div>

</template>

<style scoped>
#Container{
  overflow:auto;
  background: url("../../assets/img/NoteList3.jpg") no-repeat center;
  background-size: cover;
  background-position: center -50px;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
}
#Header{
  width: 100%;
  height: 60px;
  backdrop-filter: blur(25px);
  background-color: rgba(255,192,203,0.8);
  /* opacity: 0.9; */
  box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 5.0px 10px rgba(0, 0, 0, 0.225),
    0 3.7px 7.3px rgba(0, 0, 0, 0.280),
    0 10px 20px rgba(0, 0, 0, 0.4);
  
}
#Main{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  /* background-color: rgb(244,246,249); */
}

.Aside{
  width: 300px;
  height: 100%;
  /* background-color:; */
  /* opacity: 0.9; */
  backdrop-filter:  blur(15px);
  box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 5.0px 10px rgba(0, 0, 0, 0.225),
    0 3.7px 7.3px rgba(0, 0, 0, 0.280),
    0 10px 20px rgba(0, 0, 0, 0.4);
}
.Content{
  /* background-color: red; */
  width: 100%;
  height: 100%;
  padding: 40px;
}


.Information{
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-content: center; */
  height: 90%;
  /* background-color: ; */
  margin-top: 20px;
  /* height: 100%; */
  /* backdrop-filter: blur(5px); */
}

.InfTable{

  width: 100%;
  flex:15;

}
.footer{
  flex: 1;
}
.Note{
  width: 100%;
  backdrop-filter: blur(5px);
}
</style>