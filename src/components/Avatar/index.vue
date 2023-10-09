<template>
  <img
    :src="url"
    class="avatar-container"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  />
</template>

<script>
export default {
  props: {
    // 头像图片路径
    url: {
      type: String,
      required: true,
    },
    // 头像尺寸，宽高相等
    size: {
      type: Number,
      default: 150,
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-container {
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>