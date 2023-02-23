import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Card, CardActions, CardContent, CardMedia, Fab, Typography } from "@mui/material";
import moment from "moment";
import { NavLink } from "react-router-dom";

import VacationModel from "../../../Models/VacationModel";
import "./AdminVacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
    deleteVacation: (vacationId: number) => Promise<void>;
}

function AdminVacationCard(props: VacationCardProps): JSX.Element {
    async function deleteMe() {
        try {
            await props.deleteVacation(props.vacation.vacationId)
        } catch (error: any) {
            alert(error.message);
        }
    }

    function formatTime(time: string) {
        return moment(time).format('MMMM D, YYYY');
    }

    return (
        <div className="VacationCard Box" id={props.vacation.vacationId.toString()}>

            <CardActions sx={[{ position: "relative" }, { left: 10 }, { top: 70 }, { zIndex: 1 }]}>
                <NavLink to={"/admin/edit/vacations/" + props.vacation.vacationId}>
                    <Button>
                        <Fab color="default" aria-label="add" size='medium'>
                            <EditIcon />
                        </Fab>
                    </Button>
                </NavLink>

                <Button onClick={deleteMe}>
                    <Fab color="error" aria-label="add" size='medium'>
                        <DeleteIcon />
                    </Fab>
                </Button>
            </CardActions>

            <Card className="card" id={props.vacation.vacationId.toString()} sx={[{ maxWidth: 500 }, { minWidth: 370 }, { minHeight: 480 }, { maxHeight: 480 }, { overflow: "hidden" }, { zIndex: 0 }]}>

                <CardMedia
                    component="img"
                    alt={props.vacation.destination}
                    height="220"
                    image={props.vacation.imageName}
                    sx={[{ position: "relative" }, { zIndex: 0 }, { top: 0 }, { backgroundRepeat: "no-repeat" }]}
                />
                <CardContent sx={{ height: "100%" }}>
                    <Typography variant="h5" component="div">
                        {props.vacation.destination}
                    </Typography>
                    <Typography paragraph sx={[{ borderRadius: 5 }, { backgroundColor: "#EDEDED" }]}>
                        {formatTime(props.vacation.startDate)} &rarr; {formatTime(props.vacation.endDate)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        {props.vacation.description}
                    </Typography>
                    <br />
                    <Typography variant="body1" color="text.primary">
                        ${props.vacation.price}
                    </Typography>
                </CardContent>
            </Card>
            
        </div>
    );
}

export default AdminVacationCard;
