<template>
<!-- 用一个el-card组件做主页面 -->
<el-card>
   <!-- 放置一个面包屑组件 slot="header" 表示面包屑会作为具名插槽给card的header部分-->
   <bread-crumb slot="header">
       <template slot="title">
           评论管理
       </template>
    </bread-crumb>
    <!-- 表格组件 -->
<el-table :data="list">
    <!-- 使用el-table-column作为列 -->
    <!-- prop表示显示的字段 -->
    <el-table-column width="600px" prop='title' label="标题"></el-table-column>
    <!-- 给el-table-cloumn 一个 formatter属性 用来格式化内容 因为在table中不显示布尔值-->
    <el-table-column :formatter="formatterBool" prop='comment_status' label="评论状态"></el-table-column>
    <el-table-column prop='total_comment_count' label="总评论数"></el-table-column>
    <el-table-column prop='fans_comment_count' label="粉丝评论数"></el-table-column>
    <el-table-column label="操作">
      <!-- el-table-column组件 在插槽中传出了 row $index store column -->
      <!-- 插槽 作用域插槽 子组件中数据通过插槽传出 slot-scope接收 row行数据 $index索引-->
      <!-- 可以放组件 -->
      <template slot-scope="obj">
        <el-button size="small" type="text">修改</el-button>
      <!-- 文本内容要根据 当前行里面的评论状态决定显示还是隐藏 -->
        <el-button @click="openOrclose(obj.row)" size="small" type="text">{{obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
      </template>
    </el-table-column>
</el-table>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
  // 获取评论数据
    getComment () {
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment'
        }
      // query参数应该在哪个位置传 axios
      // params 传get参数也就是query参数
      // data 传body参数也就是请求体参数
      }).then(result => {
        // 将返回结果中的数组给list
        this.list = result.data.results
      })
    },
    // 定义一个格式化的函数
    formatterBool (row, column, cellValue, index) {
      // row代表当前的一行数据
      // cloumn代表当前的列信息
      // cellValue代表当前单元格的值
      // index代表当前的索引
      // 该函数需要返回一个值 用来显示
      return cellValue ? '正常' : '关闭'
    },
    openOrclose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      // $confirm 也支持 promise 点击确定会进入到then 点击取消会进入到catch
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        // 调用打开或者关闭接口
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put', // 请求类型
          params: {
            article_id: row.id // 要求参数的文章id
          },
          data: {
            // body参数
            allow_comment: !row.comment_status// 是打开还是关闭 此状态和评论状态相反
          }
        }).then(() => {
          this.$message.success(`${mess}评论成功`)
          // 重新拉取数据
          this.getComment() // 调用重新拉去数据的方法
        }).catch(() => {
        //  表示失败了进入catch
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    // 在钩子函数中 直接获取数据
    this.getComment()
  }
}
</script>

<style>

</style>
