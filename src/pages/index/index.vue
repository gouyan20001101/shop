<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-setting"></i>
          <span slot="title">首页</span>
        </el-menu-item>

        <!-- 遍历有目录的菜单 -->
        <template v-for="item in user.menus"> 
         <el-submenu :index="item.title" :key="item.id" v-if="item.children">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              v-for="i in item.children"
              :key="i.id"
              :index="'/' + i.url"
              >{{ i.title }}</el-menu-item
            >
          </el-submenu>
          <!-- 遍历只有菜单 -->
        <el-menu-item v-else :key="item.id" :index="'/'+item.url">{{item.title}}</el-menu-item>
       </template>

         <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/manager">管理员管理</el-menu-item>
          </el-submenu>
        
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商城管理</span>
          </template>
          <el-menu-item index="/cate">商品分类</el-menu-item>
          <el-menu-item index="/spec">商品规格</el-menu-item>
          <el-menu-item index="/goods">商品管理</el-menu-item>
          <el-menu-item index="/member">会员管理</el-menu-item>
          <el-menu-item index="/banner">轮播图管理</el-menu-item>
          <el-menu-item index="/seckill">秒杀活动</el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="80px">
        {{ user.username }}
        <el-button type="primary" @click="logout">退出</el-button>
      </el-header>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ this.$route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- //二级路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data(){
return{
  
}
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    ...mapActions({
      requestUser: "userActions"
    }),
    logout() {
      //清空页面信息
      this.requestUser(null);
      //跳转登录页
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.el-aside {
  height: 100vh;
  background: rgb(42, 92, 112);
  color: #fff;
}
.el-header {
  height: 80px;
  background: rgb(229, 240, 245);
  line-height: 80px;
  text-align: right;
}
</style>
