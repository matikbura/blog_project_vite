<template>
  <div ref="User" class="w-full h-full"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import UserApi from "@/modle/UserApi";
const User = ref<any>();
onMounted(() => {
  User.value = echarts.init(User.value!);
  UserApi.findUserClassify().then((res: any) => {
    User.value.setOption({
      title: {
        text: "用户状态分布",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "10%",
        left: "center",
      },
      series: [
        {
          name: "数量",
          type: "pie",
          radius: ["30%", "60%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: res.data,
        },
      ],
    });
  });
});
</script>
