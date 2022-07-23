<template>
 <div class="w-full flex flex-col">
   <h6 class="p-2 text-sm  border-b">我的消息</h6>
   <div class="space-y-1.5 mt-2">
     <div v-for="(item,index) in $store.getConversationItemList" @click="getConversationMessageByOtherUid(item)" :key="index" class="mx-2 rounded-md px-3.5 py-2.5" :class='"flex justify-between duration-100 hover:bg-gray-100 "+isEdit(item.isActive)'>
       <div class="flex items-center">
         <div>
           <el-avatar  :size="40" :src="item.imgUrl"></el-avatar>
         </div>
         <div class="flex flex-col ml-2">
           <span class="text-sm mb-1">{{item.name}}</span>
           <span class="text-xs text-gray-400">{{item.latestMessage}}</span>
         </div>
       </div>
       <div class="flex flex-col justify-center items-center">
          <span class="text-xs text-gray-500">
            {{item.latestTime}}
          </span>
         <div>
           <span class="bg-red-500 rounded-full text-center text-white text-xs p-1" v-if="item.unreadMessageCount&&item.unreadMessageCount!=0" >{{item.unreadMessageCount}}</span>
         </div>
       </div>
     </div>

   </div>
 </div>
</template>

<script setup lang="ts">
  import {chatStore} from "@/store/defineStroe/chatStore";
  import {ConversationItem, ConversationMessage} from "@/modle/axios/types";
  import ChatApi from "@/modle/ChatApi";


  const $store=chatStore()
  //给聊天框赋值
  const getConversationMessageByOtherUid=(item:ConversationItem)=>{
    if (!item.isActive){
      $store.resetConversationItemListActive()
      ChatApi.getConversationMessageByOtherUid({otherUid:item.otherUid}).then(res=>{
        let conversationMessage={
          imgUrl:item.imgUrl,
          uid:item.otherUid,
          name:item.name,
          chatList:res.data
        } as ConversationMessage
        console.log(conversationMessage);
        $store.setConversationMessage(conversationMessage)
        const l= $store.chattingMessage.unreadMessageCountAll-item.unreadMessageCount
        $store.chattingMessage.unreadMessageCountAll=l
        item.unreadMessageCount=0
      })
      item.isActive=true
    }

  }
  const isEdit=(param)=>{
    if(param){
      return "bg-gray-100"
    }
  }
</script>

<style scoped>

</style>