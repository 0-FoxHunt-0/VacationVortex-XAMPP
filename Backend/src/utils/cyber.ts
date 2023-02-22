import UserModel from "../models/user-model";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response } from "express";
import { AuthenticationError } from "../models/client-errors";
import crypto from "crypto";
import RoleModel from "../models/role-model";

const secretKey = "vacation-handler";

function createNewToken(user: UserModel): string {
  // Remove password
  delete user.password;

  // Create container for the user object:
  const container = { user };

  // Create options:
  const options = { expiresIn: "3h" };

  // Create the the token:
  const token = jwt.sign(container, secretKey, options);

  return token;
}

function verifyToken(request: Request): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      // Extract authorization header:
      const header = request.header("authorization");
      // If missing:
      if (!header) {
        reject(new AuthenticationError("Invalid token"));
        return;
      }

      // Extract token:
      const token = header.substring(7);

      // If missing:
      if (!token) {
        reject(new AuthenticationError("Invalid token"));
        return;
      }

      // Verify:
      jwt.verify(token, secretKey, (err: JsonWebTokenError) => {
        console.log(err);
        if (err) {
          reject(new AuthenticationError("Invalid token"));
          return;
        }
        resolve(true);
      });
    } catch (err: any) {
      reject(err);
    }
  });
}

async function verifyAdmin(request: Request): Promise<boolean> {
  await verifyToken(request);
  const user = getUserFromToken(request)  
  return user.role === RoleModel.Admin;
}

function getUserFromToken(request: Request): UserModel {
  const header = request.header("authorization");
  const token = header.substring(7);
  const user: UserModel = (jwt.decode(token) as any).user;
  return user;
}

// Hash password:
// SHA - Secure Hashing Algorithm
// HMAC - Hash based Message Authentication Code
function hashPassword(plainText: string): string {
  // Hashing without SALT:
  // const hashedPassword = crypto.createHash("sha512").update(plainText).digest("hex");

  // Hashing with SALT:
  const salt = "MakeThingsGoRight";
  const hashedPassword = crypto
    .createHmac("sha512", salt)
    .update(plainText)
    .digest("hex");

  return hashedPassword;
}

export default {
  createNewToken,
  verifyToken,
  verifyAdmin,
  getUserFromToken,
  hashPassword,
};
