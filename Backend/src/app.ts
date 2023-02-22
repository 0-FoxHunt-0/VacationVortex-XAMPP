import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload"

import appConfig from "./utils/app-config";
import routeNotFound from "./middleware/route-not-found";
import catchAll from "./middleware/catch-all";
import userVacationRoutes from "./routes/user-vacation-routes";
import adminVacationRoutes from "./routes/admin-vacation-routes";
import authRoutes from "./routes/auth-routes";


const server = express();
server.use(cors()); // Enable Cross Origin Resource Sharing from any frontend.
server.use(express.json());
server.use(expressFileUpload());

server.use("/api", authRoutes)
server.use("/api", adminVacationRoutes)
server.use("/api", userVacationRoutes)

server.use(routeNotFound);
server.use(catchAll);

// server.listen(process.env.PORT, () => console.log(`Pegasus is listening on port http://localhost:${process.env.PORT}`));
server.listen(appConfig.port, () => console.log(`Pegasus is listening on port http://localhost:${appConfig.port}`));