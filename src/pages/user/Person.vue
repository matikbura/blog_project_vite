<template>
  <div class="flex container-width-1280 space-x-2">

    <div class="w-1/6">
      <Sidebar></Sidebar>
    </div>
    <div class="w-5/6 bg-white">
      <PersonContent></PersonContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/persion/Sidebar.vue";
import PersonContent from "@/components/persion/Person.vue";

</script>

<style scoped>

  .personContentBox{
    padding:0 10px;
  }
</style>