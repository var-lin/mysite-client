<template>
  <div class="layout-pontainer">
    <div class="left" v-show="leftDisplayText">
      <slot name="left"></slot>
    </div>

    <button
      class="leftDisplayBtn displayBtn"
      v-if="$slots.left && $isMobile"
      @click="leftDisplayText = !leftDisplayText"
    >
      {{ leftDisplayText ? leftHideText : leftShowText }}
    </button>

    <div class="main">
      <slot></slot>
    </div>

    <button
      class="rightDisplayBtn displayBtn"
      v-if="$slots.right && $isMobile"
      @click="rightDisplayText = !rightDisplayText"
    >
      {{ rightDisplayText ? rightHideText : rightShowText }}
    </button>

    <div class="right" v-show="rightDisplayText">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leftShowText: {
      default: "显示",
      type: String,
    },
    leftHideText: {
      default: "隐藏",
      type: String,
    },
    rightShowText: {
      default: "显示",
      type: String,
    },
    rightHideText: {
      default: "隐藏",
      type: String,
    },
  },
  data() {
    return {
      leftDisplayText: this.$isMobile ? false : true,
      rightDisplayText: this.$isMobile ? false : true,
    };
  },
  watch: {
    $route() {
      if (this.$isMobile) {
        this.leftDisplayText = false;
        this.rightDisplayText = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.layout-pontainer {
  width: 100%;
  height: 100%;
  display: flex;

  .left .right .displayBtn {
    flex: 0 0 auto;
  }

  .main {
    flex: 1 1 auto;
    overflow: hidden;
  }

  .displayBtn {
    width: 2em;
    background-color: #eee;
    border: none;
    outline: none;
    font-size: 16px;
    color: #666;

    &:hover {
      color: #333;
    }
  }
}
</style>