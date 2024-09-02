import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import IImageService from "../../interface/services/IImageService";
import dotenv from 'dotenv';
dotenv.config();

export default class ImageService implements IImageService {
    private s3: S3Client;

    constructor() {
        this.s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
    }

    async uploadFile(bucket: string, key: string, body: Buffer, contentType: string): Promise<{ url: string }> {
        const upload = new Upload({
            client: this.s3,
            params: {
                Bucket: bucket,
                Key: key,
                Body: body,
                ContentType: contentType,
            },
        });

        await upload.done();

        return { url: `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}` };
    }
}
