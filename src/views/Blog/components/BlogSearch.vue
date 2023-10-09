<template>
  <div class="search" v-if="blogs">
    <input
      type="search"
      v-model.trim="value"
      placeholder="请输入关键词"
      @input="
        if (!value) {
          isDisplaySearchUl = false;
          searchArr = [];
        }
      "
      @keyup.enter="searchHandle"
      @mouseover="
        isEnterInput = true;
        if (searchArr.length && value && !isDisplaySearchUl) {
          isDisplaySearchUl = true;
        }
      "
      @mouseleave="isEnterInput = false"
      @blur="
        if (!isEnterUl) {
          isDisplaySearchUl = false;
        }
      "
    />
    <button @click="searchHandle">搜 索</button>
    <ul
      v-show="isDisplaySearchUl && value"
      @mouseover="isEnterUl = true"
      @mouseleave="
        isEnterUl = false;
        if (!isEnterInput && isDisplaySearchUl) {
          isDisplaySearchUl = false;
        }
      "
    >
      <li v-for="item in searchArr" :key="item.id">
        <RouterLink
          :to="{
            name: 'BlogDetail',
            params: {
              id: item.id,
            },
          }"
        >
          <div>
            <span v-if="categoryId == -1" style="color: #999; margin-right: 5px"
              >[{{ item.categoryName }}]</span
            >
            <span v-html="item.title"></span>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { getBlogs } from "@/api/blog";
import eventBus from "@/eventBus";

export default {
  data() {
    return {
      blogs: {}, // 全部文章
      categoryId: "", // 文章分类id
      value: "", // 输入框的内容
      searchArr: [], // 搜索的数据
      isDisplaySearchUl: false, // 鼠标是否显示搜索列表
      isEnterInput: false, // 鼠标是否进入输入框
      isEnterUl: false, // 鼠标是否进入搜索列表
      searchDelaytiem: 1000, // 搜索延迟
      isSearch: true, // 是否可以搜索
    };
  },
  created() {
    eventBus.$on("blogTotalAndCategoryId", (total, categoryId) => {
      this.categoryId = categoryId;
      getBlogs(1, total, categoryId).then((res) => {
        this.blogs = res.rows;
      });
    });
  },
  methods: {
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

      const value = this.value.toLocaleLowerCase();
      this.isSearch = false;
      const searchArr = [];
      this.blogs.forEach((data) => {
        const title = data.title.toLocaleLowerCase();
        if (title.includes(value)) {
          // 存在用户想要的文章（忽略大小写）
          searchArr.push({
            title: data.title,
            categoryName: data.category.name,
            id: data.id,
          });
        }
      });

      const searchArrLength = searchArr.length;
      if (searchArrLength) {
        this.searchArr = searchArr;
        this.isDisplaySearchUl = true;
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
  margin: 10px 0;
  min-width: 520px;
  height: 5%;
  position: relative;

  input {
    width: 420px;
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
    background-color: #000;
    cursor: pointer;
  }
  ul {
    margin: 0;
    border: 3px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 222px;
    overflow-y: scroll;
    text-align: left;
    background: #fff;
    font-size: 14px;
    z-index: 2;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: #f5f5f5;
    }

    /*定义滚动条轨道内阴影+圆角*/

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #f5f5f5;
    }

    /*定义滑块内阴影+圆角*/

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #555;
    }

    li {
      list-style: none;
      padding: 10px;
      border-radius: 5px;

      &:hover {
        background-color: #eee;
      }

      div {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>