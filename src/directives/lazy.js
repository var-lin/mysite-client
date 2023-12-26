import eventBus from "@/eventBus";
import { debounce } from "@/utils";
import defaultGif from "@/assets/default.gif"

const lazy = (() => {
    // es6 api写法，如果有则用如果没有用原始方法
    if (!window.IntersectionObserver) {
        const ob = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.imgSrc;
                    ob.unobserve(img);
                }
            }
        }, {
            threshold: 0.3,
        })

        return {
            inserted(el, bindings) {
                el.src = defaultGif;
                el.imgSrc = bindings.value;
                ob.observe(el)
            },
            unbind(el) {
                ob.unobserve(el);
            }
        }

    } else {
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

        function handleScroll() {
            setImages()
        }

        eventBus.$on("mainScroll", debounce(handleScroll, 100))
        return {
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
        }
    }
})();

export default lazy
