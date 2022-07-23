<template>
  <div class="container-width-1680">
    <div class="flex justify-between">
      <div class="w-80">
        <author-info :user="user"></author-info>
      </div>
      <div class="w-[1020px] pr-2">
        <ShowArticle
          :article="article"
          :minHeight="900"
          :isShowList="true"
        ></ShowArticle>
        <div class="w-full bg-white flex items-center justify-center">
          <div class="flex space-x-4 pr-4 pb-3">
            <div>
              <button class="text-sm flex items-center"  @click="praise(type===1?-1:type===3||type===0?1:type)">
                  <Icon icon="ant-design:like-filled" :color="type===1?'#5290f5':'#111'" width="40" />
                {{article.praiseCount}}
              </button>
            </div>
            <div>
              <button class="text-sm flex items-center"  @click="praise(type===0?-1:type===3||type===1?0:type)">
                <Icon icon="ant-design:dislike-filled" :color="type===0?'#5290f5':'#111'" width="40" />
                {{article.unPraiseCount}}
              </button>
            </div>
            <div>
              <button class="text-sm flex items-center" @click="collect">
                <Icon icon="wpf:like" :color="isCollect?'red':'#111'" width="40" />
                {{article.collectCount}}
              </button>
            </div>
          </div>
        </div>
        <div class="mt-2 bg-white pb-10">
          <Common :articleId="articleId"></Common>
        </div>
      </div>
      <div class="w-80 h-96 p-4 bg-white sticky top-16">
        <div class="border-b">目录</div>
        <Catalog :cataLogs="cataLog" current="head-1"></Catalog>
      </div>
    </div>
    <div class="p-20"></div>
  </div>
</template>

<script setup lang="ts">
import AuthorInfo from "../../components/article/show/AuthorInfo.vue";
import ShowArticle from "../../components/article/show/ShowArticle.vue";
import { onBeforeMount, onMounted, onUpdated, ref } from "vue";
import { useRoute } from "vue-router";
import { Article, User } from "@/modle/axios/types";
import articleApi from "@/modle/ArticleApi";
import Catalog, {TocItem} from "@/components/article/show/catalog/Catalog.vue";
import useCurrentInstance from "@/hook/useCurrentInstance";
import userApi from "@/modle/UserApi";
import Common from "@/components/comment/Comment.vue";
import PraiseApi from "@/modle/PraiseApi";
import { userStore } from "@/store/defineStroe/userStore";
import { ElMessage } from "element-plus";
import CollectApi from "@/modle/CollectApi";
import { Icon } from '@iconify/vue';
const cataLog = ref<TocItem[]>([]);
const { globalProperties } = useCurrentInstance();

//获取路由中的参数
const $router = useRoute();
const uid = $router.query.uid;
const articleId = $router.query.articleId as unknown as number;
//查找数据
const article = ref<Article>({});

const user = ref<User>({});
onMounted(async () => {
  await articleApi.findArticleByArticleId({ articleId: articleId }).then((res) => {
    article.value = res.data;
  });
  await userApi.findUser({ uid: uid as unknown as number }).then((res) => {
    user.value = res.data[0];
  });
  console.log(uid);
});
onMounted(() => {
  globalProperties.$sub("catalog", (param: never[][]) => {
    let count = 0
    const tocItems: TocItem[] = [];
    param[0].forEach(({text, level}) => {
      count++
      let result = 'head-' + count.toString()
      const item = {level, text, count: result};
      if (tocItems.length === 0) {
        // 第一个 item 直接 push
        tocItems.push(item);
      } else {
        let lastItem = tocItems[tocItems.length - 1]; // 最后一个 item

        if (item.level > lastItem.level) {
          // item 是 lastItem 的 children
          for (let i = lastItem.level + 1; i <= 6; i++) {
            const {children} = lastItem;
            if (!children) {
              // 如果 children 不存在
              lastItem.children = [item];
              break;
            }

            lastItem = children[children.length - 1]; // 重置 lastItem 为 children 的最后一个 item

            if (item.level <= lastItem.level) {
              // item level 小于或等于 lastItem level 都视为与 children 同级
              children.push(item);
              break;
            }
          }
        } else {
          // 置于最顶级
          tocItems.push(item);
        }
      }
    });
    cataLog.value = tocItems;
  });
  addEventListener("scroll", timerSetInterval, false);
  //处理点赞事件
  parse_function();
  //处理收藏事件
  collect_function();
});
const type = ref<number>(-1);
//点赞渲染
const parse_function = () => {
  console.log("开始渲染");
  if($user.user.uid){
    if($user.user.uid! === uid as unknown as number){
      type.value = -2
    }else{
      PraiseApi.findPraise({
        uid: $user.user.uid,
        articleId: articleId
      }).then((res) => {
        if(res.data.length !== 0){
          type.value = res.data[0].praiseType;
        }else{
          type.value = 3
        }
      })
    }
  }else{
    return "请登录后点赞"
  }
};

const praise = (praiseType: number) => {
  //-1删除
  //0 1  增加 3 修改
  //-2未登录
  if(praiseType ===0||praiseType ===1){
    //增加
    PraiseApi.addPraise({
      uid: $user.user.uid,
      articleId: articleId as unknown as number,
      praiseType: praiseType,
    }).then((res) => {
      if(res.origin.code==200){
        if(praiseType===1){
          ElMessage.success("点赞操作成功");
          article.value.praiseCount!++;
          if(type.value===0){
            article.value.unPraiseCount!--;
          }
        }else{
          ElMessage.success("不喜欢操作成功");
          article.value.unPraiseCount!++;
          if(type.value===1){
            article.value.praiseCount!--;
          }
        }
      }
      type.value = praiseType;
    });
  }else if(praiseType === -1){
    //删除
    PraiseApi.deletePraise({
      uid: $user.user.uid,
      articleId: articleId as unknown as number,
    }).then((res) => {
      console.log(res);
      if(res.origin.code==200){
        if(type.value===1){
          ElMessage.success("取消点赞操作成功");
          article.value.praiseCount!--;
        }else{
          ElMessage.success("取消不喜欢操作成功");
          article.value.unPraiseCount!--;
        }
      }
      type.value = 3
    });
  }else{
    ElMessage.error("点赞失败,请先登录再进行点赞操作");
  }
};

const isCollect = ref(false);
//收集渲染
const collect_function = ()=>{
  CollectApi.findCollect({
    uid: $user.user.uid,
    articleId: articleId
  }).then((res) => {
    if(res.data.length !== 0){
      isCollect.value = true;
    }else{
      isCollect.value = false;
    }
  })
}
//收集
const collect = () => {
  if(isCollect.value){
    CollectApi.deleteCollect({
      uid: $user.user.uid,
      articleId: articleId
    }).then((res) => {
      articleApi.updateArticle({
        articleId: articleId as unknown as number,
        collectCount: article.value.collectCount! - 1
      }).then((res) => {
        if(res.origin.code==200){
          ElMessage.success("取消收藏操作成功");
          isCollect.value = false;
          article.value.collectCount!--;
        }
      })
    })
  }else{
    CollectApi.addCollect({
      uid: $user.user.uid,
      articleId: articleId
    }).then((res) => {
      articleApi.updateArticle({
        articleId: articleId,
        collectCount: article.value.collectCount! + 1
      }).then((res) => {
        console.log(res);
        if(res.origin.code==200){
          ElMessage.success("收藏操作成功");
          isCollect.value = true;
          article.value.collectCount!++;
        }
      })
    })
  }
}


//文章滚动事件处理
let timer: string | NodeJS.Timeout | null = null;
//文章滚动事件 设置定时器 延迟调用
const timerSetInterval = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  timer = setTimeout(handle, 100);
};
//文章滚动事件  处理方式
const handle = () => {
  const clientHeight = document.documentElement.clientHeight / 2;
  const scrollTop = document.documentElement.scrollTop;
  const elementNodeListOf = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
  const result: Element[] = [];
  elementNodeListOf.forEach((item: Element, index) => {
    if (item.getAttribute("id"))
      if (item!.getAttribute("id")!.indexOf("head") != -1) {
        result.push(item);
      }
  });
  result.forEach((item: Element, index) => {
    if (item!.getAttribute("id")!.indexOf("head") != -1) {
      if (index === result.length - 1) {
        //最后一页暂时不管
        const top = item.getBoundingClientRect().top;
        const height = item.clientHeight;
        if (top <= clientHeight && -top < height) {
          console.log(item.getAttribute("id"));
          globalProperties.$pub("setCurrent", item.getAttribute("id"));
        }
      } else {
        const top = item.getBoundingClientRect().top;
        //获取下一页的Top
        const nextTop = result[index + 1].getBoundingClientRect().top;
        if (top <= clientHeight && nextTop > clientHeight) {
          globalProperties.$pub("setCurrent", item.getAttribute("id"));
        }
      }
    }
  });
};
//获取本地的user
const $user = userStore();
//点赞与踩

</script>
<style scoped>
.container-width-1680 {
  width: 1680px;
  margin: 0 auto;
}
</style>
