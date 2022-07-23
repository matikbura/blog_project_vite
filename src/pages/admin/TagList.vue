<template>
  <div class="p-4 h-full">
    <div class="px-4 pt-6 bg-white">
      <el-form :inline="true" :model="null" class="demo-form-inline">
        <el-form-item label="标签名称">
          <el-input placeholder="请输入标题" v-model="page.queryParams!.name" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            v-model="page.queryParams!.createTimeRange"
          />
        </el-form-item>
        <el-form-item label="更新时间">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            v-model="page.queryParams!.modifyTimeRange"
          />
        </el-form-item>
        <el-form-item>
          <button
            class="bg-blue-500 hover:shadow-blue-500/50 text-white rounded hover:shadow-md duration-300 px-4"
            @click="query"
          >
            搜索
          </button>
        </el-form-item>
        <el-form-item>
          <button
            class="-ml-4 bg-slate-500 hover:shadow-slate-500/50 text-white rounded hover:shadow-md duration-300 px-4"
            @click="reset"
          >
            重置
          </button>
        </el-form-item>
      </el-form>
    </div>

    <div class="bg-white px-4 h-[730px] overflow-hidden">
      <div class="py-4">
        <button
          @click="addTag"
          class="px-3 py-1 text-sm bg-green-500 text-white rounded duration-300"
        >
          新增标签
        </button>
      </div>

      <el-table :data="page.rows" style="width: 100%">
        <el-table-column label="标签名称" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="标签颜色" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{ scope.row.tabColor }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="预览" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-tag
                :key="scope.row.tagId"
                class="mx-1"
                type="success"
                effect="dark"
                :color="scope.row.tabColor"
              >
                {{ scope.row.name }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{
                scope.row.createTimeStr
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="修改时间" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{
                scope.row.modifyTimeStr
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button
              size="small"
              type="danger"
              class="bg-red-400"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bg-white py-2">
      <div class="demo-pagination-block">
        <el-pagination
          v-model:currentPage="page.page"
          v-model:page-size="page.size"
          layout="prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
  <el-dialog v-model="notifyVisible" :title="editTitle" width="400px">
    <el-form label-width="120px">
      <el-form-item label="标签名称">
        <el-input v-model="tag.name" type="input" />
      </el-form-item>
      <el-form-item label="标签颜色">
        <el-color-picker v-model="tag.tabColor" />
      </el-form-item>
      <el-form-item label="请选择所属分类">
        <el-select v-model="tag.classifyId">
          <el-option v-for="(data,index) in classifyAll" :key="index" :label="data.name" :value="data.classifyId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Classify, Pages, Tag } from "@/modle/axios/types";
import TagApi from "@/modle/TagApi";
import { Timer } from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";
import { onMounted, ref } from "vue";

interface User {
  date: string;
  name: string;
  address: string;
}
const editTitle =ref("");

const tag = ref<Tag>({
  name: "",
  tabColor: "",
});

const notifyVisible = ref(false)

const query = () => {
  TagApi.findTagPage(page.value).then((res) => {
    page.value = res.data;
  });
};
const reset = () => {
  page.value = {
    page: 1,
    size: 10,
    queryParams: {},
  };
  query();
};
const addTag = () => {
  tag.value = {
    name: "",
    tabColor: "",
  };
  editTitle.value = "新增标签";
  notifyVisible.value = true;
};
const handleEdit = (row: Tag) => {
  tag.value = row;
  editTitle.value = "修改标签";
  notifyVisible.value = true;
};
const handleDelete = ( row: Tag) => {
  ElMessageBox.confirm("确定删除吗？","警告",{
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(()=>{
    TagApi.deleteTag(row).then(()=>{
      ElMessage.success("删除成功");
      query();
    })
  })
};
const onSubmit = () => {
  if(!tag.value.name||tag.value.name!.length === 0) {
    ElMessage.error("标签名称不能为空");
    return;
  }
  if(!tag.value.tabColor||tag.value.tabColor!.length === 0) {
    ElMessage.error("标签颜色不能为空");
    return
  }
  if(editTitle.value === "新增标签") {
    TagApi.addTag(tag.value).then(() => {
      notifyVisible.value = false;
      ElMessage.success("新增成功");
      reset();
    });
  } else {
    TagApi.updateTag(tag.value).then(() => {
      notifyVisible.value = false;
      ElMessage.success("修改成功");
      reset();
    });
  }
};

const page = ref<Pages<Tag>>({
  page: 1,
  size: 10,
  queryParams: {},
});
const classifyAll = ref<Classify>({});
onMounted(() => {
  TagApi.findTagPage(page.value).then((res) => {
    page.value = res.data;
  });
  TagApi.findAllClassify().then((res) => {
    classifyAll.value = res.data;
  });
});

//分页
const currentPage3 = ref(5);
const pageSize3 = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>
