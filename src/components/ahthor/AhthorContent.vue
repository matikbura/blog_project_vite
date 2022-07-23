<template>
  <div >
    <div class="flex space-x-2 text-sm" v-if="type===6">
      <div class="cursor-pointer" :class="isActiveClass('createTime')" @click="activeFunction('createTime')"><span>按时间排序</span></div>
      <div class="cursor-pointer"  :class="isActiveClass('viewCount')" @click="activeFunction('viewCount')"><span>按访问量排序</span></div>
    </div>
    <div v-if="type!==3&&type!==5&&type!==7" >
      <div v-if="articlePage.rows" class="divide-y divide-solid">
        <ArticleItem v-for="(item,index) in articlePage.rows" :key="index" :article="item" :key-word="props.keyWord"/>
      </div>
      <div v-if="collectPage.rows" class="divide-y divide-solid">
        <ArticleItem v-for="(item,index) in collectPage.rows" :key="index" :article="item.article"/>
      </div>
    </div>
    <div v-else class="divide-y divide-solid">
      <FollowItem v-if="type===3" v-for="(item,index) in followPage.rows" :type="1" :user="item.followUser"></FollowItem>
      <FollowItem v-if="type===5" v-for="(item,index) in followPage.rows" :type="2"  :user="item.user"></FollowItem>
      <FollowItem v-if="type===7" v-for="(item,index) in userPage.rows" :type="2"  :user="item"></FollowItem>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onUpdated, ref, watch} from "vue";
import ArticleApi from "@/modle/ArticleApi";
import {Pages, Article, Collect, Follow, User} from "@/modle/axios/types";
import CollectApi from "@/modle/CollectApi";
import FollowApi from "@/modle/FollowApi";
import FollowItem from "@/components/ahthor/FollowItem.vue";
import ArticleItem from "@/components/ahthor/ArticleItem.vue";
import UserApi from "@/modle/UserApi";

const props = defineProps<{
  type: number,
  keyWord: number|string,
}>()
const articlePage = ref<Pages<Article>>({
  page: 1,
  size: 10,
  queryParams: {}
})
const collectPage = ref<Pages<Collect>>({
  page: 1,
  size: 10,
  queryParams: {}
})
const followPage = ref<Pages<Follow>>({
  page: 1,
  size: 10,
  queryParams: {}
})
const userPage=ref<Pages<User>>({
  page: 1,
  size: 10,
  queryParams: {}
})
const activeFunction = (key: string) => {
  isActive.value = key
  articlePage.value.page = 1
  articlePage.value.queryParams = {title: props.keyWord as string, status: 4, isReverse: 1, sortField: isActive.value}
  ArticleApi.findArticlePage(articlePage.value).then(res => {
    articlePage.value = res.data
  })
}
const isActiveClass=(key:string)=>{
  return key===isActive.value?{'text-gray-500':true,'text-gray-900':false}:{'text-gray-500':false,'text-gray-900':true}
}
const isActive = ref("createTime")
watch(()=>[props.keyWord],() =>{
  console.log("测试传参");
  console.log(props.keyWord);
  console.log(props.type);
  //最近更新文章
  if (props.type == 1) {
    articlePage.value.queryParams = {uid: props.keyWord as number, status: 4, isReverse: 1, sortField: "createTime"}
    ArticleApi.findArticlePage(articlePage.value).then(res => {
      articlePage.value = res.data
    })
  }
  //文章
  if (props.type == 2) {
    articlePage.value.queryParams = {uid: props.keyWord as number, status: 4, isReverse: 1}
    ArticleApi.findArticlePage(articlePage.value).then(res => {
      articlePage.value = res.data
    })
  }
  //关注
  if (props.type == 3) {

    followPage.value.queryParams = {uid: props.keyWord as number}
    FollowApi.findFollowPage(followPage.value).then(res => {
      followPage.value = res.data
    })
  }
  //收藏
  if (props.type == 4) {
    collectPage.value.queryParams = {uid: props.keyWord as number}
    CollectApi.findCollectPage(collectPage.value).then(res => {
      collectPage.value = res.data
    })
  }
  if (props.type == 5) {
    followPage.value.queryParams = {followUid: props.keyWord as number}
    FollowApi.findFollowPage(followPage.value).then(res => {
      followPage.value = res.data
    })
  }
  if(props.type == 6){
    articlePage.value.queryParams = {title: props.keyWord as string, status: 4, isReverse: 1, sortField: isActive.value}
    ArticleApi.findArticlePage(articlePage.value).then(res => {
      articlePage.value = res.data
    })
  }
  if(props.type == 7){
    userPage.value.queryParams = {name: props.keyWord as string,introduce:props.keyWord as string}
    UserApi.findUserByFuzzyPage(userPage.value).then(res => {
      userPage.value = res.data
    })
  }
},{immediate:true})

</script>