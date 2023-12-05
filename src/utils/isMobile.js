let isMobile = null;

// 获取User-Agent信息
const userAgent = navigator.userAgent;

// 正则表达式匹配常见的移动端关键字
const mobileKeywords = /Android|webOS|iPhone|iPad|BlackBerry/i;

if (mobileKeywords.test(userAgent)) {
    isMobile = true; // 输出结果为"这是移动端"
} else {
    isMobile = false; // 输出结果为"这不是移动端"
}

export default isMobile