<template>
  <div class="container-width-1280 bg-white">
    <div class="bg-white p-4 mb-4 border-b text-sm">我的关注</div>
    <div class="grid grid-cols-4 gap-4 pb-4 p-2">
      <div class="p-4 bg-white rounded  border drop-shadow-md" v-for="item in pages.rows">
        <FollowItem :follow="item"></FollowItem>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">  
import FollowItem from '@/components/follow/FollowItem.vue';
import { Follow, Pages } from "@/modle/axios/types";
import FollowApi from "@/modle/FollowApi";
import { onMounted, ref } from "vue";
import {userStore} from "@/store/defineStroe/userStore";
const $user=userStore()
const pages = ref<Pages<Follow>>({
  page: 1,
  size: 10,
  queryParams: {uid:$user.user.uid},
});
// 关注列表
onMounted(()=>{
  FollowApi.findFollowPage(pages.value).then(res=>{
    console.log(res)
    pages.value = res.data
  })
})
</script>
