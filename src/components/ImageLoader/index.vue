<template>
  <div class="image-loader-container">
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" />
    <img
      @load="handleLoad"
      :src="src"
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      require: true,
    },
    placeholder: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      orginLoaded: false,
      everythingDone: false,
    };
  },
  computed: {
    originOpacity() {
      return this.orginLoaded ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.orginLoaded = true;
      setTimeout(() => {
        this.everythingDone = true;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(25px);
  }
}
</style>