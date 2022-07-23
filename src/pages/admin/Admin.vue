<template>
<router-view></router-view>
</template>
<script setup lang="ts">
import {onMounted} from "vue";
import {userStore} from "@/store/defineStroe/userStore";
const $user = userStore();
onMounted(() => {
  if($user.user.role!==2){
    $user.resetStudent();
  }
});
</script>