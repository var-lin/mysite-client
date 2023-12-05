<template>
  <Layout rightShowText="显示文章目录" rightHideText="隐藏文章目录">
    <div class="main-container" v-loading="isLoading" ref="mainContainer">
      <BlogDetail v-if="data" :blog="data" />
      <BLogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import { getBlog } from "@/api/blog";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogTOC from "./components/BlogTOC";
import BLogComment from "./components/BlogComment";
import { titleController } from "@/utils";
export default {
  mixins: [fetchData(null), mainScroll("mainContainer")],
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BLogComment,
  },
  methods: {
    async fetchData() {
      const res = await getBlog(this.$route.params.id);
      if (!res) {
        this.$router.push("/404");
        return;
      }
      titleController.setRouteTitle(res.title);
      return res;
    },
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style lang="less" scoped>
.main-container {
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  scroll-behavior: smooth;
}
.right-container {
  min-width: 200px;
  max-width: 300px;
  height: 100%;
  padding: 15px;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
}
</style>