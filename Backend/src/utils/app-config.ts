class AppConfig {
  public port = 4000;
  public mysqlHost = "localhost";
  public mysqlUser = "root";
  public mysqlPassword = "";
  public mysqlDatabase = "vacation_planner";
  public imageAddress = "http://localhost:4000/api/vacations/images/";
}

const appConfig = new AppConfig();

export default appConfig;
