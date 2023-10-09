export default function (refValue) {
    return {
        mounted() {
            this.$bus.$on("setMainScroll", this.handleSetMainScroll);
            this.$refs[refValue].addEventListener("scroll", this.handleMainScroll);
        },
        methods: {
            handleMainScroll() {
                this.$bus.$emit("mainScroll", this.$refs[refValue]);
            },
            handleSetMainScroll(scrollTop) {
                this.$refs[refValue].scrollTop = scrollTop;
            },
        },
        beforeDestroy() {
            this.$bus.$emit("mainScroll");
            this.$refs[refValue].removeEventListener("scroll", this.handleMainScroll);
            this.$bus.$off("setMainScroll", this.handleSetMainScroll);
        },
    }
}