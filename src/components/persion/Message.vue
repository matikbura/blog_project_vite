<template>
  <div class="bg-white">
    <h6 class="text-base border-t-2 p-2 font-bold text-gray-600">基本信息</h6>
    <div class="p-10">
      <el-form
          label-position="left"
          label-width="100px"
          :model="formLabelAlign"
          style="max-width: 100%"
      >
        <el-form-item :label="item.labelName" v-for="(item,index) in data" :key="index"
                      @mouseover="mouseTheBox(item.labelName,true,'base')"
                      @mouseout="mouseTheBox(item.labelName,false,'base')">
              <div>
                <el-input v-model="item.changeValue" v-show="item.isEdit" v-if="item.labelName!=='我的地址'"></el-input>
                <el-cascader
                    size="large"
                    :options="options"
                    @change="handleChange"
                    v-model="item.changeValue"
                    v-if="item.labelName==='我的地址'&&item.isEdit"
                >
                </el-cascader>
                <span v-show="!item.isEdit">{{ item.value }}</span>
              </div>


              <div>
                <el-button type="text" size="small" round  v-show="item.isOver&&!item.isEdit"
                           @click="changeEdit(item.name,'base')">修改
                </el-button>
                <el-button type="text" size="small" round  v-show="item.isEdit"
                           @click="save(item.name,'base')">保存
                </el-button>
                <el-button type="text" size="small" round  v-show="item.isEdit"
                           @click="cancel(item.name,'base')">取消
                </el-button>
              </div>
        </el-form-item>
      </el-form>
    </div>
  </div>

  <h6 class="text-base border-t-2 p-2 font-bold text-gray-600">联系方式</h6>
  <div class="p-10">
    <el-form
        label-position="left"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 100%"
    >
      <el-form-item :label="item.labelName" v-for="(item,index) in relation" :key="index"
                    @mouseover="mouseTheBox(item.labelName,true,'relation')"
                    @mouseout="mouseTheBox(item.labelName,false,'relation')">

            <div>
              <el-input v-model="item.changeValue" v-show="item.isEdit"></el-input>
              <span v-show="!item.isEdit">{{ item.value }}</span>
            </div>
            <div>
              <el-button type="text" size="small" round  v-show="item.isOver&&!item.isEdit"
                         @click="changeEdit(item.name,'relation')">修改
              </el-button>
              <el-button type="text" size="small" round :icon="Edit" v-show="item.isEdit"
                         @click="save(item.name,'relation')">保存
              </el-button>
              <el-button type="text" size="small" round :icon="Edit" v-show="item.isEdit"
                         @click="cancel(item.name,'relation')">取消
              </el-button>
            </div>

      </el-form-item>
    </el-form>
  </div>

  <Education></Education>
  <Work></Work>


</template>

<script lang="ts" setup>

import {onBeforeMount, onMounted, reactive, ref} from 'vue'
import {Edit} from '@element-plus/icons-vue'
import Education from './Message/Education.vue'
import Work from './Message/Work.vue'
import {regionData, CodeToText, TextToCode} from 'element-china-area-data'
import UserApi from "@/modle/UserApi";
import useCurrentInstance from "@/hook/useCurrentInstance";
const {globalProperties }= useCurrentInstance()
import {EducationHistory} from "@/modle/axios/types";
import {User} from "@/modle/axios/types";
import {userStore} from "@/store/defineStroe/userStore";

const options = regionData
//hover事件
const mouseTheBox = (param, boo, choose) => {
  if (choose === 'base') {
    data.forEach(function (item) {
      if (item.labelName === param&&item.labelName!=='用户ID') {
        if (!item.isEdit) {
          item.isOver = boo
        } else {
          item.isOver = true
        }
      }
    })
  } else if (choose === 'relation') {
    relation.forEach(function (item) {
      if (item.labelName === param) {
        if (!item.isEdit) {
          item.isOver = boo
        } else {
          item.isOver = true
        }
      }
    })
  }
}



const testToCode = (result, ...arg) => {
  let pre = null
  arg.forEach(item => {
    if (pre === null) {
      pre = TextToCode[item]
      console.log(pre);
      result.push(pre.code)
    } else {
      pre = pre[item]
      result.push(pre.code)
    }
  })
}

//点击修改事件
const changeEdit = (param, choose) => {
  if (choose === 'base') {
    data.forEach(function (item) {
      if (item.name === param) {
        if (param === 'addressStr') {
          let result = [];
          if(item.value!==''){
            console.log("--------------------"+item.value);
            let address = reactive([])
            if (item.value&&item.value.indexOf('-') !== -1) {
              address = item.value.split('-')
            } else {
              address = item.value.split(' ')
            }
            const split = item.value.split("/")
            testToCode(result, split[0], split[1], split[2])
            console.log(result);
          }
          item.changeValue = result
        }else{
          item.changeValue = item.value
        }
        item.isEdit = true
      }
    })
  } else if (choose === 'relation') {
    relation.forEach(function (item) {
      if (item.name === param) {
        item.isEdit = true
        item.changeValue=item.value
      }
    })
  }
}
const $user = userStore()
//保存事件
const save = (param, choose) => {
  let result = ""
  if (choose === 'base') {
    data.forEach(function (item) {
      if (item.name === param) {
        if (param === 'addressStr') {
          let address = ""
          address +=
              CodeToText[item.changeValue[0]] +
              "/" +
              CodeToText[item.changeValue[1]] +
              "/" +
              CodeToText[item.changeValue[2]];
          item.value = address
        }else{
          item.value=item.changeValue
        }
        result=item.changeValue
        item.isEdit = false
      }
    })
  } else if (choose === 'relation') {
    relation.forEach(function (item) {
      if (item.name === param) {
        item.isEdit = false
        item.value=item.changeValue
        result=item.changeValue
      }
    })
  }
  let user:User={}
  if(param==='addressStr'){
    let result1=''
    for(let item in result){
      result1=result1+','+result[item]
    }
    console.log(result);
    console.log(result1);
    user[param]= result1.substring(1,result1.length)
  }else {
    user[param]=result
  }
  console.log(user);

  user.uid=$user.user.uid
  UserApi.updateUser(user).then(res=>{

  })
}



//取消事件
const cancel = (param, choose) => {
  if (choose === 'relation') {
    relation.forEach(function (item) {
      if (item.name === param) {
        item.isEdit = false
      }
    })
  } else if (choose === 'base') {
    data.forEach(function (item) {
      if (item.name === param) {
        item.isEdit = false
      }
    })
  }
}


const handleChange = (param) => {
  console.log(param);
}

const data = reactive([
  {
    labelName: '用户ID',
    name: 'username',
    value: '',
    changeValue:'',
    isOver: false,
    isEdit: false
  },
  {
    labelName: '用户昵称',
    name: 'name',
    value: '',
    changeValue:'',
    isOver: false,
    isEdit: false
  },

  {
    labelName: '性别',
    name: 'sex',
    value: '',
    changeValue:'',
    isOver: false,
    isEdit: false
  },
  {
    labelName: '我的籍贯',
    name: 'nativePlace',
    value: '',
    changeValue:'',
    isOver: false,
    isEdit: false
  },
  {
    labelName: '我的地址',
    name: 'addressStr',
    value: '',
    changeValue:'',
    isOver: false,
    isEdit: false
  },
])

const relation = reactive([
  {
    labelName: '我的手机',
    name: 'phone',
    value: '',
    changeValue:'',
    isOver: false,
    isEdit: false
  },
  {
    labelName: '我的邮箱',
    name: 'email',
    value: '',
    changeValue:'',
    isOver: false,
    isEdit: false
  },
  {
    labelName: '我的微信',
    name: 'vx',
    value: '',
    changeValue:'',
    isOver: false,
    isEdit: false
  },
  {
    labelName: '我的QQ',
    name: 'qq',
    value: '',
    changeValue:'',
    isOver: false,
    isEdit: false
  },
])
const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
const getCodeToText=(codeStr, codeArray)=> {

  if (null === codeStr && null === codeArray) {
    return null;
  } else if (null === codeArray) {
    codeArray = codeStr.split(",");
  }
  for(let key in codeArray){
    codeArray[key]=codeArray[key].trim()
  }

  let area = "";
  switch (codeArray.length) {
    case 1:
      area += CodeToText[codeArray[0]];
      break;
    case 2:
      area += CodeToText[codeArray[0]] + "/" + CodeToText[codeArray[1]];
      break;
    case 3:
      area +=
          CodeToText[codeArray[0]] +
          "/" +
          CodeToText[codeArray[1]] +
          "/" +
          CodeToText[codeArray[2]];
      break;
    default:
      break;
  }
  return area;
}


onBeforeMount(()=>{

})


onMounted(() => {
  UserApi.getUser().then(res => {

    //基本信息初始化值
    for (let key in data) {
      if(data[key].name==='addressStr'){
        let result=''
        if(res.data[data[key].name]!==''){
          result= getCodeToText(res.data[data[key].name],null)
        }
          data[key].value=result
      }else{
        data[key].value = res.data[data[key].name]
      }
    }
    //联系方式初始值
    for (let key in relation) {
      relation[key].value = res.data[relation[key].name]
    }

    //教育经历初始值
    globalProperties.$pub('initEducationHistory',res.data.educationHistoryList)

    //工作经历初始值
    globalProperties.$pub('initWorkHistory',res.data.workHistoryList)
  })
})
</script>
