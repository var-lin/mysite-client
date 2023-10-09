<template>
  <div class="blog-list-container" v-loading="isLoading" ref="mainContainer">
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
          <h2 style="margin: 0 0 15px; min-width: 500px">{{ item.title }}</h2>
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
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from "@/mixins/fetchData.js";
import mainScroll from "@/mixins/mainScroll";
import { getBlogs } from "@/api/blog";
import { formatDate } from "@/utils";
import Empty from "@/components/Empty";
import eventBus from "@/eventBus";
// import { server_URL } from "@/urlConfig";

export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("mainContainer")],
  components: {
    Pager,
    Empty,
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
      // 为了优化速度，把数据一定要全部循环的代码和部分循环的代码分开
      const resFor = (() => {
        // 需要全部都修改的代码函数
        function allModifications(data) {
          if (data.title.length > 70) {
            data.description = data.description.slice(0, 70) + "...";
          }
          if (data.description.length > 200) {
            data.description = data.description.slice(0, 200) + "...";
          }
        }
        if (this.routeInfo.categoryId == -1) {
          // 部分修改 + 全部修改
          return (data) => {
            allModifications(data);
            if (this.routeInfo.categoryId == -1) {
              data.title = `[${data.category.name}] ${data.title}`;
            }
          };
        }
        return (data) => {
          allModifications(data);
        };
      })();
      res.rows.forEach(resFor);
      // 向搜索框传入本次文章的全部文章总数和文章分类id
      eventBus.$emit(
        "blogTotalAndCategoryId",
        res.total,
        this.routeInfo.categoryId
      );

      // res.rows.forEach((data, i) => {
      //   data.thumb = server_URL + data.thumb;
      // });
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
  position: relative;
  padding: 20px;
  padding-top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 95%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
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
</style>