import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import VacationModel from '../../../Models/VacationModel';
import { vacationStore } from '../../../Redux/VacationState';
import adminVacationsService from '../../../Services/AdminVacationsService';
import authService from '../../../Services/AuthServices';
import notify from '../../../Utils/Notify';

interface Vacation {
    name: string;
    likes: number;
}

function StatisticsGraph(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])
    const navigate = useNavigate()

    useEffect(() => {

        if (!sessionStorage.getItem("userToken") || !authService.isAdmin()) {
            notify.error("You are not logged in or authorized")
            navigate("/")
            return;
        }

        setVacations(vacationStore.getState().vacations)

        if (vacations.length === 0) {
            adminVacationsService.getAllVacationsAdmin()
                .then(vacations => { setVacations(vacations) })
                .catch(err => { alert(err.msg) })
        }
    }, [])
    
    const destinations = Array.from(new Set(vacations.map(v => v.destination)));
    const destinationData: Vacation[] = destinations.map(destination => {
        const vacation = vacations.find(v => v.destination === destination);
        return { name: destination, likes: vacation ? vacation.followerCount : 0 }
    });

    const customTooltip = ({ active, payload }: any) => {
        if (active) {
            return (
                <div className="custom-tooltip">
                    <p className="label">Destination: {payload[0].payload.name}</p>
                    <p className="intro">Likes: {payload[0].value}</p>
                </div>
            );
        }

        return null;
    };

    return (

        <div className="StatisticsGraph">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BarChart
                    width={900}
                    height={600}
                    data={destinationData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 120,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" tick={{ fill: "#FFFFFF" }} />
                    <YAxis />
                    <Tooltip content={customTooltip} />
                    <Bar dataKey="likes" fill="#FFE08C" />
                </BarChart>
            </div>
        </div>
    )
}

export default StatisticsGraph;
