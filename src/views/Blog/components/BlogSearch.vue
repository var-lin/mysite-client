<template>
  <div class="search" v-if="blogs">
    <input
      type="search"
      v-model.trim="value"
      placeholder="请输入关键词"
      @keyup.enter="searchHandle"
    />
    <button @click="searchHandle">搜 索</button>
  </div>
</template>

<script>
import { getBlogs } from "@/api/blog";

export default {
  props: {
    totalNum: {
      type: Number,
      required: true,
    },
    categoryId: {
      required: true,
    },
  },
  data() {
    return {
      blogs: [], // 全部文章
      value: "", // 输入框的内容
      searchDelaytiem: 1000, // 搜索延迟
      isSearch: true, // 是否可以搜索
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await getBlogs(1, this.totalNum, this.categoryId).then((res) => {
        // 删除未分类的文章
        res.rows = res.rows.filter((data) => {
          if (data.category) {
            // 有分类并让多余文字打点显示
            if (data.title.length > 70) {
              data.description = data.description.slice(0, 70) + "...";
            }
            if (data.description.length > 200) {
              data.description = data.description.slice(0, 200) + "...";
            }
            return data;
          }
        });
        this.blogs = res.rows;
      });
    },
    searchHandle() {
      if (!this.blogs) {
        return;
      } else if (!this.value) {
        this.$showMessage({
          content: "请输入搜索词",
          type: "error",
          duration: 1500,
        });
        return;
      } else if (!this.isSearch) {
        this.$showMessage({
          content: "你的操作太迅速",
          type: "error",
          duration: 1500,
        });
        return;
      }

      // 搜索内容转小写
      const value = this.value.toLocaleLowerCase();
      this.isSearch = false;
      const searchArr = [];
      this.blogs.forEach((data) => {
        const title = data.title.toLocaleLowerCase();
        if (title.includes(value) && data.category) {
          // 存在用户想要的文章（忽略大小写）
          searchArr.push(data);
        }
      });

      const searchArrLength = searchArr.length;
      if (searchArrLength) {
        // 有内容传值给父组件
        this.$emit("searchList", {
          rows: searchArr,
        });
        this.$showMessage({
          content: `共搜索到 ${searchArrLength} 个内容`,
          type: "success",
          duration: 1500,
        });
      } else {
        this.isSearch = true;
        this.$showMessage({
          content: "未搜索到相关内容",
          type: "error",
          duration: 1500,
        });
        return;
      }

      setTimeout(() => {
        this.isSearch = true;
      }, this.searchDelaytiem);
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  text-align: center;
  margin: 20px 0;
  min-width: 490px;
  height: 5%;
  position: relative;

  input {
    width: 380px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
  }

  button {
    width: 80px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 10px;
    color: #fff;
    font-weight: bold;
    background-color: #000;
    cursor: pointer;
  }
}
</style>