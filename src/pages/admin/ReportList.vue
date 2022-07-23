<template>
  <div class="p-4">
    <div class="px-4 pt-6 bg-white">
      <el-form :inline="true" :model="null" class="demo-form-inline">
        <el-form-item label="类型">
          <el-select
            placeholder="请选择类型"
            v-model="page.queryParams!.feedbackType"
          >
            <el-option label="bug" value="bug" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否已读">
          <el-select
            placeholder="请选择"
            v-model="page.queryParams!.status"
          >
            <el-option label="是" value="1" select/>
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="page.queryParams!.createTimeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
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
    <div class="bg-white p-2 h-[730px] overflow-hidden">
      <el-table :data="page.rows" style="width: 100%">
        <el-table-column label="类型" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{
                scope.row.feedbackType
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.contact }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.descript }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="期待改善" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.plan }}</span>
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
        <el-table-column label="是否已读" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px" v-if="scope.row.status===0">
                未读
              </span>
              <span style="margin-left: 10px" v-if="scope.row.status===1">
                已读
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="read(scope.row)">阅读</el-button>
            <el-button size="small" @click="handleDelete(scope.row)"
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
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>

  <el-dialog v-model="readVisible" title="反馈信息" width="600px">
    <el-descriptions :column="3" border>
      <el-descriptions-item label="类型" label-align="right" align="center"
        >{{feadback.feedbackType}}</el-descriptions-item
      >
      <el-descriptions-item label="联系方式" label-align="right" align="center"
        >{{feadback.contact}}</el-descriptions-item
      >
      <el-descriptions-item label="创建时间" label-align="right" align="center"
        >{{feadback.createTimeStr}}</el-descriptions-item
      >
      <el-descriptions-item label="问题描述" :span="3" label-align="right" align="center"
        >{{feadback.descript}}</el-descriptions-item
      >
      <el-descriptions-item label="期待改善的方案" :span="3" label-align="right" align="center"
        >{{feadback.plan}}</el-descriptions-item
      >
    </el-descriptions>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Comment, Feedback, Pages } from "@/modle/axios/types";
import CommentApi from "@/modle/CommentApi";
import FeedbackApi from "@/modle/FeedbackApi";
import { Timer } from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { ref } from "vue";
const readVisible = ref(false);
const feadback = ref<Feedback>({});
const read = (row: Feedback) => {
  //标识为已读
  row.status = 1;
  readVisible.value = true;
  feadback.value = row;
  FeedbackApi.updateFeedback(row).then((res) => {});
};
const handleDelete = (row: Feedback) => {
  console.log(row);
};

const page = ref<Pages<Feedback>>({
  size: 10,
  page: 1,
  queryParams: {},
});
const query = () => {
  FeedbackApi.findFeedbackByPage(page.value).then((res) => {
    page.value = res.data;
  });
};
const reset = () => {
  page.value = {
    size: 10,
    page: 1,
    queryParams: {},
  };
  query();
};
onMounted(() => {
  FeedbackApi.findFeedbackByPage(page.value).then((res) => {
    page.value = res.data;
  });
});

//分页
const currentPage3 = ref(5);
const pageSize3 = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const handleCurrentChange = (val: number) => {
  page.value.page = val;
  FeedbackApi.findFeedbackByPage(page.value).then((res) => {
    page.value = res.data;
  });
};
</script>
