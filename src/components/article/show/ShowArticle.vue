<template>
  <div class="bg-white p-5">
    <div>
      <h2 class="text-3xl font-bold text-gray-700 pb-4">{{ article.title }}</h2>
      <div class="flex space-x-6">
        <div class="flex justify-center items-center">
          <div class="p-1.5 text-white rounded-full bg-gray-400">
            <span class="iconify" data-icon="bx:calendar"></span>
          </div>
          <span
            class="py-0.5 px-2 rounded text-white bg-gray-400 rounded ml-2"
            >{{ article.createTimeStr }}</span
          >
        </div>
        <div class="flex justify-center items-center">
          <div class="p-1.5 text-white rounded-full bg-gray-400">
            <span class="iconify" data-icon="akar-icons:tag"></span>
          </div>
          <div class="flex space-x-2 ml-2 text-sm">
            <el-tag
              v-for="tag in article.tags"
              :key="tag.tagId"
              class="mx-1"
              type="success"
              effect="dark"
              :color="tag.tabColor"
            >
              {{ tag.name }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
    <md-editor
      v-model="props.article.content"
      previewOnly
      theme="github"
      :marked-heading="markedHeading"
      @onGetCatalog="onGetCatalog"
    />
  </div>
</template>
<script setup lang="ts">
import {
  onMounted,
  defineProps,
  ref,
  onUpdated,
  onBeforeMount,
  onUnmounted,
  onBeforeUpdate,
  getCurrentInstance,
} from "vue";
import MdEditor from "md-editor-v3";
// 代码高亮
// 自选代码高亮样式
import useCurrentInstance from "@/hook/useCurrentInstance";
import { Article } from "@/modle/axios/types";
import { TocItem } from "@/components/article/show/catalog/Catalog.vue";
const props = defineProps<{
  article: Article;
  minHeight: Number;
}>();

let count = ref(0);
const message:{
  level:number,
  raw:string,
  count:number,
}[]=[];
const markedHeading = (text: string, level: any, raw: any) => {
  // 你不能直接调用默认的markedHeadingId，但是它很简单
  // 如果你的id与raw不相同，请一定记得将你的生成方法通过markedHeadingId告诉编辑器
  // 否则编辑器默认的目录定位功能无法正确使用
  const id = raw;
  console.log(raw);
  let temp = message.filter((item) => {
    if(item.raw===raw as string&&level===item.level){
      return true;
    }
  });

  if (/<a.*>.*<\/a>/.test(text)) {
    if(temp.length===0){
      message.push({
        level,
        raw,
        count:count.value++,
      });
    }else{
      count.value=temp[0].count;
    }
    return `<h${level} id="head-${count.value}">${text.replace(
      /(?<=\<a.*)>(?=.*<\/a>)/,
      ' target="_blank">'
    )}</h${level}>`;
  } else if (text !== raw) {
    if(temp.length===0){
      message.push({
        level,
        raw,
        count:count.value++,
      });
    }else{
      count.value=temp[0].count;
    }
    return `<h${level} id="head-${count.value}">${text}</h${level}>`;
  } else {
    if(temp.length===0){
      message.push({
        level,
        raw,
        count:count.value++,
      });
    }else{
      count.value=temp[0].count;
    }
    return `<h${level} id="head-${count.value}"><a href="#${id}">${raw}</a></h${level}>`;
  }
};

const titles = ref([]);


const { globalProperties } = useCurrentInstance();
const onGetCatalog = (list: any) => {
  globalProperties.$pub("catalog", list);
};
</script>

<style></style>
