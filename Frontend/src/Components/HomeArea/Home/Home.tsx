import { useEffect } from "react";
import "./Home.css";

function Home(): JSX.Element {

    useEffect(() => {
        const header = document.getElementById("mainHeader")
        header.innerText = "Welcome to VacationVortex"
    }, [])

    return (
        <div className="Home">
            <div className="HomeParagraph">
                Welcome to VacationVortex, your one-stop destination for all things travel. Whether you're looking to escape the daily grind, reconnect with nature, or explore new destinations, we've got you covered. Our user-friendly website offers everything you need to plan the ultimate getaway, from inspiration and tips to expert advice and top-notch deals. Browse through our extensive collection of destinations, read travel articles, and find the perfect accommodations to fit your style and budget. With Vacation Planner, you can plan your dream vacation from the comfort of your own home. So, pack your bags and start your next adventure today!
            </div>
        </div>
    );
}

export default Home;
