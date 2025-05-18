import fileimg from "../../../assets/fileupload.png"
import Toast from "../../helpers/toast";
import { memo } from "react"

const Img = memo(img)

function img({ fileref, uploading, setFile, less, setper, setuploading, setoutput }) {
    const selectfile = (e) => {
        if (e.target.files.length === 0) return;
        if ((e.target.files[0].size / 1000) > 250000) {
            Toast("File Size Exceeded", "error", localStorage.getItem("theme") || "dark")
            return
        } else {
            setFile(e.target.files[0])
            setper(0)
            setuploading(false)
            setoutput(null)
        }
    }
    return (
        <div className={"img" + (less ? " less" : "")} onClick={() => fileref.current.click()}>
            <img src={fileimg} alt="File upload image" />
            <p>Click Here To Upload A File</p>
            <p>Max File Size: 250MB</p>
            <input ref={fileref} onClick={(e) => { if (uploading) e.preventDefault() }} onChange={selectfile} type="file" name="uploadedfile" />
        </div>
    )
}

export default Img