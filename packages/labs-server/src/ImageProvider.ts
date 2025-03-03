import { MongoClient } from "mongodb";

interface ImagesCollection {
    _id: string;
    src: string;
    name: string;
    author: string;
    likes: number;
}

interface UsersCollection {
    _id: string;
    username: string;
    email: string;
}

export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllImages(): Promise<ImagesCollection[]> { // TODO #2
        const collectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        const collection = this.mongoClient.db().collection<ImagesCollection>(collectionName); // TODO #1

        // MongoDB Aggregation to join and denormalize author field
        const denormalizedImages: ImagesCollection[] = await collection.aggregate<ImagesCollection>([
            {
                $lookup: {
                    from: "users", // The users collection
                    localField: "author", // Field in imagesCollection
                    foreignField: "_id", // Field in usersCollection
                    as: "authorDetails",
                },
            },
            {
                $unwind: "$authorDetails", // Convert array to object (if exists)
            },
            {
                $project: {
                    _id: 1,
                    src: 1,
                    name: 1,
                    likes: 1,
                    author: {
                        username: "$authorDetails.username",
                        email: "$authorDetails.email",
                    },
                },
            },
        ]).toArray();

        return denormalizedImages;
    }
}