<template>
  <el-row align="middle" type="flex" class='layout-header'>
 <!-- 分两列 -->
   <el-col class='left' :span='12'>
       <!-- 图标 -->
       <i class="el-icon-s-fold"></i>
       <span>
           Jessie一定会成为一位优秀的IT工作者
       </span>
   </el-col>
   <!-- 右侧列 -->
   <el-col class='right' :span='12'>
       <!-- 再次放置一个row组件 -->
       <el-row type="flex" justify="end" align="middle">
            <img src="../../assets/img/head1.jpg" alt="">
       <!-- 下拉菜单 -->
       <el-dropdown  trigger='click'>
           <!-- 显示的内容 -->
           <span>@Jessie</span>
           <!-- 下拉内容需要做具名插槽 dropdown是专门做下拉的组件-->
           <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>git地址</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
           </el-dropdown-menu>
       </el-dropdown>
       </el-row>
   </el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.layout-header {
    height: 60px;
    .left {
        i {
            font-size: 20px;
        }
    }
    .right {
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
    }
}
</style>
