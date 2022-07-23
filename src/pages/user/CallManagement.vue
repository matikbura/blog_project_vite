<template>
  <div class="container-width-1280">
    <div class="w-full mr-auto ml-auto bg-white p-20">
      <el-form :model="form" label-width="120px">
        <el-form-item label="问题类型：">
          <el-select v-model="form.feedbackType" placeholder="请选择问题类型">
            <el-option label="网站Bug" value="bug" />
            <el-option label="分类问题" value="classify" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="您的联系方式：">
          <el-input v-model="form.contact" placeholder="手机或者邮箱地址" />
        </el-form-item>
        <el-form-item label="问题描述">
          <el-input v-model="form.descript" type="textarea" />
        </el-form-item>
        <el-form-item label="提供附件">
          <el-upload
            action="img/image-server/upload/uploadImg1"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-dialog v-model="dialogVisible">
          <img width="1000" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <el-form-item label="期待改善的方案">
          <el-input v-model="form.plan" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { Plus, ZoomIn, Download, Delete } from "@element-plus/icons-vue";
import { ElMessage, UploadFile, UploadProps, UploadUserFile } from "element-plus";
import { Feedback } from "@/modle/axios/types";
import FeedbackApi from "@/modle/FeedbackApi";
const form = ref<Feedback>({});
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
const fileList = ref<UploadUserFile[]>([]);
const handleSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  if (form.value.fileUrl) {
    form.value.fileUrlArray.push(response);
  } else {
    console.log("test");
    form.value.fileUrlArray = [response];
  }
};

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile);
  form.value.fileUrlArray?.forEach((item, index) => {
    console.log(item);
    console.log(uploadFile.response);
    if (item === uploadFile.response) {
      form.value.fileUrlArray?.splice(index, 1);
    }
  });
};
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
const onSubmit = () => {
  FeedbackApi.addFeedback(form.value).then((res) => {
    ElMessage.success("提交成功");
  });
};
</script>
