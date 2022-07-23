<template>
  <div class="container-width-1280 bg-white">
   <div class="p-2">
     <div>
       <el-tabs v-model="activeName" class="px-3">
         <el-tab-pane
             v-for="(menu, index) in menuList"
             :key="index"
             :label="menu.name"
             :name="menu.type"
             lazy
         >
           <AhthorContent :type="menu.type" :key-word="searchText"></AhthorContent>
         </el-tab-pane>
       </el-tabs>
     </div>
   </div>
  </div>
</template>
<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import AhthorContent from "@/components/ahthor/AhthorContent.vue";
const $router = useRoute();
const searchText = $router.query.searchText as string;
const menuList = ref([
  {
    name: "文章",
    type: 6,
  },
  {
    name: "用户",
    type: 7,
  },

]);
const activeName =ref(menuList.value[0].type);
</script>