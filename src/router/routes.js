import "nprogress/nprogress.css";
import { start, done, configure } from "nprogress";
configure({
    trickleSpeed: 20,
    showSpinner: false
})

function getPageComponent(pageCompResolver) {
    return async () => {
        start()
        const component = await pageCompResolver()
        done()
        return component
    }
}

const meta_all = {
    name: "keywords",
    content: "var_lin的个人博客, var_lin, 个人博客, 个人空间, 博客, 空间, 文章, 软件分享, 技巧分享",
}

const meta_blog_all = {
    name: "keywords",
    content: "文章分类, 文章详情, 好用的软件, 好软, 软件, 技巧, 干货, pc好软, 安卓好软, 实用软件",
}

export default [
    {
        name: "Home",
        path: "/",
        component: getPageComponent(() => import("@/views/Home")),
        meta: {
            title: "首页",
            metaTags: [
                meta_all,
                {
                    name: "description",
                    content: "var_lin的个人博客,分享丰富有趣的文章,记录美好生活",
                }
            ]
        }
    },
    {
        name: "Blog",
        path: "/article",
        component: getPageComponent(() => import("@/views/Blog")),
        meta: {
            title: "文章",
            metaTags: [
                meta_all,
                meta_blog_all,
                {
                    name: "description",
                    content: "var_lin的文章页, 本博客的主要内容, 分享遇见的各种好东西及实用技巧经验",
                }
            ]
        }
    },
    {
        name: "CategoryBlog",
        path: "/article/cate/:categoryId",
        component: getPageComponent(() => import("@/views/Blog")),
        meta: {
            title: "文章",
            metaTags: [
                meta_all,
                meta_blog_all,
                {
                    name: "description",
                    content: "var_lin的文章页, 本博客的主要内容, 分享遇见的各种好东西及实用技巧经验",
                }
            ]
        }
    },
    {
        name: "BlogDetail",
        path: "/article/:id",
        component: getPageComponent(() => import("@/views/Blog/Detail")),
        meta: {
            title: "文章详情",
            metaTags: [
                meta_all,
                meta_blog_all,
                {
                    name: "description",
                    content: "var_lin的文章详情页, 展示文章的具体内容",
                }
            ]
        }
    },
    {
        name: "About",
        path: "/about",
        component: getPageComponent(() => import("@/views/About")),
        meta: {
            title: "关于我",
            metaTags: [
                meta_all,
                {
                    name: "keywords",
                    content: "var_lin的个人简介, 个人简介, 简介, 介绍, 项目展示, 项目",
                },
                {
                    name: "description",
                    content: "var_lin的自我介绍, 也有时候是项目展示页",
                }
            ]
        }
    },
    {
        name: "Project",
        path: "/project",
        component: getPageComponent(() => import("@/views/Project")),
        meta: {
            title: "项目&效果",
            metaTags: [
                meta_all,
                {
                    name: "keywords",
                    content: "var_lin的项目&效果, 项目展示, 项目, 效果展示, 效果",
                },
                {
                    name: "description",
                    content: "var_lin的项目&效果, 分享以往的项目",
                }
            ]
        }
    },
    {
        name: "Message",
        path: "/message",
        component: getPageComponent(() => import("@/views/Message")),
        meta: {
            title: "留言板",
            metaTags: [
                meta_all,
                {
                    name: "keywords",
                    content: "var_lin的留言板, 留言板, 留言, 交流, 建议, 意见",
                },
                {
                    name: "description",
                    content: "var_lin的留言板, 欢迎来留言, 交流你对本网站的建议不足, 或者你的需求",
                }
            ]
        }
    },
    // 404
    {
        name: "NotFound",
        path: "*",
        component: getPageComponent(() => import("@/views/NotFound")),
    },
]