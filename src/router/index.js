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

// function getRoutesList(routes, pre) {
//     return routes.reduce((array, route) => {
//         const path = `${pre}${route.path}`;

//         if (route.path !== '*') {
//             array.push(path);
//         }

//         if (route.children) {
//             array.push(...getRoutesList(route.children, `${path}/`));
//         }

//         return array;
//     }, []);
// }

// //生成sitemap
// function getRoutesXML() {
//     const list = getRoutesList(router.options.routes, 'https://varlin.site')
//         .map(route => `<url><loc>${route}</loc></url>`)
//         .join('\r\n');
//     return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
//       ${list}
//     </urlset>`;
// }

// console.log(getRoutesXML())


