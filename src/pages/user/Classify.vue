<template>
  <div class="container-width-1280">
    <div
      class="flex items-center w-full bg-white py-4 rounded-t-3xl px-4 border-b"
    >
      <div v-for="(item, i) in allTab">
        <div
          :class="{ '!text-slate-100 bg-gray-500': isActive === i }"
          class="text-sm text-center cursor-pointer px-2 py-1.5 mx-1 rounded duration-500 text-gray-600"
          v-if="!(item.children && item.children?.length > 0)"
          @click="handleCommandClassify(item), (isActive = i)"
        >
          {{ item.name }}
        </div>
      </div>

      <div v-for="item in allTab">
        <el-dropdown
          trigger="click"
          @command="handleCommand"
          v-if="item.children && item.children?.length > 0"
        >
          <div class="p-2 transition-all duration-500 flex">
            {{ item.name
            }}<span class="iconify" data-icon="ri:arrow-drop-down-line"></span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(classItem, index) in item.children"
                :key="index"
                :command="tag"
                @click="isActive = 4"
              >
                <el-dropdown
                  trigger="click"
                  @command="handleCommand"
                  v-if="classItem.tags && classItem.tags?.length > 0"
                >
                  <div class="p-2 transition-all duration-500 flex">
                    {{ classItem.name
                    }}<span
                      class="iconify"
                      data-icon="ri:arrow-drop-down-line"
                    ></span>
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item
                        v-for="(tag, index) in classItem.children"
                        :key="index"
                        :command="tag"
                        @click="isActive = 4"
                        >{{ tag.name }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <transition-group name="search-list" tag="div">
      <div
        v-for="(article, index) in pages.rows"
        :key="index"
        class="w-[1280px] bg-white border-b flex pl-16 pr-16 pt-2 pb-2 cursor-pointer duration-100 hover:bg-gray-200"
        @click="turnBlog(article)"
      >
        <div class="w-full flex items-center">
          <div class="h-[88px] w-[88px] border-b-2">
            <el-image
              style="height: 100%"
              :src="$host + article.coverUrl"
              fit="cover"
            >
            </el-image>
          </div>
          <div class="p-2 w-full">
            <div class="flex justify-between">
              <span class="text-base">{{ article.title }}</span>
              <span class="text-xs text-gray-500">{{
                article.createTimeStr
              }}</span>
            </div>

            <div class="text-sm text-overflow-2 mt-2">
              {{ article.describes }}
            </div>
            <div class="flex justify-between mt-2">
              <div>
                <el-tag
                  v-for="tag in article.tags"
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
                  <span class="icon-name text-xs" data-v-042ca774="">{{
                    article.viewCount
                  }}</span>
                </span>

                <span class="flex space-x-0.5 items-center">
                  <span
                    class="iconify"
                    data-icon="ant-design:star-outlined"
                  ></span>
                  <span class="text-xs">{{ article.collectCount }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import useCurrentInstance from "@/hook/useCurrentInstance";
import articleApi from "@/modle/ArticleApi";
import { Article, Classify, Pages, Tag } from "@/modle/axios/types";
import tagApi from "@/modle/TagApi";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const { globalProperties } = useCurrentInstance();
const $host = globalProperties.$host;
const $router = useRouter();
let turnBlog = (article: Article) => {
  $router.push({
    path: "Cycle",
    query: {
      articleId: article.articleId,
      uid: article.uid,
    },
  });
};
const allTab = ref<Classify[]>([
  {
    classifyId: -1,
    name: "全部",
    isAtive: false,
  },
  {
    classifyId: -2,
    name: "最近更新",
    isAtive: false,
  },
  {
    classifyId: -3,
    name: "总热门",
    isAtive: false,
  },
]);
const pages = ref<Pages<Article>>({
  page: 0,
  size: 10,
  queryParams: {
    status: 4,
    tag:{}
  },
});
const router = useRoute();
const tagId = router.query.tagId;
onMounted(async () => {
  setTimeout(() => {
    if (tagId) {
      console.log(tagId);
      pages.value.queryParams!.tag!.tagId = parseInt(tagId as string);
    }
    let classify: Classify = {};
    tagApi.findClassifyTagAll().then((res) => {
      res.data.forEach((res: any) => {
        classify = res;
        console.log(res);
        classify.isAtive = false;
        allTab.value.push(classify);
      });
    });
    articleApi.findArticlePage(pages.value).then((res) => {
      pages.value = res.data;
    });

    window.addEventListener("scroll", scrollFunction);
  }, 50);
});
const scrollFunction = () => {
  console.log("滚动------------------------");
  //判断滚动条在底部
  if (
    document.documentElement.scrollTop +
      document.documentElement.clientHeight ==
    document.documentElement.scrollHeight
  ) {
    console.log("滚动到底部了");

    if (pages.value.hasNextPage!) {
      pages.value.page!++;
      articleApi.findArticlePage(pages.value).then((res) => {
        pages.value.page = res.data.page;
        pages.value.rows!.push(...res.data.rows);
      });
    }
  }
};
onUnmounted(() => {
  window.removeEventListener("scroll", scrollFunction);
});
const myInstanceof = (left: any, right: any) => {
  // 基本数据类型直接返回false
  if (typeof left !== "object" || left === null) return false;
  // getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);
  while (true) {
    // 查找到尽头，还没找到
    if (proto == null) return false;
    // 找到相同的原型对象
    if (proto == right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
};

const handleCommand = (command: Tag) => {
  const article: Article = {
    status: 4,
    isReverse: 1,
    tag: {} as Tag,
  };
  pages.value = {
    page: 0,
    size: 10,
    queryParams: article,
  };
  pages.value.queryParams!.tag = command;
  articleApi.findArticlePage(pages.value).then((res) => {
    pages.value = res.data;
  });
};
const isActive = ref(0);
const handleCommandClassify = (command: Classify) => {
  console.log(command);
  const article: Article = {
    status: 4,
    isReverse: 1,
    tag: {} as Tag,
  };
  if (command.name === "总热门") {
    article.sortField = "viewCount";
    article.isReverse = 1;
  } else if (command.name === "最近更新") {
    (article.sortField = "createTime"), (article.isReverse = 1);
  } else if (command.name === "全部") {
  } else {
    article.tag!.classifyId = command.classifyId;
  }
  pages.value = {
    page: 0,
    size: 10,
    queryParams: article,
  };
  console.log(command);
  articleApi.findArticlePage(pages.value).then((res) => {
    pages.value = res.data;
  });
};
</script>

<style scoped>
.search-list-move {
  @apply will-change-auto duration-500;
}
</style>
