import axios from "axios";
import { useState } from "react";
import appConfig from "../../../Utils/AppConfig";

function CsvDownload(): JSX.Element {
    
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        setIsLoading(true);
        const response = await axios.get(appConfig.adminCSVUrl, {
            responseType: "blob",
        });
        setIsLoading(false);

        const blob = new Blob([response.data], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "CSVData.csv";
        link.click();
    };

    return (
        <div className="CsvDownload">
            <button className="nav-link" onClick={handleDownload} disabled={isLoading}>
                {isLoading ? "Loading..." : "CSV"}
            </button>
        </div>
    );
}

export default CsvDownload;
