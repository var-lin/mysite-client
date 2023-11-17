<template>
  <div class="site-aside-container">
    <template v-if="data">
      <RouterLink
        :to="{
          path: '/',
        }"
      >
        <Avatar :url="data && data.avatar" />
      </RouterLink>
      <h1 class="title">{{ data.siteTitle }}</h1>
    </template>

    <Menu />
    <Contact v-if="data" />
    <p class="footer" v-if="data">{{ data.icp }}</p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar/";
import Menu from "./Menu/";
import Contact from "./Contact/";
import { mapState } from "vuex";
export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  .avatar-container {
    margin: 0 auto;
  }
  .title {
    font-size: 1.2em;
    color: #fff;
    text-align: center;
  }
  .footer {
    text-align: center;
    font-size: 12px;
  }
}
</style>