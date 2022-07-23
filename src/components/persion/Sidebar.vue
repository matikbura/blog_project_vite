<template>
  <el-menu
      default-active="1"
  >
    <el-menu-item index="个人信息" @click="handleOpen('个人信息','MessageContent')">
      <div class="w-full flex justify-center items-center space-x-2">
        <span class="iconify" data-icon="charm:person"></span>
        <span>个人信息</span>
      </div>
    </el-menu-item>
    <el-menu-item index="修改密码" @click="handleOpen('修改密码','ChangePassword')">
      <div class="w-full flex justify-center items-center space-x-2">
        <span class="iconify" data-icon="carbon:password"></span>
        <span>修改密码</span>
      </div>

    </el-menu-item>
    <el-menu-item index="个人头像" @click="handleOpen('个人头像','MyPhoto')">
      <div class="w-full flex justify-center items-center space-x-2">
        <span class="iconify" data-icon="radix-icons:avatar"></span>
        <span>个人头像</span>
      </div>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
  import {getCurrentInstance} from "vue";
  const {proxy}= getCurrentInstance()
  const handleOpen = (key,component) => {
      proxy.$pub('addTableTab',key,component)
  }
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  }
</script>
<script>
export default {
  name:'Sidebar'
}
</script>
<style scoped>

</style>