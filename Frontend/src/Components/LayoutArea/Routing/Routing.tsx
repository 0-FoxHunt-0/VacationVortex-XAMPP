import { Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import StatisticsGraph from "../../VacationsArea/StatisticsGraph/StatisticsGraph";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <div className="Routing">

            <Routes>

                <Route index element={<Home />} />
                <Route path="/list" element={<VacationList />} />
                <Route path="/admin/add/vacations" element={<AddVacation />} />
                <Route path="/admin/edit/vacations/:id" element={<EditVacation />} />
                <Route path="/admin/statistics" element={<StatisticsGraph />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<PageNotFound />} />

            </Routes>

        </div>
    );
}

export default Routing;
