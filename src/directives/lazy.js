import eventBus from "@/eventBus";
import { debounce } from "@/utils";
import defaultGif from "@/assets/default.gif"
let imgs = [];

function setImage(img) {
    img.dom.src = defaultGif
    const clientHeight = document.documentElement.clientHeight;
    const rect = img.dom.getBoundingClientRect();
    const height = rect.height || 150;
    if (rect.top >= -height && rect.top <= clientHeight) {
        const tempImg = new Image();
        tempImg.onload = function () {
            img.dom.src = img.src;
        }
        tempImg.src = img.src;
        imgs = imgs.filter(i => i !== img)
    }
}

function setImages() {
    for (const img of imgs) {
        setImage(img)
    }
}

function handleScroll(dom) {
    setImages()
}

eventBus.$on("mainScroll", debounce(handleScroll, 100))
export default {
    inserted(el, bindings) {
        const img = {
            dom: el,
            src: bindings.value,
        }
        imgs.push(img)
        setImage(img)
    },
    unbind(el) {
        imgs = imgs.filter(img => img.dom !== el)
    }
};