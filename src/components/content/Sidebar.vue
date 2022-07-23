<template>
  <el-menu
      default-active="文章管理"
      class="el-menu-vertical-demo !w-full"
  >
    <el-menu-item index="文章管理" @click="handleOpen('ArticleManagement')">
      <div class="w-full flex  items-center space-x-2">
        <span class="iconify" data-icon="ic:outline-article"></span>
        <span>文章管理</span>
      </div>
    </el-menu-item>
    <el-menu-item index="评论管理" @click="handleOpen('CommentManagement')">
      <div class="w-full flex  items-center space-x-2">
        <span class="iconify" data-icon="akar-icons:comment"></span>
        <span>评论管理</span>
      </div>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import {getCurrentInstance} from "vue";

const {proxy} = getCurrentInstance()
const handleOpen = (component) => {
  proxy.$pub('addTableTab', component)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
<script>
export default {
  name: 'Sidebar'
}
</script>
<style scoped>

</style>