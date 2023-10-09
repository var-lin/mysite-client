<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }">首页</a>
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }"
      >上一页</a
    >
    <a
      @click="handleClick(n)"
      v-for="(n, i) in numbers"
      :key="i"
      :class="{ active: n === current }"
      >{{ n }}</a
    >
    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === pageNumber }"
      >下一页</a
    >
    <a
      @click="handleClick(pageNumber)"
      :class="{ disabled: current === pageNumber }"
      >尾页</a
    >
  </div>
</template>

<script>
export default {
  props: {
    // 当前页码
    current: {
      type: Number,
      default: 1,
    },
    // 总数据量
    total: {
      type: Number,
      default: 0,
    },
    // 页容量
    limit: {
      type: Number,
      default: 10,
    },
    // 可见页码数
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    visbbleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    visibleMax() {
      let max = this.visbbleMin + this.visibleNumber - 1;
      if (max > this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
    numbers() {
      let nums = [];
      for (let i = this.visbbleMin; i <= this.visibleMax; i++) {
        nums.push(i);
      }
      return nums;
    },
  },
  methods: {
    // 返回事件 返回用户点击页码
    handleClick(newPage) {
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber;
      }
      if (newPage === this.current) {
        return;
      }
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";

.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px auto;

  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;

    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }

    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>