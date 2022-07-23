<template>
  <div class="-mt-2 w-full">
    <div class="title">
      <el-row class="el-container">
        <el-col :span="8">
          <el-input
              v-model="article.title"
              :minlength="5"
              maxlength="100"
              placeholder="请输入文章标题"
              show-word-limit
              type="text"
          >
          </el-input>
        </el-col>
        <el-col :span="8" :offset="1">
          <div class="flex space-x-2">
            <el-button type="primary" @click="centerDialogVisible = true"
            >发起审核
            </el-button
            >
            <el-button type="primary" @click="sendArticle('加入草稿')"
            >加入草稿
            </el-button
            >
            <el-upload
                action=""
                class="upload-demo"
                ref="upload"
                :auto-upload="false"
                :show-file-list="false"
                :limit="1"
            >
              <el-button type="primary">导入文章</el-button>
            </el-upload>

            <el-button type="primary">导出文章</el-button>
            <el-button type="primary">返回</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <md-editor
        v-model="article.content"
        :languageUserDefined="languageUserDefined"
        :onUploadImg="onUploadImg"
    />
  </div>

  <el-dialog
      v-model="centerDialogVisible"
      title="发布文章"
      width="30%"
      destroy-on-close
      center
  >
    <div>
      <div class="flex">
        <div class="w-12">
          <span>封面：</span>
        </div>
        <div class="w-full">
          <el-upload
              action="img/image-server/upload/uploadImg1"
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img
                v-if="article.coverUrl"
                :src="$host + article.coverUrl"
                class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <plus/>
            </el-icon>
          </el-upload>
        </div>
      </div>
      <div class="flex mt-2">
        <div class="w-12">
          <span>描述：</span>
        </div>
        <div class="w-full">
          <el-input
              v-model="article.describes"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
              placeholder="请输入描述"
          >
          </el-input>
        </div>
      </div>

      <div class="flex mt-2">
        <div class="w-12">
          <span>标签：</span>
        </div>
        <div class="w-full">
          <template v-for="(all, index) in allTab" :key="index">
            <template v-for="(child,count) in all.children" :key="count">
              <template v-for="item in child.tagList" :key="item.tagId">
                <el-tag
                    class="mx-1"
                    effect="dark"
                    v-if="item.check"
                    size="small"
                    :color="item.tabColor"
                >
                  {{ item.name }}
                </el-tag>
              </template>
            </template>
          </template>
          <button
              class="text-sm text-indigo-500 cursor-pointer"
              ref="buttonRef"
              v-click-outside="onClickOutside"
          >
            编辑
          </button>
        </div>
        <el-popover
            ref="popoverRef"
            :virtual-ref="buttonRef"
            trigger="click"
            title="所有标签"
            virtual-triggering
            :width="700"
            :show-arrow="false"
        >
          <div>
            <div
                v-for="(all, index) in allTab"
                :key="index"
                class="flex space-x-2 mt-2 items-center justify-left"
            >
              <div class="item-center">
                <span>{{ all.name }}:</span>
              </div>
              <div>
                <div v-for="index in all.children">
                  {{index.name}}
                  <el-check-tag
                      v-for="item in index.tagList"
                      :key="item.tagId"
                      class="mx-1"
                      effect="dark"
                      size="small"
                      :checked="item.check"
                      :color="item.tabColor"
                      @click="changeSelect(item)"
                  >
                    {{ item.name }}
                  </el-check-tag>
                </div>
              </div>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button
            @click="
            sendArticle('发起审核');
            centerDialogVisible = false;
          "
        >审核</el-button
        >
        <el-button type="primary" @click="centerDialogVisible = false"
        >取消</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {onMounted, reactive, ref, unref} from "vue";
import {ClickOutside as vClickOutside} from "element-plus";
import {Plus} from "@element-plus/icons-vue";
import axios from "axios";
import useCurrentInstance from "@/hook/useCurrentInstance";
import tagApi from "@/modle/TagApi";
import type {
  UploadFile,
  ElUploadProgressEvent,
  ElFile,
} from "element-plus/es/components/upload/src/upload.type";
import {Article, Classify, Tag} from "@/modle/axios/types";
import articleApi from "@/modle/ArticleApi";
import mdEditor, {ToolbarNames} from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const buttonRef = ref();
const popoverRef = ref();
const languageUserDefined = {
  'my-lang': {
    toolbarTips: {
      bold: '加粗',
      underline: '下划线',
      italic: '斜体',
      strikeThrough: '删除线',
      title: '标题',
      sub: '下标',
      sup: '上标',
      quote: '引用',
      unorderedList: '无序列表',
      orderedList: '有序列表',
      codeRow: '行内代码',
      code: '块级代码',
      link: '链接',
      image: '图片',
      table: '表格',
      mermaid: 'mermaid图',
      katex: '公式',
      revoke: '后退',
      next: '前进',
      save: '保存',
      prettier: '美化',
      pageFullscreen: '浏览器全屏',
      fullscreen: '屏幕全屏',
      preview: '预览',
      htmlPreview: 'html代码预览',
      catalog: '目录',
      github: '源码地址'
    },
    titleItem: {
      h1: '一级标题',
      h2: '二级标题',
      h3: '三级标题',
      h4: '四级标题',
      h5: '五级标题',
      h6: '六级标题'
    },
    imgTitleItem: {
      link: '添加链接',
      upload: '上传图片',
      clip2upload: '裁剪上传'
    },
    linkModalTips: {
      title: '添加',
      descLable: '链接描述：',
      descLablePlaceHolder: '请输入描述...',
      urlLable: '链接地址：',
      UrlLablePlaceHolder: '请输入链接...',
      buttonOK: '确定'
    },
    clipModalTips: {
      title: '裁剪图片上传',
      buttonUpload: '上传'
    },
    copyCode: {
      text: '复制代码',
      tips: '已复制'
    },
    mermaid: {
      flow: '流程图',
      sequence: '时序图',
      gantt: '甘特图',
      class: '类图',
      state: '状态图',
      pie: '饼图',
      relationship: '关系图',
      journey: '旅程图'
    },
    katex: {
      inline: '行内公式',
      block: '块级公式'
    }
  }
}

// 图片上传
const onUploadImg = async (
    files: FileList,
    callback: (urls: string[]) => void
) => {
  const res = await Promise.all(
      Array.from(files).map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append("file", file);
          axios
              .post("img/image-server/upload/uploadImg1", form, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => rev(res))
              .catch((error) => rej(error));
        });
      })
  );

  callback(
      res.map((item: any) => {
        console.log(item);
        return $host + item.data;
      })
  );
};

// 获取图片上传进度
const onUploadProgress = (e: number) => {
  if (e === 100) {
    setTimeout(() => {
    }, 1000);
  }
};
onMounted(() => {
  //初始化标签
  let classify: Classify = {};
  tagApi.findClassifyTagAll().then((res) => {
    res.data.forEach((res: any) => {
      classify = res;
      console.log(res);
      if (classify.children) {
        classify.children!.forEach((item: any) => {
          if (item.tagList && item.tagList.length > 0) {
            item.tagList.forEach((item1: any) => {
              item1.check = false;
            });
          }
        })
        allTab.value.push(classify);
      }
    });
  });
});

//文章
const article = ref<Article>({
  content: "",
  coverUrl: "",
  describes: "",
  tags: [] as Tag[],
  title: "",
});

//标签编辑事件
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
//发起审核
const sendArticle = (param: string) => {
  let selectTagList: Tag[] = [];
  if (param === "发起审核") {
    allTab.value.forEach((item) => {
      item.tagList?.forEach((tag) => {
        if (tag.check) {
          selectTagList.push(tag);
        }
      });
    });
    article.value.tags = selectTagList;
    article.value.status = 1;
  }

  if (param === "加入草稿") article.value.status = 0;
  articleApi.addArticle(article.value).then(res => {
    ElMessage.success("发起审核成功");
  });
};

const allTab = ref<Classify[]>([]);

const changeSelect = (prams: any) => {
  prams.check = !prams.check;
};
const centerDialogVisible = ref(false);
const {globalProperties} = useCurrentInstance();

const $host = globalProperties.$host;

//封面上传
const imageUrl = ref("");
const handleAvatarSuccess = (res: string | undefined, file: UploadFile) => {
  console.log(res);
  article.value.coverUrl = res;
};
const beforeAvatarUpload = (file: ElFile) => {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isGIF = file.type === "image/gif";
  const isWEBP = file.type === "image/webp";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG && !isPNG && !isGIF && !isWEBP) {
    ElMessage.error("Avatar picture must be JPG or PNG or GIF or WEBP format!");
  }
  if (!isLt2M) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
  }
  return isJPG || isPNG || isGIF || isWEBP && isLt2M;
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.title {
  height: 40px;
  background-color: white;
  border: 1px solid var(--el-border-color-base);
  display: flex;
  align-items: center;
  padding: 0 5px;
}

>>> .el-check-tag {
  @apply pl-2 pr-2 pt-1 pb-1 text-sm font-bold;
}

>>> .md {
  @apply min-h-[970px];
}

.mainClass {
  position: absolute;
  width: 100vw;
  height: 89vh;
  margin-top: 5px;
}
</style>
