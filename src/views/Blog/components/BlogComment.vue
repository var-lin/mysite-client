<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import { getComments, postComment } from "@/api/blog";
// import { server_URL } from "@/urlConfig";

export default {
  mixins: [fetchData({ total: 0, rows: [] }, false)],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  methods: {
    async fetchData() {
      const res = await getComments(
        this.$route.params.id,
        this.page,
        this.limit
      );
      // res.rows.forEach((data, i) => {
      //   data.avatar = server_URL + data.avatar;
      // });
      return res;
    },
    async fetchMore() {
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const res = await this.fetchData();
      this.data.total = res.total;
      this.data.rows = this.data.rows.concat(res.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      const res = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      // res.avatar = server_URL + res.avatar;
      if (res) {
        if (formData.identity) {
          res.identity = formData.identity;
        }
        this.data.rows.unshift(res);
        this.data.total++;
      }
      callback(res, "感谢你的评论");
    },
    async handleScroll(dom) {
      if (this.isLoading || !dom) {
        return;
      }
      const range = 100;
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        this.fetchMore();
      }
    },
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
.blog-comment-container {
  margin: 30px 0;
}
</style>