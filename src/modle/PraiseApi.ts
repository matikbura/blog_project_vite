import Abstract from "./axios/abstract";
import { Pages, Praise } from "./axios/types";

//点赞实体
class PraiseApi extends Abstract{
    //添加点赞
    addPraise(data:Praise){
        return this.postReq({url:'Praise.addPraise',data});
    }
    //删除点赞
    removePraise(data:Praise){
        return this.postReq({url:'Praise.removePraise',data});
    }
    //查询点赞
    findPraise(data:Praise){
        return this.postReq({url:'Praise.findPraise',data});
    }
    //查询点赞分页
    findPraisePage(data:Pages<Praise>){
        return this.postReq({url:'Praise.findPraisePage',data});
    }
    deletePraise(data:Praise){
        return this.postReq({url:'Praise.deletePraise',data});
    }
}
// 单列模式返回对象
let praiseApi;
export default (() => {
    if (praiseApi) return praiseApi;
    praiseApi = new PraiseApi();
    return praiseApi;
})();