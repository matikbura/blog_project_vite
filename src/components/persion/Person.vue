<template>
  <div class="mainClass">
    <div v-if="editableTabs.length!==0" class="bg-white">
      <el-tabs
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-remove="removeTab"
      >
        <el-tab-pane
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            lazy
        >
            <component :is="item.content" :data-name="item.content"></component>
        </el-tab-pane>

      </el-tabs>
    </div>

  </div>


</template>
<script>
import { ref ,onMounted,getCurrentInstance } from 'vue'
import MessageContent from './Message'
import ChangePassword from "./ChangePassword"
import MyPhoto from "./MyPhoto";


export default {
  name:'PersonContent',
  components:{
    MessageContent,
    ChangePassword,
    MyPhoto
  },
  setup(props){
    let tabIndex = 2
    const editableTabsValue = ref('个人信息')
    const activeName = "message-content"
    const {proxy} = getCurrentInstance()
    const editableTabs = ref([
      {
        name:'个人信息',
        title:'个人信息',
        content:'MessageContent'

      }
    ])
    const addTab = (target) => {
      let flag = '-999'
      const tabs = editableTabs.value
      tabs.forEach((tab, index) => {
        if (tab.title === target[0]) {
          flag=tab.name
          return
        }
      })
      if(flag==='-999'){
        const newTabName = `${++tabIndex}`
        editableTabs.value.push({
          title: target[0],
          name: newTabName,
          content: target[1],
        })
        editableTabsValue.value = newTabName
      }else{
        editableTabsValue.value = flag
      }

    }
    onMounted(()=>{
      proxy.$sub('addTableTab',addTab)

    })
    const removeTab = (targetName) => {
      console.log(targetName)
      const tabs = editableTabs.value
      let activeName = editableTabsValue.value
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {

            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      editableTabsValue.value = activeName
      editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    }
    return{
      editableTabs,
      removeTab,
      activeName,
      editableTabsValue
    }
  }
}
</script>


<style scoped>
</style>