import express from "express";
import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "./utils/logger";
import bodyParser from "body-parser";
import { connectDB } from "./config/connectDB";
import routes from "./presentation/routers/index";
import { CLIENT_URL, PORT } from "./config/env";
import { webhook } from "./presentation/routers/appointment/AppointmentRoutes";
import initializeSocketIO from "./presentation/socket";

const port = PORT || 8080;

const app = express();
const server = createServer(app);

app.use(helmet());
app.use(
    cors({
        origin: CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
app.post("/api/webhook", bodyParser.raw({ type: "application/json" }), webhook);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

connectDB().then(() => {
    server.listen(port, () => {
        logger.info(`Server started listening on port: ${port}`);

        initializeSocketIO(server);
    });
});
