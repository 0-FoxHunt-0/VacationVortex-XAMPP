import UserModel from "../models/user-model";
import VacationModel from "../models/vacation-model";
import appConfig from "../utils/app-config";
import dal from "../utils/dal";

async function getAllVacations(user: UserModel): Promise<VacationModel[]> {

  const sql = `
      SELECT DISTINCT 
        V.*,
        EXISTS(SELECT * FROM following WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
        COUNT(F.userId) AS followerCount,
        CONCAT('${appConfig.userImageAddress}', imageName) AS imageName
      FROM vacations AS V LEFT JOIN following AS F
      ON V.vacationId = F.vacationId
      GROUP BY vacationId
      ORDER BY startDate
    `;

  const vacations = await dal.execute(sql, user.userId);

  return vacations;
}

async function follow(userId: number, vacationId: number): Promise<void> {
  const sql = `INSERT INTO following VALUES(?, ?)`;
  await dal.execute(sql, userId, vacationId);
}

async function unfollow(userId: number, vacationId: number): Promise<void> {
  const sql = `DELETE FROM following WHERE userId = ? AND vacationId = ?`;
  await dal.execute(sql, userId, vacationId);
}

export default {
  getAllVacations,
  follow,
  unfollow,
};
