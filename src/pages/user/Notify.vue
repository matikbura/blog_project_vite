<template>
  <div class="container-width-1280 pb-4  overflow-y-auto bg-white">
    <div class="p-2 w-full border-b text-sm">
      <span class=" ">通知详情</span>
    </div>
    <div class="p-4 h-[800px] flex flex-col justify-between">
      <div class="text-3xl font-bold text-gray-600 flex-none">{{ notify.title }}</div>
      <div class="flex justify-between py-6 border-b flex-none">
        <div class="text-sm flex space-x-2">
          <span class="text-gray-600">{{ notify.admin?.name }}</span>
          <span class="text-gray-400">{{ notify.createTimeStr }}</span>
        </div>
        <div class="text-gray-400 text-sm space-x-2">
          <span>{{ notify.viewCount }}次阅读</span>
          <span>{{ notify.likeCount }}次点赞</span>
        </div>
      </div>
      <div class="py-5 text-base leading-8  text-gray-600  flex-auto" v-html="notify.content ">
      </div>
      <div class="py-10 flex justify-center">
        <button
          class="text-blue-500 text-3xl p-2 rounded-lg hover:shadow-lg duration-300 hover:text-rose-600"
          @click="likeNotify"
        >
          <span class="iconify" data-icon="ant-design:like-filled"></span>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Notify } from "@/modle/axios/types";
import NotifyApi from "@/modle/NotifyApi";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
//获取路由中的参数
const $router = useRoute();
const notifyId = $router.query.notifyId;
const notify = ref<Notify>({});
onMounted(() => {
  NotifyApi.findNotifyByNotifyId({
    notifyId: notifyId as unknown as number,
  }).then((res: any) => {
    res.data.content = res.data.content!.replace(/\n/g, "<br>");
    res.data.content = res.data.content!.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    notify.value = res.data;
    console.log("");
  });
});
const likeNotify = () => {
  NotifyApi.updateNotify({
    notifyId: notifyId as unknown as number,
    likeCount: notify.value.likeCount! + 1,
  }).then((res: any) => {
    console.log(res);
    ElMessage.success("点赞成功");
    notify.value.likeCount!++;
  });
};
</script>
