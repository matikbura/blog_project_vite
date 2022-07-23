<template>
  <div class="container-width-1280 pb-4 bg-white">
    <div class="bg-white p-4 border-b">我的收藏</div>
    <div>
      <div class="bg-white rounded" @click="turnBlog(item)" v-for="item in pages.rows">
        <CollectItem :collect ="item"> </CollectItem>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CollectItem from "@/components/collect/CollectItem.vue";
import {Article, Collect, Pages} from "@/modle/axios/types";
import CollectApi from "@/modle/CollectApi";
import { onMounted, ref } from "vue";
import {useRouter} from "vue-router";
const pages = ref<Pages<Collect>>({
  page: 1,
  size: 50,
});
onMounted(() => {
  console.log("我的收藏");
  CollectApi.findCollectPage(pages.value).then((res) => {
   pages.value = res.data;
  });
});
const $router = useRouter()
let turnBlog = (article:Collect) => {
  $router.push({
    path: 'Cycle',
    query:{
      "articleId":article.articleId,
      "uid":article.uid
    }
  })
}
</script>
