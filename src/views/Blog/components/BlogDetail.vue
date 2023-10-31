<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期：{{ formatDate(blog.createDate) }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论：{{ blog.commentNumber }}</a>
      <RouterLink
        v-if="blog.category.id"
        :to="{
          name: 'CategoryBlog',
          params: {
            categoryId: blog.category.id,
          },
        }"
        >分类：{{ blog.category.name }}</RouterLink
      >
      <RouterLink
        v-else
        :to="{
          name: 'Blog',
        }"
        >分类：{{ blog.category.name }}</RouterLink
      >
      <div class="description">描述：{{ blog.description }}</div>
    </div>
    <div
      v-html="blog.htmlContent"
      class="markdown-body"
      ref="markdownBody"
    ></div>
  </div>
</template>

<script>
import { formatDate } from "@/utils";
import "@/styles/markdown.css";
import "highlight.js/styles/github.css";

export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  created() {
    if (!this.blog.category) {
      this.blog.category = {
        name: "未分类",
      };
    }
  },
  mounted() {
    // 让文章里的全部a链接在新页面打开
    const markdown_a = this.$refs.markdownBody.querySelectorAll("a");
    if (markdown_a.length) {
      markdown_a.forEach((target) => {
        target.target = "_blank";
      });
    }
  },
  methods: {
    formatDate,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blog-detail-container {
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
    a {
      margin-right: 15px;
    }
    .description {
      margin-top: 10px;
      font-size: 14px;
      color: #666;
    }
  }
  .markdown-body {
    margin: 2em 0;
    a {
      margin-left: 50px !important;
    }
  }
}
</style>