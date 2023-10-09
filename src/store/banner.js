import { getBanners } from "@/api/banner"
// import { server_URL } from "@/urlConfig"

export default {
    namespaced: true,
    state: {
        loading: false,
        data: [],
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setData(state, payload) {
            state.data = payload
        }
    },
    actions: {
        async fetchBanner(ctx) {
            if (ctx.state.data.length) {
                return
            }
            ctx.commit("setLoading", true)
            const res = await getBanners();
            // res.forEach((data, i) => {
            //     data.bigImg = server_URL + data.bigImg;
            //     data.midImg = server_URL + data.midImg;
            // })
            ctx.commit("setData", res)
            ctx.commit("setLoading", false)
        }
    }
}