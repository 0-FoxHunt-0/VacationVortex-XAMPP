import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {
  public vacationId: number;
  public destination: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: string;
  public imageName: string;
  public image: UploadedFile;

  public constructor(vacation: VacationModel) {
    this.vacationId = vacation.vacationId;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.imageName = vacation.imageName;
    this.image = vacation.image;
  }

  private static postValidationSchema = Joi.object({
    vacationId: Joi.number().forbidden(),
    destination: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(2).max(1000),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().min(0).max(1000000000),
    image: Joi.object().required(),
    imageName: Joi.string().optional(),
  });

  private static updateValidationSchema = Joi.object({
    vacationId: Joi.number().required(),
    destination: Joi.string().required().min(2).max(50),
    description: Joi.string().required().min(2).max(1000),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().min(0).max(1000000000),
    image: Joi.object().optional(),
    imageName: Joi.string().forbidden()
  });

  public validatePost(): void {
    const result = VacationModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validateUpdate(): void {
    const result = VacationModel.updateValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default VacationModel;
