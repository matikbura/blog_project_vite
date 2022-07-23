<template>
  <div class="bg-white dark:bg-gray-800 dark:text-white mb-3 h-[710px]">
    <h6 class="p-4 text-md border-b w-96">热门文章</h6>
    <el-skeleton
        class="w-full"
        :loading="loading"
        animated
        :throttle="500"
    >
      <template #template>
        <div v-for="article in 5"
             class="overflow-hidden p-3 cursor-pointer duration-300  w-full">
          <div class="float-left mr-3">
            <el-skeleton-item variant="image" class="overflow-hidden p-3 cursor-pointer duration-300  w-[100px] h-[100px]" />
          </div>
          <div class="flex flex-col justify-between h-24">
            <el-skeleton-item variant="text" class="w-full text-base truncate" />
            <el-skeleton-item variant="text" class="text-overflow-2 text-sm text-gray-500 my-2" />
            <el-skeleton-item variant="text" class="text-overflow-2 text-sm text-gray-500 my-2" />
          </div>
        </div>
      </template>
      <template #default>
        <div v-for="article in pages.rows" :key="article.articleId"
             class="overflow-hidden p-3 cursor-pointer duration-300 hover:bg-gray-200 border-b border-gray-100" @click="turnBlog(article)">
          <div class="float-left mr-3">
            <el-image
                style="width:100px; height: 100px;"
                :src="$host+article.coverUrl"
                fit="cover"
            >
              <template #error>
                <div class="w-full h-full flex items-center justify-center border text-gray-400 text-4xl">
                  <span class="iconify" data-icon="ion:images"></span>
                </div>
              </template>
            </el-image>
          </div>

          <div class="flex flex-col justify-between h-24">
            <div class="text-base truncate">{{article.title}}</div>
            <div class="text-overflow-2 text-sm text-gray-500 my-2 line-clamp-2" v-if="article.describes">{{article.describes}}</div>
            <div class="text-overflow-2 text-sm text-gray-500 my-2" v-if="!article.describes">无相关介绍</div>
            <div>
              <div class="flex space-x-2">
                <div class="flex justify-center items-center text-xs">
              <span class="flex space-x-0.5 font-extra-small"
                    data-v-042ca774="">
                <span class="iconify" data-icon="carbon:view"></span>
                <span class="icon-name" data-v-042ca774="">{{article.viewCount}}</span>
              </span>
                </div>
                <div class="flex justify-center items-center text-xs">
              <span  class="flex space-x-0.5 font-extra-small items-center"
                     data-v-042ca774="">
                <span class="iconify" data-icon="ant-design:like-filled"></span>
                <span class="icon-name" data-v-042ca774="">{{article.praiseCount}}</span>
              </span>
                </div>
                <div class="flex justify-center items-center text-xs">
              <span class="flex space-x-0.5 font-extra-small"
                    data-v-042ca774="">
                <span class="iconify" data-icon="bxs:dislike"></span>
                <span class="icon-name" data-v-042ca774="">{{article.unPraiseCount}}</span>
              </span>
                </div>
                <div class="flex justify-center items-center text-xs">
              <span class="flex space-x-0.5 font-extra-small"
                    data-v-042ca774="">
                <span class="iconify" data-icon="icon-park-outline:collection-files"></span>
                <span class="icon-name" data-v-042ca774="">{{article.collectCount}}</span>
              </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>




  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {Article, Pages} from "@/modle/axios/types";
import articleApi from "@/modle/ArticleApi";
import {onMounted, reactive, ref} from "vue";
import useCurrentInstance from "@/hook/useCurrentInstance";

let $router = useRouter()
const pages = ref<Pages<Article>>({
  page: 0, size: 5, queryParams: {status: 4,sortField:'viewCount',isReverse:1}
})
const loading = ref(true)
const {globalProperties}= useCurrentInstance()
const $host = globalProperties.$host
let turnBlog = (article:Article) => {
  $router.push({
    path: 'Cycle',
    query:{
      "articleId":article.articleId,
      "uid":article.uid
    }
  })
}
onMounted(() => {
  articleApi.findArticlePage(pages.value).then(res => {
    pages.value=res.data
  }).then(()=>{
    loading.value=false
  })
})
</script>

<style scoped>
</style>