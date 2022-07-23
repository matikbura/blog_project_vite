<template>
  <div
    id="catalogId"
    class="h-80 w-full overflow-y-auto overscroll-y-contain"
    @scroll.stop
  >
    <el-tree
      :data="props.cataLogs"
      id="elemTreeRef"
      ref="treeRef"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :default-expand-all="true"
      :expand-on-click-node="false"
      :highlight-current="true"
      :check-on-click-node="true"
      node-key="count"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  PropType,
  defineProps,
  ref,
  onMounted,
  onUpdated,
} from "vue";
import { ElTree } from "element-plus";
import useCurrentInstance from "@/hook/useCurrentInstance";

const props = defineProps<{
  current: String;
  cataLogs: TocItem[];
}>();

let count;
const setCurrent = (current: string[]) => {
  const querySelector = document.querySelector("#elemTreeRef")!.querySelectorAll("*");
  let select: any = null;
  document.querySelectorAll(`[data-key]`).forEach(item=>{
    item.classList.remove('is-current')
  })
  document.querySelector(`[data-key=${current[0]}]`)!.classList.add('is-current');
  querySelector.forEach((item: { getAttribute: (arg0: string) => any }) => {
    if (current[0].endsWith(item.getAttribute("data-key"))) {
      select = item;
    }
  });
  if (select) {
    let offset = 0;
    if (select!.offsetTop! > 100) offset = select!.offsetTop! - 100;
    document.querySelector("#catalogId")!.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }

  /*  console.log(document.querySelector(`[data-key=${current[0]}]`));
        document.querySelector(`[data-key=${current[0]}]`)!.scrollIntoView({
          behavior: "smooth",
          block:'nearest'
        })
    document.querySelectorAll(`[data-key]`).forEach(item=>{
      item.classList.remove('is-current')
    })
    document.querySelector(`[data-key=${current[0]}]`)!.classList.add('is-current');*/
};

export interface TocItem {
  text: string;
  level: number;
  count: string;
  children?: Array<TocItem>;
}

const defaultProps = {
  children: "children",
  label: "text",
  count: "count",
};
const handleNodeClick = (data: TocItem) => {
  data.count;
  let gd = document.getElementById(data.count);
  window.scrollTo({ top: gd.offsetTop - 100, behavior: "smooth" });
};

const { globalProperties } = useCurrentInstance();
onMounted(() => {
  globalProperties.$sub("setCurrent", setCurrent);
});

const catalogs = ref<TocItem[]>([]);
</script>
