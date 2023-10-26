<template>
  <div class="blog-list-container" v-loading="isLoading" ref="mainContainer">
    <BlogSearch
      v-if="!isLoading"
      :currentArticle="data"
      :categoryId="routeInfo.categoryId"
      @searchList="searchListHandle"
    />
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <RouterLink
          target="_blank"
          :to="{
            name: 'BlogDetail',
            params: {
              id: item.id,
            },
          }"
        >
          <h2 style="margin: 0 0 15px; min-width: 500px">{{ item.title }}</h2>
        </RouterLink>
        <div style="display: flex">
          <div class="thumb" v-if="item.thumb">
            <RouterLink
              target="_blank"
              :to="{
                name: 'BlogDetail',
                params: {
                  id: item.id,
                },
              }"
            >
              <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
            </RouterLink>
          </div>
          <div class="main" style="min-width: 280px">
            <div class="aside">
              <span>日期：{{ formatDate(item.createDate) }}</span>
              <span>浏览：{{ item.scanNumber }}</span>
              <span>评论：{{ item.commentNumber }}</span>
              <RouterLink
                :to="{
                  name: 'CategoryBlog',
                  params: {
                    categoryId: item.category.id,
                  },
                }"
                >{{ item.category.name }}</RouterLink
              >
            </div>
            <div class="desc">
              {{ item.description }}
            </div>
          </div>
        </div>
      </li>
    </ul>

    <Empty v-if="data.rows.length === 0 && !isLoading" />
    <!-- 分页 -->
    <Pager
      v-if="data.total"
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      :visibleNumber="10"
      @pageChange="handlePageChange"
    />

    <div
      class="reData"
      v-if="isReData"
      @click="
        data = oldData;
        isReData = false;
      "
    >
      返回
    </div>
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData.js";
import mainScroll from "@/mixins/mainScroll";
import { getBlogs } from "@/api/blog";
import { formatDate } from "@/utils";
import Empty from "@/components/Empty";
import BlogSearch from "./BlogSearch";
// import { server_URL } from "@/urlConfig";

export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("mainContainer")],
  components: {
    Pager,
    Empty,
    BlogSearch,
  },
  data() {
    return {
      totalNum: 0,
      isReData: false,
      oldData: {},
    };
  },
  computed: {
    routeInfo() {
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      const categoryId = this.$route.params.categoryId || -1;
      return {
        page,
        limit,
        categoryId,
      };
    },
  },
  methods: {
    async fetchData() {
      const res = await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      );

      // 向搜索框传入本次文章的全部文章总数和文章分类id
      this.totalNum = res.total;

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

      // res.rows.forEach((data, i) => {
      //   data.thumb = server_URL + data.thumb;
      // });

      // 保存一份旧数据搜索后可以返回
      this.oldData = res;
      if (this.isReData) {
        this.isReData = false;
      }

      return res;
    },
    formatDate,
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      if (this.routeInfo.categoryId === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
    searchListHandle(data) {
      this.data = {
        rows: data,
      };
      this.isReData = true;
    },
  },
  watch: {
    async $route() {
      this.isLoading = true;
      this.$refs.mainContainer.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  padding: 20px;
  padding-top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;

  .reData {
    text-align: center;
    position: fixed;
    right: 50px;
    bottom: 150px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    border-radius: 50%;
    background-color: @gray;
    z-index: 999;
    cursor: pointer;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      &:first-child {
        padding-top: 0;
      }
      padding: 15px 0;
      border-bottom: 1px solid @gray;

      .thumb {
        margin-right: 15px;

        img {
          display: block;
          width: 200px;
          border-radius: 5px;
        }
      }

      .aside {
        font-size: 12px;
        color: @gray;

        span {
          margin-right: 15px;
        }
      }

      .desc {
        margin-top: 15px;
        font-size: 14px;
        height: 92px;
        line-height: 92px /4;
        overflow: hidden;
      }
    }
  }
}
</style>