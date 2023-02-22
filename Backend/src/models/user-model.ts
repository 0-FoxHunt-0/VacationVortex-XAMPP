import Joi from "joi";
import { ValidationError } from "./client-errors";
import RoleModel from "./role-model";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    private static postValidationSchema = Joi.object({
        id: Joi.number().forbidden(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().required().min(4).max(20).email(),
        password: Joi.string().optional().min(4).max(20),
        role: Joi.string().forbidden()
    })

    private static updateValidationSchema = Joi.object({
        id: Joi.number().required().integer().positive(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().required().min(4).max(20).email(),
        password: Joi.string().optional().min(4).max(20),
        role: Joi.string().forbidden()
    })
    
    public validatePost(): void {
        const result = UserModel.postValidationSchema.validate(this)
        if (result.error) throw new ValidationError(result.error.message)
    }

    public validateUpdate(): void {
        const result = UserModel.updateValidationSchema.validate(this)
        if (result.error) throw new ValidationError(result.error.message)
    }

}

export default UserModel