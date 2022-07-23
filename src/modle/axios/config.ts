/**
 * API URL Dict api 字典
 */

interface UrlDict {
  [key: string]: {
    [key: string]: string;
  };
}

const urlDict: UrlDict = {
  User: {
    login: "user/login",
    register: "user/register",
    logout: "user/logout",
    verify: "/user/verify",
    getUser: "/user/getUser",
    updateUser: "/user/updateUser",
    findUser: "/user/findUser",
    findUserPage: "/user/findUserPage",
    findUserClassify: "/user/findUserClassify",
    getUserCount: "/user/getUserCount",
    getLoginCount: "/user/getLoginCount",
    getOnlineCount: "/user/getOnlineCount",
    findUserSevenDaysCount: "/user/findUserSevenDaysCount",
    findUserByFuzzyPage: "/user/findUserByFuzzyPage",
    sendEmailCheckCode: "/user/sendEmailCheckCode",
  },
  EducationHistory: {
    addEducationHistory: "educationHistory/addEducationHistory",
    updateEducationHistory: "educationHistory/updateEducationHistory",
    deleteEducationHistory: "educationHistory/deleteEducationHistory",
  },
  Chat: {
    getConversationItemList: "chat/getConversationItemList",
    getConversationMessageByOtherUid: "chat/getConversationMessageByOtherUid",
    sendMessage: "chat/sendMessage",
    updateChat: "chat/updateChat",
  },
  Img: {
    uploadImg: "upload/uploadImg",
    getTagCount: "upload/getTagCount",
  },
  Tag: {
    findClassifyTagAll: "tag/findClassifyTagAll",
    findTagPage: "tag/findTagPage",
    findTagById: "tag/findTagById",
    addTag: "tag/addTag",
    updateTag: "tag/updateTag",
    deleteTag: "tag/deleteTag",
    getTagCount: "tag/getTagCount",
    findAllTag: "tag/findAllTag",
    findAllClassify: "tag/findAllClassify",
  },
  Classify: {
    findClassifyAll: "classify/findClassifyAll",
    findClassifyPage: "classify/findClassifyPage",
    addClassify: "classify/addClassify",
    updateClassify: "classify/updateClassify",
    deleteClassify: "classify/deleteClassify",
  },
  Article: {
    addArticle: "article/addArticle",
    updateArticle: "article/updateArticle",
    findArticlePage: "article/findArticlePage",
    findArticle: "article/findArticle",
    deleteArticle: "article/deleteArticle",
    findArticleClassify: "article/findArticleClassify",
    getArticleCount: "article/getArticleCount",
    findArticleSevenDaysCount: "article/findArticleSevenDaysCount",
    findArticleByArticleId: "article/findArticleByArticleId",
  },
  //评论 URL配置
  Comment: {
    addComment: "comment/addComment",
    findComment: "comment/findComment",
    findCommentPage: "comment/findCommentPage",
    updateComment: "comment/updateComment",
    deleteComment: "comment/deleteComment",
    findCommentClassify: "comment/findCommentClassify",
    getCommentCount: "comment/getCommentCount",
    findCommentSevenDaysCount: "comment/findCommentSevenDaysCount",
  },
  //通知 URL配置
  Notify: {
    addNotify: "notify/addNotify",
    deleteNotify: "notify/deleteNotify",
    updateNotify: "notify/updateNotify",
    findNotifyPage: "notify/findNotifyPage",
    findNotifyByNotifyId: "notify/findNotifyByNotifyId",
  },
  //Admin URL配置
  Admin: {
    login: "admin/login",
  },
  //关注 URL配置
  Follow: {
    addFollow: "follow/addFollow",
    removeFollow: "follow/removeFollow",
    findFollowPage: "follow/findFollowPage",
    findFollow: "follow/findFollow",
    updateFollow: "follow/updateFollow",
  },
  //点赞 URL配置
  Praise: {
    addPraise: "praise/addPraise",
    findPraise: "praise/findPraise",
    deletePraise: "praise/deletePraise",
  },
  //收藏 URL配置
  Collect: {
    addCollect: "collect/addCollect",
    deleteCollect: "collect/deleteCollect",
    findCollectPage: "collect/findCollectPage",
    findCollect: "collect/findCollect",
  },
  //反馈信息 URL配置
  Feedback: {
    addFeedback: "feedback/addFeedback",
    findFeedbackPage: "feedback/findFeedbackPage",
    findFeedback: "feedback/findFeedback",
    updateFeedback: "feedback/updateFeedback",
    deleteFeedback: "feedback/deleteFeedback",
    findFeedbackSevenDaysCount: "feedback/findFeedbackSevenDaysCount",
    findFeedbackByPage: "feedback/findFeedbackByPage",
  },
};

const getUrl = (biz: string, UrlName: string): string => {
  try {
    const bizKeys = Object.keys(urlDict);
    if (bizKeys.indexOf(biz) < 0) {
      throw new Error("biz not in Dict");
    }
    let hostname = urlDict[biz][UrlName];
    if (!hostname) {
      throw new Error("url not in Dict");
    }
    if (hostname.substr(0, 1) === "/") {
      hostname = hostname.substr(1);
    }
    return hostname;
  } catch (err) {
    console.error(err);
    return "";
  }
};

export default getUrl;
