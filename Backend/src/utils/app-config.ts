class AppConfig {
    public port = 4000;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "vacation_planner"; // Fill this in when running program
    public adminImageAddress = "http://localhost:4000/api/admin/vacations/images/"
    public userImageAddress = "http://localhost:4000/api/user/vacations/images/"
}

const appConfig = new AppConfig();

export default appConfig;