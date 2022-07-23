<template>
  <div>
    <div class="flex p-6 cursor-pointer duration-300 hover:bg-gray-200">
      <div class="h-[100px] w-[100px] border-b-2">
        <el-image style="height: 100%" :src="$host+props.collect.article?.coverUrl" fit="cover">
        </el-image>
      </div>
      <div class="p-2 w-full">
        <div class="flex justify-between">
          <span class="text-base">{{props.collect.article?.title}}</span>
          <span class="text-xs text-gray-500">{{props.collect.article?.createTimeStr}}</span>
        </div>

        <div class="text-sm text-overflow-2 mt-2">{{props.collect.article?.describes}}</div>
        <div class="flex justify-between mt-2">
          <div>
            <el-tag
              v-for="tag in props.collect.article?.tags"
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
              <span class="icon-name text-xs" data-v-042ca774="">{{props.collect.article?.viewCount}}</span>
            </span>

            <span class="space-x-0.5 items-center flex items-center">
              <span class="iconify" data-icon="icon-park-outline:like"></span>
              <span class="text-xs">{{collect.article.collectCount}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useCurrentInstance from "@/hook/useCurrentInstance";
import { Collect } from "@/modle/axios/types";

const props = defineProps<{
  collect: Collect;
}>();
const {globalProperties} = useCurrentInstance()
const $host = globalProperties.$host;
</script>
