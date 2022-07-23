import Abstract from "@/modle/axios/abstract";
import {Article, Pages} from "@/modle/axios/types";
class ArticleApi extends Abstract {
    /**
     * 增加文章
     */
    addArticle(data:Article) {
        return this.postReq({ url: 'Article.addArticle',data});
    }

    /**
     * 修改文章
     */
    updateArticle(data:Article) {
        return this.postReq({ url: 'Article.updateArticle',data});
    }

    findArticlePage(data:Pages<Article>){
        return this.postReq({ url: 'Article.findArticlePage',data});
    }
    findArticle(data:Article){
        return this.postReq({url:'Article.findArticle',data})
    }
    findArticleClassify(){
        return this.postReq({url:'Article.findArticleClassify'})
    }
    getArticleCount(){
        return this.postReq({url:'Article.getArticleCount'})
    }
    findArticleCount(){
        return this.postReq({url:'Article.findArticleCount'})
    }
    findArticleSevenDaysCount(){
        return this.postReq({url:'Article.findArticleSevenDaysCount'})
    }
    findArticleByArticleId(data:Article){
        return this.postReq({url:'Article.findArticleByArticleId',data})
    }

}

// 单列模式返回对象
let article;
export default (() => {
    if (article) return article;
    article = new ArticleApi();
    return article;
})();
