<template>
  <div class="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div class="bg-white p-10">
      <div class=" font-bold p-8">
        欢迎登录技术博客管理系统
      </div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="ruleForm.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import { ElMessage, FormInstance } from "element-plus";
import AdminApi from "@/modle/AdminApi";
import { Admin } from "@/modle/axios/types";
import { useRouter } from "vue-router";
import router from "@/router";
import { userStore } from "@/store/defineStroe/userStore";
const ruleFormRef = ref<FormInstance>();
const checkUsername = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    callback();
  }
};
const checkPassword = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const ruleForm = reactive<Admin>({
  username: "",
  password: "",
});

const rules = reactive({
  username: [{ validator: checkUsername, trigger: "blur" }],
  password: [{ validator: checkPassword, trigger: "blur" }],
});
const $user = userStore()
const $router = useRouter()
const submitForm = (formEl: FormInstance | undefined) => {
  console.log(formEl);
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      AdminApi.login(ruleForm).then(res=>{
        console.log(res)
        if(res.origin.code===401){
          ElMessage(res.data)
        }else{
          $user.initStudent(res.data)
          router.replace({
            path:'/Admin/Index/AdminHome'
          })
        }
      })
      console.log("submit!");
    } else {
      ElMessage("登录错误，请检查输入是否正确");
      return false;
    }
  });
};


const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style scoped>
>>> .el-button--primary {
  @apply bg-blue-500 duration-300 hover:bg-blue-600;
}
</style>
