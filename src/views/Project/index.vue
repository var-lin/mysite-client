<template>
  <div class="project-container" ref="projectContainer" v-loading="loading">
    <div v-for="item in data" :key="item.id">
      <div class="project-item">
        <a
          :href="
            item.url ? item.url : `javascript:alert('该项目无法通过外网访问'))`
          "
          :target="item.url ? '_blank' : '_seif'"
        >
          <img v-lazy="item.thumb" class="thumb" />
        </a>

        <div class="info">
          <h2>
            <a
              :href="
                item.url
                  ? item.url
                  : `javascript:alert('该项目无法通过外网访问'))`
              "
              :target="item.url ? '_blank' : '_seif'"
            >
              {{ item.name }}
            </a>
          </h2>
          <a
            :href="item.github"
            v-if="item.github"
            class="github"
            target="_blank"
            >github</a
          >
          <div class="desc" v-if="!$isMobile">
            <p v-for="(desc, i) in item.description" :key="i">
              {{ desc }}
            </p>
          </div>
        </div>
      </div>
      <div class="desc" v-if="$isMobile">
        <p v-for="(desc, i) in item.description" :key="i">
          {{ desc }}
        </p>
      </div>
    </div>

    <Empty v-if="data.length === 0 && !loading" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import mainScroll from "@/mixins/mainScroll";
import Empty from "@/components/Empty";

export default {
  mixins: [mainScroll("projectContainer")],
  components: {
    Empty,
  },
  created() {
    this.$store.dispatch("project/fetchProject");
  },
  computed: mapState("project", ["loading", "data"]),
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.project-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;

  .project-item {
    transition: 0.5s;
    padding: 20px;
    display: flex;
    margin-bottom: 20px;
    border-radius: 5px;

    &:hover {
      box-shadow: -1px 1px 5px #000;
      transform: scale(1.01) translate(3px, -3px);
      color: inherit;
    }

    .thumb {
      width: 200px;
      min-height: 150px;
      flex: 0 0 auto;
      object-fit: cover;
      border-radius: 20px;
      margin-right: 15px;
    }

    .info {
      line-height: 1.7;
      flex: 1 1 auto;

      h2 {
        margin: 0;
        max-height: 5em;
        overflow-y: scroll;

        &::-webkit-scrollbar {
          width: 0;
        }
      }
    }

    .github {
      font-size: 14px;
      color: @primary;
    }
  }
}
</style>