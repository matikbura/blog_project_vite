<template>
  <div class="bg-white sticky top-16 rounded w-full bg-white">
    <div class="flex space-x-2 border-t border-b p-4">
      <div>
        <el-avatar :size="80" :src="$host+props.user.imgUrl"></el-avatar>
      </div>
      <div class="flex flex-col justify-between ">
       <span class="text-sm">
          {{ user.username }}
       </span>
        <span class="text-xs">
          {{ user.name }}
        </span>
        <span class="text-gray-400 text-xs line-clamp-3">
          {{ user.introduce }}
        </span>
      </div>
    </div>
    <div class="py-2 flex text-xs text-gray-600 justify-evenly">
      <div class="flex flex-col  items-center">
        <span class="text-base font-semibold">147</span>
        <p class="text-gray-500">访问数量</p>
      </div>
      <div class="flex flex-col  items-center">
        <span class="text-base font-semibold">20</span>
        <p class="text-gray-500">文章数量</p>
      </div>

      <div class="flex flex-col  items-center">
        <span class="text-base font-semibold">40</span>
        <p class="text-gray-500">评论数量</p>
      </div>
      <div class="flex flex-col  items-center">
        <span class="text-base font-semibold">200</span>
        <p class="text-gray-500">粉丝数量</p>
      </div>
    </div>
    <div class="flex justify-center items-center pt-3 py-4">
      <button
          class="bg-indigo-500 text-sm rounded px-3 py-1 text-white shadow-lg shadow-gray-400/40 duration-75"
          @click="sendMessage(props.user)"><span class="">发送信息</span></button>
      <button
          class="ml-6 bg-blue-500 text-sm rounded px-3 py-1 text-white shadow-lg shadow-gray-400/40 duration-75"
          v-show="isFollow===0">
        <span class="" @click="folowFuntion()">关注</span></button>
      <button
          class="ml-6 bg-blue-300 text-sm rounded px-3 py-1 text-white shadow-lg shadow-gray-400/40 duration-75"
          v-show="isFollow===2">
        <span class="">关注</span></button>
      <button
          class="ml-6 bg-blue-300 text-sm rounded px-3 py-1 text-white shadow-lg shadow-gray-400/40 duration-75"
          v-show="isFollow===1">
        <span class="" @click="umFolowFuntion()">已关注</span></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, onUpdated, ref} from "vue";
import {User} from "@/modle/axios/types";
import useCurrentInstance from "@/hook/useCurrentInstance";
import FollowApi from "@/modle/FollowApi";
import {userStore} from "@/store/defineStroe/userStore";
import {ElMessage} from "element-plus";
import {chatStore} from "@/store/defineStroe/chatStore";

const chat = chatStore();
const {globalProperties} = useCurrentInstance()
const props = defineProps<{
  user: User
}>()
const isFollow = ref(0)
onUpdated(() => {
  if($user.user.uid!==props.user.uid){
    FollowApi.findFollow({uid:$user.user.uid,followUid:props.user.uid}).then(res => {
      if (res.data.length > 0) {
        isFollow.value = 1
      }
    })
  }else{
    isFollow.value = 2
  }
})

const sendMessage = (user: User) => {

}
const $host = globalProperties.$host
//获取本地的user
const $user = userStore()
const folowFuntion = () => {
  console.log("关注")
  console.log(props.user.uid)
  FollowApi.addFollow({
    uid: $user.user.uid,
    followUid: props.user.uid,
  }).then(res => {
    if (res.data.code === 200) {
      isFollow.value = 1
      ElMessage.success(res.data.msg)
    }
  })
}
const umFolowFuntion = () => {
  console.log("取消关注")
  console.log(props.user.uid)
  FollowApi.removeFollow({
    uid: $user.user.uid,
    followUid: props.user.uid,
  }).then(res => {
    if (res.data.code === 200) {
      isFollow.value = 0
      ElMessage.success("取消关注成功")
    }
  })
}
</script>

<style scoped>

</style>