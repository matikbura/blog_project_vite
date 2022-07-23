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
      <h1 class="text-base font-bold">登录</h1>
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

    <el-form-item label="密码" prop="password">
      <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
          size="large"
      ></el-input>
    </el-form-item>


    <el-form-item>
      <div class="w-full flex justify-between items-center">
        <el-button type="primary" @click="submitForm(ruleFormRef)" round>登录</el-button>
        <a href="javascript:void(0)" @click="changeVue()" class="text-xs text-red-500 ">还没有账号？去注册</a>
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
          <el-button type="primary" :icon="ArrowRightBold" circle size="large" @click="toHome"></el-button>
        </el-tooltip>
      </div>
    </el-form-item>
  </el-form>


</template>

<script setup lang="ts">
import {ref, reactive, getCurrentInstance, inject, onMounted, provide} from 'vue'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import {
  Search,
  Edit,
  Check,
  Message,
  Star,
  ArrowRightBold,
} from '@element-plus/icons-vue'
import UserApi from "@/modle/UserApi";
import {User} from "@/modle/axios/types"
import useCurrentInstance from "@/hook/useCurrentInstance";
import {userStore} from "@/store/defineStroe/userStore";
import {init} from "@/socket";
import {chatStore} from "@/store/defineStroe/chatStore";
import chatApi from "@/modle/ChatApi";

const userStore1 = userStore()
const {globalProperties} = useCurrentInstance()
const $router = useRouter()
const content = ""
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('账号不能为空，请输入账号'))
  } else {
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码不能为空，请输入密码'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
})

const rules = reactive({
  username: [{validator: validatePass2, trigger: 'blur'}],
  password: [{validator: validatePass, trigger: 'blur'}],
})

const emits = defineEmits(['change'])
const changeVue = () => {
  console.log('子调用')
  emits('change', false)
}
const $store = chatStore()
const submitForm = () => {
  let user: User = {
    username: ruleForm.username,
    password: ruleForm.password
  }
  UserApi.login(user).then((res) => {
    if (res !== null) {
      console.log(res);
      if (res.origin.code === 200) {
        console.log(res.data)
        let user: User = res.data
        userStore1.initStudent(user);
        $router.push({
          path: 'home'
        })

        //获取消息列表信息
        chatApi.getConversationItemList().then(res => {
          console.log(res);
          //登录成功 初始化聊天室
          // $store.initConversationItemList()
          $store.initConversationItemList(res.data)
        })
        // WebSocket
        init(userStore1.getToken)


      } else {
        ElMessage("账号或密码错误！登录失败")
      }
    } else {
      ElMessage("未知错误")
    }

  });
  console.log('submit!')


}

const toHome = () => {
  $router.push({
    path: 'home'
  })

}


</script>
<style scoped>
</style>