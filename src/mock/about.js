import Mock from "mockjs"
Mock.mock("/api/about", "get", {
    code: 0,
    msg: "ok",
    data: "https://www.strml.net"
})