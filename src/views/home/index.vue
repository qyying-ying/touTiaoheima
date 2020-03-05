<template>
  <!-- 先在外面放置一个大容器 因为小容器只能放在到大容器 -->
  <el-container>
    <el-aside style="width:230px;background:#2e2f32">
      <!-- <h1>左侧</h1> -->
      <!-- 左侧导航组件 -->
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧嵌套一个大容器 -->
    <el-container>
      <!-- 顶部操作栏 -->
      <el-header>
        <layout-header></layout-header>
        <!-- <h1>top</h1> -->
      </el-header>
      <!-- 主要内容容器 el-main默认给加了20px的内边距-->
      <el-main style="padding: 0">
        <!-- 这里放置 二级路由容器 -->
         <router-view>
         </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// // 将左侧导航组件引入 注册 使用
// import LayoutAside from '@/components/home/layout-aside'
// import LayoutHeader from '@/components/home/layout-header'
export default {
  // components: {
  //   'layout-aside': LayoutAside,
  //   'layout-header': LayoutHeader
  // }
}
</script>

<style>

</style>
