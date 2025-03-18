import { toast } from "react-toastify";

const options = {
    closeOnClick: true,
    autoClose: 3000,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true
}

const Toast = (message, mode, theme) => {
    toast[mode](message, { ...options, theme: theme })
}

export default Toast