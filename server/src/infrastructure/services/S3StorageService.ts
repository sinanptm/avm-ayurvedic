import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ICloudStorageService from "../../domain/interface/services/ICloudStorageService";
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "../../config/env";

export default class S3StorageService implements ICloudStorageService {
   private s3: S3Client;

   constructor() {
      this.s3 = new S3Client({
         region: AWS_REGION,
         credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID!,
            secretAccessKey: AWS_SECRET_ACCESS_KEY!,
         },
      });
   }

   async generatePreSignedUrl(bucket: string, key: string, expiresIn: number): Promise<string> {
      const command = new PutObjectCommand({
         Bucket: bucket,
         Key: key,
         ContentType: "image/jpeg",
      });
      const url = await getSignedUrl(this.s3, command, { expiresIn });
      return url;
   }

   async deleteFile(bucket: string, key: string): Promise<void> {
      const command = new DeleteObjectCommand({
         Bucket: bucket,
         Key: key,
      });
      await this.s3.send(command);
   }
}
