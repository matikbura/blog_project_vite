<template>
    <div class="p-10">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-ruleForm"
        >
         <el-row class="el-container">
           <el-col :span="8">
             <el-form-item label="旧密码" prop="oldPass">
               <el-input
                   v-model="ruleForm.oldPass"
                   type="password"
                   autocomplete="off"
               ></el-input>
             </el-form-item>

             <el-form-item label="新密码" prop="pass">
               <el-input
                   v-model="ruleForm.pass"
                   type="password"
                   autocomplete="off"
               ></el-input>
             </el-form-item>
             <el-form-item label="确认密码" prop="checkPass">
               <el-input
                   v-model="ruleForm.checkPass"
                   type="password"
                   autocomplete="off"
               ></el-input>
             </el-form-item>
             <el-form-item>
               <el-button type="primary" @click="submitForm(ruleFormRef)">修改</el-button>
             </el-form-item>
           </el-col>
         </el-row>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'


//校验方法
const validateOldPass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入旧密码'))
  }
}

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入新密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入新密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("两次的密码不匹配！"))
  } else {
    callback()
  }
}

//数据绑定
const ruleForm = reactive({
  oldPass:'',
  pass: '',
  checkPass: '',
})



//校验规则
const rules = reactive({
  oldPass:[{validator: validateOldPass, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

//提交
const submitForm = () => {

}
</script>

<style scoped>

</style>