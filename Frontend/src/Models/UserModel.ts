import { RegisterOptions } from "react-hook-form";
class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public role: string;

  public static firstNameValidation: RegisterOptions = {
    required: { value: true, message: "Please enter your first name" },
    minLength: { value: 4, message: "Your first name must be 4 chars or more!" },
    maxLength: { value: 30, message: "Your first name must be 30 chars or less!" }
  };

  public static lastNameValidation: RegisterOptions = {
    required: { value: true, message: "Please enter your last name" },
    minLength: { value: 4, message: "Your last name must be 4 chars or more!" },
    maxLength: { value: 30, message: "Your last name must be 30 chars or less!" }
  };

  public static emailValidation: RegisterOptions = {
    required: { value: true, message: "Please enter your email" },
    minLength: { value: 4, message: "Your email must be 4 chars or more!" },
    maxLength: { value: 30, message: "Your email must be 30 chars or less!" }
  };

  public static passwordValidation: RegisterOptions = {
    required: { value: true, message: "Please enter your password" },
    minLength: { value: 4, message: "Your password must be 4 chars or more!" },
    maxLength: { value: 30, message: "Your password must be 30 chars or less!" }
  };

  public static roleValidation: RegisterOptions = {
    required: { value: false, message: "You are not allowed to enter your role" }
  };
}

export default UserModel;
