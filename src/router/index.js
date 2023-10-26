import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
import { titleController } from "@/utils"
import { metaController } from "@/utils"

// 路由

if (!window.VueRouter) {
    Vue.use(VueRouter)
}

const router = new VueRouter({
    routes: routes,
    mode: "history"
})

router.afterEach((to, from) => {
    // 添加页面标题
    if (to.meta.title) {
        titleController.setRouteTitle(to.meta.title)
    }

    // 添加页面描述 关键词
    if (to.meta.metaTags) {
        metaController(to.meta.metaTags)
    }
})
export default router
