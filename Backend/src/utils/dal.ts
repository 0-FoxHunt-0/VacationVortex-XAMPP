import mysql from "mysql";
import appConfig from "./app-config";

const connection = mysql.createPool({
  host: appConfig.mysqlHost,
  user: appConfig.mysqlUser,
  password: appConfig.mysqlPassword,
  database: appConfig.mysqlDatabase,
});

// Execute any sql query
function execute(sql: string, ...values: any[]): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    // Send query to DB
    connection.query(sql, values, async (err, result) => {
      // If there is an error executing a query:
      if (err) {
        reject(err);
        return;
      }

      // If all is ok then return the result
      resolve(result);
    });
  });
}

export default {
  execute,
};
