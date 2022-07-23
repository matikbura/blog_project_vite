<template>
  <div
      class="text-center items-center h-[700px]"
      v-if="$store.chattingMessage.conversationMessage.name === ''"
  >
    <span>快找人聊一聊把</span>
  </div>
  <div
      v-if="$store.chattingMessage.conversationMessage.name !== ''"
      class="flex flex-col h-full bg-white p-1.5"
  >
    <h6 class="p-2 text-sm">
      {{ $store.chattingMessage.conversationMessage.name }}
    </h6>
    <div class="bg-gray-100 p-1.5">
      <div class="h-[666px] overflow-x-hidden bg-gray-100"
           style="direction: rtl;transform: rotate(180deg) translateZ(0)">
        <div id="chatContentWrap" class="px-2 space-y-2" style="transform: rotate(180deg) translateZ(0)">
          <div v-for="(item, index) in $store.chattingMessage.conversationMessage
              .chatList"
               :key="index">
            <div class="pb-4">
              <p v-if="dayjs(item.createTime).diff($store.chattingMessage.conversationMessage.chatList[index-1]?.createTime, 'minute')>5"
                 class="text-center text-xs text-gray-400 mt-6 mb-2">{{
                  !dayjs(item.createTime).isSame(new Date(), 'day') ?
                      dayjs(item.createTime).format('HH:mm:ss YYYY/MM/DD') :
                      dayjs(item.createTime).format('HH:mm:ss')
                }}
              </p>
              <div class="flex"
                   :class="{'flex-row-reverse':item.fromUid !== personUid}"
              >
                <el-avatar
                    :size="40"
                    src="http://localhost:8089/ava.jpeg"
                    class="flex-shrink-0"
                ></el-avatar>
                <div class="max-w-3xl text-sm p-2 rounded bg-white"
                     :class="item.fromUid === personUid?'mr-3':'ml-3'">
                  {{ item.context }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative">
      <el-input
          v-model="context"
          maxlength="1000"
          placeholder="请输入"
          show-word-limit
          type="textarea"
          class="chatting"
          :autosize="{ minRows: 8, maxRows: 8 }"
          @keyup.ctrl.enter="sendMessage"
      />
      <button class="bg-blue-500 text-white text-sm px-4 py-1 border absolute rounded bottom-6 right-2">
        发送
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {chatStore} from "@/store/defineStroe/chatStore";
import {onMounted, reactive, ref} from "vue";
import {userStore} from "@/store/defineStroe/userStore";
import chatApi from "@/modle/ChatApi";
import dayjs from "dayjs";

const context = ref("");
const $store = chatStore();
const $user = userStore();
const personUid = $user.user.uid;
const handleIconClick = () => {
};
const sendMessage = () => {


  //dayjs判断当天


  if (context.value.trim() !== '') {
    chatApi
        .sendMessage({
          toUid: $store.chattingMessage.conversationMessage.uid,
          context: context.value,
        })
        .then((res) => {
          //加到聊天框中
          $store!.chattingMessage!.conversationMessage!.chatList!.push(res.data);
          $store.UpdateBySendMessage(res.data);
        }).then(() => {
      document.querySelector('#chatContentWrap')!.lastElementChild!.scrollIntoView({
        behavior: "smooth",
      })
    })
    context.value = "";
  } else {
    context.value = ""
  }
};

onMounted(() => {
})

</script>

<style scoped>
>>> .el-textarea__inner {
  @apply max-h-36;
}
</style>
