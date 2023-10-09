<template>
  <Layout>
    <BlogSearch />
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
import BlogSearch from "./components/BlogSearch";

export default {
  components: {
    Layout,
    BlogList,
    BlogCategory,
    BlogSearch,
  },
};
</script>

<style lang="less" scoped>
</style>