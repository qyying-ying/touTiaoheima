<template>
 <!-- el-card布局 -->
  <el-card>
     <!-- 放置面包屑 将面包屑给到卡片的具名header-->
       <bread-crumb slot="header">
       <!-- 具名插槽 -->
       <template slot="title">
           素材管理
       </template>
       </bread-crumb>
       <!-- 放置标签页 v-model所绑定的值 就是当前所激活的页签 切换tabs页签的时候 需要进行时间的监听-->
       <el-tabs v-model="activeName" @tab-click="changeTab">
           <!-- 放置标签 label表示标签显示的名称 name代表页签的选中的值-->
           <el-tab-pane label="全部素材" name="all">
               <!-- 内容 循环生成页面结构-->
               <div class="img-list">
                   <!-- 采用v-for对list进行数据循环 -->
                   <el-card class="img-card" v-for="item in list" :key="item.id">
                       <!-- 放置图片  并且复制图片地址-->
                       <img :src="item.url" alt="">
                   <!-- 图片下面放操作栏 -->
                   <el-row class="operate" type="flex" justify="space-around" align="middle">
                     <i class="el-icon-star-on"></i>
                     <i class="el-icon-delete-solid"></i>
                   </el-row>
                   </el-card>
               </div>
           </el-tab-pane>
           <el-tab-pane label="收藏素材" name="collect">
               <!-- 内容 -->
           </el-tab-pane>
       </el-tabs>
       <!-- 放置一个公共的分页组件 -->
       <el-row type="flex" justify="center" style="height:80px" align="middle">
       <!--放置一个分页组件
       total 总条数
       current-page 当前页码
       page-size 每页多少条
       监听切换组件的切换事件-->
       <el-pagination background
       :total="page.total"
       :current-page="page.currentPage"
       :page-size="page.pageSize"
       layout="prev, pager, next"
       @current-change="changePage"></el-pagination>
       </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 当前激活的页签 默认选中全部素材
      list: [], // 全部素材的数据 接收全部素材
      //   一般放page专门的存放分页信息
      page: {
        currentPage: 1,
        total: 0,
        pageSize: 8

      }
    }
  },
  methods: {
    //   该方在页码切换时执行
    changePage (newPage) {
    // 传入一个新页
      this.page.currentPage = newPage// 将新页码赋值给页码数据
      this.getMaterial() // 获取数据
    },
    // 获取素材数据
    getMaterial () {
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          collect: this.activeName === 'collect', // 这个位置应该根据当前页签变活 // activename === 'all' 获取所有素材 activename === 'collect'获取收藏素材
          page: this.page.currentPage, // 取页码变量中的值 因为只要页码变量一变 获取的数据跟着变
          per_page: this.page.pageSize // 获取每页数量
        }, // get参数 也就是query参数
        data: {} // data参数 放的是body参数
      }).then(result => {
      // 将返回的数据 赋值到data中的数据
        this.list = result.data.results
        // 将总条数赋值给total变量
        this.page.total = result.data.total_count // 总数  全部素材的总数  收藏素材的总数 总数 跟随 当前页签变化而变化
      })
    },
    // 切换页签事件
    changeTab () {
      this.page.currentPage = 1 // 将页码重置为第一页 因为分类变了 数据变了
      // 在切换事件中
      // 可以根据当前 activename 来决定是获取那个方面的数据
      // activename === 'all' 获取所有素材 activename === 'collect'获取收藏素材
      this.getMaterial() // 直接调用获取素材的方法
    }
  },
  created () {
    //  实例化之后 调用获取素材数据
    this.getMaterial() // 获取素材数据
  }
}
</script>

<style lang="less" scoped>
.img-list {
    display: flex; // 图片横过来
    flex-wrap: wrap; // 图片换行
    justify-content: center; // 主轴对齐方式
    .img-card {
        width: 220px;
        height: 240px;
        margin: 20px 40px;
        position: relative;
        img {
            width: 100%;
            height: 100%;
        }
        .operate {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%; // 宽度给100%
            background: #f4f5f6;
            height: 30px;
            i {
                font-size: 20px;
            }
        }
    }
}

</style>
