<template>
  <div class="container-width-1280">
    <div class="flex">
      <div class="flex-1">
        <SlideImg></SlideImg>
        <RecentlyArticles></RecentlyArticles>
      </div>
      <div class="w-96 ml-3">
        <Favorite></Favorite>
        <TagChart></TagChart>
        <RecommendedAuthor></RecommendedAuthor>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SlideImg from '@/components/home/SlideImg.vue'
import Favorite from '@/components/home/Popular.vue'
import MoreArticles from '@/components/home/MoreArticles.vue'
import RecommendedAuthor from '@/components/home/RecommendedAuthor.vue'
import RecentlyArticles from '@/components/home/RecentlyArticles'
import TagChart from '@/components/home/TagChart.vue'

</script>

<style scode>
</style>