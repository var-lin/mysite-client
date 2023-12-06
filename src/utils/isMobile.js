let isMobile = false;

// 获取User-Agent信息
const userAgent = navigator.userAgent;

// 正则表达式匹配常见的移动端关键字
const mobileKeywords = /Android|webOS|iPhone|iPad|BlackBerry/i;

if (mobileKeywords.test(userAgent)) {
    isMobile = true; // 输出结果为"这是移动端"
} else if (window.innerWidth <= 900) {
    isMobile = true; // 屏幕宽度低于900视为移动端
}

export default isMobile