<template>
  <h6 class="text-base border-t-2 p-2 font-bold text-gray-600">工作经历</h6>
    <div class="p-10">
      <div v-show="!isEditEducation" >

        <el-table :data="workMessage" style="width: 100%" empty-text="您还未填写工作经历，快去填写吧">
          <el-table-column prop="companyName" label="公司名称" width="300" />
          <el-table-column prop="jobTitle" label="职位名称" width="100" />
          <el-table-column prop="industry" label="所属行业" width="100" />
          <el-table-column prop="enterTimeStr" label="入职时间" width="300" />
          <el-table-column  label="操作" width="100">
            <template #default="scope">
              <el-button type="text" size="small" @click="EditEducationBefore(scope.row)">修改</el-button>
              <el-button type="text" size="small"  @click="DeleteEducationBefore(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="text" size="small"  @click="AddEducationBefore()" style="margin-top: 30px">新增</el-button>
      </div>



      <div class="p-10 w-3/5">
        <el-form
            label-width="120px"
            class="demo-ruleForm"
            v-show="isEditEducation"
            label-position="left"
        >
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="workForm.companyName" placeholder="未填写"></el-input>
          </el-form-item>
          <el-form-item label="所属行业" prop="Industry">
            <el-input v-model="workForm.industry" placeholder="未填写"></el-input>
          </el-form-item>
          <el-form-item label="职位名称" prop="region">
            <el-input v-model="workForm.jobTitle" placeholder="未填写"></el-input>
          </el-form-item>
          <el-form-item label="入职年份">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                    v-model="workForm.startTime"
                    type="date"
                    placeholder="开始时间"
                    style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col STYLE="text-align: center" :span="2">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-date-picker
                    v-model="workForm.endTime"
                    type="date"
                    placeholder="结束时间"
                    style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="editEducation" v-show="!isAddEducation">保存</el-button>
            <el-button type="primary" @click="addEducation" v-show="isAddEducation">增加</el-button>
            <el-button @click="cancleEditEducation()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import useCurrentInstance from "@/hook/useCurrentInstance";
import {WorkHistory} from "@/modle/axios/types";
import userApi from "@/modle/UserApi";
import EducationHistoryApi from "@/modle/EducationHistoryApi";
const {globalProperties }= useCurrentInstance()
const isEditEducation = ref(false)
const isAddEducation = ref(false)


//修改教育信息前
const EditEducationBefore=(param)=>{
  console.log(param);
  workForm.companyName=param.companyName
  workForm.jobTitle=param.jobTitle
  workForm.industry=param.industry
  const enterTimeStr=param.enterTimeStr
  const strings = enterTimeStr.split("-");
  workForm.startTime=strings[0].replace(/['年'|'月'|]/g,'/').replace(/['日']/g,'')
  workForm.endTime=strings[1].replace(/['年'|'月']/g,'/').replace(/['日']/g,'')
  workForm.workId=param.workId
  isEditEducation.value=true
}
//删除教育信息
const DeleteEducationBefore=(param)=>{
  console.log(param);
}
//增加教育信息前
const AddEducationBefore = ()=>{
  workForm.companyName=''
  workForm.jobTitle=''
  workForm.industry=''
  workForm.startTime=''
  workForm.endTime=''
  isEditEducation.value=true
  isAddEducation.value=true
}


const replaceStr = (str, index, char) => {
  const strAry = str.split('');
  strAry[index] = char;
  return strAry.join('');
}

const dateToString= (date)=>{
  console.log(typeof (date));
  if(date instanceof Date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    let mResult:string=m.toString()
    let dResult:string=d.toString()
    if(m.toString().length<2){
      mResult='0'+m.toString()
    }
    if(d.toString().length<2){
      dResult='0'+d.toString()
    }
    return y+'年'+mResult+'月'+dResult+'日';
  }else{
    return replaceStr(replaceStr(date,4,"年"),7,"月")+"日"
  }
}

const addEducation=()=>{
  workMessage.push({
    'companyName':workForm.companyName,
    'enterTimeStr':dateToString(workForm.startTime)+"-"+dateToString(workForm.endTime),
    'jobTitle':workForm.jobTitle,
    'industry':workForm.industry,
    'workId':2,
    'uid':1
  })
  isEditEducation.value=false
  isAddEducation.value=false
}
const editEducation=()=>{
  workMessage.forEach(item=>{
    if(workForm.workId===item.workId){
      item.companyName=workForm.companyName
      item.jobTitle=workForm.jobTitle
      item.industry=workForm.industry
      item.enterTimeStr=dateToString(workForm.startTime)+"-"+dateToString(workForm.endTime)
      isEditEducation.value=false
      isAddEducation.value=false
    }
  })
}

//取消修改
const cancleEditEducation=()=>{
  isEditEducation.value=false
  isAddEducation.value=false
}
const workHistory:WorkHistory[]=[]
const workMessage=reactive<WorkHistory[]>(workHistory)


const workForm = reactive({
  companyName:'',
  jobTitle:'',
  industry:'',
  enterTimeStr:'',
  startTime:'',
  endTime:'',
  uid:1,
  workId:-99
})
const initWorkHistory=(workHistoryList)=>{
  workHistoryList[0].forEach((res:WorkHistory)=>{
    console.log(res);
    workMessage.push(res)
  })

}

onMounted(()=>{
  globalProperties.$sub('initWorkHistory',initWorkHistory)
})
</script>

<style scoped>

</style>