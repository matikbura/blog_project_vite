<!--  -->
<template>
  <div class="p-2 bg-white mb-3">
    <h6 class="p-4 text-md border-b w-96">标签云</h6>
    <div class="p-5 ">
      <div id="wordCloud" class="w-full h-64"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import 'echarts-wordcloud';
import {onMounted, ref} from "vue";
import TagApi from "@/modle/TagApi";
import { useRouter } from 'vue-router';


const echartsData = ref<{
  value: number,
  name: string,
  textStyle: {
    color: string
  }
}[]>([])
const router = useRouter()
const initChart = () => {
  var myChart = echarts.init(document.getElementById('wordCloud'));
  const option = {
    title: {
      text: '',
      x: "center"
    },
    backgroundColor: "#fff",
    // tooltip: {
    //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    // },
    series: [
      {
        type: "wordCloud",
        //用来调整词之间的距离
        gridSize: 10,
        //用来调整字的大小范围
        // Text size range which the value in data will be mapped to.
        // Default to have minimum 12px and maximum 60px size.
        sizeRange: [14, 30],
        // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
        //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
        // rotationRange: [-45, 0, 45, 90],
        // rotationRange: [ 0,90],
        rotationRange: [0, 0],
        //随机生成字体颜色
        // maskImage: maskImage,
        // textStyle: {
        //   color: function () {
        //     return (
        //         "rgb(" +
        //         Math.round(Math.random() * 255) +
        //         ", " +
        //         Math.round(Math.random() * 255) +
        //         ", " +
        //         Math.round(Math.random() * 255) +
        //         ")"
        //     );
        //   }
        // },
        //位置相关设置
        // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
        // Default to be put in the center and has 75% x 80% size.
        left: "center",
        top: "center",
        right: null,
        bottom: null,
        width: "100%",
        height: "100%",
        //数据
        data: echartsData.value
      }
    ]

  };
  myChart.setOption(option);
  // 点击某个字
  myChart.on('click', function (params) {
    router.push({
      path: 'Classify',
      query: {
        tagId: params.data.value as unknown as number
      }
    })
    console.log('myChart----click---:', params, '------', params.data)
  });
}
onMounted(() => {
  TagApi.findAllTag().then(res => {
    console.log('TagApi.findAllTag----:', res)
    res.data.forEach((item:any) => {
      echartsData.value.push({
        value: item.tagId,
        name: item.name,
        textStyle: {
          color: item.tabColor
        }
      })
    })
    initChart()
  })
});




</script>
<style lang='less' scoped>
</style>