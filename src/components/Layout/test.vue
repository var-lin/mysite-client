<template>
  <div class="test-conpainer">
    <Layout>
      <template #left>
        <div class="left">左边栏区域</div>
      </template>
      <template>
        <div class="main">主区域</div>
      </template>
      <template #right>
        <div class="right">右边栏区域</div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "./";
export default {
  components: {
    Layout,
  },
};
</script>

<style lang="less" scoped>
.test-conpainer {
  width: 1000px;
  height: 600px;
  border: 2px solid;
  margin: 0 auto;
  .left {
    width: 200px;
    height: 100%;
    background: lightcoral;
  }
  .main {
    width: 100%;
    height: 100%;
    background: lightseagreen;
  }
  .right {
    width: 150px;
    height: 100%;
    background: lightblue;
  }
}
</style>