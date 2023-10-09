import axios from "axios";
import showMessage from "../utils/showMessage";

const ins = axios.create();
ins.interceptors.response.use(({ data }) => {
    if (typeof (data) === 'string') {
        data = JSON.parse(data)
        showMessage({
            content: data.msg,
            type: "error",
            duration: 1500
        })
        return null
    }
    return data.data
})

export default ins;