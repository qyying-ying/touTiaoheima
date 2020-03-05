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
            <img :src="userInfo.photo" alt="">
       <!-- 下拉菜单 -->
       <el-dropdown  trigger='click' @command="clickMenu">
           <!-- 显示的内容 -->
           <span>{{userInfo.name}}</span>
           <!-- 下拉内容需要做具名插槽 dropdown是专门做下拉的组件-->
           <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  command='info'>个人信息</el-dropdown-item>
                <el-dropdown-item command ='git'>git地址</el-dropdown-item>
                <el-dropdown-item command ='lgout'>退出</el-dropdown-item>
           </el-dropdown-menu>
       </el-dropdown>
       </el-row>
   </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {
        //   点击了个人信息
      } else if (command === 'git') {
        //   点击git 跳转到git仓库
        window.location.href = 'https://github.com/qyying-ying/touTiaoheima'
      } if (command === 'lgout') {
        //   点击退出 1删除token 2跳转回登录页
        window.localStorage.removeItem('user-token') // 删除localstorage中的某个选项
        this.$router.push('/login') // 跳回登录页
      }
    }
  },
  created () {
    // const token = localStorage.getItem('user-token') // 从兜里拿钥匙 也就是从缓存中取token
    //   获取用户的个人信息
    this.$axios({
      url: '/user/profile' // 请求地址
      // headers: {
      //   Authorization: `Bearer ${token}` // 格式要求 Bearer +token
      // } // 请求头参数 headers放置请求头参数
    }).then(result => {
      // 如果加载成功了 我们要将数据赋值给 userInfo
      this.userInfo = result.data
    })
  }
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
