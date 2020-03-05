// 封装请求工具 request.js
// 对于axios的二次封装
// 配置拦截器 以及其他
import axios from 'axios'
import router from '@/router' // 路由实例对象
// 拦截器以及其他
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 公共请求头地址
// 请求拦截器的开发
axios.interceptors.request.use(function (config) {
// 成功时执行 第一个 参数 会有一个config config就是所有的axios的请求信息
// 在第一个函数中 需要将配置进行执行 返回的配置会作为请求参数进行请求
// 在返回之前 就是我们通通过以注入token的最佳时间
  const token = localStorage.getItem('user-token') // 拿钥匙 也就是从缓存中取token
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config
}, function (error) {
// 失败时执行第二个 axios是一个支持promise 如果失败了 我们应该直接reject reject会直接进入到axios的catch中
  return Promise.reject(error)
})

// 响应拦截器的开发
axios.interceptors.response.use(function (response) {
// 回调函数第一个参数 是响应体
// 在拦截器中 需要将数据返回
  return response.data ? response.data : {} // 有的接口没有任何响应数据
// 成功执行的时候
}, function (error) {
// 失败的时候执行
// error是错误对象
// 401 状态码 表示用户认证失败 用户身份不对
// 401出现的时候 表示拿错钥匙 钥匙过期或者钥匙没拿 或者钥匙名不对
// 项目1 讲一种比较粗暴的换钥匙 项目2 讲一种比较温柔的换钥匙
// 粗暴的换钥匙 回登录页重新登录 换一把新的钥匙重来
// 回登录页之前 应该把旧钥匙清除掉
  if (error.response.status === 401) {
    localStorage.romoveItems('user-token') // 删除钥匙
    // 直接导入路由实例对象 使用跳转方式 和组件中的this.$router是一样的
    router.push('/login')
    // 跳回登录页
  }
  // 进行错误的处理
  return Promise.reject(error) // 所有的axios调用 依然可以在catch中得到错误
})
export default axios
