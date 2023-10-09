<template>
  <nav class="menu-container">
    <RouterLink
      :exact="item.exact"
      v-for="item in items"
      :key="item.link"
      :to="{
        name: item.name,
      }"
      active-class="selected"
      exact-active-class=""
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </RouterLink>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        { name: "Home", title: "首页", icon: "home", exact: true },
        { name: "Blog", title: "文章", icon: "blog", exact: false },
        { name: "About", title: "关于", icon: "about", exact: true },
        { name: "Project", title: "项目&效果", icon: "code", exact: true },
        { name: "Message", title: "留言板", icon: "chat", exact: true },
      ],
    };
  },
  methods: {
    isSelected(item) {
      const link = item.link.toLowerCase();
      const curPathname = location.pathname.toLowerCase();
      if (item.exact) {
        return curPathname.startsWith(link);
      } else {
        return curPathname === link;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.menu-container {
  color: @gray;
  margin: 24px 0;
  a {
    padding: 0 50px;
    display: flex;
    align-items: center;
    height: 45px;
    &.selected {
      background: darken(@words, 3%);
    }
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
  }
}
</style>