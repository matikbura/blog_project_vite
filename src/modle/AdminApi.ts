//管理员API
import Abstract from "@/modle/axios/abstract";
import { Admin } from "./axios/types";
class AdminApi extends Abstract {
    /**
     * get示例
     */
    login(params:Admin) {
        return this.postReq({ url: 'Admin.login', params});
    }
}

// 单列模式返回对象
let adminApi;
export default (() => {
    if (adminApi) return adminApi;
    adminApi = new AdminApi();
    return adminApi;
})();
