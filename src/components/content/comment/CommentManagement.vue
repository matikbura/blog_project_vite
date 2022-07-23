<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="px-6 py-3">
    <el-tab-pane  v-for="(menu,index) in menuList" :key="index" :label="menu.name" :name="menu.component" lazy>
      <component :is="menu.component"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import {ref} from "vue";
import AppArticleList from "@/components/content/article/AllArticle.vue";
import AuditingArticle from "@/components/content/article/AuditingArticle.vue";
import ArticleComment from "@/components/content/article/ArticleComment.vue";
import MyComment from "@/components/content/article/MyComment.vue";
import AuditingComment from "@/components/content/comment/AuditingComment.vue";
import PassComment from "@/components/content/comment/PassComment.vue";
import UnPassComment from "@/components/content/comment/UnPassComment.vue";
export default {
  name: "CommentManagement",
  components: {
    ArticleComment,MyComment
  },
  setup(){
    const menuList = ref([
      {
        name:'审核中',
        component:'AuditingComment',
      },
      {
        name:'审核通过',
        component:'PassComment',
      },
      {
        name:'审核未通过',
        component:'UnPassComment',
      }
    ])
    const activeName = ref('AuditingComment')

    const handleClick = (tab: string, event: Event) => {
      console.log(tab, event)
    }
    return{
      menuList,
      activeName,
      handleClick
    }
  }
}
</script>

<style scoped>

</style>