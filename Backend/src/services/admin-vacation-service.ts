import { createObjectCsvWriter } from "csv-writer";
import { OkPacket } from "mysql";
import path from "path";
import { ResourceNotFoundError } from "../models/client-errors";
import VacationModel from "../models/vacation-model";
import appConfig from "../utils/app-config";
import dal from "../utils/dal";
import imageHandler from "../utils/image-handler";

async function getAllVacationsForAdmin(): Promise<VacationModel[]> {
  const sql = `SELECT V.*, CONCAT('${appConfig.adminImageAddress}', imageName) AS imageName, COUNT(F.userId) AS followerCount
  FROM vacations AS V LEFT JOIN following AS F ON V.vacationId = F.vacationId GROUP BY V.vacationId ORDER BY startDate`;
  const vacations = await dal.execute(sql);
  return vacations;
}

async function getVacationById(id: number): Promise<VacationModel> {
  const sql = `SELECT * FROM vacations WHERE vacationId = ?`;

  const vacations = await dal.execute(sql, id);

  return vacations;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
  // Validate:
  vacation.validatePost()

  // Save image to disk and get back its name
  vacation.imageName = await imageHandler.saveImage(
    vacation.image,
  );

  const sql = `INSERT INTO vacations 
  (destination, description, startDate, endDate, price, imageName) 
  VALUES (?, ?, ?, ?, ?, ?)`;

  // Execute query:
  const result: OkPacket = await dal.execute(
    sql,
    vacation.destination,
    vacation.description,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.imageName
  );
  vacation.vacationId = result.insertId;

  vacation.imageName = appConfig.adminImageAddress + vacation.imageName

  // Delete image file from vacation object:
  delete vacation.image;

  // Return data:
  return vacation;
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
  // Validate:
  vacation.validateUpdate()

  vacation.imageName = await imageHandler.getImageUrlFromDB(vacation.vacationId);

  if (vacation.image) {
    vacation.imageName = await imageHandler.updateImage(
      vacation.image,
      vacation.imageName
    );
  }

  vacation.imageName = vacation.imageName
    ? await imageHandler.updateImage(vacation.image, vacation.imageName)
    : vacation.imageName;

  const sql = `
        UPDATE vacations
        SET
            destination = ?, 
            description = ?, 
            startDate = ?,
            endDate = ?,
            price = ?,
            imageName = ?
        WHERE vacationId = ?
    `;

  // Execute query:
  const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId);

  // If vacation does not exist:
  if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

  // Return image url to Frontend
  vacation.imageName = appConfig.adminImageAddress + vacation.imageName

  // Delete image file from vacation object:
  delete vacation.image;

  // Return data:
  return vacation;
}

async function deleteVacation(id: number): Promise<void> {
  const sql = `DELETE FROM vacations WHERE vacationId = ?`;

  await dal.execute(sql, id);
}

async function vacationStatisticsCSV(): Promise<void> {
  const sql = `
    SELECT 
      V.destination AS Destination, 
      COUNT(F.userId) AS followerCount 
    FROM vacations AS V LEFT JOIN following AS F ON V.vacationId = F.vacationId
    GROUP BY Destination;
    `;

  const data = await dal.execute(sql);

  const csvWriter = createObjectCsvWriter({
    path: path.resolve(__dirname, "../assets/logs/CSVData.csv"),
    header: [
      { id: "Destination", title: "Destination" },
      { id: "followerCount", title: "Followers" },
    ],
  });

  await csvWriter.writeRecords(data);
}

export default {
  getAllVacationsForAdmin,
  getVacationById,
  addVacation,
  updateVacation,
  deleteVacation,
  vacationStatisticsCSV,
};
