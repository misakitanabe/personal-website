import { MongoClient } from "mongodb";

interface ImagesCollection {
    _id: string;
    src: string;
    name: string;
    author: string;
    likes: number;
}

export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllImages(authorId? : string): Promise<ImagesCollection[]> { // TODO #2
        const collectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!collectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        const collection = this.mongoClient.db().collection<ImagesCollection>(collectionName); // TODO #1

        // MongoDB Aggregation to join and denormalize author field
        const pipeline: any[] = [];

        if (authorId) {
            pipeline.push({
                $match: { author: authorId }
            });
        }

        pipeline.push(
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "authorDetails",
                },
            },
            { $unwind: "$authorDetails" },
            {
                $project: {
                    _id: 1,
                    src: 1,
                    name: 1,
                    likes: 1,
                    author: {
                        name: "$authorDetails.name",
                        email: "$authorDetails.email",
                        profilePicture: "$authorDetails.profilePicture",
                    },
                },
            }
        );

        // const denormalizedImages: ImagesCollection[] = await collection
        //     .aggregate<ImagesCollection>(pipeline)
        //     .toArray();

        // return denormalizedImages;

        const normalizedImages: ImagesCollection[] = await collection
            .find()
            .toArray();

        return normalizedImages;
    }

    async updateImageName(imageId: string, newName: string): Promise<number> {
        const imageCollectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!imageCollectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        const imageCollection = this.mongoClient.db().collection<ImagesCollection>(imageCollectionName); 
        const res = await imageCollection.updateOne({_id: imageId}, {$set: {name: newName}});
        return res.matchedCount;
    }

    async createImage(_id: string, src: string, name: string, likes: number, author: string): Promise<ImagesCollection> {
        const imageCollectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!imageCollectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        const imageCollection = this.mongoClient.db().collection<ImagesCollection>(imageCollectionName); 

        // Create the document
        const newImage: ImagesCollection = {
            _id: _id,
            src: src,
            name: name, 
            likes: likes,
            author: author,
        };

        try {
            const res = await imageCollection.insertOne(newImage);
            return newImage;
        } catch (err) {
            throw new Error("Creating image metadata in DB failed");
        }
        
    }
}