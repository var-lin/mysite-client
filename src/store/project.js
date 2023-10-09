import { getProject } from "@/api/project"
// import { server_URL } from "@/urlConfig"

export default {
    namespaced: true,
    state: {
        loading: false,
        data: []
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
        async fetchProject(ctx) {
            if (ctx.state.data.length) {
                return
            }
            ctx.commit("setLoading", true)
            const res = await getProject()
            // res.forEach((data, i) => {
            //     data.thumb = server_URL + data.thumb
            // })
            ctx.commit("setData", res)
            ctx.commit("setLoading", false)
        }
    }
}