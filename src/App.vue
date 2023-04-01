<script setup>
import MyComponent from './components/MyComponent.vue';
</script>

<template>
  <div id="Box1">
    <h1>这是一个页面测试</h1>
  </div>
  <div id="Box2">
    <div class="main">
      <div>
        <h3 class="Name">App组件:</h3>
        这是App组件
      </div>
      <div>
        <h3 class="Name">组件测试:</h3>
        <MyComponent></MyComponent>
      </div>
    </div>

    <div class="RouterList">
      <h3 class="Name">路由测试:</h3>
      <div>
        <router-link to="/">Home</router-link>
      </div>  
      <div>
        <router-link to="/Page1">Page1</router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>

</template>

<style scoped>
#Box1{
  margin-top: 50px;
  color: green;
}
#Box2{
  margin-left: 30px;
}
.main{
  margin-top: 20px;
}
.RouterList{
  margin-top: 20px;
}
.Name{
  color: blue;
}
</style>