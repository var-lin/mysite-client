<template>
  <ul class="contact-container">
    <li>
      <a :href="data.github" target="_blank">
        <div class="icon">
          <Icon type="github" />
        </div>
        <span>{{ data.githubName }}</span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${data.mail}`">
        <div class="icon">
          <Icon type="email" />
        </div>
        <span>{{ data.mail }}</span>
      </a>
    </li>
    <li>
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
      >
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span>{{ data.qq }}</span>
      </a>
      <div class="pop">
        <img :src="data.qqQrCode" />
      </div>
    </li>
    <li>
      <a>
        <div class="icon">
          <Icon type="weixin" />
        </div>
        <span>{{ data.weixin }}</span>
      </a>
      <div class="pop">
        <img :src="data.weixinQrCode" />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
  },
  computed: mapState("setting", ["data"]),
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.contact-container {
  width: 250px;
  list-style: none;
  padding: 20px;
  margin: 0;
  color: @gray;
  @itemHeight: 30px;
  li {
    height: 30px;
    line-height: @itemHeight;
    margin: 14px 0;
    position: relative;
    &:hover {
      .pop {
        transform: scale(1);
      }
    }
  }
  a {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
  }
  .icon {
    font-size: 26px;
    width: 36px;
  }
  .pop {
    position: absolute;
    left: 0;
    bottom: @itemHeight + 5px;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    transition: 0.3s;
    img {
      width: 150px;
      height: 150px;
    }
    &:after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -4px;
      transform: translateX(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background: #fff;
    }
  }
}
</style>