import { Collect, Pages } from "./axios/types";
import Abstract from "./axios/abstract";

//收藏Api
class CollectApi extends Abstract{
    //添加收藏
    addCollect(data:Collect){
        return this.postReq({url:'Collect.addCollect',data});
    }
    //删除收藏
    deleteCollect(data:Collect){
        return this.postReq({url:'Collect.deleteCollect',data});
    }
    //查询收藏
    findCollect(data:Collect){
        return this.postReq({url:'Collect.findCollect',data});
    }
    //查询收藏分页
    findCollectPage(data:Pages<Collect>){
        return this.postReq({url:'Collect.findCollectPage',data});
    }
    
}
// 单列模式返回对象
let collectApi;
export default (() => {
    if (collectApi) return collectApi;
    collectApi = new CollectApi();
    return collectApi;
})();