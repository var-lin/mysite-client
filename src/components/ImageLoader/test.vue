<template>
  <div class="test-container">
    <ImageLoader
      src="https://img2.baidu.com/it/u=1349296340,691673466&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1685552400&t=f29156e04fd0cebbc1b21575315d7e30"
      placeholder="https://img2.baidu.com/it/u=1349296340,691673466&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1685552400&t=f29156e04fd0cebbc1b21575315d7e30"
      :duration="1000"
      @load="hanleLoaded"
    />
  </div>
</template>

<script>
import ImageLoader from "./";
export default {
  components: {
    ImageLoader,
  },
  methods: {
    hanleLoaded() {
      console.log("图片加载完成");
    },
  },
};
</script>

<style lang="less" scoped>
.test-container {
  width: 500px;
  height: 400px;
  border: 2px solid;
  margin: 20px auto;
}
</style>