<template>
  <form
    id="data-form-container"
    class="data-form-container"
    ref="form"
    @submit.prevent="handleSubmit"
  >
    <!-- 用户昵称 -->
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

    <!-- 身份密码 -->
    <div class="form-item" v-if="identity[formData.nickname]">
      <div class="input-area">
        <input
          type="text"
          v-model="formData.identityCode"
          placeholder="身份密码"
        />
        <span class="tip">{{ formData.identityCode.length }}</span>
      </div>
      <div class="error">{{ error.identityCode }}</div>
    </div>

    <!-- 评论内容 -->
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

export default {
  data() {
    return {
      formData: {
        nickname: "",
        identityCode: "",
        content: "",
      },
      error: {
        nickname: "",
        identityCode: "",
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
  computed: {
    identity() {
      return this.$store.state.identity.data;
    },
    setting() {
      return this.$store.state.setting.data;
    },
  },
  methods: {
    handleSubmit() {
      this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
      this.error.content = this.formData.content ? "" : "请填写内容";

      // 昵称及内容没填不进行后续操作
      if (this.error.nickname || this.error.content) {
        return;
      }

      // 验证身份信息
      const identityInfo = this.identity[this.formData.nickname];
      if (identityInfo) {
        if (identityInfo.password === this.formData.identityCode) {
          this.error.identityCode = "";
        } else {
          this.error.identityCode = "身份验证失败，请检查密码";
          return;
        }
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

              // 不是站长发言则发邮箱给站长邮箱

              if (!identityInfo || identityInfo.identity !== "站长") {
                // 评论的标题
                const mailTitle = isData.blog
                  ? "个人博客文章评论"
                  : "个人博客留言板评论";

                // 评论内容
                const blogName = isData.blog
                  ? `<p>评论的文章名：${isData.blog.title}</p>评论的文章id：${isData.blog.id}`
                  : "";
                const nickname = `评论者昵称：${isData.nickname}`;
                const identity = identityInfo
                  ? `评论者身份：${identityInfo.identity}`
                  : "";
                const content = `评论者内容：${isData.content}`;
                const commentId = `评论id：${isData.id}`;
                const createDate = `评论时间：${formatDate(
                  isData.createDate,
                  true
                )}`;

                // 评论的内容--评论者的信息identity
                const mailContent = `<p>${blogName}</p>
                <p>${nickname}</p>
                <p>${identity}</p>
                <p>${content}</p>
                <p>${commentId}</p>
                <p>${createDate}</p>
                `;

                sendMail(this.setting.mail, mailTitle, mailContent);
              }
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
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;

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
}
</style>