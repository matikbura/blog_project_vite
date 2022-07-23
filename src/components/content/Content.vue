<template>
    <component :is="content" :data-name="content"></component>
</template>
<script>
import {ref, onMounted, getCurrentInstance} from 'vue'
import ArticleManagement from './article/ArticleManagement'
import CommentManagement from "./comment/CommentManagement";

export default {
  name: 'Content',
  components: {
    ArticleManagement,
    CommentManagement
  },
  setup(props) {

    const editableTabsValue = ref('1')
    const activeName = "message-content"
    const {proxy} = getCurrentInstance()
    const editableTabs = ref([])
    const content = ref('ArticleManagement');
    const addTab = (target) => {
      console.log(target.component);
      content.value = target[0];
    }
    onMounted(() => {
      proxy.$sub('addTableTab', addTab)
    })

    return {
      content,
      editableTabs,
      activeName,
      editableTabsValue
    }
  }
}
</script>

<style>

</style>