<template>
  <div class="test-container">
    <Pager
      :total="302"
      :current="current"
      @pageChange="handlePageChange($event)"
    />
  </div>
</template>

<script>
import Pager from "./";

export default {
  data() {
    return {
      current: 1,
    };
  },
  components: {
    Pager,
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
    },
  },
};
</script>

<style lang="less"></style>