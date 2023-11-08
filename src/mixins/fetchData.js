export default function (defaultDataValue = null, isFreeze = true) {
    return {
        data() {
            return {
                isLoading: true,
                data: defaultDataValue,
            }
        },
        async created() {
            const res = await this.fetchData()
            if (isFreeze) {
                this.data = Object.freeze(res);
            } else {
                this.data = res
            }
            this.isLoading = false;
        }
    }
}