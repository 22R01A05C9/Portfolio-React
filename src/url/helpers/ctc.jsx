import { toast } from "react-toastify";

const fallbackcopy = (url) => {
    let textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

const ctc = (url) => {
    if (navigator.clipboard !== undefined)
        navigator.clipboard.writeText(url)
    else fallbackcopy(url);
    toast.success("URL Copied to clipboard");
}

export default ctc