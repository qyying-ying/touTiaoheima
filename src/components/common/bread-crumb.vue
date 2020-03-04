<template>
<!-- 使用elementUI 面包屑 -->
  <el-breadcrumb separator=">">
      <!-- el-breadcrumb-item 相当于 router-link-->
     <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
  <!-- 第二个选项是动态的 需要采用传值得方式 props传值 slot插槽-->
  <el-breadcrumb>
      <!-- 内容是动态的 -->
      <!-- 定义一个具名插槽 -->
      <slot name="title"></slot>
  </el-breadcrumb>
  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
