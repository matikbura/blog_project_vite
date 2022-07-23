<template>
  <div class="flex flex-col items-center space-y-1">
    <div>
      <el-avatar :size="44" :src="$host+props.follow.followUser?.imgUrl" />
    </div>
    <span>{{ props.follow.followUser?.name }}</span>
    <span class="text-xs text-gray-500 line-clamp-3">{{
      props.follow.followUser?.introduce
    }}</span>
    <div class="pt-2 text-sm">
      <button class="bg-blue-500 text-white rounded py-1 px-2">查看主页</button>
      <button class="ml-4 bg-purple-500 text-white rounded py-1 px-2">
        私信
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCurrentInstance from "@/hook/useCurrentInstance";
import { Follow } from "@/modle/axios/types";
const props = defineProps<{
  follow: Follow;
}>();
const {globalProperties} = useCurrentInstance()
const $host = globalProperties.$host;
console.log(props.follow);
</script>
