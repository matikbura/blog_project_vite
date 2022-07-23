// store.js
import {defineStore} from "pinia";
import {Chat, ConversationItem, ConversationMessage} from "@/modle/axios/types";
import {types} from "sass";
import {ElNotification} from "element-plus";


// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const chatStore = defineStore({
    // id: 必须的，在所有 Store 中唯一
    id: "chatStore",
    // state: 返回对象的函数
    state: () => ({
        isOpen: 0,
        chattingMessage: {
            unreadMessageCountAll: 0,
            conversationItemList: [
                {
                    otherUid: -99,
                    imgUrl: '',
                    name: '',
                    latestMessage: '',
                    latestTime: '',
                    unreadMessageCount: 0,
                    isActive: false
                }
            ] as ConversationItem[],
            conversationMessage: {
                uid: 0,
                name: '',
                imgUrl: '',
                chatList: [{}]
            } as ConversationMessage
        }
    }),
    //获取与设置属性
    getters: {
        getConversationItemList(): ConversationItem[] {
            return this.chattingMessage.conversationItemList
        },
        getConversationMessage(): ConversationMessage {
            return this.chattingMessage.conversationMessage
        }
    },
    //方法
    actions: {
        //初始化消息列表
        initConversationItemList(param: ConversationItem[]) {
            let count = 0;
            param.forEach(item => {
                item.isActive = false
                count = count + parseInt(String(item.unreadMessageCount))
            })
            this.chattingMessage.unreadMessageCountAll = count
            this.chattingMessage.conversationItemList = param
        },
        //接收消息更新pinia
        UpdateByReceiveMessage(message:any) {
            let flag;
            let result = false;
            this.chattingMessage.conversationItemList.forEach(item => {
                if (item.otherUid == message.fromUid) {
                    item.latestMessage = message.context
                    item.latestTime = message.createTimeStr
                    if(item.unreadMessageCount)
                    item.unreadMessageCount=item.unreadMessageCount+1
                    if (this.isOpen == 0) {
                        //窗口未打开
                        const q = parseInt(String(item.unreadMessageCount)) + 1
                        item.unreadMessageCount = q
                        this.chattingMessage.unreadMessageCountAll = this.chattingMessage.unreadMessageCountAll + 1
                        ElNotification({
                            title: '新消息',
                            dangerouslyUseHTMLString: true,
                            message: '<div>' +
                                '<div><span class="text-overflow-2"><span class="text-red-400">用户：' + message.name + '</span>,发来一条消息:' + message.context + '</span></div>' +
                                '</div>',
                        })
                    } else if (item.isActive) {
                        //窗口打开 且是激活状态则更新聊天窗口
                        if(this.chattingMessage.conversationMessage.chatList)
                        this.chattingMessage.conversationMessage.chatList.push(message)
                        result = true
                    }
                    flag = true
                }
            })
            if (!flag) {
                this.chattingMessage.conversationItemList.push({
                    otherUid: message.fromUid,
                    imgUrl: message.imgUrl,
                    name: message.name,
                    latestMessage: message.context,
                    latestTime: message.createTimeStr,
                    unreadMessageCount: 1,
                    isActive: false
                })
            }
            return result
        },
        //发送消息更新pinia
        UpdateBySendMessage(message: Chat) {
            //消息列表是否存在
            let flag = false
            this.chattingMessage.conversationItemList.forEach(item => {
                console.log(item.otherUid);
                console.log(message.toUid);
                if (message.toUid == item.otherUid) {
                    item.latestMessage = message.context
                    item.latestTime = message.createTimeStr
                    flag = true
                }
            })
            //不存在 新增一条
            if (!flag) {
                this.chattingMessage.conversationItemList.push({
                    otherUid: message.fromUid,
                    imgUrl: this.chattingMessage.conversationMessage.imgUrl,
                    name: this.chattingMessage.conversationMessage.name,
                    latestMessage: message.context,
                    latestTime: message.createTimeStr,
                    unreadMessageCount: 1,
                    isActive: false
                })
            }
        },
        //重置消息列表激活状态
        resetConversationItemListActive() {
            this.chattingMessage.conversationItemList.forEach(item => {
                item.isActive = false
            })
        },
        //聊天框赋值
        setConversationMessage(param: ConversationMessage) {
            this.chattingMessage.conversationMessage = param
        }

    },
});