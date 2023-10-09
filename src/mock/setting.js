import Mock from "mockjs"
Mock.mock("/api/setting", "get", {
    code: 0,
    msg: "ok",
    data: {
        avatar: "https://q.qlogo.cn/headimg_dl?dst_uin=1352058684&spec=100",
        siteTitle: "个人空间",
        github: "https://github.com/lhshilin",
        qq: "1352058684",
        qqQrCode:
            "https://img2.baidu.com/it/u=1349296340,691673466&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1685552400&t=f29156e04fd0cebbc1b21575315d7e30",
        weixin: "LHsl15535903843",
        weixinQrCode:
            "https://img2.baidu.com/it/u=1349296340,691673466&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1685552400&t=f29156e04fd0cebbc1b21575315d7e30",
        mail: "1352058684@qq.com",
        icp: "黑ICP备17001719号",
        githubName: "lhshilin",
        favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f",
    },
})