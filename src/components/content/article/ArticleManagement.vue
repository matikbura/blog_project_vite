<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="py-3">
      <el-tab-pane  v-for="(menu,index) in menuList" :key="index" :label="menu.name" :name="menu.component" lazy>
        <component :is="menu.component"></component>
      </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import {ref} from 'vue'
import AppArticleList from '@/components/content/article/AllArticle.vue'
import AuditingArticle from '@/components/content/article/AuditingArticle.vue'
import UnPassedArticle from '@/components/content/article/UnPassedArticle.vue'
import PassArticle from '@/components/content/article/PassArticle.vue'
import ReleaseArticle from '@/components/content/article/ReleaseArticle.vue'
import DraftsArticle from '@/components/content/article/DraftsArticle.vue'
import RecycleArticle from '@/components/content/article/RecycleArticle.vue'

export default {
  name:'ArticleManagement',
  components: {
    AppArticleList,AuditingArticle,UnPassedArticle,PassArticle,DraftsArticle,RecycleArticle,ReleaseArticle
  },
  setup(){
    const menuList = ref([
      {
        name:'全部',
        component:'AppArticleList',
      },
      {
        name:'审核中',
        component:'AuditingArticle',
      },
      {
        name:'审核通过',
        component:'PassArticle',
      },
      {
        name:'审核不通过',
        component:'UnPassedArticle',
      },
      {
        name:'已发布',
        component:'ReleaseArticle',
      },
      {
        name:'草稿箱',
        component:'DraftsArticle',
      },
      {
        name:'回收站',
        component:'RecycleArticle',
      },
    ])



    const activeName = ref('AppArticleList')

    const handleClick = (tab: string, event: Event) => {
      console.log(tab, event)
    }
    return{
      menuList,
      activeName,
      handleClick
    }
  },

}
</script>


<style scoped>
>>> .el-tabs__header{
  @apply px-6;
}
</style>