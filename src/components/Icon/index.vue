<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
const classMap = {
  warn: "icon-jinggao",
  up: "icon-xiangshang",
  down: "icon-xiangxia",
  weixin: "icon-weixin",
  error: "icon-cuowu",
  info: "icon-xinxi",
  chat: "icon-liuyan",
  close: "icon-guanbi",
  blog: "icon-blog",
  about: "icon-about",
  success: "icon-zhengque",
  code: "icon-code",
  qq: "icon-QQ",
  github: "icon-github",
  empty: "icon-empty",
  email: "icon-email",
  home: "icon-Home",
};
export default {
  props: {
    // 图标类型
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    fontClass() {
      return classMap[this.type];
    },
  },
};
</script>

<style lang="less" scoped>
@import "//at.alicdn.com/t/c/font_4092856_x9ecd9dmkkr.css";
.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>