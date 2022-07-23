<template>
  <div class="w-full h-full fixed flex  items-center  justify-center">
    <div class="flex space-x-20 p-14 shadow-2xl">
      <Icon icon="emojione-v1:loudly-crying-face" width="222" height="222"/>
      <div class="flex flex-col items-center space-y-5">
        <h1 class="text-9xl text-red-400 font-bold text-center">
          {{ code }}
        </h1>
        <div class="font-bold text-center space-y-2">
          <div v-if="code==400">Bad Request 无效的请求消息</div>
          <div v-if="code==401">未登录或登录已失效</div>
          <div v-if="code==402">Payment Required 请求资源没有付费</div>
          <div v-if="code==403">Forbidden 请求的资源不被允许访问</div>
          <div v-if="code==404">Not Found 请求的资源不存在</div>
          <div v-if="code==405">Method Not Allowed 请求方法不被服务器允许</div>
          <div v-if="code==414">Request-URI Too Long 请求的URI太大，无法解析</div>
          <div v-if="code==500">Internal Server Error 服务器内部错误</div>
          <div v-if="code==503">Service Unavailable 服务器被攻击了</div>
          <div v-if="code==505">HTTP Version Not Supported 服务器版本太低</div>
          <div v-if="code!=401">
            请联系管理员进行处理
          </div>
        </div>
        <div class="space-x-5">
          <button v-if="code==401" @click="goUserLogin" class="bg-red-400 text-white font-bold py-2 px-4 rounded-full">跳转用户登录界面</button>
          <button v-if="code==401" @click="goAdminLogin" class="bg-red-400 text-white font-bold py-2 px-4 rounded-full">跳转管理员登录界面</button>
          <button @click="goBack" class="bg-red-400 text-white font-bold py-2 px-4 rounded-full">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Icon} from '@iconify/vue';
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
const $route = useRoute();
const code=ref($route.query.code as unknown as number);
const $router=useRouter();
const goUserLogin=()=>{
  $router.push(
    {
      path:"/user/login",
    }
  )
}
const goAdminLogin=()=>{
  $router.push(
    {
      path:"/admin/adminlogin",
    }
  )
}
const goBack=()=>{
  $router.back()
}
</script>

<style scoped>

</style>