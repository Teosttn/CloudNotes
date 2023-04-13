<script setup>
import {MostlyCloudy,User,ArrowDown} from '@element-plus/icons-vue'
</script>

<!-- 头部栏 -->
<template>
    <div>
        <div class="Logo">
        <h2 class="LogoWord">
          <el-icon>
            <MostlyCloudy />
          </el-icon>
          云端笔记
        </h2>
      </div>
      <!-- 用户退出登录部分 -->
      <div class="UserInf">
        <el-icon :size="25"><User /></el-icon>
        <el-dropdown class="UserInfDrop">
          <el-icon :size="25"><ArrowDown /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
        </el-dropdown> 
    </div>
    </div>
</template>

<style scoped>
/* 左上角logo部分 */
.Logo{
  background-color: palevioletred;
  width: 300px;
  height: 60px;
  float: left;
  box-shadow: 
    0 0.3px 0.7px rgba(0, 0, 0, 0.180),
    0 0.9px 1.7px rgba(0, 0, 0, 0.180),
    0 5.0px 10px rgba(0, 0, 0, 0.225),
    0 3.7px 7.3px rgba(0, 0, 0, 0.280),
    0 10px 20px rgba(0, 0, 0, 0.4);
}
.LogoWord{
  margin-top: 10px;
  text-align: center;
  color: #FFF;
  
}

/* 用户退出登录部分 */
.UserInf{
  float: right;
  padding-top: 20px;
  color: #FFF;
  
}
.UserInf :hover{
  color: rgb(219,112,147);
}
.UserInfDrop{
  float: right;
  color: #FFF;
}
</style>