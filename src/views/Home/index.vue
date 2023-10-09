<template>
  <div
    v-loading="loading"
    class="home-container"
    ref="container"
    @wheel="handleWheel"
  >
    <ul
      class="carousel-container"
      :style="{
        marginTop,
      }"
      @transitionend="handleTransition"
    >
      <li v-for="item in data" :key="item.id">
        <CarouseItem :carousel="item" />
      </li>
    </ul>
    <div v-show="index >= 1" @click="switchTo(index - 1)" class="icon icon-up">
      <Icon type="up" />
    </div>
    <div
      v-show="index < data.length - 1"
      @click="switchTo(index + 1)"
      class="icon icon-down"
    >
      <Icon type="down" />
    </div>
    <ul class="indicator">
      <li
        v-for="(item, i) in data"
        :key="item.id"
        :class="{
          active: i === index,
        }"
        @click="switchTo(i)"
      ></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CarouseItem from "./CarouseItem";
import Icon from "@/components/Icon";
export default {
  components: {
    CarouseItem,
    Icon,
  },
  data() {
    return {
      index: 0,
      containerHeight: 0,
      swirching: false,
    };
  },
  created() {
    this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },
  methods: {
    switchTo(i) {
      this.index = i;
    },
    handleWheel(e) {
      if (this.swirching) {
        return;
      }
      if (e.deltaY < -5 && this.index) {
        this.swirching = true;
        this.index--;
      } else if (e.deltaY > 5 && this.index < this.data.length - 1) {
        this.swirching = true;
        this.index++;
      }
    },
    handleTransition() {
      this.swirching = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .carousel-container {
    width: 100%;
    height: 100%;
    transition: 500ms;
    li {
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    .self-center();
    font-size: 30px;
    color: @gray;
    cursor: pointer;
    transform: translate(-50%);
    @gap: 15px;
    &.icon-up {
      top: @gap;
      animation: jump-up 2s infinite;
    }
    &.icon-down {
      top: auto;
      bottom: @gap;
      animation: jump-down 2s infinite;
    }
    @jump: 5px;
    @keyframes jump-up {
      0% {
        transform: translate(-50%, @jump);
      }
      50% {
        transform: translate(-50%, -@jump);
      }
      100% {
        transform: translate(-50%, @jump);
      }
    }
    @keyframes jump-down {
      0% {
        transform: translate(-50%, @jump);
      }
      50% {
        transform: translate(-50%, -@jump);
      }
      100% {
        transform: translate(-50%, @jump);
      }
    }
  }
  .indicator {
    .self-center();
    transform: translateY(-50%);
    left: auto;
    right: 20px;

    li {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: @words;
      cursor: pointer;
      margin-bottom: 10px;
      border: 1px solid #fff;
      box-sizing: border-box;
      transition: 0.5s;
      &.active {
        background: #fff;
      }
    }
  }
}
</style>