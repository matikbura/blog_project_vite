<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    label-position="top"
  >
    <el-form-item>
      <h1 class="text-base font-bold">注册</h1>
    </el-form-item>
    <el-form-item label="账号" prop="username">
      <el-input
        v-model="ruleForm.username"
        type="text"
        autocomplete="off"
        placeholder="请输入账号"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="name">
      <el-input
        v-model="ruleForm.name"
        type="text"
        autocomplete="off"
        placeholder="请输入昵称"
        size="large"
      ></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
        placeholder="请输入密码"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="tpassword">
      <el-input
        v-model="ruleForm.tpassword"
        type="password"
        autocomplete="off"
        placeholder="请再次输入密码"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="ruleForm.email"
        type="text"
        autocomplete="off"
        placeholder="请再次输入密码"
        size="large"
      ></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="checkCode">
      <div class="flex space-x-2 items-center">
      <el-input
          v-model="ruleForm.checkCode"
          type="text"
          autocomplete="off"
          placeholder="请输入验证码"
          size="large"
      ></el-input>
       <el-button @click="sendEmailCheckCode">发送验证码至邮箱</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <div class="w-full flex justify-between items-center">
        <el-button type="primary" @click="submitForm()" round>注册</el-button>

        <el-button type="primary" @click="changeVue()" round>返回</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <div class="w-full flex flex-row-reverse">
        <el-tooltip
          class="box-item"
          effect="light"
          content="以游客身份访问"
          placement="bottom-end"
        >
          <el-button
            type="primary"
            :icon="ArrowRightBold"
            circle
            size="large"
            @click="toHome"
          ></el-button>
        </el-tooltip>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import useCurrentInstance from "@/hook/useCurrentInstance";
import { useRouter } from "vue-router";
import { ElForm, ElMessage } from "element-plus";
import {
  Search,
  Edit,
  Check,
  Message,
  Star,
  ArrowRightBold,
} from "@element-plus/icons-vue";
import UserApi from "@/modle/UserApi";
import { User } from "@/modle/axios/types";
import userApi from "@/modle/UserApi";
type FormInstance = InstanceType<typeof ElForm>;
const ruleFormRef = ref<FormInstance>();
const { globalProperties } = useCurrentInstance();
const $router = useRouter();
const checkUsername = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("账号不能为空，请输入账号"));
  } else {
    callback();
  }
};
const checkPassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("密码不能为空，请输入密码"));
  } else {
    console.log("密码不为空");
    console.log(ruleForm.tpassword);
    if (ruleForm.tpassword !== "") {
      console.log("进入方法");
      console.log(ruleFormRef);
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checktpassword", () => null);
    }
    callback();
  }
};
const sendEmailCheckCode = () => {
  userApi.sendEmailCheckCode({email:ruleForm.email}).then((res) => {
    console.log(res);
    ElMessage.success("验证码已发送至邮箱");
  });
};
const checkName = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("昵称不能为空，请输入昵称"));
  } else {
    callback();
  }
};

const checktpassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm.password) {
    callback(new Error("密码不一致"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  username: "",
  name: "",
  password: "",
  tpassword: "",
  checkCode: "",
  email: "",
});

const rules = reactive({
  username: [{ validator: checkUsername, trigger: "blur" }],
  password: [{ validator: checkPassword, trigger: "blur" }],
  name: [{ validator: checkName, trigger: "blur" }],
  tpassword: [{ validator: checktpassword, trigger: "blur" }],
});

const emits = defineEmits(["change"]);
const changeVue = () => {
  console.log("子调用");
  emits("change", true);
};
const submitForm = () => {
  let user: User = {

    username: ruleForm.username,
    password: ruleForm.password,
    name: ruleForm.name,
    checkCode: ruleForm.checkCode,
    email: ruleForm.email,
  };
  UserApi.register(user).then((res) => {
    if (res !== null) {
      console.log(res.data);
      ElMessage(res.data);
    } else {
      ElMessage("未知错误");
    }
  });
  console.log("submit!");
};

const toHome = () => {
  $router.push({
    path: "home",
  });
};
</script>
<style scoped></style>
