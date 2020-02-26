<template>
  <div id="navMenu">
    <el-menu
      mode="horizontal"
      router
      @select="handleSelect"
      background-color="#BE392A"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="display: flex;justify-content: center;">
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/pub/newstwo">新闻公告</el-menu-item>
      <el-menu-item index="/pub/sign">竞赛报名</el-menu-item>
      <el-menu-item index="/pub/suctwo">成果展示</el-menu-item>
      <el-menu-item index="/pub/team">团队建设</el-menu-item>
      <el-menu-item index="/pub/line">竞赛历程</el-menu-item>
      <el-menu-item index="/pub/down">资料下载</el-menu-item>
      <el-menu-item index="/pub/aboutus">关于我们</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    data() {
      return {}
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
.el-menu--horizontal>.el-menu-item.is-active{
  border-bottom: 4px solid #FFA500;
}
.el-menu-item {
  padding: 0 33px;
}
</style>