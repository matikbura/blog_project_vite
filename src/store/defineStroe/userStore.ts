// store.js
import { defineStore } from "pinia";
import {useLocalStorage} from "@vueuse/core";
import {User} from "@/modle/axios/types";
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const userStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "userStore",
  // state: 返回对象的函数
  state: () => ({
    user:useLocalStorage('user',{
      adminId:0,
      uid:0,
      token:'',
      username:'',
      password:'',
      name:'',
      imgUrl:'',
      role:0
    })
  }),
  //获取与设置属性
  getters: {
    getToken():string{
      return this.user.token as string
    }
  },
  //方法
  actions: {
    initStudent(user:any) {
      this.user=user
    },
    resetStudent() {
      this.user={
        adminId:0,
        uid:0,
        token:'',
        username:'',
        password:'',
        name:'',
        imgUrl:'',
        role:0
      }
    }
  },
});