import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { authStore } from "../Redux/AuthState";
import { VacationsActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";
import notify from "../Utils/Notify";

class UserVacationsService {
  public async getAllVacationsUser(): Promise<VacationModel[]> {
    // Take vacations from global state:
    let vacations = vacationStore.getState().vacations;

    // If we dont have vacations
    if (vacations.length === 0) {
      // Fetch vacations from backend
      const response = await axios.get<VacationModel[]>(
        appConfig.userVacationsUrl
      );
      vacations = response.data;

      // Send all vacations into redux global state which will call the Reducer
      vacationStore.dispatch({
        type: VacationsActionType.FetchVacations,
        payload: vacations,
      });
    }

    // Return vacations
    return vacations;
  }

  public async userFollow(vacationId: number): Promise<void> {
    try {
      await axios.post(appConfig.userVacationsFollowUrl + vacationId);
      notify.success("Followed");
      vacationStore.dispatch({
        type: VacationsActionType.UserFollow,
        payload: vacationId,
      });
    } catch (err: any) {
      notify.error(err.message);
    }
  }

  public async userUnFollow(vacationId: number): Promise<void> {
    try {
      await axios.delete(appConfig.userVacationsUnFollowUrl + vacationId);
      notify.success("Un-Followed");
      vacationStore.dispatch({
        type: VacationsActionType.UserUnFollow,
        payload: vacationId,
      });
    } catch (err: any) {
      notify.error(err.message);
    }
  }

  public async vacationFiltering(
    filteredVacations: VacationModel[]
  ): Promise<void> {
    vacationStore.dispatch({
      type: VacationsActionType.FetchVacations,
      payload: filteredVacations,
    });
    console.log(filteredVacations);
  }
}

const userVacationsService = new UserVacationsService();

export default userVacationsService;
