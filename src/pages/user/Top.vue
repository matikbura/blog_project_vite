<template>
  <el-header class="w-full p-0 z-50 top-0 dark:bg-black sticky">
    <div class="bg-white shadow-md">
      <div class="container-width-1280">
        <div class="flex items-center justify-between">
          <el-menu
              :default-active="activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              :router="true"
              :ellipsis="false"
          >
            <el-menu-item index="Home">首页</el-menu-item>
            <el-menu-item index="Classify">分类</el-menu-item>
            <el-menu-item index="CallManagement">联系管理员</el-menu-item>
          </el-menu>
          <el-input
              class="w-96"
              v-model="searchText"
              placeholder="搜索全站文章或作者"
              :prefix-icon="Search"
              size="large"
              @keyup.enter.native="search"
          />

          <div v-show="userStore1.user.token !== ''">
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                :router="true"
                :ellipsis="false"
            >
              <el-sub-menu index="myMenu">
                <template #title>
                  <el-avatar
                      :size="30"
                      :src="$host + userStore1.user.imgUrl"
                  ></el-avatar>
                  <span style="margin-left: 10px">{{
                      userStore1.user.name
                    }}</span></template
                >
                <el-menu-item index="Person">个人中心</el-menu-item>
                <el-menu-item index="EditBlog">创作文章</el-menu-item>
                <el-menu-item index="ContentManagement">内容管理</el-menu-item>
                <el-menu-item index="Collect">我的收藏</el-menu-item>
                <el-menu-item index="Follow">我的关注</el-menu-item>
                <el-menu-item index="Login"
                ><a
                    href="javascript:void(0)"
                    @click="goLogout"
                    class="changeClass"
                >切换账号</a
                ></el-menu-item
                >
              </el-sub-menu>

              <el-menu-item index="Chatting">
                <div>
                  <el-badge
                      :value="$chat.chattingMessage.unreadMessageCountAll"
                      class="item"
                      v-if="$chat.chattingMessage.unreadMessageCountAll !== 0"
                  >
                    <span>聊天室</span>
                  </el-badge>
                  <span v-if="$chat.chattingMessage.unreadMessageCountAll === 0"
                  >聊天室</span
                  >
                </div>
              </el-menu-item>
            </el-menu>
          </div>

          <div v-show="userStore1.user.token === ''" class="flex-shrink-0">
            <a
                href="javascript:void(0)"
                @click="goLogin()"
                class="text-red-500 block text-xs"
            >您还未登录，点击登录</a
            >
          </div>
        </div>
      </div>
    </div>
  </el-header>
  <div class="mt-3 h-full">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";
import {onMounted, ref, reactive} from "vue";
import {createRouter} from "vue-router";
import UserApi from "@/modle/UserApi";
import {useRouter} from "vue-router";
import {userStore} from "@/store/defineStroe/userStore";
import {reset} from "@/socket";
import {chatStore} from "@/store/defineStroe/chatStore";
import useCurrentInstance from "@/hook/useCurrentInstance";

const userStore1 = userStore();
const useRouter1 = useRouter();
const isLogin = ref(false);
const {globalProperties} = useCurrentInstance();
const activeIndex2 = ref("Home");
const handleSelect = function (key, keypath) {
  console.log(keypath + "===============" + key);
};
const $user = userStore();
onMounted(() => {
  if ($user.user.role !== 1) {
    $user.resetStudent();
  }
})
const searchText = ref("");
const router = useRouter()
const search = function () {
  console.log("搜索")
  router.push({
    path: "Query",
    query: {
      searchText: searchText.value
    }
  }).then(() => {
    location.reload()
  })
}
const cover = "";
const install = function () {
};
const $host = globalProperties.$host;
const $chat = chatStore();

const toggleTheme = () => {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
};

const goLogin = () => {
  router.push({
    path: "Login",
  });
};
const goLogout = () => {
  UserApi.logout().then((res) => {
    console.log("服务端推出登录");
    userStore1.resetStudent();
    isLogin.value = false;
    reset();
  });
};


console.log(useRouter1.currentRoute.value.path);


</script>
<style scoped>
>>> .container-width-1280 {
  width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

>>> .el-menu {
  border: none !important;
}

>>> .el-badge__content.is-fixed {
  @apply top-3;
}

>>> .el-avatar--circle {
  @apply border;
}

>>> .el-notification__group {
  @apply w-full;
}

>>> .el-notification__content {
  @apply w-full;
}

>>> .el-button--primary {
  @apply bg-blue-500 duration-300 hover:bg-blue-600;
}
</style>
