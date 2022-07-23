<template>
 <div v-loading="isLoad" >
   <div class="divide-y divide-gray-200  px-3 overflow-y-auto"   style="height: 800px" v-infinite-scroll="test">
     <div v-for="(item) in data.rows " :key="item.articleId" class=" flex p-4 cursor-pointer duration-300 hover:bg-gray-100 group">
       <div class="w-full">
         <div class="flex justify-between w-full">
           <div>
             <span class="text-base hover:text-indigo-500 duration-300">{{item.title}}</span>
           </div>
           <div class="flex space-x-6">
             <div  class="text-gray-500">
               <el-tooltip content="预览" placement="top" effect="light">
                 <button  class="group-hover:opacity-100 duration-300 opacity-0 text-lg rounded-full p-1 hover:bg-red-500 hover:text-white" @click="preview(item)">
                   <span class="iconify" data-icon="ic:round-preview"></span>
                 </button>
               </el-tooltip>
             </div>
           </div>
         </div>
         <div class="text-xs mt-2 mb-2">
           {{item.describes}}
         </div>

         <div class="flex justify-between">
           <div class="flex space-x-2 text-xs">

             <el-tag
                 v-for="tag in item.tags"
                 :key="tag.tagId"
                 class="mx-1"
                 type="success"
                 effect="dark"
                 :color="tag.tabColor"
             >
               {{tag.name}}
             </el-tag>

           </div>

           <div class="text-xs text-gray-400">
             <div class="flex items-center">
               <span class="iconify" data-icon="ic:baseline-access-time"></span>
               <span class="ml-1">{{item.createTimeStr}}</span></div>
           </div>
         </div>
         <div class="bg-red-200 text-sm mt-2 p-2">
           {{item.auditMessage}}
         </div>
       </div>

     </div>
     <div class="text-center" v-if="!data.hasNextPage"><span>已经到底啦~~</span></div>


     <el-dialog v-model="dialogTableVisible" title="文章预览" width="1050px" top="2vh">
       <ShowArticle :article="previewData.article" :is-show-list="previewData.isShowList"></ShowArticle>
     </el-dialog>
   </div>
 </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {Article, Pages} from "@/modle/axios/types";
import articleApi from "@/modle/ArticleApi";
import ShowArticle from "@/components/article/show/ShowArticle.vue";
import {userStore} from "@/store/defineStroe/userStore";
const number = ref(10)
const isLoad = ref(false)

const dialogTableVisible = ref(false)
const previewData = ref({
  article:{} as Article,
  isShowList:false
})
const preview = (article:Article)=>{
  previewData.value.article = article
  dialogTableVisible.value=true
}

const test = ()=>{
  if(data.value.hasNextPage&&!isLoad.value){
    data.value.page=data.value.page+1
    isLoad.value=true
    articleApi.findArticlePage(data.value).then(res=>{
      data.value.hasNextPage=res.data.hasNextPage
      res.data.rows.forEach(item=>{
        data.value.rows.push(item)
      })
      isLoad.value=false
    })
  }
}
const $user= userStore()
//定义分页
const data = ref<Pages<Article>>({
  page: 1,queryParams: {uid:$user.user.uid,status:3} as Article,rows: [],  size: 10,
})
onMounted(()=>{
  //初始化 获取所有 文章属于自己的
  isLoad.value=true
  articleApi.findArticlePage(data.value).then(res=>{
    console.log(res);
    data.value=res.data
    isLoad.value=false
  })
})
</script>

<style scoped>

</style>