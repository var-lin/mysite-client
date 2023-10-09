import Mock from "mockjs"

Mock.mock(/^\/api\/project\/?$/, "get", {
    code: 0,
    msg: "ok",
    data: [
        {
            id: 1,
            name: "淘宝",
            url: "https://lhshilin.github.io/taobao/",
            github: "https://github.com/lhshilin/taobao",
            description: ["纯html + css完成淘宝首页页面"],
            thumb: "https://lhshilin.github.io/taobao/images/toutu.icon"
        },
        {
            id: 2,
            name: "积木",
            url: "https://lhshilin.github.io/jimu/",
            github: "https://github.com/lhshilin/jimu",
            description: ["网上公开免费api接口为你展示想要的数据"],
            thumb: "https://lhshilin.github.io/jimu/images/logo.png"
        },
    ]
})