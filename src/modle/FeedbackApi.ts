//反馈信息API
import Abstract from "@/modle/axios/abstract";
import { Feedback, Pages } from "@/modle/axios/types";
class FeedbackApi extends Abstract {
    //添加反馈信息
    addFeedback(data: Feedback) {
        return this.postReq({ url: 'Feedback.addFeedback', data});
    }
    //删除反馈信息
    removeFeedback(data: Feedback) {
        return this.postReq({ url: 'Feedback.removeFeedback', data});
    }
    //查询反馈信息分页
    findFeedbackPage(data:Pages<Feedback>) {
        return this.postReq({ url: 'Feedback.findFeedbackPage', data});
    }
    //修改反馈信息
    updateFeedback(data: Feedback) {
        return this.postReq({ url: 'Feedback.updateFeedback', data});
    }
    findFeedbackSevenDaysCount(){
        return this.postReq({ url: 'Feedback.findFeedbackSevenDaysCount'});
    }
    findFeedbackByPage(data:Pages<Feedback>) {
        return this.postReq({ url: 'Feedback.findFeedbackByPage', data});
    }


}
// 单列模式返回对象
let feedbackApi;
export default (() => {
    if (feedbackApi) return feedbackApi;
    feedbackApi = new FeedbackApi();
    return feedbackApi;
})();