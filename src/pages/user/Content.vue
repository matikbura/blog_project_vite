<template>
  <div class="flex container-width-1280 space-x-2">
      <div class="w-56  bg-white">
        <Sidebar></Sidebar>
      </div>
      <div class="bg-white w-full">
        <PersonContent></PersonContent>
      </div>
  </div>
</template>

<script>
import Sidebar from "@/components/content/Sidebar";
import PersonContent from "@/components/content/Content";

export default {
  name: "Content",
  components: {
    Sidebar,
    PersonContent
  }
}
</script>

<style scoped>
.tab-content-wrap {
  background-color: #fff;
  padding: 10px;
}
</style>