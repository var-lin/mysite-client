import { getSetting } from "@/api/setting"
import { titleController } from "@/utils"

export default {
    namespaced: true,
    state: {
        laoding: false,
        data: null
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
        async fetchSetting(ctx) {
            ctx.commit("setLoading", true)
            const res = await getSetting();

            ctx.commit("setData", Object.freeze(res))
            ctx.commit("setLoading", false)
            if (res.favicon) {
                let link = document.querySelector("link[rel='shortcut icon']");
                if (link) {
                    return;
                }
                link = document.createElement("link");
                link.rel = "shortcut icon";
                link.type = "images/x-icon";
                link.href = res.favicon;
                document.querySelector("head").appendChild(link)
            }
            if (res.siteTitle) {
                titleController.setSiteTitle(res.siteTitle)
            }
        }
    }
}