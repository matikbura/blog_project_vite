<template>
  <div class="p-4">
    <div class="px-4 pt-6 bg-white">
      <el-form :inline="true" :model="null" class="demo-form-inline">
        <el-form-item label="文章标题">
          <el-input placeholder="标题标题" v-model="pager.queryParams!.title" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input placeholder="描述" v-model="pager.queryParams!.describes"/>
        </el-form-item>
        <el-form-item label="标签">
          <el-select placeholder="请选择标签" v-model="pager.queryParams!.tag!.tagId">
            <el-option v-for="(item, index) in tagList" :key="index" :label="item.name" :value="item.tagId" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="创建时间">
          <el-date-picker
          v-model="pager.queryParams.createTimeRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <button
            class="bg-blue-500 hover:shadow-blue-500/50 text-white rounded hover:shadow-md duration-300 px-4"
            @click="query"
          >
            搜索
          </button>
        </el-form-item>
        <el-form-item>
          <button
            class="-ml-4 bg-slate-500 hover:shadow-slate-500/50 text-white rounded hover:shadow-md duration-300 px-4"
            @click="reset"
          >
            重置
          </button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bg-white p-2 h-[730px] overflow-hidden">
      <el-table :data="pager.rows" style="width: 100%">
        <el-table-column label="文章标题" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.title }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.describes }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文章标签" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-tag
                v-for="tag in scope.row.tags"
                :key="tag.tagId"
                class="mx-1"
                type="success"
                effect="dark"
                :color="tag.tabColor"
              >
                {{ tag.name }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文章状态" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span class="text-xs text-green-500" v-if="scope.row.status === 0"
                >草稿箱</span
              >
              <span class="text-xs text-green-500" v-if="scope.row.status === 1"
                >审核中
              </span>
              <span
                class="text-xs text-blue-500"
                v-else-if="scope.row.status === 2"
                >审核通过</span
              >
              <span
                class="text-xs text-red-500"
                v-else-if="scope.row.status === 3"
                >审核不通过</span
              >
              <span
                class="text-xs text-gray-500"
                v-else-if="scope.row.status === 4"
                >已发布</span
              >
              <span
                class="text-xs text-purple-500"
                v-else-if="scope.row.status === 5"
                >回收站</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <el-icon><timer /></el-icon>
              <span style="margin-left: 10px">{{
                scope.row.createTimeStr
              }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="preview(scope.row)">预览</el-button>
            <el-button size="small" @click="audit(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bg-white py-2">
      <div class="demo-pagination-block">
        <el-pagination
          v-model:currentPage="pager.page"
          v-model:page-size="pager.size"
          :small="false"
          :disabled="false"
          :background="false"
          layout="prev, pager, next, jumper"
          :total="pager.total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>

  <el-dialog
    v-model="dialogTableVisible"
    title="文章预览"
    width="1050px"
    top="2vh"
  >
    <ShowArticle
      :article="previewData.article"
      :is-show-list="previewData.isShowList"
    ></ShowArticle>
  </el-dialog>

  <el-dialog v-model="auditVisible" title="文章审核" width="400px">
    <el-form label-width="100px">
      <el-form-item label="选择类型">
        <el-select v-model="auditForm.status">
          <el-option label="审核中" select :value="1" />
          <el-option label="审核通过" :value="2" />
          <el-option label="审核不通过" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="不通过原因">
        <el-input v-model="auditForm.auditMessage" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import ShowArticle from "@/components/article/show/ShowArticle.vue";
import ArticleApi from "@/modle/ArticleApi";
import { Article, Pages, Tag } from "@/modle/axios/types";
import TagApi from "@/modle/TagApi";
import { Timer } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

const dialogTableVisible = ref(false);
const auditVisible = ref(false);
const previewData = ref({
  article: {} as Article,
  isShowList: false,
});

const preview = (article: Article) => {
  console.log(article);
  previewData.value.article = article;
  dialogTableVisible.value = true;
};

const auditForm = ref({
  articleId: -1,
  status: 0,
  auditMessage: "",
});
const audit = (article: Article) => {
  auditForm.value.articleId = article.articleId!;
  auditVisible.value = true;
};
const onSubmit = () => {
  const article: Article = auditForm.value;
  ArticleApi.updateArticle(article).then((res) => {
    ElMessage("审核成功");
  });
};

const handleEdit = (index: number, row: Article) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: Article) => {
  console.log(index, row);
};
const pager = ref<Pages<Article>>({
  size: 10,
  page: 1,
  queryParams: { status: 1 ,tag:{}},
});
const tagList = ref<Tag[]>([]);
onMounted(() => {
  ArticleApi.findArticlePage(pager.value).then((res) => {
    pager.value = res.data;
  });
  TagApi.findAllTag().then((res: any) => {
    console.log(res.data)
    tagList.value=res.data;
  });
});
const query = () => {
  ArticleApi.findArticlePage(pager.value).then((res) => {
    pager.value = res.data;
  });
};
const reset = () => {
  pager.value.queryParams = { status: 1 ,tag:{}};
  query();
};

//分页
const handleCurrentChange = (val: number) => {
  pager.value.page = val;
  ArticleApi.findArticlePage(pager.value).then((res) => {
    pager.value = res.data;
  });
};
</script>
