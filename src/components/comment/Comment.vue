<template>
  <div class="bg-white h-min-60">
    <div class="w-full p-2 border-b">评论</div>
    <div
        class="mx-10 mt-5 outline-0 blur:border-0"
        tabindex="1"
        @focus="isCommonArticleButton = true"
        @blur="isCommonArticleButton = false"
    >
      <el-input
          v-model="content"
          maxlength="100"
          placeholder="评论文章..."
          :autosize="{ minRows: 3, maxRows: 4 }"
          show-word-limit
          type="textarea"
          :clearable="true"
          @focus="isCommonArticleButton = true"
          @blur="isCommonArticleButton = false"
      />
      <div class="text-right mt-2" v-show="isCommonArticleButton">
        <span
            @click="sendComment({ articleId: props.articleId,commentList:commonList })"
            class="pr-3 pl-3 pt-2 pb-2 text-white text-sm cursor-pointer bg-blue-500 rounded transition-all duration-300 hover:bg-blue-600"
        >
          发表
        </span>
      </div>
    </div>
    <div
        class="px-10 mt-10 flex w-full space-x-2"
        v-for="item in commonList"
        :key="item.commentId"
    >
      <div class="">
        <el-avatar :size="50" :src="$host + item.user?.imgUrl"></el-avatar>
      </div>
      <div class="text-sm w-full">
        <div class="w-full flex justify-between">
          <div class="flex w-full flex-col space-y-3">
            <div class="w-full flex justify-between">
              <span>{{ item.user?.name }}</span>
              <span>{{ item.createTimeStr }}</span>
            </div>
            <span>{{ item.content }}</span>
            <div
                class="p-2 relative transition-all duration-100 group divide-y"
            >
              <div
                  class="flex w-full bg-gray-50 p-5 rounded space-x-2"
                  v-for="index in item.childNodeList"
                  :key="index.commentId"
              >
                <div class="">
                  <el-avatar
                      :size="30"
                      :src="$host + index.user?.imgUrl"
                  ></el-avatar>
                </div>
                <div class="text-sm w-full">
                  <div class="w-full flex justify-between">
                    <div class="flex w-full flex-col space-y-1">
                      <div class="w-full flex justify-between">
                        <div>
                          <span class="text-gray-500">{{
                              index.user?.name
                            }}</span>
                          <span class="text-blue-400" v-if="index.toUid"
                          >@{{ index.toUser?.name }}</span
                          >
                        </div>
                        <span>{{ index.createTimeStr }}</span>
                      </div>
                      <span>{{ index.content }}</span>
                      <div>
                        <div
                            class="flex space-x-1 pt-1 items-center cursor-pointer text-gray-500"
                        >
                          <div
                              @click="index.isButtonShow = true"
                              v-if="!index.isButtonShow"
                              class="flex space-x-1 items-center"
                          >
                            <span
                                class="iconify"
                                data-icon="bx:comment-dots"
                            ></span
                            ><span>回复</span>
                          </div>
                          <div
                              @click="index.isButtonShow = false"
                              v-if="index.isButtonShow"
                              class="flex space-x-1 items-center"
                          >
                            <span
                                class="iconify"
                                data-icon="bx:comment-dots"
                            ></span
                            ><span>取消回复</span>
                          </div>
                        </div>
                        <div v-if="index.isButtonShow" tabindex="1">
                          <el-input
                              v-model="content"
                              maxlength="100"
                              placeholder="说点什么吧..."
                              :autosize="{ minRows: 3, maxRows: 4 }"
                              show-word-limit
                              type="textarea"
                          />
                          <div class="text-right mt-2">
                            <span
                                @click="
                                sendComment({
                                  articleId: props.articleId,
                                  parentId: item.commentId,
                                  toUid: index.uid,
                                  item:index
                                })
                              "
                                class="pr-3 pl-3 pt-2 pb-2 text-white text-sm cursor-pointer bg-blue-500 rounded transition-all duration-300 hover:bg-blue-600"
                            >
                              发表
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="flex space-x-1 items-center cursor-pointer">
                <div
                    @click="item.isButtonShow = true"
                    v-if="!item.isButtonShow"
                    class="flex space-x-1 items-center"
                >
                  <span
                      class="iconify"
                      data-icon="bx:comment-dots"
                      v-if="!item.isButtonShow"
                  ></span
                  ><span>回复</span>
                </div>
                <div
                    @click="item.isButtonShow = false"
                    v-if="item.isButtonShow"
                    class="flex space-x-1 items-center"
                >
                  <span
                      class="iconify"
                      data-icon="bx:comment-dots"
                      v-if="!item.isButtonShow"
                  ></span
                  ><span>取消回复</span>
                </div>
              </div>
              <div v-if="item.isButtonShow" tabindex="1">
                <el-input
                    v-model="content"
                    maxlength="100"
                    placeholder="说点什么吧..."
                    :autosize="{ minRows: 5, maxRows: 6 }"
                    show-word-limit
                    type="textarea"
                />
                <div class="text-right mt-2">
                  <span
                      @click="
                      sendComment({
                        articleId: props.articleId,
                        parentId: item.commentId,
                        item
                      })
                    "
                      class="pr-3 pl-3 pt-2 pb-2 text-white text-sm cursor-pointer bg-blue-500 rounded transition-all duration-300 hover:bg-blue-600"
                  >
                    发表
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted, onUpdated, ref} from "vue";
import useCurrentInstance from "@/hook/useCurrentInstance";
import commentApi from "@/modle/CommentApi";
import {userStore} from "@/store/defineStroe/userStore";
import {ElMessage} from "element-plus";
import {Comment, User} from "@/modle/axios/types";

const isCommonArticleButton = ref(false);
const props = defineProps({
  articleId: {
    type: Number,
    required: true,
  },
});
const commonList = ref<Comment[]>([]);
//获取所有评论
console.log("articleis:" + props.articleId);
commentApi.findComment({articleId: props.articleId,status:1}).then((res) => {
  res.data.forEach((item: Comment) => {
    item.isButtonShow = false;
    commonList.value.push(item);
  });
});

//所有评论的内容绑定于此
const content = ref("");
//发表评论
const $user = userStore();
const sendComment = (param: {
  articleId?: number;
  parentId?: number;
  toUid?: number;
  item?: Comment;
}) => {
  commentApi
      .addComment({
        articleId: param.articleId,
        content: content.value,
        uid: $user.user.uid,
        parentId: param.parentId,
        toUid: param.toUid,
      })
      .then((res) => {
        if(res.origin.code==200){
          ElMessage.success("发表评论成功,等待审核");
          content.value = "";
          if (param.item) {
            param.item.isButtonShow = false;
          }
        }
      });
};

const {globalProperties} = useCurrentInstance();
const $host = globalProperties.$host;
</script>

<style scoped></style>
