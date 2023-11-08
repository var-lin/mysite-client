<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData";
import mainScroll from "@/mixins/mainScroll";
import { getMessages, postMessage } from "@/api/message";
// import { server_URL } from "@/urlConfig";

export default {
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  mixins: [
    fetchData({ total: 0, rows: [] }, false),
    mainScroll("messageContainer"),
  ],
  async created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async fetchData() {
      const res = await getMessages(this.page, this.limit);
      // res.rows.forEach((data, i) => {
      //   data.avatar = server_URL + data.avatar;
      // });
      return res;
    },
    async handleSubmit(data, callback) {
      const res = await postMessage(data);
      // res.avatar = server_URL + res.avatar;
      if (res) {
        if (data.identity) {
          res.identity = data.identity;
        }
        this.data.rows.unshift(res);
        this.data.total++;
      }
      callback(res, "感谢你的留言");
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
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
};
</script>

<style lang="less" scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>