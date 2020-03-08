<template>
  <el-card class="articles">
    <bread-crumb slot="header">
    <template slot="title">文章列表</template>
    </bread-crumb>
    <!-- {{channels}} -->
    <!-- 搜索工具栏 筛选 -->
    <!-- 表单容器 -->
    <el-form style="padding-left : 50px">
        <el-form-item label="文章状态：">
            <!-- 放置单选框组 -->
            <el-radio-group v-model="searchForm.status" @change="changeCondition">
                <!-- 单选框选项 -->
                <!-- // 文章状态， 0草稿 1待审核 2审核通过 3审核失败 4已删除 5先定义为全部 -->
                <el-radio :label="5">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核</el-radio>
                <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道类别：">
            <!-- 选择器 -->
            <el-select @change="changeCondition" placeholder="请选择频道" v-model="searchForm.channel_id">
            <!-- 下拉选项 应该通过接口来获取数据 -->
            <!-- el-option是下拉的选项 label是显示值 value是绑定的值 -->
            <el-option v-for="item in channels" :key='item.id' :label='item.name' :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期范围：">
            <!-- {{ searchForm.dateRange }} -->
            <!-- 日期范围选择组件 要设置type属性为daterange -->
            <!-- 显示值和存储值得结构不一致 使用value-format指定绑定值得格式  -->
            <el-date-picker @change="changeCondition" type='daterange' value-format="yyyy-MM-dd" v-model="searchForm.dateRange"></el-date-picker>
        </el-form-item>
    </el-form>
    <!-- 开始文章的主体结构 flex布局-->
    <el-row class="total" type="flex" align="middle">
       <span>共找到1000条符合条件的内容</span>
    </el-row>
    <!-- 列表内容 -->
    <!-- article-item作为一个循环体 -->
    <div class="article-item" v-for="item in list" :key="item.id.toString()">
      <!-- 左侧内容 -->
      <div class="left">
        <!-- 设置文章的封面信息 有的有值 有的没值 需要设置一个默认的值 -->
        <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
        <div class="info">
          <span>{{item.title}}</span>
          <!-- 文章状态 0-草稿 1-待审核 2-审核通过 3-审核失败 4-已删除 -->
          <!-- 只是改变显示的格式 可以用过滤器 两个过滤器分别处理显示文本和标签类型-->
          <el-tag :type=" item.status | filterType" class="tag">{{item.status | fillterStatus}}</el-tag>
          <!-- 发布日期 -->
          <span class="date">{{item.pubdate}}</span>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="right">
        <span><i class="el-icon-edit"></i>修改</span>
        <span><i class="el-icon-delete"></i>删除</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
    //  定义一个表单数据对象
      searchForm: {
        // 数据
        // 文章状态， 0草稿 1待审核 2审核通过 3审核失败  5先定义为全部
        // 传值的时候如果是5  就不传
        status: 5, // 默认为全部的状态
        channel_id: null, // 表示没有任何的频道
        dateRange: ''
      },
      channels: [], // 专门来接收频道的数据
      list: [], // 定义一个list数据接收文章列表
      defaultImg: require('../../assets/img/timg.jpg') // 地址对应的图片变成了变量 在编译的时候会被拷贝到对应位置
    }
  },
  // 专门处理显示格式的
  filters: {
    // 过滤器的第一个参数是value
    // 文章状态 0草稿 1待审核 2审核通过 3审核失败 4已删除
    fillterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 过滤器除用在 插值表达式中还可以用 v-bind 的表达式中
    filterType (value) {
      // 根据当前状态的值 显示不同类型的tag值
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger' // 失败错误
      }
    }
  },
  methods: {

    // 改变了条件
    changeCondition () {
      // 当触发此方法的时候 表单数据已经变成最新的了
      // 组装条件
      const params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 5是我们前段虚构的
        channel_id: this.searchForm.channel_id, // 就是表单的数据
        begin_pubdate: this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      // 通过接口传入
      this.getArticles(params)
    },
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获取频道接口返回的数据
        this.channels = result.data.channels
      })
    },
    // 获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles', // 请求地址
        params // es6简写
      }).then(result => {
        this.list = result.data.results // 获取文章列表
      })
    }
  },
  created () {
    //  获取频道数据
    this.getChannels()
    this.getArticles() // 获取文章列表
  }
}
</script>

<style lang='less' scoped>
 .articles {
   .total {
     height: 60px;
    border-bottom: 1px dashed #ccc;
   }
  //  对文章循环项进行样式的编写
   .article-item {
    display: flex;
    justify-content: space-between; // 两头对齐
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    .left {
      display: flex;
      img {
        width: 180px;
        height: 100px;
        border-radius: 4px;
        }
        .info {
          display: flex;
          flex-direction: column;
          height: 100px;
          justify-content: space-around;
          margin-left: 10px;
          .date {
            color: #999;
            font-size: 12px;
          }
          .tag {
            width: 60px;
            text-align: center;
          }
      }
    }
    .right {
      span {
        font-size: 14px;
        margin-right: 8px;
        cursor: pointer;
        user-select: none;
      }
    }
   }
 }
</style>
