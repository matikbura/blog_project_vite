<template>
  <div class="flex justify-between items-center p-2 hover:bg-gray-100" @click="turnAhthor(user)">
    <div class="rounded-full w-16 h-16 overflow-hidden flex-shrink-0">
      <el-avatar :size="70" :src="$host+props.user.imgUrl"></el-avatar>
    </div>
    <div class="ml-4 flex-auto">
      <span>{{ props.user.name }}</span>
      <p class="mt-1 text-xs text-gray-400 line-clamp-1">{{ props.user.introduce }}</p>
    </div>
    <button v-if="isFollow===0" class="px-2 py-1 flex-shrink-0 bg-blue-500 rounded text-white text-xs ml-8 mr-2"
            @click.stop="folowFuntion">
      关注
    </button>
    <button v-if="isFollow===2" class="px-2 py-1 flex-shrink-0 bg-blue-300 rounded text-white text-xs ml-8 mr-2">
      关注
    </button>
    <button v-if="isFollow===1" class="px-2 py-1 flex-shrink-0 bg-blue-300 rounded text-white text-xs mr-2"
            @click.stop="umFolowFuntion">
      已关注
    </button>
    <button class="px-2 py-1 flex items-center flex-shrink-0 rounded text-white text-xs mr-4 bg-cyan-500">
      发送消息
    </button>
  </div>
</template>
<script lang="ts" setup>
import {Article, Follow, User} from "@/modle/axios/types";
import useCurrentInstance from "@/hook/useCurrentInstance";
import {onMounted, ref} from "vue";
import FollowApi from "@/modle/FollowApi";
import {userStore} from "@/store/defineStroe/userStore";
import {ElMessage} from "element-plus";
import router from "@/router";
import {useRouter} from "vue-router";



const {globalProperties} = useCurrentInstance()
const $host = globalProperties.$host
const props = defineProps<{
  user: User
  type: number
}>()
const $user = userStore()
const isFollow = ref(0)
onMounted(() => {
  if ($user.user.uid !== props.user.uid) {
    FollowApi.findFollow({uid: $user.user.uid, followUid: props.user.uid}).then(res => {
      if (res.data.length > 0) {
        isFollow.value = 1
      }
    })
  } else {
    isFollow.value = 2
  }

})
const $router = useRouter()
const turnAhthor = (user: User) => {
  $router.replace({
    path: 'Ahthor',
    query: {
      "uid": user.uid
    }
  }).then(()=>{
    location.reload()
  })

}
const folowFuntion = () => {
  console.log("关注")
  console.log(props.user.uid)
  FollowApi.addFollow({
    uid: $user.user.uid,
    followUid: props.user.uid,
  }).then(res => {
    isFollow.value = 1
    ElMessage.success("关注成功")
  })
}
const umFolowFuntion = () => {
  console.log("取消关注")
  console.log(props.user.uid)
  FollowApi.removeFollow({
    uid: $user.user.uid,
    followUid: props.user.uid,
  }).then(res => {
    isFollow.value = 0
    ElMessage.success("取消关注成功")
  })
}

</script>