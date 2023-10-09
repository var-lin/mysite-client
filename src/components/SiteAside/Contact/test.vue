<template>
  <div class="test-container">
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <Contact />
  </div>
</template>

<script>
import Contact from "./";
import "@/styles/global.less";
export default {
  components: {
    Contact,
  },
};
</script>

<style lang="less" scoped>
.test-container {
  width: 500px;
  height: 400px;
  border: 2px solid;
  margin: 0 auto;
  background: #000;
}
</style>