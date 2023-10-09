import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";
export default function (options = {}) {
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;

    const div = document.createElement("div");
    const typeClassName = styles[`message-${type}`];
    div.className = `${styles.message} ${typeClassName}`;
    const iconDom = getComponentRootDom(Icon, {
        type
    })
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
    if (options.container && getComputedStyle(container).position === "static") {
        container.style.position = "relative";
    }
    container.appendChild(div)

    div.clientHeight;
    div.style.opacity = 1;
    div.style.transform = "translate(-50%, -50%)";
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = "translate(-50%, -50%) translateY(-25px)";
        div.addEventListener("transitionend", function () {
            this.remove()
            options.callback && options.callback()
        }, { once: true })
    }, duration)
}