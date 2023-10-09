<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="hanleMouseLeave"
  >
    <div class="carousel-img" ref="image">
      <ImageLoader
        @load="this.showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
        :style="imagePosition"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";

export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null,
      innerSize: null,
      mouseX: 0,
      mouseY: 0,
    };
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    this.mouseX = this.center.X;
    this.mouseY = this.center.Y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  computed: {
    imagePosition() {
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      const extraWidth = this.innerSize.width - this.containerSize.width;
      const extraHeight = this.innerSize.height - this.containerSize.height;
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px,${top}px)`,
      };
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  methods: {
    showWords() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      this.$refs.title.clientWidth;
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.desc.clientWidth;
      this.$refs.desc.style.transition = "2s 1s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
    },
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    hanleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  position: relative;
  color: #fff;
  overflow: hidden;
  .carousel-img {
    width: 110%;
    height: 110%;
    position: absolute;
    left: 0;
    right: 0;
    transition: 0.3s;
  }
  .title,
  .desc {
    position: absolute;
    left: 30px;
    color: #fff;
    letter-spacing: 3px;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
  }
  .title {
    top: calc(50% - 40px);
    font-size: 2em;
  }
  .desc {
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>