<template>
  <h6 class="text-base border-t-2 p-2 font-bold text-gray-600">教育经历</h6>
    <div class="p-10">
      <div v-show="!isEditEducation" >

        <el-table :data="educationMessage" style="width: 100%" empty-text="您还未填写教育经历，快去填写吧">
          <el-table-column prop="schoolName" label="学校" width="300" />
          <el-table-column prop="profession" label="专业" width="200" />
          <el-table-column prop="enterTimeStr" label="入学年份" width="300" />
          <el-table-column prop="education" label="学历" width="100" />
          <el-table-column  label="操作" width="100">


            <template #default="scope">
              <el-button type="text" size="small"  @click="EditEducationBefore(scope.row)">修改</el-button>
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
          <el-form-item label="学校名称" prop="name">
            <el-input v-model="educationForm.schoolName" placeholder="未填写"></el-input>
          </el-form-item>
          <el-form-item label="专业" prop="profession">
            <el-input v-model="educationForm.profession" placeholder="未填写"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="region">
            <el-select v-model="educationForm.education" placeholder="未选择">
              <el-option label="高中" value="高中"></el-option>
              <el-option label="本科" value="本科"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入学年份">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                    v-model="educationForm.starTime"
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
                    v-model="educationForm.endTime"
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

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {EducationHistory} from "@/modle/axios/types";
import useCurrentInstance from "@/hook/useCurrentInstance";
import EducationHistoryApi from "@/modle/EducationHistoryApi";
const {globalProperties }= useCurrentInstance()
const isEditEducation = ref(false)
const isAddEducation = ref(false)

//修改教育信息前
const EditEducationBefore=(param)=>{
  console.log(param);
  educationForm.schoolName=param.schoolName
  educationForm.education=param.education
  educationForm.profession=param.profession
  const enterTime=param.enterTimeStr
  const strings = enterTime.split("-");
  educationForm.starTime=strings[0].replace(/['年'|'月'|]/g,'/').replace(/['日']/g,'')
  educationForm.endTime=strings[1].replace(/['年'|'月']/g,'/').replace(/['日']/g,'')
  educationForm.educationId=param.educationId
  educationForm.uid=param.uid
  isEditEducation.value=true
}
//删除教育信息
const DeleteEducationBefore=(param)=>{
  EducationHistoryApi.deleteEducationHistory({educationId:param.educationId}).then((res)=>{
    let index= educationMessage.indexOf(param);
    if(index>-1){
      educationMessage.splice(index,1)
    }
  })

  console.log(param);
}
//增加教育信息前
const AddEducationBefore = ()=>{
  educationForm.schoolName=''
  educationForm.education=''
  educationForm.profession=''
  educationForm.starTime=''
  educationForm.endTime=''
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
    let y = date.getFullYear();
    let m = date.getMonth()+1;
    let d = date.getDate();
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
  let educationHistoryParam:EducationHistory={
    'schoolName':educationForm.schoolName,
    'enterTimeStr':dateToString(educationForm.starTime)+"-"+dateToString(educationForm.endTime),
    'education':educationForm.education,
    'profession':educationForm.profession,
    'uid':0,
    'educationId':0
  }
  EducationHistoryApi.addEducationHistory(educationHistoryParam).then((res)=>{
    educationMessage.push(res.data)
  })
  isEditEducation.value=false
  isAddEducation.value=false
}
const editEducation=()=>{
  console.log(educationForm);
  educationMessage.forEach(item=>{
    if(educationForm.educationId===item.educationId){
      let educationHistoryParam:EducationHistory={
        'schoolName':educationForm.schoolName,
        'enterTimeStr':dateToString(educationForm.starTime)+"-"+dateToString(educationForm.endTime),
        'education':educationForm.education,
        'profession':educationForm.profession,
        'uid':educationForm.uid,
        'educationId':educationForm.educationId
      }
      EducationHistoryApi.editEducationHistory(educationHistoryParam).then(res=>{
        item.education=educationForm.education
        item.schoolName=educationForm.schoolName
        item.enterTimeStr=dateToString(educationForm.starTime)+"-"+dateToString(educationForm.endTime)
        item.profession=educationForm.profession
      })
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

const education:EducationHistory[]=[]
const educationMessage=reactive<EducationHistory[]>(education)

const educationForm = reactive({
  schoolName:'',
  starTime:'',
  endTime:'',
  profession:'',
  education:'',
  educationId:-99,
  uid:-99
})
const initEducationHistory=(educationHistoryList)=>{
  educationHistoryList[0].forEach((res:EducationHistory)=>{
    educationMessage.push(res)
  })
}

onMounted(()=>{
  globalProperties.$sub('initEducationHistory',initEducationHistory)
})
</script>

<style scoped>

</style>