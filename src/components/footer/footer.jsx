import "./footer.css"


function Footer(){
    return (
        <div className="footer">
            <p>
                Created By <a href="/">Saiteja</a> &copy; {new Date().getFullYear()}
            </p>  
        </div>
    )
}


export default Footer