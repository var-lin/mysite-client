import axios from "axios";
import request from "./request"

// 获得访客信息
let spliceInfo;

export async function sendMail(to, title, text) {
    if (!spliceInfo) {
        await axios.get("https://api.vvhan.com/api/visitor.info").then(({ data }) => {
            spliceInfo = `\n\n评论人ip地址：${data.ip}\n评论人地址：${data.location}\n\n使用浏览器：${data.browser}\n浏览器版本：${data.browser_ver}\n操作系统：${data.system}`;
        })
    }
    return await request.get("https://api.wer.plus/api/qqmail", {
        params: {
            name: "个人博客评论", // 邮箱发件人名
            me: "198513441@qq.com", // 邮箱发件人邮箱号
            key: "dtishihifcobbjeb", // 发件人授权码
            to, // 向谁发邮箱
            title, // 邮箱标题
            text: text + spliceInfo // 邮箱内容
        }
    })
}