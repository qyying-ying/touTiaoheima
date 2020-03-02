<template>
  <div class="login">
      <!-- 表单 -->
      <el-card class="login-card">
          <!-- 表单内容 -->
          <!-- 头部logo -->
      <div class="title">
          <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 绑定model属性 绑定rules属性（表单验证规则）-->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
          <!-- 表单容器 prop表示要检验的字段名-->
          <el-form-item prop="mobile">
              <!-- 表单域 -->
              <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="code">
              <el-input v-model="loginForm.code" style="width:60%" placeholder="请输入验证码"></el-input>
          <!-- 放置按钮 -->
          <el-button style="float:right" plain >发送验证码</el-button>
          </el-form-item>
          <!-- 表单域 -->
          <el-form-item prop="checked">
              <!-- 是否同意 -->
              <el-checkbox v-model="loginForm.checked">我已阅读同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
              <el-button @click="login" style="width:100%" type="primary">登录</el-button>
          </el-form-item>
      </el-form>
      </el-card>

  </div>
</template>

<script>
// 不知道从哪里来的 突然出先 待观察是否有用 import func from '../../../vue-temp/vue-editor-bridge'
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意用户
      },
      // 定义表单的验证规则
      loginRules: {
        //  required为true 表示该字段不能为空
        mobile: [{ required: true, message: '你的手机号不能为空' }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '您的手机号格式不正确'
        }],
        code: [{ required: true, message: '你的验证码不能为空' }, {
          pattern: /^\d{6}$/,
          message: '验证码应该为6位数字'
        }],
        checked: [{
          validator: function (rule, value, callback) {
            // rule是当前的校验规则
            // value是当前的要校验的字段的值
            // callback是一个回调函数 不论成功或者失败都要执行
            // 成功执行callback 失败执行callback（new Error（错误信息））
            // 我们认为 如果 value 为true就表示 校验成功 如果value为false 就表示校验失败
            // new Error（错误信息）就是我们提示的错误信息
            value ? callback() : callback(new Error('必须同意哦 不然不爱你啦'))
          }
        }]
      }
    }
  },
  methods: {
    login () {
    // this.$refs.loginForm 获取的就是el-form的对象实例
    // 第一种 回调函数 isOK, filelds(没有校验通过的字段)
    //   this.$refs.loginForm.validate(function (isOK) {
    //     if (isOK) {
    //       console.log('校验通过')
    //     } else {
    //       console.log('校验未通过')
    //     }
    //   }) // 方法
    // 第二种方式 promise
      this.$refs.loginForm.validate().then(() => {
        // 如果成功通过 校验就会到达 then
        // 通过校验之后 应该做什么事
        // this.$axios.get/post/delet/put
        this.$axios({
          url: '/authorizations', // 请求地址
          data: this.loginForm, // body请求
          method: 'post'
        }).then(result => {
        // 成功
        // console.log(result.data.data.token)
          window.localStorage.setItem('user-token', result.data.data.token)
          //  跳转到主页
          this.$router.push('/home')
        }).catch(() => {
        // 提示消息
          this.$message({
            message: '手机号或者验证码错误',
            type: 'warning'
          })
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
// 如果需要些less 需要在style标签中 lang='less'
// 加了scope属性 就只会对当前自己的组件起作用
.login {
    background-image: url('../../assets/img/back8.jpg');
    height: 100vh; // 当前屏幕可视区域的100%
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
        width: 440px;
        height: 340px;
    }
    .title {
        text-align: center; //在块级元素内对行内元素进行居中
        img {
            height: 40px;
        }
    }
}
</style>
