<template>
  <!-- 二级路由的默认组件 -->
  <div class="second-home">
    <!-- 幻灯片 -->
 <el-carousel :interval="4000" type="card" height="500px">
    <el-carousel-item v-for="item in list" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583334128895&di=b9c0b640af8e36eb6d61d3fddbe99ba5&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F0a6661ff8a0337197d07d7f69d46fe417a81cc55185ff-QFhk1E_fw658',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583333672448&di=132d516fc55e4e9243c0f43e5534f5bd&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F21%2F20180921133318_lmigd.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583333707235&di=6868f36e56ab95b71970b3c54e216330&imgtype=0&src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz%2FsJC2d03ibdeic4m9Ue6yGjJXlMFGcn9AKTWoWYrEalBib5OpWcDqibqmYHluVoy7nu7ian8swBOtojLW0IMblWu82JA%2F0%3Fwx_fmt%3Djpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583334196547&di=07d2459dcdc5426aac08c4cf810fd1e1&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201605%2F13%2F20160513193003_253PU.thumb.700_0.jpeg']
    }
  }
}
</script>

<style>
.second-home {
  /* calc 计算的意思 在css中计算数值 用法  calc ( 四则运算  ) 变量之间 和运算符之间一定要有空格 */
  height: calc(100vh - 60px);
  background-size: cover;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583332249924&di=a4cee192c0270b3ac260655bed3375e7&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170207%2F18fcaf503b5c4fd891ff2dc9696723e8_th.png");
}
</style>
