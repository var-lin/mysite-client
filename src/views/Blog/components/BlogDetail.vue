<template>
  <div class="blog-detail-container">
    <span @click="$router.go(-(routeJumpNum + 1))" class="return"><返回</span>
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
  data() {
    return {
      routeJumpNum: 0,
    };
  },
  created() {
    if (!this.blog.category) {
      this.blog.category = {
        name: "未分类",
      };
    }
  },
  methods: {
    formatDate,
  },
  watch: {
    $route() {
      this.routeJumpNum++;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.blog-detail-container {
  .return {
    position: sticky;
    top: 0;
    padding: 10px;
    border-radius: 5px;
    background-color: #409eff;
    color: #fff;
    width: 100%;
    white-space: nowrap;
    cursor: pointer;
  }

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
  }
}
</style>