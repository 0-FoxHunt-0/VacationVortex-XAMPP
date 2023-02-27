import { RegisterOptions } from "react-hook-form";

class VacationModel {
  public vacationId: number;
  public destination: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: string;
  public imageName: string;
  public image: File;
  public isFollowing: number;
  public followerCount: number;

  public static destinationValidation: RegisterOptions = {
    required: { value: true, message: "Missing destination!" },
    minLength: { value: 1, message: "Destination must contain at least one char" },
    maxLength: { value: 50, message: "Destination can't exceed 50 chars" }
  };
  public static descriptionValidation: RegisterOptions = {
    required: { value: true, message: "Missing description!" },
    minLength: { value: 1, message: "Description must contain at least one char" },
    maxLength: { value: 1000, message: "Description can't exceed 1000 chars" }
  };
  public static startDateValidation: RegisterOptions = {
    required: { value: true, message: "Missing startDate!" },
  };
  public static endDateValidation: RegisterOptions = {
    required: { value: true, message: "Missing endDate!" }
  };
  public static priceValidation: RegisterOptions = {
    required: { value: true, message: "Missing price!" },
    min: { value: 0, message: "price must above 1" },
    max: { value: 1000000, message: "price can't exceed 1000000" }
  };
  public static imageValidation: RegisterOptions = {
    required: { value: true, message: "Missing image!" }
  };

}

export default VacationModel;
