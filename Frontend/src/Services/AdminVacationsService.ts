import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";

class AdminVacationsService {
  public async getAllVacationsAdmin(): Promise<VacationModel[]> {
    // Take vacations from global state:
    let vacations = vacationStore.getState().vacations;

    // If we dont have vacations
    if (vacations.length === 0) {
      // Fetch vacations from backend
      const response = await axios.get<VacationModel[]>(
        appConfig.adminVacationsUrl
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

  public async getVacationById(id: number): Promise<VacationModel> {
    //Take product from global state:
    let vacations = vacationStore.getState().vacations;

    //find needed product from global state:
    let vacation = vacations.find((v) => v.vacationId === id);

    //if product not found:
    if (!vacation) {
      const response = await axios.get<VacationModel>(
        appConfig.adminVacationByIdUrl + id
      );
      vacation = response.data;
    }

    return vacation;
  }

  public async addVacation(vacation: VacationModel): Promise<void> {
    // Tell axios that we're sending text and file to backend:
    const headers = { "Content-Type": "multipart/form-data" };

    const response = await axios.post<VacationModel>(
      appConfig.adminAddVacationUrl,
      vacation,
      { headers }
    );
    const addedVacation = response.data;

    vacationStore.dispatch({
      type: VacationsActionType.AddVacation,
      payload: addedVacation,
    });
  }

  public async deleteVacation(id: number): Promise<void> {
    await axios.delete(appConfig.adminDeleteVacationUrl + id);

    vacationStore.dispatch({
      type: VacationsActionType.DeleteVacation,
      payload: id,
    });
  }

  public async updateVacation(vacation: VacationModel): Promise<void> {
    // Tell axios that we're sending text and file to backend:
    const headers = { "Content-Type": "multipart/form-data" };

    const response = await axios.put<VacationModel>(
      appConfig.adminUpdateVacationUrl + vacation.vacationId,
      vacation,
      { headers }
    );
    const updatedVacation = response.data;

    vacationStore.dispatch({
      type: VacationsActionType.UpdateVacation,
      payload: updatedVacation,
    });
  }
}

const adminVacationsService = new AdminVacationsService();

export default adminVacationsService;
