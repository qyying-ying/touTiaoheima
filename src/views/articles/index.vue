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
            <el-radio-group v-model="searchForm.status">
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
            <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
            <!-- 下拉选项 应该通过接口来获取数据 -->
            <!-- el-option是下拉的选项 label是显示值 value是绑定的值 -->
            <el-option v-for="item in channels" :key='item.id' :label='item.name' :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期范围：">
            <!--日期范围选择组件 要设置type属性为 daterange  -->
            <el-date-picker type='daterange' v-model="searchForm.dateRange"></el-date-picker>
        </el-form-item>
    </el-form>
    <!-- 开始文章的主体结构 flex布局-->
    <el-row class="total" type="flex" align="middle">
       <span>共找到1000条符合条件的内容</span>
    </el-row>
    <!-- 列表内容 -->
    <!-- article-item作为一个循环体 -->
    <div class="article-item" v-for="item in 100" :key="item">
      <!-- 左侧内容 -->
      <div class="left">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583678786423&di=4ebc5c89dde9d4e975bde1d1f437126b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201603%2F16%2F20160316161528_EXZYH.jpeg" alt="">
        <div class="info">
          <span>仙剑奇侠传</span>
          <el-tag class="tag">已发表</el-tag>
          <span class="date">2020-03-08 10:10:12</span>
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
      channels: [] // 专门来接收频道的数据
    }
  },
  methods: {
    // 获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // 获取频道接口返回的数据
        this.channels = result.data.channels
      })
    }
  },
  created () {
    //  获取频道数据
    this.getChannels()
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
