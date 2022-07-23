<template>
  <div class="p-4">
    <div class="px-4 pt-6 bg-white">
      <el-form :inline="true" :model="null" class="demo-form-inline">
        <el-form-item label="评论内容">
          <el-input
            placeholder="评论内容"
            v-model="page.queryParams!.content"
          />
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
          @click="query"
            class="bg-blue-500 hover:shadow-blue-500/50 text-white rounded hover:shadow-md duration-300 px-4"
          >
            搜索
            
          </button>
        </el-form-item>
        <el-form-item>
          <button
          @click="reset"
            class="-ml-4 bg-slate-500 hover:shadow-slate-500/50 text-white rounded hover:shadow-md duration-300 px-4"
          >
            重置
          </button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bg-white p-2 h-[730px] overflow-hidden">
      <el-table :data="page.rows" style="width: 100%">
        <el-table-column label="评论内容" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.content }}</span>
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
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >审核</el-button
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
</template>

<script lang="ts" setup>
import { Comment, Pages } from "@/modle/axios/types";
import CommentApi from "@/modle/CommentApi";
import { Timer } from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { ref } from "vue";
interface User {
  date: string;
  name: string;
  address: string;
}
const query = ()=>{
  CommentApi.findCommentPage(page.value).then((res) => {
    page.value = res.data;
  });
}
const reset = ()=>{
  page.value.queryParams = { auditUid: 0 };
  query();
}
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const page = ref<Pages<Comment>>({
  size: 10,
  page: 1,
  queryParams: {
    auditUid: 0,
  },
});

onMounted(() => {
  CommentApi.findCommentPage(page.value).then((res) => {
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
  CommentApi.findCommentPage(page.value).then((res) => {
    page.value = res.data;
  });
};
</script>
