import { RegisterOptions } from "react-hook-form";
class CredentialsModel {
  public email: string;
  public password: string;

  public static emailValidation: RegisterOptions = {
    required: { value: true, message: "Please enter your email" },
    minLength: { value: 4, message: "Your email must be 4 chars or more!" },
    maxLength: { value: 100, message: "Your email must be 30 chars or less!" },
  };

  public static passwordValidation: RegisterOptions = {
    required: { value: true, message: "Please enter your password" },
    minLength: { value: 4, message: "Your password must be 4 chars or more!" },
    maxLength: { value: 100, message: "Your password must be 30 chars or less!" }
  };
}

export default CredentialsModel;
