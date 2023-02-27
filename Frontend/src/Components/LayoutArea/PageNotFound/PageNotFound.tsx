import "./PageNotFound.css";
import pageNotFoundImage from "../../../Assets/Images/Errors/404-error-template.jpg"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PageNotFound(): JSX.Element {

    const navigate = useNavigate()

    useEffect(() => {
        const header = document.getElementById("mainHeader")
        header.innerText = ""
        setTimeout(() => {
            navigate("/")
        }, 3000)
    }, [])

    return (
        <div className="PageNotFound">
			<img src={pageNotFoundImage} alt="Page Not Found" />
        </div>
    );
}

export default PageNotFound;
