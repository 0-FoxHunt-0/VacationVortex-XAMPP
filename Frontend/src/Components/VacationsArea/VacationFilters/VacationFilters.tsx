import { Typography, FormControlLabel, Checkbox, PropTypes } from "@mui/material";
import "./VacationFilters.css";

interface VacationFiltersProps {
    setIsFollowingCheck: any
    setInProgressCheck: any
    setYetToStartCheck: any
    isFollowingCheck: boolean
    inProgressCheck: boolean
    yetToStartCheck: boolean
    filterIsFollowing: any
    filterInProgress: any
    filterYetToStart: any
}


function VacationFilters(props: VacationFiltersProps): JSX.Element {

    const isFollowingCheckHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setIsFollowingCheck(event.target.checked)
        props.filterIsFollowing(event.target.checked)
    };
    const inProgressCheckHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setInProgressCheck(event.target.checked);
        props.filterInProgress(event.target.checked);
    };
    const yetToStartCheckHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setYetToStartCheck(event.target.checked);
        props.filterYetToStart(event.target.checked);
    };

    return (
        <div className="VacationFilters">
            <Typography variant="h6" component="div">Vacation Filters</Typography>
            <FormControlLabel
                control={
                    <Checkbox id="isFollowingCheck"
                        checked={props.isFollowingCheck}
                        onChange={isFollowingCheckHandleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label="Is Following"
            />
            <FormControlLabel
                control={
                    <Checkbox id="inProgressCheck"
                        checked={props.inProgressCheck}
                        onChange={inProgressCheckHandleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label="In Progress"
            />
            <FormControlLabel
                control={
                    <Checkbox id="yetToStartCheck"
                        checked={props.yetToStartCheck}
                        onChange={yetToStartCheckHandleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label="Yet To Start"
            />
        </div>
    );
}

export default VacationFilters;
