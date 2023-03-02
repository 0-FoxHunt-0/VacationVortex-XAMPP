import { Checkbox, FormControlLabel, Typography } from "@mui/material";

interface VacationFiltersProps {
    setIsFollowingCheck: (value: boolean) => void;
    setInProgressCheck: (value: boolean) => void;
    setYetToStartCheck: (value: boolean) => void;
    isFollowingCheck: boolean;
    inProgressCheck: boolean;
    yetToStartCheck: boolean;
    filterIsFollowing: (value: boolean) => void;
    filterInProgress: (value: boolean) => void;
    filterYetToStart: (value: boolean) => void;
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
