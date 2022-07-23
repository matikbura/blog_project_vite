import Abstract from "@/modle/axios/abstract";
import {EducationHistory } from "@/modle/axios/types"
class EducationApi extends Abstract {
    /**
     * get示例
     */
    addEducationHistory(params: EducationHistory) {
        return this.postReq({ url: 'EducationHistory.addEducationHistory', params});
    }
    editEducationHistory(params:EducationHistory){
        return this.postReq({ url: 'EducationHistory.updateEducationHistory', params});
    }
    deleteEducationHistory(params:EducationHistory){
        return this.postReq({ url: 'EducationHistory.deleteEducationHistory', params});
    }
}

// 单列模式返回对象
let educationApi;
export default (() => {
    if (educationApi) return educationApi;
    educationApi = new EducationApi();
    return educationApi;
})();
