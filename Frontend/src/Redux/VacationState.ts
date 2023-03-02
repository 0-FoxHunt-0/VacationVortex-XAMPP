import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. App State - Application Level State:
export class VacationsState {
  public vacations: VacationModel[] = [];
}

// 2. Action Type - list of actions needed on the data:
export enum VacationsActionType {
  FetchVacations = "FetchVacations",
  AddVacation = "AddVacation",
  UpdateVacation = "UpdateVacation",
  DeleteVacation = "DeleteVacation",
  UserFollow = "UserFollow",
  UserUnFollow = "UserUnFollow",
  UserFilterFollowing = "UserFilterFollowing",
}

// 3. Action - a single object describing single operation on the data:
export interface VacationsAction {
  type: VacationsActionType;
  payload: any;
}

// 4. Reducer - function performing the needed actions:
export function vacationsReducer(
  currentState = new VacationsState(),
  action: VacationsAction
): VacationsState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationsActionType.FetchVacations: // Here the payload is the Vacation list fetched by the server
      newState.vacations = action.payload;
      break;

    case VacationsActionType.AddVacation: // Here the payload is the added Vacation
      newState.vacations.push(action.payload);
      newState.vacations.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
      break;

    case VacationsActionType.UpdateVacation:
      const indexToUpdate = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload.vacationId
      );
      if (indexToUpdate !== -1) {
        newState.vacations[indexToUpdate] = action.payload;
        newState.vacations.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
      }
      break;

    case VacationsActionType.DeleteVacation: // here the payload is the ID of the Vacation to delete
      const indexToDelete = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload
      );
      if (indexToDelete !== -1) {
        newState.vacations.splice(indexToDelete, 1);
      }
      break;

    case VacationsActionType.UserFollow:
      const vacationFollowing: VacationModel = newState.vacations.find(
        (v) => v.vacationId === action.payload
      );
      vacationFollowing.isFollowing = 1;
      vacationFollowing.followerCount += 1;
      break;

    case VacationsActionType.UserUnFollow:
      const vacationUnFollowing: VacationModel = newState.vacations.find(
        (v) => v.vacationId === action.payload
      );
      vacationUnFollowing.isFollowing = 0;
      vacationUnFollowing.followerCount--;
      break;
  }
  return newState;
}
// 5. Store - Redux manager:
export const vacationStore = createStore(vacationsReducer);
