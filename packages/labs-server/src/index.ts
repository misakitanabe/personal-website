import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { ImageProvider } from "./ImageProvider";

async function setUpServer() {
    dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
    const PORT = process.env.PORT || 3000;
    const staticDir = process.env.STATIC_DIR || "public";

    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

    const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
    const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

    console.log("Attempting Mongo connection at " + connectionStringRedacted);

    const mongoClient = await MongoClient.connect(connectionString);
    const collectionInfos = await mongoClient.db().listCollections().toArray();
    console.log(collectionInfos.map(collectionInfo => collectionInfo.name)); // For debug only

    const app = express();
    const path = require('path');

    app.use(express.static(staticDir));

    app.get("/hello", (req: Request, res: Response) => {
        res.send("Hello, World");
    });

    app.get("/api/images", (req: Request, res: Response) => {
        const i = new ImageProvider(mongoClient);
        i.getAllImages()
            .then((response) => {
                res.send(response);
            })
            .catch((err) => {
                console.error(`error fetching images: ${err}`);
            });
    });

    app.get("*", (req: Request, res: Response) => {
        console.log("none of the routes above me were matched: ", req.path);
        // Set root in options so we can send relative path in res.sendFile
        const options = {
            root: staticDir,
        }
        if (req.path.startsWith("/images") || req.path == "/account") {
            console.log("in condiion")
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