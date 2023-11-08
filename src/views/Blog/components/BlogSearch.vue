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
    currentArticle: {
      type: Object,
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
  methods: {
    async fetchData() {
      await getBlogs(1, this.currentArticle.total, this.categoryId).then(
        (res) => {
          // 删除未分类的文章
          res.rows.forEach((data) => {
            if (!data.category) {
              data.category = {
                name: "未分类",
              };
            }
            // 有分类并让多余文字打点显示
            if (data.title.length > 70) {
              data.description = data.description.slice(0, 70) + "...";
            }
            if (data.description.length > 200) {
              data.description = data.description.slice(0, 200) + "...";
            }
            return data;
          });
          // 数据冻结，避免数据响应式vue再次遍历
          this.blogs = Object.freeze(res.rows);
        }
      );
    },
    async searchHandle() {
      // 获取全部文章
      if (this.blogs.length == 0) {
        if (this.currentArticle.total > 10) {
          await this.fetchData();
        } else {
          this.blogs = this.currentArticle.rows;
        }
      }

      if (!this.value) {
        this.$showMessage({
          content: "请输入搜索词",
          type: "error",
          duration: 1500,
        });
        return;
      }

      if (!this.isSearch) {
        this.$showMessage({
          content: "你的操作太迅速",
          type: "error",
          duration: 1500,
        });
        return;
      }

      // 拿取搜索过的文章内容，不进行再次搜索，利用sessionStorage，关闭网页后清除自动保存的文章
      let blogArrCache = sessionStorage.getItem(this.categoryId);
      blogArrCache = blogArrCache ? JSON.parse(blogArrCache) : {};
      if (blogArrCache[this.value]) {
        this.$emit("searchList", blogArrCache[this.value]);

        this.$showMessage({
          content: `共搜索到 ${blogArrCache[this.value].length} 个内容`,
          type: "success",
          duration: 1500,
        });
        return;
      }

      // 计时
      const firstTime = Date.now();

      // 搜索内容转小写
      const value = this.value.toLocaleLowerCase();
      // 禁止搜索
      this.isSearch = false;

      // 数据冻结，避免数据响应式vue再次遍历
      const searchArr = Object.freeze(
        this.blogs.filter((data) => {
          const title = data.title.toLocaleLowerCase();
          if (title.includes(value)) {
            // 存在用户想要的文章（忽略大小写）
            return data;
          }
        })
      );

      // 计算耗时 单位-秒
      const lastTime = Date.now();
      let timeConsuming = (firstTime - lastTime) / 1000;
      timeConsuming = timeConsuming < 0 ? 0 : timeConsuming;

      // 想文章列表发送搜索结果
      const searchArrLength = searchArr.length;
      if (searchArrLength) {
        blogArrCache[this.value] = searchArr;
        sessionStorage.setItem(this.categoryId, JSON.stringify(blogArrCache));

        // 有内容传值给父组件
        this.$emit("searchList", searchArr);

        this.$showMessage({
          content: `共搜索到 ${searchArrLength} 个内容 —— 耗时 ${timeConsuming} 秒`,
          type: "success",
          duration: 1500,
        });
      } else {
        this.$showMessage({
          content: `未搜索到相关内容 —— 耗时 ${timeConsuming} 秒`,
          type: "error",
          duration: 1500,
        });
      }

      // searchDelaytiem秒后可以再次搜索
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