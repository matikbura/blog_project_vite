<template>
  <div class="container-width-1280">
    <div class="w-full flex space-x-2">
      <div class="w-72 flex-none">
        <AuthorInfo :user="user"></AuthorInfo>
      </div>
      <div class="w-full bg-white">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="px-3">
          <el-tab-pane
            v-for="(menu, index) in menuList"
            :key="index"
            :label="menu.name"
            :name="menu.type"
            lazy
          >
            <AhthorContent :type="menu.type" :key-word="uid"></AhthorContent>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import AuthorInfo from "@/components/article/show/AuthorInfo.vue";
import { onMounted, ref } from "vue";
import UserApi from "@/modle/UserApi";
import { User } from "@/modle/axios/types";
import AhthorContent from "@/components/ahthor/AhthorContent.vue";

export default {
  name: "ArticleManagement",
  components: {
    AhthorContent,
    AuthorInfo
  },
  setup() {
    const router = useRoute();
    const uid = ref<number>(router.query.uid as unknown as number);
    const user = ref<User>({});
    onMounted(() => {
      UserApi.findUser({ uid: uid.value }).then((res) => {
        user.value = res.data[0];
      });
    });
    const menuList = ref([
      {
        name: "最近",
        type: 1,
      },
      {
        name: "文章",
        type: 2,
      },
      {
        name: "收藏",
        type: 4,
      },
      {
        name: "关注",
        type: 3,
      },
      {
        name: "粉丝",
        type: 5,
      },
      
    ]);

    const activeName = ref(1);

    const handleClick = (tab: string, event: Event) => {
      console.log(tab, event);
    };
    return {
      menuList,
      activeName,
      handleClick,
      uid,
      user
    };
  },
};
</script>
