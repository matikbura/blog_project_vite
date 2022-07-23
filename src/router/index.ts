import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/user/Home.vue";
import Cycle from "@/pages/user/ArticleShow.vue";
import Top from "@/pages/user/Top.vue";
import Login from "@/pages/user/LoginAndRegist.vue";
import Person from "@/pages/user/Person.vue";
import Chatting from "@/pages/user/Chatting.vue";
import EditBlog from "@/components/article/edit/EditArticle.vue";
import CallManagement from "@/pages/user/CallManagement.vue";
import UserApi from "@/modle/UserApi";
import Classify from "@/pages/user/Classify.vue";
import ContentManagement from "@/pages/user/Content.vue";
import { userStore } from "@/store/defineStroe/userStore";
import { ElMessage } from "element-plus";
import AdminLogin from "@/pages/admin/AdminLogin.vue";
import Admin from "@/pages/admin/Admin.vue";
import Index from "@/pages/admin/Index.vue";
import AdminHome from "@/pages/admin/AdminHome.vue";
import Notify from "@/pages/admin/Notify.vue";
import ArticleList from "@/pages/admin/AriticleList.vue";
import CommentList from "@/pages/admin/CommentList.vue";
import UserList from "@/pages/admin/UserList.vue";
import TagList from "@/pages/admin/TagList.vue";
import ReportList from "@/pages/admin/ReportList.vue";
import Collect from "@/pages/user/Collect.vue";
import Follow from "@/pages/user/Follow.vue"
import NotifyVue from "@/pages/user/Notify.vue";
import Ahthor from "@/pages/user/Ahthor.vue";
import Query from "@/pages/user/Query.vue";
import ErrorPage from "@/pages/eror/ErrorPage.vue";
const router = createRouter({
  routes: [
    {
      path: "/User",
      component: Top,
      children: [
        {
          path: "/User",
          component: Home,
        },
        {
          path: "home",
          component: Home,
        },
        {
          path: "Cycle",
          component: Cycle,
        },
        {
          path: "Login",
          component: Login,
        },
        {
          path: "EditBlog",
          component: EditBlog,
        },
        {
          path: "Person",
          component: Person,
        },
        {
          path: "Chatting",
          component: Chatting,
        },
        {
          path: "ContentManagement",
          component: ContentManagement,
        },
        {
          path: "CallManagement",
          component: CallManagement,
        },
        {
          path: "Classify",
          component: Classify,
        },
        {
          path:'Collect',
          component:Collect
        },
        {
          path:'Follow',
          component:Follow
        },
        {
          path:'NotifyVue',
          component:NotifyVue
        },
        {
          path:'Ahthor',
          component:Ahthor
        },
        {
          path:'Query',
          component:Query
        }
      ],
    },
    {
      path: "/Admin",
      component: Admin,
      children: [
        {
          path: "AdminLogin",
          component: AdminLogin,
        },
        {
          path: "Index",
          component: Index,
          children: [
            { path: "AdminHome", component: AdminHome },
            { path: "Notify", component: Notify },
            { path: "ArticleList", component: ArticleList },
            { path: "CommentList", component: CommentList },
            { path: "UserList", component: UserList },
            { path: "TagList", component: TagList},
            { path: "ReportList", component: ReportList },
            { path: "ArticleList", component: ArticleList },
          ],
        },
      ],
    },
    {
      path: "/error",
      component: ErrorPage,
    }
  ],
  // history:createWebHistory()
  history: createWebHashHistory(),
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//     const store= userStore()
//     //放行
//     if (to.path === '/Login' || to.path === '/home' || to.path == '/Classify' || to.path == '/CallManagement') {
//         next();
//     } else {
//         //验证机制
//         UserApi.verify().then(res => {
//             if (res.data == "认证失败，未通过拦截器" || res.data === undefined) {
//                 ElMessage("未登录或token已失效")
//                 next('/Login');
//                 store.resetStudent()
//             } else {
//                 next()
//             }
//         })
//     }
// });

export default router;
