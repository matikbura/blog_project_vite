//关注API
import Abstract from "@/modle/axios/abstract";
import { Follow, Pages } from "@/modle/axios/types";
class FollowApi extends Abstract {
    //添加关注
    addFollow(data: Follow) {
        return this.postReq({ url: 'Follow.addFollow', data});
    }
    //删除关注
    removeFollow(data: Follow) {
        return this.postReq({ url: 'Follow.removeFollow', data});
    }
    //查询关注分页
    findFollowPage(data:Pages<Follow>) {
        return this.postReq({ url: 'Follow.findFollowPage', data});
    }
    //修改关注
    updateFollow(data: Follow) {
        return this.postReq({ url: 'Follow.updateFollow', data});
    }
    findFollow(data: Follow) {
        return this.postReq({ url: 'Follow.findFollow', data});
    }
    removeFollow(data: Follow) {
        return this.postReq({ url: 'Follow.removeFollow', data});
    }

}
// 单列模式返回对象
let followApi;
export default (() => {
    if (followApi) return followApi;
    followApi = new FollowApi();
    return followApi;
})();
