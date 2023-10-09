<template>
  <RightList :list="list" @select="handleSelect" />
</template>

<script>
import RightList from "./RightList";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      list: [
        { name: "a", isSelect: false },
        { name: "b", isSelect: false },
        { name: "c", isSelect: false },
        { name: "d", isSelect: true },
        {
          name: "e",
          isSelect: false,
          children: [
            { name: "a1", isSelect: false },
            { name: "b2", isSelect: false },
            {
              name: "c3",
              isSelect: false,
              children: [
                { name: "a1-1", isSelect: false },
                { name: "b2-2", isSelect: true },
                { name: "c3-3", isSelect: false },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style lang="less" scoped>
</style>