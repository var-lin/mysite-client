<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期：{{ formatDate(blog.createDate) }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论：{{ blog.commentNumber }}</a>
      <RouterLink
        :to="{
          name: 'CategoryBlog',
          params: {
            categoryId: blog.category.id,
          },
        }"
        >分类：{{ blog.category.name }}</RouterLink
      >
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
  mounted() {
    // 让文章里的全部a链接在新页面打开
    this.replaced_A_Target();
  },
  methods: {
    formatDate,
    replaced_A_Target() {
      const a = this.$refs.markdownBody.querySelectorAll("a");
      a.forEach((target) => {
        target.target = "_blank";
      });
    },
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
  }
  .markdown-body {
    margin: 2em 0;
    a {
      margin-left: 50px !important;
    }
  }
}
</style>