import {chatStore} from "@/store/defineStroe/chatStore";
import chatApi from "@/modle/ChatApi";

let websocket: any;
let token: any;

const onOpen = () => {
    console.log('WebSocket连接成功，状态码：', websocket.readyState)
};
const onMessage = (event: any) => {
    const $chat= chatStore()
    const message= JSON.parse(event.data)
    //返回是否已读
    const flag= $chat.UpdateByReceiveMessage(message)
    if(flag){
        //已读   需要修改isRead标识
        chatApi.updateChat({chatId:message.chatId,isRead:"1"})
    }
    console.log('WebSocket收到消息：', event.data);
};
const onError = () => {
    console.log('WebSocket连接错误，状态码：', websocket.readyState)

};
const onClose = () => {
    console.log('WebSocket连接关闭')
};

export const reset = ()=>{
    if(websocket){
        console.log("重置连接");
        websocket.close()
        websocket=null
    }
}

// 单列模式返回对象
export const init=(token:any)=> {
    if ('WebSocket' in window) {
        if (websocket){
            websocket.close()
        }
        websocket = new WebSocket('ws://127.0.0.1:8088'+ '/ws/' + token);
        // 连接成功
        websocket.onopen = onOpen;
        // 收到消息的回调
        websocket.onmessage = onMessage;
        // 连接错误
        websocket.onerror = onError;
        // 连接关闭的回调
        websocket.onclose = onClose;
        return websocket;
    } else {
        alert('当前浏览器 不支持')
    }
};
