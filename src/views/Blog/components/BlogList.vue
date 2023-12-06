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
          :to="{
            name: 'BlogDetail',
            params: {
              id: item.id,
            },
          }"
        >
          <h2 style="margin: 0 0 15px">{{ item.title }}</h2>
        </RouterLink>
        <div style="display: flex">
          <div class="thumb" v-if="item.thumb">
            <RouterLink
              :to="{
                name: 'BlogDetail',
                params: {
                  id: item.id,
                },
              }"
            >
              <img
                v-lazy="item.thumb"
                :alt="item.title"
                :title="item.title"
                :style="{ width: $isMobile ? '100px' : '200px' }"
              />
            </RouterLink>
          </div>
          <div class="main">
            <div class="aside">
              <span
                :style="{
                  display: $isMobile ? 'block' : 'inline',
                }"
                >日期：{{ formatDate(item.createDate) }}</span
              >
              <span
                :style="{
                  display: $isMobile ? 'block' : 'inline',
                }"
                >浏览：{{ item.scanNumber }}</span
              >
              <span
                :style="{
                  display: $isMobile ? 'block' : 'inline',
                }"
                >评论：{{ item.commentNumber }}</span
              >
              <RouterLink
                v-if="item.category.id"
                :to="{
                  name: 'CategoryBlog',
                  params: {
                    categoryId: item.category.id,
                  },
                }"
                >{{ item.category.name }}</RouterLink
              >
              <RouterLink
                v-else
                :to="{
                  name: 'Blog',
                }"
                >分类：{{ item.category.name }}</RouterLink
              >
            </div>
            <div class="desc" v-if="!$isMobile">
              {{ item.description }}
            </div>
          </div>
        </div>
        <div class="desc" v-if="$isMobile">
          {{ item.description }}
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

      res.rows.forEach((data) => {
        // 未分类的文章添加name
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
      });

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
      this.$refs.mainContainer.scrollTop = 0;
    },
  },
  watch: {
    async $route() {
      if (!this.$route.query.search) {
        this.isLoading = true;
        this.$refs.mainContainer.scrollTop = 0;
        this.data = await this.fetchData();
        this.isLoading = false;
      }
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
      overflow: hidden;

      .thumb {
        margin-right: 15px;

        img {
          display: block;
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

      @descHeight: 92px;
      .desc {
        margin-top: 15px;
        font-size: 14px;
        max-height: @descHeight;
        line-height: @descHeight / 4;
        overflow: hidden;
      }
    }
  }
}
</style>