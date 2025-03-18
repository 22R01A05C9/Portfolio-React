import Toast from "../helpers/toast";

function copytext(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}
const copy = (e, data) => {
    let item = e.target.innerHTML.slice(5, 9)
    let copydata = (item === "Code" ? data.id : data.link)
    if (!navigator.clipboard) copytext(copydata);
    else navigator.clipboard.writeText(copydata);
    Toast(`${item} Copied To Clipboard`, "success", localStorage.getItem("theme") || "dark")
}

export { copy }