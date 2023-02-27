import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { vacationStore } from "../../../Redux/VacationState";
import adminVacationsService from "../../../Services/AdminVacationsService";
import authService from "../../../Services/AuthServices";
import userVacationsService from "../../../Services/UserVacationsService";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import UserVacationCard from "../UserVacationCard/UserVacationCard";
import VacationFilters from "../VacationFilters/VacationFilters";
import VacationPagination from "../VacationPagination/VacationPagination";
import "./VacationList.css";

function VacationList(): JSX.Element {

    const [user, setUser] = useState<UserModel>()
    const [vacations, setVacations] = useState<VacationModel[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(6)
    const [isFollowingCheck, setIsFollowingCheck] = useState(false);
    const [inProgressCheck, setInProgressCheck] = useState(false);
    const [yetToStartCheck, setYetToStartCheck] = useState(false);
    const [tempIsFollowingFilterState, setTempIsFollowingFilterState] = useState<VacationModel[]>([])
    const [tempInProgressFilterState, setTempInProgressFilterState] = useState<VacationModel[]>([])
    const [tempYetToStartFilterState, setTempYetToStartFilterState] = useState<VacationModel[]>([])

    useEffect(() => {

        const header = document.getElementById("mainHeader")
        header.innerText = "Vacation Listing"

        authStore.subscribe(() => {
            const authState = authStore.getState().user
            const duppedAuth = { ...authState }
            setUser(duppedAuth)
        })

        vacationStore.subscribe(() => {
            const vacationState = vacationStore.getState().vacations;
            const duppedVacations = [...vacationState]
            setVacations(duppedVacations)
        })

        {
            authService.isAdmin() ?
                adminVacationsService.getAllVacationsAdmin()
                    .then(vacations => { setVacations(vacations) })
                    .catch(err => { alert(err.msg) }) :

                userVacationsService.getAllVacationsUser()
                    .then(vacations => { setVacations(vacations) })
                    .catch(err => { alert(err.msg) })
        }

    }, [])

    // Pagination value set
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const postArr: VacationModel[] = vacations.slice(firstPostIndex, lastPostIndex)

    async function deleteMe(vacationId: number) {
        try {

            if (!window.confirm('Are you sure you want to delete this vacation? \nThis action is irreversible!')) return;

            await adminVacationsService.deleteVacation(vacationId);
            notify.success("Vacation has been deleted successfully")            
            
            // Refresh List:
            let duplicatedVacations = [...vacations];
            const index = duplicatedVacations.findIndex(v => v.vacationId === vacationId)
            duplicatedVacations.splice(index, 1);
            setVacations(duplicatedVacations)  
        } catch (err: any) {
            notify.error(err)
        }
    }

    // Following actions

    function isFollowing(vacationId: number): boolean {
        let vacation = vacations.find(v => v.vacationId === vacationId)

        if (vacation.isFollowing === 1) return true;
        else return false;
    }

    async function followVacation(vacationId: number) {
        try {
            await userVacationsService.userFollow(vacationId)
        } catch (err: any) {
            notify.error(err)
        }
    }

    async function unfollowVacation(vacationId: number) {
        try {
            await userVacationsService.userUnFollow(vacationId)
        } catch (err: any) {
            notify.error(err)
        }
    }

    // Filtering functions

    async function filterIsFollowing(currentState: boolean) {
        if (currentState === true) {
            setTempIsFollowingFilterState(vacations)
            const filterResults = vacations.filter(v => v.isFollowing === 1)
            if (filterResults.length === 0) {
                notify.error("You are not following any vacations")
                setIsFollowingCheck(false)
                return;
            }
            userVacationsService.vacationFiltering(filterResults)
            setVacations(filterResults)
        } else {
            userVacationsService.vacationFiltering(tempIsFollowingFilterState)
            if (isFollowingCheck === true && inProgressCheck === false && yetToStartCheck === false) {
                userVacationsService.vacationFiltering([])
                setVacations([])
            }
            await userVacationsService.getAllVacationsUser()
                .then(v => setVacations(v))
                .catch(err => notify.error(err))
        }
    }
    async function filterInProgress(currentState: boolean) {
        const currentDate = new Date()
        if (currentState === true) {
            setTempInProgressFilterState(vacations)
            const filterResults = vacations.filter(v => (new Date(v.startDate) <= currentDate) && (new Date(v.endDate) >= currentDate))
            if (filterResults.length === 0) {
                notify.error("There are no vacations in progress")
                setInProgressCheck(false)
                return;
            }
            userVacationsService.vacationFiltering(filterResults)
            setVacations(filterResults)
        } else {
            userVacationsService.vacationFiltering(tempInProgressFilterState)
            if (isFollowingCheck === false && inProgressCheck === true && yetToStartCheck === false) {
                userVacationsService.vacationFiltering([])
                setVacations([])
            }
            await userVacationsService.getAllVacationsUser()
                .then(v => setVacations(v))
                .catch(err => notify.error(err))
        }
    }
    async function filterYetToStart(currentState: boolean) {
        const currentDate = new Date()
        if (currentState === true) {
            setTempYetToStartFilterState(vacations)
            const filterResults = vacations.filter(v => (new Date(v.startDate) > currentDate))
            if (filterResults.length === 0) {
                notify.error("There are no vacations that have yet to start")
                setInProgressCheck(false)
                return;
            }
            userVacationsService.vacationFiltering(filterResults)
            setVacations(filterResults)
        } else {
            userVacationsService.vacationFiltering(tempYetToStartFilterState)
            if (isFollowingCheck === false && inProgressCheck === false && yetToStartCheck === true) {
                userVacationsService.vacationFiltering([])
                setVacations([])
            }
            await userVacationsService.getAllVacationsUser()
                .then(v => setVacations(v))
                .catch(err => notify.error(err))
        }
    }

    return (
        <div className="VacationList">

            {vacations.length === 0 && <Spinner />}

            {authService.isAdmin() &&
                <Grid container>
                    {postArr.map(v =>
                        <Grid item xs display="flex" justifyContent="center" alignItems="center" key={v.vacationId}>
                            <AdminVacationCard vacation={v} deleteVacation={deleteMe} />
                        </Grid>
                    )}
                </Grid>
            }

            {!authService.isAdmin() &&
                <>
                    <VacationFilters
                        setIsFollowingCheck={setIsFollowingCheck}
                        setInProgressCheck={setInProgressCheck}
                        setYetToStartCheck={setYetToStartCheck}
                        isFollowingCheck={isFollowingCheck}
                        inProgressCheck={inProgressCheck}
                        yetToStartCheck={yetToStartCheck}
                        filterIsFollowing={filterIsFollowing}
                        filterInProgress={filterInProgress}
                        filterYetToStart={filterYetToStart}
                    ></VacationFilters>

                    <Grid container>
                        {postArr.map(v =>
                            <Grid item xs display="flex" justifyContent="center" alignItems="center" key={v.vacationId}>
                                <UserVacationCard
                                    vacation={v}
                                    followVacation={followVacation}
                                    unfollowVacation={unfollowVacation}
                                    isFollowing={isFollowing}
                                />
                            </Grid>
                        )}
                    </Grid>
                </>
            }

            <br />

            <Grid item xs display="flex" justifyContent="center" alignItems="center">
                <VacationPagination
                    totalPosts={vacations.length}
                    postsPerPage={postsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                ></VacationPagination>
            </Grid>

            <br />

        </div>
    );
}

export default VacationList;