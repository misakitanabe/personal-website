import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { registerImageRoutes } from "./routes/images";
import { registerAuthRoutes } from "./routes/auth";
import { verifyAuthToken } from "./routes/auth";

async function setUpServer() {
    dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
    const PORT = process.env.PORT || 3000;
    const staticDir = process.env.STATIC_DIR || "public";

    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME, IMAGE_UPLOAD_DIR } = process.env;

    const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
    const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

    console.log("Attempting Mongo connection at " + connectionStringRedacted);

    const mongoClient = await MongoClient.connect(connectionString);
    const collectionInfos = await mongoClient.db().listCollections().toArray();

    const app = express();
    const path = require('path');

    app.use(express.static(staticDir));
    if (IMAGE_UPLOAD_DIR) {
        app.use("/uploads", express.static(IMAGE_UPLOAD_DIR));
    }
    
    app.get("/hello", (req: Request, res: Response) => {
        res.send("Hello, World");
    });

    registerAuthRoutes(app, mongoClient);
    app.use("/api/*", verifyAuthToken);
    registerImageRoutes(app, mongoClient);

    // KEEP THIS AT THE VERY BOTTOM TO ONLY CATCH ROUTES THAT WEREN'T ALR CAUGHT
    app.get("*", (req: Request, res: Response) => {
        console.log("none of the routes above me were matched: ", req.path);
        // Set root in options so we can send relative path in res.sendFile
        const options = {
            root: staticDir,
        }
        if (req.path.startsWith("/images") || req.path == "/account" || req.path == "/register" || req.path == "/login") {
            res.sendFile("index.html", options, (err) => {
                if (err) {
                    console.error("Error sending file:", err);
                } else {
                    console.log('Sent:', req.path)
                }
            })
        }
    });

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

setUpServer();
