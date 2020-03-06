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
<!-- 放置分页组件 -->
<el-row style="height:80px" type="flex" align="middle" justify="center">
<!-- 分页组件需要 动态的数据
total 当前的总数
current-page 当前的页码
page-size 每页有多少条
监听 current-change事件
-->
<el-pagination background layout="prev, pager, next"
:current-page="page.currentPage"
:total="page.total"
:page-size="page.pageSize"
@current-change="changePage"></el-pagination>
</el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      // 分页参数单独放置一个对象 让数据更清晰
      page: {
        total: 0, // 默认总数是0
        currentPage: 1, // 默认页码是第一个页
        pageSize: 10 // page-size的默认值是10
      },
      list: []
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      // newpage是最新的切换页码
      // 将最新页码 设置给page下的当前页码
      this.page.currentPage = newPage // 赋值最新页码
      // 重新拉取数据
      this.getComment() // 获取评论
    },
    // 获取评论数据
    getComment () {
      this.$axios({
        url: '/articles', // 请求地址
        // 接口 如果你不传分页数据 默认查第一页的数据
        params: {
          response_type: 'comment',
          page: this.page.currentPage, // 查第一项
          per_page: this.page.pageSize// 查10条
        }
      // query参数应该在哪个位置传 axios
      // params 传get参数也就是query参数
      // data 传body参数也就是请求体参数
      }).then(result => {
        // 将返回结果中的数组给list
        this.list = result.data.results
        // 在获取完数据后 将 总数赋值给 total
        this.page.total = result.data.total_count // 将总数赋值
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
            article_id: row.id.toString() // 要求参数的文章id 将bignumber转成字符串
          // 前段传字符串到后端 只要和原数字一致 后端会自动将字符串转成大数字
          // 只要保证id和传来的id一致就行
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
    // 在钩子函数中 直接获取数据 获取第一页的数据
    this.getComment()
  }
}
</script>

<style>

</style>
