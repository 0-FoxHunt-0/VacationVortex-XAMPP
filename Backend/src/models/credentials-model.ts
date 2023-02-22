import Joi from "joi";
import { ValidationError } from "./client-errors";
import RoleModel from "./role-model";

class CredentialsModel {

    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    private static credentialsValidationSchema = Joi.object({
        email: Joi.string()
        .required()
        .min(2)
        .max(100),

        password: Joi.string()
        .required()
        .min(2)
        .max(100)

    });

    public validateCredentials(): void {
        const result = CredentialsModel.credentialsValidationSchema.validate(this)
        if (result.error) throw new ValidationError(result.error.message)
    }
}

export default CredentialsModel;