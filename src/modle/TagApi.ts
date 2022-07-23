import Abstract from "@/modle/axios/abstract";
import { Pages, Tag } from "./axios/types";
class TagApi extends Abstract {
    /**
     * 增加标签
     */
    addTag(data: Tag) {
        return this.postReq({ url: 'Tag.addTag', data});
    }

    /**
     * 删除标签
     */
    deleteTag(data: Tag) {
        return this.postReq({ url: 'Tag.deleteTag', data});
    }

    /**
     * 修改标签
     */
    updateTag(data: Tag){
        return this.postReq({ url: 'Tag.updateTag', data});
    }

    /**
     * 查询s所有Tag并进行分类
     */
    findClassifyTagAll(){
        return this.postReq({ url: 'Tag.findClassifyTagAll'});
    }
    /**
     * 查询所有标签 并分页
     * @param data 
     * @returns 
     */
    findTagPage(data:Pages<Tag>){
        return this.postReq({ url: 'Tag.findTagPage',data});
    }
    getTagCount(){
        return this.postReq({ url: 'Tag.getTagCount'});
    }
    findAllTag(){
        return this.postReq({ url: 'Tag.findAllTag'});
    }
    findAllClassify(){
        return this.postReq({ url: 'Tag.findAllClassify'});
    }
}

// 单列模式返回对象
let tagApi;
export default (() => {
    if (tagApi) return tagApi;
    tagApi = new TagApi();
    return tagApi;
})();
