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
            this.data = isFreeze ? Object.freeze(res) : res;
            this.isLoading = false;
        }
    }
}