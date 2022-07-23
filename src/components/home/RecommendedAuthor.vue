<template>
  <div class=" bg-white w-full">
    <h6 class="p-4 text-md border-b">推荐作者</h6>
    <el-skeleton
        class="w-full"
        :loading="loading"
        animated
        :throttle="500"
    >
      <template #template>

        <div v-for="user in 5"  class="w-full p-2 flex space-x-2 items-center" >
          <div class="imgBox">
            <el-skeleton-item variant="image" class="w-12 h-12 rounded-full"/>
          </div>
          <div class="flex flex-col space-y-2 w-full">
            <el-skeleton-item variant="text" class="w-40"/>
            <el-skeleton-item class="w-full h-6 content line-clamp-1 text-gray-400 text-sm" variant="text"/>
          </div>
        </div>

      </template>
      <template #default>

        <div v-for="user in userPage.rows" :key="user.uid" class="w-full p-2 flex space-x-2 items-center duration-300 hover:bg-gray-200" @click="trunAuthorPage(user)">
          <div class="imgBox">
            <el-avatar :size="50" :src="$host+user.imgUrl"></el-avatar>
          </div>
          <div class="flex flex-col space-y-2">
            <div>
              {{user.name}}
            </div>
            <div class="content line-clamp-1 text-gray-400 text-sm" v-if="user.introduce">
              {{user.introduce}}
            </div>
            <div class="content line-clamp-1 text-gray-400 text-sm" v-if="!user.introduce">
              【无介绍】
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>

</template>

<script setup lang="ts">import useCurrentInstance from '@/hook/useCurrentInstance';
import { Pages, User } from '@/modle/axios/types';
import userApi from '@/modle/UserApi';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const {globalProperties} = useCurrentInstance();
const $host = globalProperties.$host
const userPage = ref<Pages<User>>({page:0,size:5,queryParams:{}})
let $router = useRouter()
const loading = ref(true)
onMounted(()=>{
  userApi.findUserPage(userPage.value).then(res=>{
    userPage.value=res.data
  }).then(()=>{
    loading.value=false
  })
})
const trunAuthorPage = (user:User) =>[
  $router.push({
    path: 'Ahthor',
    query:{
      "uid":user.uid
    }
  })
]
</script>

<style scoped></style>