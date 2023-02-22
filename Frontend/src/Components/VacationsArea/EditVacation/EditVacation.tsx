import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminVacationsService from "../../../Services/AdminVacationsService";
import appConfig from "../../../Utils/AppConfig";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>()

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>()

    const navigate = useNavigate()

    const params = useParams()

    const minDate = new Date();
    const startDate = new Date()

    useEffect(() => {
        adminVacationsService.getVacationById(+params.id)
            .then((vacation) => {
                setValue("vacationId", vacation.vacationId)
                setValue("destination", vacation.destination)
                setValue("description", vacation.description)
                const startDate = new Date(vacation.startDate)
                const nextStartDate = new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().slice(0, -14);
                setValue("startDate", nextStartDate);
                const endDate = new Date(vacation.endDate)
                const nextEndDate = new Date(endDate.setDate(endDate.getDate() + 1)).toISOString().slice(0, -14);
                setValue("endDate", nextEndDate);
                setValue("price", vacation.price)
                setVacation(vacation)
            }).catch((err) => {
                alert(err.message)
            });
    }, [])

    async function send(vacation: VacationModel) {
        try {

            if (new Date(vacation.startDate).getDate() < minDate.getDate()) {
                notify.error("Vacation start date cannot go back in time!")
                return;
            }

            else if (new Date(vacation.endDate).getDate() < new Date(vacation.startDate).getDate()) {
                notify.error("Vacation end date cannot go back in time!")
                return;
            }

            vacation.image = (vacation.image as unknown as FileList)[0]
            await adminVacationsService.updateVacation(vacation);
            notify.success("Vacation has been updated");
            navigate("/list")
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="EditVacation Box">

            <h2>Edit Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

                <input type="hidden" {...register("vacationId")} />

                <label>Destination: </label>
                <input type="text" className="form-control" {...register("destination", VacationModel.destinationValidation)} placeholder="Enter destination" />
                <span className="Err">{formState.errors.destination?.message}</span>
                <br />

                <label>Description:</label>
                <div className="input-group">
                    <textarea className="form-control" aria-label="With textarea"  {...register("description", VacationModel.descriptionValidation)} placeholder="Enter description"></textarea>
                    <span className="Err">{formState.errors.description?.message}</span>
                </div>
                <br />

                <label>Start Date: </label>
                <input type="date" className="form-control" {...register("startDate", VacationModel.startDateValidation)} placeholder="Enter start date" min={minDate.toISOString().split("T")[0]} />
                <span className="Err">{formState.errors.startDate?.message}</span>
                <br />

                <label>End Date: </label>
                <input type="date" className="form-control" {...register("endDate", VacationModel.endDateValidation)} placeholder="Enter end date" />
                <span className="Err">{formState.errors.endDate?.message}</span>
                <br />

                <label>Price: </label>
                <input type="number" className="form-control" step="0.01" {...register("price", VacationModel.priceValidation)} placeholder="Enter price" />
                <span className="Err">{formState.errors.price?.message}</span>
                <br /><br />

                <label>Image: </label>
                <input type="file" className="form-control" accept="image/*" {...register("image")} />
                <br />

                <label>Previous Image Preview:</label>
                <img src={vacation?.imageName} alt="" />
                <br /><br />

                <button type="submit" className="btn btn-warning">Update</button>
                <br />

            </form>

        </div>
    );
}

export default EditVacation;
