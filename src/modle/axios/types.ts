


export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface AxiosRequest {
    baseURL?: string;
    url?: string;
    data?: any;
    params?: any;
    method?: Method;
    headers?: any;
    timeout?: number;
    responseType?: ResponseType;
}

export interface AxiosResponse {
    data?: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
    config?: AxiosRequest;
}

export interface CustomResponse {
    readonly status?: boolean;
    readonly message?: string;
    data?: any;
    origin?: any;
}
//用户实体
export interface User {
    uid?:number
    token?:string
    username?: string
    password?:string
    name?: string
    imgUrl?:string
    introduce?:string
    status?:number
    createTimeStr?:string
    updateTimeStr?:string
    lastLoginTimeStr?:string
    createTimeRange?:[]
    modifyTimeRange?:[]
    lastLoginTimeRange?:[]
    sex?:string,
    email?:string
    checkCode?:string
}
//工作历史实体
export interface WorkHistory{
    companyName?:string,
    enterTimeStr?:string,
    industry?:string,
    jobTitle?:string,
    uid?:number,
    workId?:number
}
//教育历史实体
export interface EducationHistory{
    education?:string,
    educationId?:number,
    enterTimeStr?:string,
    profession?:string,
    schoolName?:string,
    uid?:number
}
export interface WorkHistory{
    companyName?:string,
    enterTimeStr?:string,
    industry?:string,
    jobTitle?:string,
    uid?:number,
    workId?:number,

}

//通讯内容实体
export interface Chat{
    chatId?:number
    fromUid?:number,
    toUid?:number,
    isRead?:string,
    context?:string,
    createTimeStr?:string,
    createTime?:any
}
//通讯列表实体
export interface ConversationItem{
    otherUid?:number
    imgUrl?:string,
    name?:string
    latestMessage?:string,
    latestTime?:string,
    unreadMessageCount?:number,
    isActive?:boolean
}
//通讯实体
export interface ConversationMessage{
    uid?:number,
    name?:string,
    imgUrl?:string,
    chatList?:Chat[]
}
//标签实体
export interface Tag{
    tagId?: number,
    name?: string,
    classifyId?: number,
    tabColor?: string,
    createTimeStr?: string,
    modifyTimeStr?: string,
    createTimeRange?: [],
    modifyTimeRange?: [],
    check?:boolean
}
//分类实体
export interface Classify{
    name?:string,
    classifyId?:number,
    tagList?:Tag[],
    isAtive?:boolean,
    children?:Classify[]
}
//文章实体
export interface Article{
    articleId?:number
    title?:string,
    content?:string,
    coverUrl?:string,
    tags?:Tag[],
    describes?:string,
    uid?:number
    auditId?:number,
    auditMessage?:string,//审核信息
    createTimeStr?:string,
    createTimeRange?:[]
    releaseTimeStr?:string,
    status?:number
    sortField?:string,
    isReverse?:number
    commonCount?:number,
    collectCount?:number
    viewCount?:number,
    commentCount?:number,
    praiseCount?:number
    unPraiseCount?:number
    tag?:Tag
}
//分页实体
export interface Pages<T>{
    page?:number,
    size?:number,
    queryParams?:T,
    rows?:T[],
    total?:number,
    hasNextPage?:boolean

}
//评论实体
export interface Comment{
    commentId?:number,
    articleId?:number,
    uid?:number,
    user?:User
    parentId?:number,
    childNodeList?:Comment[]
    content?:string,
    auditUid?:number,
    audiTimeStr?:string,
    createTimeStr?:string,
    createTimeRange?:[]
    toUid?:number,
    toUser?:User,
    isButtonShow?:boolean,
    status?:number
}

//管理员实体
export interface Admin{
    adminId?:number,
    username?:string,
    password?:string,
    name?:string,
    token?:string
}
//通知实体
export interface Notify{
    notifyId?:number,
    title?:string,
    content?:string,
    createTimeStr?:string,
    createTimeRange?:[]
    coverUrl?:string,
    modifyTimeStr?:string,
    modifyTimeRange?:[]
    adminId?:number
    admin?:Admin
    viewCount?:number,
    likeCount?:number,
}

//关注实体
export interface Follow{
    //关注id
    followId?:number,
    //关注者id
    uid?:number,
    user?:User,
    //被关注者id
    followUid?:number,
    //关注时间
    followTimeStr?:string,
    followUser?:User,
}
//收藏实体
export interface Collect{
    //收藏id
    collectId?:number,
    //收藏者id
    uid?:number,
    //文章id
    articleId?:number,
    //收藏时间
    createTimeStr?:string,
    article?:Article,
}
//点赞实体
export interface Praise{
    //点赞id
    praiseId?:number,
    //点赞者id
    uid?:number,
    //文章id
    articleId?:number,
    //点赞时间
    createTimeStr?:string,
    //点赞状态
    praiseType?:number
}
//反馈信息实体
export interface Feedback{
    //反馈id
    feedbackId?:number,
    //反馈类型
    feedbackType?:string,
    //联系方式
    contact?:string,
    //附件
    fileUrl?:string,
    fileUrlArray?:string[],
    //期待改善的方案
    plan?:string,
    //反馈描述
    descript?:string,
    //反馈时间
    createTimeStr?:string,
    //反馈状态
    status?:number
    createTimeRange?:[]
}


