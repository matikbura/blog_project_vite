<template>
  <div class="bg-white mt-2">
    <h6 class="p-4 text-md border-b">最近更新</h6>

    <el-skeleton
        :loading="loading"
        animated
        :throttle="500"
    >
      <template #template>
        <div v-for="i in 5" class="w-[900px] flex p-4 cursor-pointer duration-300 hover:bg-gray-200">
          <el-skeleton-item variant="image" class="w-[100px] h-[100px] flex p-4 cursor-pointer duration-300 hover:bg-gray-200" />
          <div class="p-2 w-full">
            <div class="flex justify-between">
              <el-skeleton-item variant="text" class="text-base" />
              <el-skeleton-item variant="text" class="text-xs text-gray-500" />
            </div>
            <el-skeleton-item variant="text" class="text-sm text-overflow-2 mt-2" />
            <div class="flex justify-between mt-2">
              <div>
                <el-skeleton-item variant="text" v-for="i in 3" class="w-20 h-3" />
              </div>
              <div class="flex space-x-5">
                <el-skeleton-item variant="text" class="w-20 h-3" />
                <el-skeleton-item variant="text" class="w-20 h-3" />
                <el-skeleton-item variant="text" class="w-20 h-3" />
              </div>
            </div>
          </div>
        </div>

      </template>
      <template #default>
        <div
            v-for="article in pages.rows"
            :key="article.articleId"
            class="w-[900px] flex p-4 cursor-pointer duration-300 hover:bg-gray-200 border-b border-gray-100"
            @click="turnBlog(article)"
        >
          <div class="h-[100px] w-[100px] border-b-2">
            <el-image
                style="height: 100%"
                :src="$host + article.coverUrl"
                fit="cover"
            >
            </el-image>
          </div>
          <div class="p-2 w-full">
            <div class="flex justify-between">
              <span class="text-base">{{ article.title }}</span>
              <span class="text-xs text-gray-500">{{ article.createTimeStr }}</span>
            </div>

            <div class="text-sm text-overflow-2 mt-2">
              {{ article.describes }}
            </div>
            <div class="flex justify-between mt-2">
              <div>
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
              <div class="flex space-x-5">
            <span
                style="display: flex; align-items: center"
                class="demo-svg-icon font-extra-small"
                data-v-042ca774=""
            >
              <i
                  class="el-icon"
                  data-v-042ca774=""
                  style="font-size: 20px; --color: undefined"
              >
                <svg
                    class="icon text-sm"
                    width="200"
                    height="200"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    data-v-042ca774=""
                >
                  <path
                      fill="currentColor"
                      d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 110 448 224 224 0 010-448zm0 64a160.192 160.192 0 00-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"
                  ></path>
                </svg>
              </i>
              <span class="icon-name text-xs" data-v-042ca774="">{{article.viewCount}}</span>
            </span>

                <span class="space-x-0.5 flex items-center">
              <span
                  class="iconify"
                  data-icon="ant-design:comment-outlined"
              ></span>
              <span class="text-xs">{{article.commentCount}}</span>
            </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import articleApi from "@/modle/ArticleApi";
import { Article, Pages } from "@/modle/axios/types";
import useCurrentInstance from "@/hook/useCurrentInstance";
import { useRouter } from "vue-router";
const { globalProperties } = useCurrentInstance();
let $router = useRouter()
const $host = globalProperties.$host;
const loading = ref(true);
const pages = ref<Pages<Article>>({
  page: 0,
  size: 10,
  queryParams: { status: 4, isReverse: 1, sortField: "createTime" },
});
onMounted(() => {
  articleApi.findArticlePage(pages.value).then((res) => {
    console.log("最近更新");
    console.log(res.data);
    pages.value = res.data;
  }).then(() => {
    loading.value = false;
  });
});
let turnBlog = (article:Article) => {
  $router.push({
    path: 'Cycle',
    query:{
      "articleId":article.articleId,
      "uid":article.uid
    }
  })
}
</script>

<style scoped></style>
