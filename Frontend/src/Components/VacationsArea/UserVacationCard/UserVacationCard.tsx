import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';

import moment from 'moment';

import VacationModel from "../../../Models/VacationModel";
import notify from "../../../Utils/Notify";
import "./UserVacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
    followVacation: (vacationId: number) => Promise<void>;
    unfollowVacation: (vacationId: number) => Promise<void>;
    isFollowing: (vacationId: number) => boolean;
}

function UserVacationCard(props: VacationCardProps): JSX.Element {

    async function follow() {
        try {
            await props.followVacation(props.vacation.vacationId)
        } catch (error: any) {
            notify.error(error.message);
        }
    }

    async function unfollow() {
        try {
            await props.unfollowVacation(props.vacation.vacationId)
        } catch (error: any) {
            notify.error(error.message);
        }
    }

    function isFollowing() {
        try {
            const response = props.isFollowing(props.vacation.vacationId)
            return response
        } catch (err: any) {
            notify.error(err.message);
        }
    }

    function formatTime(time: string) {
        return moment(time).format('MMMM D, YYYY');
    }

    return (
        <div className="UserVacationCard VacationCard Box" id={props.vacation.vacationId.toString()}>
            <CardActions sx={[{ position: "relative" }, { left: 10 }, { top: 70 }, { zIndex: 1 }]}>
                {
                    isFollowing() === true ?
                        <Fab color="error" aria-label="add" variant='extended' size='medium' onClick={() => unfollow()}>
                            <ThumbUpIcon /> &nbsp; Like {props.vacation.followerCount}
                        </Fab> :
                        <Fab color="default" aria-label="add" variant='extended' size='medium' onClick={() => follow()}>
                            <ThumbUpIcon /> &nbsp; Like {props.vacation.followerCount}
                        </Fab>
                }

            </CardActions>
            <Card id={props.vacation.vacationId.toString()} className='card' sx={[{ maxWidth: 500, minWidth: 350, minHeight: 480, maxHeight: 480}]}>
                <CardMedia
                    component="img"
                    alt={props.vacation.destination}
                    height="220"
                    image={props.vacation.imageName}
                    sx={[{ position: "relative" }, { zIndex: 0 }, { top: 0 }]}
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

export default UserVacationCard;
