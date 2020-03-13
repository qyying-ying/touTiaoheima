<template>
  <!-- 先在外面放置一个大容器 因为小容器只能放在到大容器 -->
  <el-container>
    <!-- 根据折叠状态变成64 -->
    <el-aside :style="{width: collapse ? '64px' : '230px'}" style="transition: all 0.5s; background:#2e2f32">
      <!-- <h1>左侧</h1> -->
      <!-- 左侧导航组件 -->
      <!-- 直接把父组件的状态传给子组件 -->
      <layout-aside :collapse="collapse"></layout-aside>
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
import eventBus from '@/utils/eventBus'
export default {
  // components: {
  //   'layout-aside': LayoutAside,
  //   'layout-header': LayoutHeader
  // }
  data () {
    return {
      collapse: false // 默认是展开状态
    }
  },
  created () {
    // 切换了折叠的状态
    eventBus.$on('changeCollapse', () => {
      //  此时表示 折叠状态一定变了 变成什么了 一定是跟当前的状态相反了
      this.collapse = !this.collapse // 只要取反 就和 头部的组件的状态对上
    })
  }
}
</script>

<style>

</style>
