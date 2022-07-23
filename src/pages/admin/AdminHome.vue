<template>
  <div class="">
    <div class="p-6 flex flex-col space-y-6">
      <div class="justify-between flex">
        <div class="flex bg-white p-4 rounded-lg shadow">
          <div class="mr-4">
            <span
              class="iconify text-6xl p-2 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
              data-icon="bxs:user"
            ></span>
          </div>
          <div class="flex flex-col space-y-2">
            <span class="text-sm">用户数量</span>
            <span class="text-xl w-[8.5rem]">{{userCount}}个</span>
          </div>
        </div>
        <div class="flex bg-white p-4 rounded-lg shadow">
          <div class="mr-4">
            <span
              class="iconify text-6xl p-2 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
              data-icon="bx:run"
            ></span>
          </div>
          <div class="flex flex-col space-y-2">
            <span class="text-sm">活跃用户</span>
            <span class="text-xl w-[8.5rem]">{{loginCount}}位</span>
          </div>
        </div>
        <div class="flex bg-white p-4 rounded-lg shadow">
          <div class="mr-4">
            <span
              class="iconify text-6xl p-2 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
              data-icon="heroicons-solid:status-online"
            ></span>
          </div>
          <div class="flex flex-col space-y-2">
            <span class="text-sm">在线用户</span>
            <span class="text-xl w-[8.5rem]">{{onlineCount}}位</span>
          </div>
        </div>

        <div class="flex bg-white p-4 rounded-lg shadow">
          <div class="mr-4">
            <span
              class="iconify text-6xl p-2 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
              data-icon="ic:outline-article"
            ></span>
          </div>
          <div class="flex flex-col space-y-2">
            <span class="text-sm">文章数量</span>
            <span class="text-xl w-[8.5rem]">{{articleCount}}篇</span>
          </div>
        </div>
        <div class="flex bg-white p-4 rounded-lg shadow">
          <div class="mr-4">
            <span
              class="iconify text-6xl p-2 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
              data-icon="bxs:comment-dots"
            ></span>
          </div>
          <div class="flex flex-col space-y-2">
            <span class="text-sm">评论数量</span>
            <span class="text-xl w-[8.5rem]">{{commentCount}}条</span>
          </div>
        </div>

        <div class="flex bg-white p-4 rounded-lg shadow">
          <div class="mr-4">
            <span
              class="iconify text-6xl p-2 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
              data-icon="bxs:purchase-tag-alt"
            ></span>
          </div>
          <div class="flex flex-col space-y-2">
            <span class="text-sm">标签数量</span>
            <span class="text-xl w-[8.5rem]">{{tagCount}}个</span>
          </div>
        </div>
      </div>
      <div class="h-[400px] flex space-x-4">
        <div class="w-1/3 h-full bg-white pt-2 rounded-lg shadow">
          <ArticleChart></ArticleChart>
        </div>
        <div class="w-1/3 h-full bg-white pt-2 rounded-lg shadow">
          <CommentChart></CommentChart>
        </div>
        <div class="w-1/3 h-full bg-white pt-2 rounded-lg shadow">
          <UserChart></UserChart>
        </div>
      </div>
      <div class="h-[400px] bg-white p-2 rounded-lg shadow">
        <DataChart></DataChart>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import DataChart from "@/components/chart/DataChart.vue";
import ArticleApi from "@/modle/ArticleApi";
import CommentApi from "@/modle/CommentApi";
import TagApi from "@/modle/TagApi";
import UserApi from "@/modle/UserApi";
import { onMounted, ref } from "vue";
import ArticleChart from "../../components/chart/ArticleChart.vue";
import CommentChart from "../../components/chart/CommentChart.vue";
import UserChart from "../../components/chart/UserChart.vue";
const userCount = ref(0);
const loginCount = ref(0);
const onlineCount = ref(0);
const articleCount = ref(0);
const commentCount = ref(0);
const tagCount = ref(0);
onMounted(() => {
  UserApi.getUserCount().then((res: any) => {
    userCount.value = res.data;
  });
  UserApi.getLoginCount().then((res: any) => {
    loginCount.value = res.data;
  });
  UserApi.getOnlineCount().then((res: any) => {
    onlineCount.value = res.data;
  });
  ArticleApi.getArticleCount().then((res: any) => {
    articleCount.value = res.data;
  });
  CommentApi.getCommentCount().then((res: any) => {
    commentCount.value = res.data;
  });
  TagApi.getTagCount().then((res: any) => {
    tagCount.value = res.data;
  });
});
</script>
