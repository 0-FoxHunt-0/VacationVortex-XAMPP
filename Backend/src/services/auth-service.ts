import { OkPacket } from "mysql";
import { AuthenticationError, ValidationError } from "../models/client-errors";
import CredentialsModel from "../models/credentials-model";
import RoleModel from "../models/role-model";
import UserModel from "../models/user-model";
import cyber from "../utils/cyber";
import dal from "../utils/dal";

async function register(user: UserModel): Promise<string> {

  user.validateRegister()

  // If email taken:
  if (await isEmailTaken(user.email))
    throw new ValidationError(`Email: ${user.email} already exists`);

  // New user is assigned a user role:
  user.role = RoleModel.User;

  user.password = cyber.hashPassword(user.password);

  // Create sql query:
  const sql = `
        INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)
    `;

  // Add to database:
  const result: OkPacket = await dal.execute(
    sql,
    user.firstName,
    user.lastName,
    user.email,
    user.password,
    user.role
  );

  // Set back id:
  user.userId = result.insertId;

  const token = cyber.createNewToken(user);

  // Return token:
  return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
  credentials.validateCredentials();

  credentials.password = cyber.hashPassword(credentials.password);

  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

  // Execute query:
  const users = await dal.execute(sql, credentials.email, credentials.password);

  // Extract user:
  const user = users[0];

  // If credentials are wrong
  if (!user) throw new AuthenticationError(`Incorrect email or password`);

  // Create token:
  const token = cyber.createNewToken(user);

  // Return token:
  return token;
}

async function isEmailTaken(email: string): Promise<boolean> {
  // Create sql query:
  const sql = `
        SELECT COUNT(email) AS count
        FROM users
        WHERE email = ?
    `;

  const table: OkPacket = await dal.execute(sql, email);

  const count = +table[0].count;

  return count > 0;
}

export default {
  register,
  login,
};
