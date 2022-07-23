<template>
  <div class="container-width-1280 flex space-x-2 h-full pb-4">
    <div class="w-96 bg-white flex">
      <component :is="isActive"></component>
    </div>
    <div class="w-full bg-white">
      <Content />
    </div>
  </div>
</template>

<script>
import MyMessage from "@/components/chatting/MyMessage.vue";
import Content from "@/components/chatting/Content";
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { chatStore } from "@/store/defineStroe/chatStore";

export default {
  name: "Chatting",
  setup() {
    const textarea = ref("");
    const isActive = ref("MyMessage");
    const $chat = chatStore();
    onMounted(() => {
      $chat.isOpen = 1;
    });
    onUnmounted(() => {
      $chat.isOpen = 0;
    });
    return {
      textarea,
      isActive,
    };
  },
  components: {
    MyMessage,
    Content,
  },
};
</script>

<style scoped></style>
