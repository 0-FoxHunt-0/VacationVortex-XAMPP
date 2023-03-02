import spinnerSource from "../../../Assets/Images/Errors/loading.gif";
import "./Spinner.css";

function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
            <img src={spinnerSource} alt="loading..." />
        </div>
    );
}

export default Spinner;