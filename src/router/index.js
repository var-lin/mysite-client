import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"
import { titleController } from "@/utils"

// 路由

if (!window.VueRouter) {
    Vue.use(VueRouter)
}

const router = new VueRouter({
    routes: routes,
    mode: "history"
})

router.afterEach((to, from) => {
    if (to.meta.title) {
        titleController.setRouteTitle(to.meta.title)
    }
})
export default router