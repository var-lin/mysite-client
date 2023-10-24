export default function metaController(metaData) {
    // 获取当前meta元素 并删除
    const metaDescription = document.querySelectorAll('meta[name="description"]');
    const metaKeywords = document.querySelectorAll('meta[name="keywords"]');
    if (metaDescription.length > 0) {
        for (const key of metaDescription) {
            key.remove()
        }
    }
    if (metaKeywords.length > 0) {
        for (const key of metaKeywords) {
            key.remove()
        }
    }

    // 创建meta元素添加内容插入head
    for (const key of metaData) {
        const meta = document.createElement('meta');
        for (const prop in key) {
            meta.setAttribute(prop, key[prop]);
            document.head.appendChild(meta);
        }
    }
}