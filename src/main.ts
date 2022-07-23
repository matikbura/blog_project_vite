import { createApp } from "vue";
import App from "./App.vue";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import router from "./router";
import mitt, { Emitter } from "mitt";
import { setupStore } from "./store";
import "./index.css"; // Vue3中引入tailwindcss
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
app.config.globalProperties.$host = "http://120.25.250.33:8080/image1";
//初始化pinia
setupStore(app);
const emitter = mitt();

app.config.globalProperties.$pub = (...args) => {
  const test = args.slice(0, 1);
  emitter.emit(args.slice(0, 1)[0], args.slice(1));
};

// 全局订阅（在Vue全局方法中自定义$sub订阅方法）
app.config.globalProperties.$sub = function (event, handler) {
  // eslint-disable-next-line prefer-rest-params
  Reflect.apply(emitter.on, emitter, arguments);
};

// 取消订阅
app.config.globalProperties.$unsub = function (event, handler) {
  // eslint-disable-next-line prefer-rest-params
  Reflect.apply(emitter.off, emitter, arguments);
};
app.mount("#app");
