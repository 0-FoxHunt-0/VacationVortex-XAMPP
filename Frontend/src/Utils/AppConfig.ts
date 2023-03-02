class AppConfig {

    // User-Data
    public registerUrl = "http://localhost:4000/api/auth/register/"
    public loginUrl = "http://localhost:4000/api/auth/login/"

    // User-URL's
    public userVacationsUrl = "http://localhost:4000/api/user/vacations/"
    public userVacationsFollowUrl = "http://localhost:4000/api/user/follow/"
    public userVacationsUnFollowUrl = "http://localhost:4000/api/user/unfollow/"

    // Admin URL's
    public adminVacationsUrl = "http://localhost:4000/api/admin/vacations/"
    public adminAddVacationUrl = "http://localhost:4000/api/admin/add/vacations/"
    public adminDeleteVacationUrl = "http://localhost:4000/api/admin/vacations/"
    public adminCSVUrl = "http://localhost:4000/api/admin/downloadable/csv-download/"
    public adminUpdateVacationUrl = "http://localhost:4000/api/admin/edit/vacations/"
    public adminVacationByIdUrl = "http://localhost:4000/api/admin/vacations/"

}

const appConfig  = new AppConfig();

export default appConfig;