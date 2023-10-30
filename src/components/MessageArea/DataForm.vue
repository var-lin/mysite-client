<template>
  <form
    id="data-form-container"
    class="data-form-container"
    ref="form"
    @submit.prevent="handleSubmit"
  >
    <div class="form-item">
      <div class="input-area">
        <input
          type="text"
          maxlength="10"
          v-model="formData.nickname"
          placeholder="用户昵称"
        />
        <span class="tip">{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea
          placeholder="输入内容"
          maxlength="300"
          v-model="formData.content"
        ></textarea>
        <span class="tip">{{ formData.content.length }}/300</span>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button :disabled="isSubmiting">
          {{ isSubmiting ? "提交中..." : "提交" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { sendMail } from "@/api/sendMail";
import { formatDate } from "@/utils";
import { mapState } from "vuex";

export default {
  data() {
    return {
      formData: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmiting: false,
    };
  },
  created() {
    const historyNickname = localStorage.getItem("historyNickname");
    if (historyNickname) {
      this.formData.nickname = historyNickname;
    }
  },
  computed: mapState("setting", ["data"]),
  methods: {
    formatDate,
    handleSubmit() {
      this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
      this.error.content = this.formData.content ? "" : "请填写内容";
      if (this.error.nickname || this.error.content) {
        return;
      }
      this.isSubmiting = true;
      this.$emit("submit", this.formData, (isData, successMessage) => {
        const duration = 1500; // 多少毫秒后恢复评论
        if (isData) {
          // 评论成功
          this.$showMessage({
            content: successMessage,
            type: "success",
            duration,
            container: this.$refs.form,
            callback: () => {
              this.isSubmiting = false;
              this.formData.content = "";
              // 保存昵称到本地
              localStorage.setItem("historyNickname", this.formData.nickname);
              // 发送给邮箱
              const mailTitle = isData.blog
                ? "个人博客文章评论"
                : "个人博客留言板评论";
              const blogName = isData.blog
                ? `评论的文章名：${isData.blog.title}\n评论的文章id：${isData.blog.id}\n\n`
                : "";
              sendMail(
                this.data.mail,
                mailTitle,
                `${blogName}评论者昵称：${isData.nickname}\n评论者内容：${
                  isData.content
                }\n\n评论id：${isData.id}\n评论时间：${formatDate(
                  isData.createDate,
                  true
                )}`
              );
            },
          });
        } else {
          // 评论失败
          setTimeout(() => {
            this.isSubmiting = false;
          }, duration);
        }
      });
    },
  },
  destroyed() {
    const nickname = this.formData.nickname;
    if (nickname) {
      localStorage.setItem("historyNickname", nickname);
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 8px;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:focus {
    border-color: @primary;
  }
}
input {
  padding: 0 15px;
  height: 40px;
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  border-radius: 4px;
  background: @primary;
  &:hover {
    background: darken(@primary, 10%);
  }
  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>