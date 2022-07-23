<template>
  <el-skeleton
      class="bg-white h-[400px]"
      :loading="loading"
      animated
      :throttle="800"
  >
    <template #template>
      <div class="p-3 bg-white h-[400px] ">
        <el-skeleton-item variant="image" style="width: 100%; height: 377px"/>
      </div>
    </template>
    <template #default>
      <div class="p-3 bg-white dark:bg-gray-800 h-[400px] overflow-hidden">
        <el-carousel indicator-position="inside" ref="carousel" height="377px" class="w-full h-full overflow-hidden relative">
          <el-carousel-item v-for="(item,index) in page.rows" :key="index" @click="turnNotify(item)" class="">
            <div>
              <el-image
                  :src="$host+item.coverUrl"
                  fit="cover"
                  class="w-full h-full"
              ></el-image>
             <p class="absolute top-40 left-60 text-4xl text-white" style="text-shadow:2px 3px 1px black;"> {{item.title}}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </template>
  </el-skeleton>

</template>
<script setup lang="ts">import useCurrentInstance from '@/hook/useCurrentInstance';
import {Notify, Pages} from '@/modle/axios/types';
import NotifyApi from '@/modle/NotifyApi';
import {onBeforeMount, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';

const {globalProperties} = useCurrentInstance()
const $host = globalProperties.$host
const page = ref<Pages<Notify>>({
  page: 0,
  size: 5
})

const loading = ref(true)
const router = useRouter()
const turnNotify = (notify: Notify) => {
  router.push({
    path: 'NotifyVue',
    query: {
      notifyId: notify.notifyId
    }
  })
}

const carousel = ref()
onMounted(() => {
  NotifyApi.findNotifyPage(page.value).then(res => {
    page.value = res.data
  }).then(() => {
    loading.value = false
    carousel.value.setActiveItem(0)
  })
})
</script>
<style scoped>

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>