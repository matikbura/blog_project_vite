<template>
  <div class="hover:bg-gray-100" @click="turnBlog(props.article)">
    <div class="p-2">
      <h6 class="text-lg py-2 " v-html="heightLightKeyWord(props.article.title,props.keyWord)"></h6>
      <p class="text-sm text-gray-400"  v-html="heightLightKeyWord(props.article.describes,props.keyWord)"></p>
      <div class="flex items-center mt-2">
        <div :class="{'mr-2':article.tags.length>0}" class="space-x-1 ">
          <span v-for="item in article.tags"
                class="rounded text-xs px-2 py-1 text-white"
                :style="`background-color: ${item.tabColor}`"
          >{{ item.name }}</span>
        </div>

        <div class="flex space-x-3 text-xs text-gray-500 items-center">
          <div class="flex items-center">
            <span class="iconify" data-icon="bx:time-five"></span>
            <span class="ml-1">{{ article.createTimeStr }}</span>
          </div>

          <div class="flex items-center">
            <span class="iconify" data-icon="carbon:view"></span>
            <span class="ml-1">{{ article.viewCount }}</span>
          </div>
          <div class="flex items-center">
            <span class="iconify" data-icon="bx:comment-detail"></span>
            <span class="ml-1">{{ article.commentCount }}</span>
          </div>
          <div class="flex items-center">
            <span class="iconify" data-icon="ant-design:star-outlined"></span>
            <span class="ml-1">{{ article.collectCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCurrentInstance from "@/hook/useCurrentInstance";
import {Article} from "@/modle/axios/types";
import {onMounted} from "vue";
import PraiseApi from "@/modle/PraiseApi";
import articleApi from "@/modle/ArticleApi";
import {useRouter} from "vue-router";
const {globalProperties} = useCurrentInstance()
const $host = globalProperties.$host

const $router=useRouter()
let turnBlog = (article:Article) => {
  $router.push({
    path: 'Cycle',
    query:{
      "articleId":article.articleId,
      "uid":article.uid
    }
  })
}
const heightLightKeyWord = (label:string,searchStr:string)=>{
  if(!searchStr){
    return label
  }
  const reg = new RegExp(searchStr,'gi');
  let start = 0;
  let end = 0;
  let newStr = '';
  let arr;
  while((arr = reg.exec(label)) !== null){
    end = arr.index;
    newStr = newStr + label.slice(start,end);
    start = end;
    end = reg.lastIndex;
    newStr = newStr + `<span class="text-pink-500">${label.slice(start,end)}</span>`
    start = end;
  }
  return newStr + label.slice(end)
}
const props = defineProps<{
  article: Article,
  keyWord: string | undefined | null
}>()
</script>