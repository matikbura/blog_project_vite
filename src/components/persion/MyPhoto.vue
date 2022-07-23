<template>
  <div class=" w-full h-64 flex justify-center items-center">
    <el-upload
      class="avatar-uploader"
      action="img/image-server/upload/uploadImg1"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="$host + imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage, UploadFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { userStore } from '@/store/defineStroe/userStore';
import type { UploadProps } from 'element-plus'
import useCurrentInstance from '@/hook/useCurrentInstance';
import UserApi from '@/modle/UserApi';
const $user = userStore();
const imageUrl = ref('')
const handleAvatarSuccess = (res: string | undefined, file: UploadFile) => {
  console.log(res);
  UserApi.updateUser({
    imgUrl: res,
    uid: $user.user.uid,
  }).then(() => {
    imageUrl.value = res as string;
    $user.user.imgUrl = res as string;
    ElMessage.success('上传成功');
  });
};
const beforeAvatarUpload = (file: ElFile) => {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isGIF = file.type === "image/gif";
  const isWEBP = file.type === "image/webp";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG&&!isPNG&&!isGIF&&!isWEBP) {
    ElMessage.error("Avatar picture must be JPG or PNG or GIF or WEBP format!");
  }
  if (!isLt2M) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
  }
  return isJPG||isPNG||isGIF||isWEBP && isLt2M;
};
const {globalProperties}= useCurrentInstance()
const $host = globalProperties.$host
onMounted(() => {
  imageUrl.value=$user.user.imgUrl
})
</script>

<style scoped></style>
