import express, { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import { CredentialsProvider } from "../CredentialsProvider";
import jwt from "jsonwebtoken";

export function verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction // Call next() to run the next middleware or request handler
) {
    const signatureKey = process.env.JWT_SECRET;
    if (!signatureKey) {
        throw new Error("Missing JWT_SECRET from env file");
    }
    const authHeader = req.get("Authorization");
    // The header should say "Bearer <token string>".  Discard the Bearer part.
    const token = authHeader && authHeader.split(" ")[1];
    console.log(`token in auth.ts: ${token}`);

    if (!token) {
        res.status(401).end();
    } else { // signatureKey already declared as a module-level variable
        jwt.verify(token, signatureKey, (error, decoded) => {
            if (decoded) {
                res.locals.token = decoded;
                next();
            } else {
                res.status(403).end();
            }
        });
    }
}

function generateAuthToken(username: string): Promise<string> {
    const signatureKey = process.env.JWT_SECRET;
    if (!signatureKey) {
        throw new Error("Missing JWT_SECRET from env file");
    }
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { username: username },
            signatureKey,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {
    app.use(express.json());
    
    app.post("/auth/register", (req: Request, res: Response) => {
        const c = new CredentialsProvider(mongoClient);
        let username: string = req.body.username;
        let password: string = req.body.password;
        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
            return;
        } 

        c.registerUser(username, password)
            .then((response) => {
                if (response === false) {
                    res.status(400).send({
                        error: "Bad request",
                        message: "Username already taken"
                    });
                }
                // res.status(201).send();
                generateAuthToken(username)
                    .then((generatedToken) => res.status(201).send({ token: generatedToken }))
                    .catch((err) => console.error(err));
            })
            .catch((err) => {
                console.error(`error creating user: ${err}`);
            });
    });

    app.post("/auth/login", (req: Request, res: Response) => {
        const c = new CredentialsProvider(mongoClient);
        let username: string = req.body.username;
        let password: string = req.body.password;
        if (!username || !password) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
            return;
        } 

        c.verifyPassword(username, password)
            .then((response) => {
                if (response === true) {
                    generateAuthToken(username)
                        .then((generatedToken) => res.send({ token: generatedToken }))
                        .catch((err) => console.error(err));
                } else {
                    res.status(401).send({
                        error: "Unauthorized",
                        message: "Wrong username or password"
                    });
                }
            }).catch((err) => {
                console.error(`error authorizing user: ${err}`);
            })
    });
}