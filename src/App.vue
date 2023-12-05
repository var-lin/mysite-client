<template>
  <div class="app-conptainer">
    <Layout leftShowText="显示导航" leftHideText="隐藏导航">
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <RouterView />
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from "./components/Layout";
import SiteAside from "./components/SiteAside";
import ToTop from "./components/ToTop";
export default {
  name: "App",
  components: {
    Layout,
    SiteAside,
    ToTop,
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.app-conptainer {
  .self-fill(fixed);
  .aside {
    width: 250px;
    height: 100%;
  }
}
</style>