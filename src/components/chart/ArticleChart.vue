<template>
  <div ref="Article" class="w-full h-full"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import ArticleApi from "@/modle/ArticleApi";
const Article = ref<any>();
const data = ref([]);
onMounted(() => {
  ArticleApi.findArticleClassify().then((res: any) => {
    data.value = res.data;
    Article.value = echarts.init(Article.value!);
    Article.value.setOption({
      title: {
        text: "文章状态分布",
        left: "center",
      },
      legend: {
        top: "bottom",
      },
      series: [
        {
          name: "数量",
          type: "pie",
          radius: [50, 150],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: data.value,
        },
      ],
    });
    console.log(data.value);
  });
});
</script>
