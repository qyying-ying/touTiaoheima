// 专门处理路由权限问题
import router from '@/router'
import progress from 'nprogress' // 进度条包
import 'nprogress/nprogress.css' // 样式文件
// 注册全局的前置守卫
// 回调函数会在路由发生改变之前执行
router.beforeEach(function (to, from, next) {
// 开启进度条
  progress.start()
  // 首先应该判断 你需要拦截哪些页面 如果页面的地址以 /home为开头, 就需要进行token的判断
  // 判断你要去的页面是不是以 /home为开头
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
// 应该在全局后置守卫的位置关闭 此时已经完成了路由的跳转

router.afterEach(() => {
  // 处理 进度条关闭的问题
  // setTimeout(() => progress.done(), 300)
  progress.done()
})
