<template>
  <Layout rightShowText="显示文章分类" rightHideText="隐藏文章分类">
    <BlogList />
    <template #right>
      <BlogCategory />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import BlogList from "./components/BlogList";
import BlogCategory from "./components/BlogCategory";

export default {
  components: {
    Layout,
    BlogList,
    BlogCategory,
  },
};
</script>

<style lang="less" scoped>
</style>