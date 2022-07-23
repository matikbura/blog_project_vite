<template>
  <div class="h-screen w-screen flex flex-col">
    <div class="py-6 bg-gray-800">
      <span class="text-white ml-10 font-bold">技术博客后台管理系统</span>
    </div>
    <div class="h-full overflow-hidden flex">
      <div class="shrink-0 bg-white">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
        >
          <el-menu-item index="AdminHome" class="space-x-2 shrink-0">
            <span
              class="iconify text-2xl mr-3"
              data-icon="ant-design:home-outlined"
            ></span>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="Notify">
            <span
              class="iconify text-2xl mr-3"
              data-icon="fluent:speaker-2-32-regular"
            ></span>
            <span>通知管理</span>
          </el-menu-item>

          <el-menu-item index="ArticleList">
            <span
              class="iconify text-2xl mr-3"
              data-icon="ic:outline-article"
            ></span>
            <span>文章管理</span>
          </el-menu-item>

          <el-menu-item index="CommentList">
            <span
              class="iconify text-2xl mr-3"
              data-icon="ant-design:comment-outlined"
            ></span>
            <span>评论管理</span>
          </el-menu-item>


          <el-menu-item index="UserList">
            <span class="iconify text-2xl mr-3" data-icon="bx:user"></span>
              <span>用户管理</span>
          </el-menu-item>

          <el-menu-item index="TagList">
            <span
                class="iconify text-2xl mr-3"
                data-icon="ant-design:tag-outlined"
              ></span>
              <span>标签管理</span>
          </el-menu-item>
          <el-menu-item index="ReportList">
            <span
              class="iconify text-2xl mr-3"
              data-icon="icon-park-outline:report"
            ></span>
            <span>用户反馈信息管理</span>
          </el-menu-item>
          <el-menu-item index="Exit">
            <span
              class="iconify text-2xl mr-3"
              data-icon="radix-icons:exit"
              data-rotate="180deg"
            ></span>
            <span>退出登录</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="flex-1 overflow-x-hidden m-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 400px;
}
</style>
