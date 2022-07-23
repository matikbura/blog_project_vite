<template>
  <div ref="Comment" class="w-full h-full"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import CommentApi from "@/modle/CommentApi";
const Comment = ref<any>();
onMounted(() => {
  Comment.value = echarts.init(Comment.value!);
  CommentApi.findCommentClassify().then((res: any) => {
    Comment.value.setOption({
      title: {
        text: "评论状态分布",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "数量",
          type: "pie",
          radius: "50%",
          data: res.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  });
});
</script>
