//通知API
import Abstract from "@/modle/axios/abstract";
import { Notify, Pages } from "./axios/types";
class NotifyApi extends Abstract {
  /**
   * 增加
   */
  addNotify(params: Notify) {
    return this.postReq({ url: "Notify.addNotify", params });
  }

  /**
   * 删除
   */
  deleteNotify(data: Notify) {
    return this.postReq({ url: "Notify.deleteNotify", data });
  }

  /**
   * 修改
   */
  updateNotify(data: Notify) {
    return this.postReq({ url: "Notify.updateNotify", data });
  }

  /**
   * 查询s所有Tag并进行分类
   */
  findNotifyPage(data:Pages<Notify>) {
    return this.postReq({ url: "Notify.findNotifyPage" ,data});
  }
  findNotifyByNotifyId(params:any) {
    return this.postReq({ url: "Notify.findNotifyByNotifyId" ,params});
  }
}

// 单列模式返回对象
let notifyApi;
export default (() => {
  if (notifyApi) return notifyApi;
  notifyApi = new NotifyApi();
  return notifyApi;
})();
