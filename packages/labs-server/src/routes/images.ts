import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";
import { imageMiddlewareFactory, handleImageFileErrors } from "../imageUploadMiddleware";

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {
    app.use(express.json());

    app.get("/api/images", (req: Request, res: Response) => {
        let userId: string | undefined = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
        }

        const i = new ImageProvider(mongoClient);
        i.getAllImages(userId)
            .then((response) => {
                res.send(response);
            })
            .catch((err) => {
                console.error(`error fetching images: ${err}`);
            });
    });

    app.patch("/api/images/:id", (req: Request, res: Response) => {
        let imageId: string | undefined = req.params.id;
        let newName: string = req.body.name;
        if (!newName) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing name property"
            });
        } else if (newName.length > 200) {
            res.status(400).send({
                error: "Bad request",
                message: "Name property is too long. Please enter a name under 200 characters"
            });
        }
        console.log(`imageID: ${imageId}`);
        const i = new ImageProvider(mongoClient);
        i.updateImageName(imageId, newName)
            .then((response) => {
                console.log(`response: ${response}`);
                if (response === 0) {
                    res.status(404).send({
                        error: "Not found",
                        message: "Image does not exist"
                    });
                }
                res.status(204).send();
            })
            .catch((err) => {
                console.error(`error fetching images: ${err}`);
            });
    });

    app.post(
        "/api/images",
        imageMiddlewareFactory.single("image"),
        handleImageFileErrors,
        async (req: Request, res: Response) => {
            // Final handler function after the above two middleware functions finish running
            console.log(`req.file:`, req.file);
            console.log(`req.body:`, req.body);
            console.log(`token in images.ts:`, res.locals.token);

            if (!req.file || !req.body) {
                res.status(400).send("No file or no name");
                return;
            }

            const _id = req.file.filename;
            const src = `/uploads/${req.file.filename}`;
            const name = req.body.name;
            const likes = 0;
            const author = res.locals.token.username;

            const i = new ImageProvider(mongoClient);
            i.createImage(_id, src, name, likes, author)
                .then((response) => {
                    res.status(201).send(response);
                })
                .catch((err) => {
                    console.error(`error uploading image: ${err}`);
                    res.status(500).send(err);
                });


            // res.status(500).send("Not implemented");
        }
    );
}