import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import IImageService from "../../interface/services/IImageService";
import dotenv from 'dotenv';
import { Upload } from "@aws-sdk/lib-storage";
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

    async generatePreSignedUrl(bucket: string, key: string, expiresIn: number): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
        });
        const url = await getSignedUrl(this.s3, command, { expiresIn });
        return url;
    }
}
