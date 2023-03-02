import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthServices";
import notify from "../../../Utils/Notify";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>()
    const navigate = useNavigate()


    async function send(credentials: CredentialsModel): Promise<void> {
        try {
            await authService.login(credentials);
            notify.success(`Welcome back ${credentials.email}!`);
            navigate("/");
        } catch (error: any) {
            notify.error(error)
        }
    }

    return (
        <div className="Login Box">

            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Email:</label>
                <input className="form-control" type="email" {...register("email", CredentialsModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>
                {formState.errors.email && <br />}

                <label>Password:</label>
                <input className="form-control" type="password" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>
                {formState.errors.password && <><br /><br /></>}

                <button className="btn btn-primary" type="submit">Login</button>

            </form>

        </div>
    );
}

export default Login;
