import Abstract from "@/modle/axios/abstract";
import {Comment, Pages} from "@/modle/axios/types";
class CommentApi extends Abstract {
    //增加评论
    addComment(data:Comment) {
        return this.postReq({ url: 'Comment.addComment',data});
    }
    //查找评论
    findComment(data:Comment){
        return this.postReq({ url: 'Comment.findComment',data});
    }
    //查找评论分页  
    findCommentPage(data:Pages<Comment>){
        return this.postReq({ url: 'Comment.findCommentPage',data});
    }
    //修改评论
    updateComment(data:Comment){
        return this.postReq({ url: 'Comment.updateComment',data});
    }
    findCommentClassify(){
        return this.postReq({ url: 'Comment.findCommentClassify'});
    }
    getCommentCount(){
        return this.postReq({ url: 'Comment.getCommentCount'});
    }
    findCommentSevenDaysCount(){
        return this.postReq({ url: 'Comment.findCommentSevenDaysCount'});
    }
    
    
}

// 单列模式返回对象
let commentApi;
export default (() => {
    if (commentApi) return commentApi;
    commentApi = new CommentApi();
    return commentApi;
})();
