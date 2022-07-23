<template>
  <div class="p-4 h-full">
    <div class="px-4 pt-6 bg-white">
      <el-form :inline="true" :model="null" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input
              placeholder="请输入标题"
              v-model="page.queryParams.title"
          />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
              v-model="page.queryParams.createTimeRange"
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
              @click="reset"
              class="-ml-4 bg-slate-500 hover:shadow-slate-500/50 text-white rounded hover:shadow-md duration-300 px-4"
          >
            重置
          </button>
        </el-form-item>
      </el-form>
    </div>

    <div class="bg-white px-4 h-[730px] overflow-hidden">
      <div class="py-4">
        <button
            @click="editNotify"
            class="px-3 py-1 text-sm bg-green-500 text-white rounded duration-300"
        >
          新增通知
        </button>
      </div>

      <el-table :data="page.rows" style="width: 100%">
        <el-table-column label="标题" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon>
                <timer/>
              </el-icon>
              <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon>
                <timer/>
              </el-icon>
              <span style="margin-left: 10px">{{
                  scope.row.createTimeStr
                }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="内容" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px" class="line-clamp-2">{{
                  scope.row.content
                }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="封面" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.coverUrl }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >修改
            </el-button
            >
            <el-button
                size="small"
                type="danger"
                class="bg-red-400"
                @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button
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
  <el-dialog v-model="notifyVisible" :title="optionTitle" width="700px">
    <el-form label-width="100px">
      <el-form-item label="通知标题">
        <el-input v-model="notify.title" type="input"/>
      </el-form-item>
      <el-form-item label="通知内容">
        <el-input v-model="notify.content" type="textarea" @keydown.tab="tagKeyDown2" id="contentRef" ref="contentRef" :autosize="{ minRows: 2, maxRows: 5 }"/>
      </el-form-item>
      <el-form-item label="通知封面">
        <el-upload
            class="avatar-uploader"
            action="img/image-server/upload/uploadImg1"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img
              v-if="notify.coverUrl"
              :src="$host + notify.coverUrl"
              class="avatar"
          />
          <div
              v-else
              class="w-40 h-40 flex items-center justify-center text-4xl"
          >
            <span class="iconify" data-icon="clarity:upload-cloud-line"></span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit(optionTitle)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import useCurrentInstance from "@/hook/useCurrentInstance";
import {Notify, Pages} from "@/modle/axios/types";
import NotifyApi from "@/modle/NotifyApi";
import {userStore} from "@/store/defineStroe/userStore";
import {Timer} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import type {
  UploadFile,
  UploadRawFile,
  UploadProgressEvent,
} from "element-plus";
import {onMounted, ref} from "vue";

const optionTitle = ref("");
const editNotify = () => {
  optionTitle.value = "新增通知";
  notify.value!.content = "";
  notify.value!.title = "";
  notify.value!.coverUrl = "";
  notifyVisible.value = true;
  addOrEdit.value = false;
};

const query = () => {
  page.value!.page = 1;
  NotifyApi.findNotifyPage(page.value).then((res) => {
    console.log(res);
    page.value = res.data;
  });
};


const tagKeyDown2 = (e: any) => {
  e.preventDefault();
  const contentRef = window.document.getElementById("contentRef") as HTMLTextAreaElement;
  console.log('tab')
  if (e.key == 'Tab') {
    e.preventDefault();
    let start = contentRef.selectionStart;
    let end = contentRef.selectionEnd;

    // set textarea value to: text before caret + tab + text after caret
    notify.value.content = notify.value.content!.substring(0, start) +
        "\t" + notify.value.content!.substring(end);

    // put caret at right position again
    contentRef.selectionStart =
        contentRef.selectionEnd = start + 1;
  }

  return false;
}
const reset = () => {
  page.value.queryParams = {};
  NotifyApi.findNotifyPage(page.value).then((res) => {
    console.log(res);
    page.value = res.data;
  });
};
const page = ref<Pages<Notify>>({
  size: 10,
  page: 1,
  queryParams: {},
});
onMounted(() => [
  NotifyApi.findNotifyPage(page.value).then((res) => {
    console.log(res);
    page.value = res.data;
  }),
]);
const addOrEdit = ref(false);
const notify = ref<Notify>({});
const notifyVisible = ref(false);
const {globalProperties} = useCurrentInstance();
const $user = userStore();
const $host = globalProperties.$host;
const onSubmit = (optionTitle: string) => {
  notify.value.adminId = $user.user.adminId;
  console.log(notify.value);
  if (optionTitle === "新增通知") {
    NotifyApi.addNotify(notify.value).then((res) => {
      console.log(res);
      notifyVisible.value = false;
      query();
    });
  } else {
    NotifyApi.updateNotify(notify.value).then((res) => {
      console.log(res);
      notifyVisible.value = false;
      query();
    });
  }
};

interface User {
  date: string;
  name: string;
  address: string;
}

const handleEdit = (index: number, row: Notify) => {
  console.log("编辑通知");
  optionTitle.value = "编辑通知";
  notify.value = row;
  notifyVisible.value = true;
};
const handleDelete = (index: number, row: Notify) => {
  console.log(index, row);
  NotifyApi.deleteNotify(row).then((res) => {
    console.log(res);
    query();
  });
};

const tableData: Notify[] = [];

//分页

const handleSizeChange = (val: number) => {
  page.value.page = val;
  NotifyApi.findNotifyPage(page.value).then((res) => {
    console.log(res);
    page.value = res.data;
  });
};
const handleCurrentChange = (val: number) => {
  page.value.page = val;
  NotifyApi.findNotifyPage(page.value).then((res) => {
    console.log(res);
    page.value = res.data;
  });
};

//通知封面上传

const imageUrl = ref("");
const handleAvatarSuccess = (res: UploadProgressEvent, file: UploadFile) => {
  console.log(res);
  notify.value.coverUrl = res as unknown as string;
};
const beforeAvatarUpload = (file: UploadRawFile) => {
  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error("Avatar picture must be JPG format!");
  }
  if (!isLt2M) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
  }
  return isJPG && isLt2M;
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
