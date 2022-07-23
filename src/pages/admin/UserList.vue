<template>
  <div class="p-4">
    <div class="px-4 pt-6 bg-white">
      <el-form :inline="true" :model="null" class="demo-form-inline">
        <el-form-item label="账号">
          <el-input placeholder="账号" v-model="page.queryParams!.username"/>
        </el-form-item>
        <el-form-item label="名称">
          <el-input placeholder="名称" v-model="page.queryParams!.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select placeholder="请选择性别"  v-model="page.queryParams!.sex">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
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
        <el-form-item label="更新时间">
          <el-date-picker
          v-model="page.queryParams!.modifyTimeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item label="最后登录时间">
          <el-date-picker
          v-model="page.queryParams!.lastLoginTimeRange"
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
    <div class="bg-white p-2 h-[680px] overflow-hidden">
      <el-table :data="page.rows" style="width: 100%">
        <el-table-column label="账号" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.username }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="名称" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
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
        <el-table-column label="更新时间" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{
                scope.row.modifyTimeStr
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="最后登录时间" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{
                scope.row.lastLoginTimeStr
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="性别" width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.sex }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-avatar
                shape="square"
                size="default"
                :src="$host + scope.row.imgUrl"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="个人简介" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span class="line-clamp-2" style="margin-left: 10px">{{
                scope.row.introduce
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否封禁" width="100">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-switch
                v-model="scope.row.status"
                active-color="#ff4949"
                inactive-color="#13ce66"
                :active-value="1"
                :inactive-value="0"
                @change="handleSwitch(scope.row)"

              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              size="small"
              type="danger"
              class="bg-red-500"
              @click="handleDelete(scope.$index, scope.row)"
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
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useCurrentInstance from "@/hook/useCurrentInstance";
import { Pages, User } from "@/modle/axios/types";
import UserApi from "@/modle/UserApi";
import { Timer } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { onMounted } from "vue";
import { ref } from "vue";
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};
const changeStatus = (id: number,status:boolean) => {
  console.log(id);
};
const query = () => {
  UserApi.findUserPage(page.value).then((res) => {
    page.value = res.data;
  });
};
const page = ref<Pages<User>>({
  page: 1,
  size: 10,
  queryParams:{}
});
const reset = ()=>{
  page.value = {
    page: 1,
    size: 10,
    queryParams:{}
  };
  query();
}
onMounted(() => {
  UserApi.findUserPage(page.value).then((res) => {
    page.value = res.data;
  });
});

//分页

const currentPage3 = ref(5);
const pageSize3 = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const { globalProperties } = useCurrentInstance();
const $host = globalProperties.$host;

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  page.value.page = val;
  UserApi.findUserPage(page.value).then((res) => {
    page.value = res.data;
  });
};
const handleSwitch = (val: User) => {
  console.log(val);
  UserApi.updateUser({
    uid: val.uid,
    status: val.status,
  }).then((res) => {
    if (res.data.code === 200) {
      ElMessage.success("修改成功");
    }
  });
};
</script>
