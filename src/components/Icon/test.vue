<template>
  <div class="test-container">
    <Icon class="icon" v-for="(v, i) in typeList" :key="i" :type="v" />
  </div>
</template>

<script>
import Icon from "./";
export default {
  name: "App",
  data() {
    return {
      typeList: [
        "warn",
        "up",
        "down",
        "weixin",
        "error",
        "info",
        "chat",
        "close",
        "blog",
        "about",
        "success",
        "code",
        "qq",
        "github",
        "empty",
        "email",
        "home",
      ],
    };
  },
  components: {
    Icon,
  },
};
</script>

<style lang="less" scoped>
.test-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 100px 100px 100px;
  i {
    text-align: center;
    line-height: 100px;
    font-size: 30px;
    color: #008c8c;
    cursor: pointer;
  }
}
</style>