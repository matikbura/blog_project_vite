import Abstract from "@/modle/axios/abstract";
import {Chat} from "@/modle/axios/types";
class ChatApi extends Abstract {
    //获取谈话内容
    getConversationItemList() {
        return this.postReq({ url: 'Chat.getConversationItemList'});
    }
    //通过Id获取谈话内容
    getConversationMessageByOtherUid(params:Chat){
        return this.postReq({ url: 'Chat.getConversationMessageByOtherUid',params});
    }
    sendMessage(params:Chat){
        return this.postReq({ url: 'Chat.sendMessage',params});
    }
    updateChat(params:Chat){
        return this.postReq({url:'Chat.updateChat',params})
    }
}

// 单列模式返回对象
let chatApi;
export default (() => {
    if (chatApi) return chatApi;
    chatApi = new ChatApi();
    return chatApi;
})();
