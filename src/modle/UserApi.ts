import Abstract from "@/modle/axios/abstract";
import {Pages, User } from "@/modle/axios/types"
class UserApi extends Abstract {
    /**
     * get示例
     */
    login(params: User) {
        return this.postReq({ url: 'User.login', params});
    }

    /**
     * post示例
     */
    register(data: User) {
        return this.postReq({ url: 'User.register', data});
    }
    getUser(){
        return this.postReq({ url: 'User.getUser'});
    }
    verify() {
        return this.postReq({ url: 'User.verify' });
    }
    logout() {
        return this.postReq({ url: 'User.logout' });
    }
    updateUser(data: User){
        return this.postReq({
            url:'User.updateUser',
            data
        })
    }
    findUser(data:User){
        return this.postReq({url:'User.findUser',data})
    }
    findUserPage(data:Pages<User>){
        return this.postReq({url:'User.findUserPage',data})
    }
    findUserClassify(){
        return this.postReq({url:'User.findUserClassify'})
    }
    getUserCount(){
        return this.postReq({url:'User.getUserCount'})
    }
    getLoginCount(){
        return this.postReq({url:'User.getLoginCount'})
    }
    getOnlineCount(){
        return this.postReq({url:'User.getOnlineCount'})
    }
    findUserSevenDaysCount(){
        return this.postReq({url:'User.findUserSevenDaysCount'})
    }

    findUserByFuzzyPage(data:Pages<User>){
        return this.postReq({url:'User.findUserByFuzzyPage',data})
    }
    sendEmailCheckCode(data:User){
        return this.postReq({url:'User.sendEmailCheckCode',data})
    }
}

// 单列模式返回对象
let userApi;
export default (() => {
    if (userApi) return userApi;
    userApi = new UserApi();
    return userApi;
})();
