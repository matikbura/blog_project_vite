<template>
  <div class="flex flex-col">
    <Entry></Entry>
  </div>
</template>

<script lang="ts" setup>
import Top from "@/pages/user/Top.vue";
import { userStore } from "@/store/defineStroe/userStore";
import { init, reset } from "@/socket";
import { inject, onBeforeUnmount, onMounted, onUnmounted, provide } from "vue";
import chatApi from "@/modle/ChatApi";
import { chatStore } from "@/store/defineStroe/chatStore";
import Entry from "./pages/Entry.vue";
const $store = chatStore();
const $user = userStore();
const token = $user.user.token;
let socket: WebSocket;
onMounted(() => {
  if (token) {
    socket = init(token);
    //获取消息列表信息
    chatApi.getConversationItemList().then((res) => {
      console.log(res);
      //登录成功 初始化聊天室
      // $store.initConversationItemList()
      $store.initConversationItemList(res.data);
    });
  }
});
onBeforeUnmount(() => {
  reset();
});
</script>

<style></style>
