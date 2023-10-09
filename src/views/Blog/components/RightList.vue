<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i" @click="handleClick(item)">
      <span :class="{ active: item.isSelect }">{{ item.name }}</span>
      <span
        v-if="item.aside"
        class="aside"
        :class="{ active: item.isSelect }"
        >{{ item.aside }}</span
      >
      <RightList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      if (!item.isSelect) {
        this.$emit("select", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.right-list-container {
  list-style: none;
  padding: 0;
  .right-list-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;
    cursor: pointer;
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
  .aside {
    font-size: 12px;
    margin-left: 1em;
  }
}
</style>