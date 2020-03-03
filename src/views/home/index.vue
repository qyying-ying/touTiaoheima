<template>
  <!-- 先在外面放置一个大容器 因为小容器只能放在到大容器 -->
  <el-container>
    <el-aside style="width:230px">
      <!-- <h1>左侧</h1> -->
      <!-- 左侧导航组件 -->
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧嵌套一个大容器 -->
    <el-container>
      <!-- 上面一个顶栏容器 -->
      <el-header>
        <h1>top</h1>
      </el-header>
      <!-- 主要内容容器 -->
      <el-main>
        <h1>medule</h1>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 将左侧导航组件引入 注册 使用
import LayoutAside from '@/components/home/layout-aside'
export default {
  components: {
    'layout-aside': LayoutAside
  }
}
</script>

<style>

</style>
