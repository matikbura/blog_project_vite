<template>
  <div ref="myChart" class="w-full h-full"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import ArticleApi from "@/modle/ArticleApi";
import CommentApi from "@/modle/CommentApi";
import UserApi from "@/modle/UserApi";
import FeedbackApi from "@/modle/FeedbackApi";
const myChart = ref<any>();
//获取日期
const getDate = (num: number) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const newDate = new Date(year, month - 1, day - num);
  const newYear = newDate.getFullYear();
  const newMonth = newDate.getMonth() + 1;
  const newDay = newDate.getDate();
  return `${newYear}-${newMonth}-${newDay}`;
};

const allData = ref<{
  articleCount?: [];
  commentCount?: [];
  userCount?: [];
  reportCount?: [];
}>({});

const doRender = (param: { name: string; value: [] }) => {
  if (param.name === "articleCount") {
    allData.value.articleCount = param.value;
  }
  if (param.name === "commentCount") {
    allData.value.commentCount = param.value;
  }
  if (param.name === "userCount") {
    allData.value.userCount = param.value;
  }
  if (param.name === "reportCount") {
    allData.value.reportCount = param.value;
  }
  if (
    allData.value.articleCount &&
    allData.value.commentCount &&
    allData.value.userCount &&
    allData.value.reportCount
  ) {
    myChart.value.setOption({
      title: {
        text: "七天内数据变化展示",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["文章数量", "评论数量", "用户数量", "问题反馈数量"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          getDate(6),
          getDate(5),
          getDate(4),
          getDate(3),
          getDate(2),
          getDate(1),
          getDate(0),
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "文章数量",
          type: "line",
          stack: "Total",
          data: allData.value.articleCount,
        },
        {
          name: "评论数量",
          type: "line",
          stack: "Total",
          data: allData.value.commentCount,
        },
        {
          name: "用户数量",
          type: "line",
          stack: "Total",
          data: allData.value.userCount,
        },
        {
          name: "问题反馈数量",
          type: "line",
          stack: "Total",
          data: allData.value.reportCount,
        },
      ],
    });
  }
};

onMounted(() => {
  myChart.value = echarts.init(myChart.value!);
  ArticleApi.findArticleSevenDaysCount().then((res: any) => {
    doRender({ name: "articleCount", value: res.data });
  });

  CommentApi.findCommentSevenDaysCount().then((res: any) => {
    doRender({ name: "commentCount", value: res.data });
  });
  UserApi.findUserSevenDaysCount().then((res: any) => {
    doRender({ name: "userCount", value: res.data });
  });
  FeedbackApi.findFeedbackSevenDaysCount().then((res: any) => {
    doRender({ name: "reportCount", value: res.data });
  });
});
</script>
