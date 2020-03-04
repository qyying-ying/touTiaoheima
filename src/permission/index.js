// 专门处理路由权限问题
import router from '@/router'
// 注册全局的前置守卫
// 回调函数会在路由发生改变之前执行
router.beforeEach(function (to, from, next) {
// 首先应该判断 你需要拦截哪些页面 如果页面的地址以/home开头，需要对token进行判断

  if (to.path.startsWith('/home')) {
    // 表示你要去主页相关的页面 需要判断是否有token，
    // 如果是以/home开头，没有钥匙，则踢回去取token
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next() // 放过
    } else {
      next('/login') // 回登录页 取token
    }
  } else {
    //   如果不是去主页相关 直接执行next（）放行
    next()
  }
})
