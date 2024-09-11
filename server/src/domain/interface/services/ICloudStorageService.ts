export default interface ICloudStorageService {
   generatePreSignedUrl(bucket: string, key: string, expiresIn: number): Promise<string>;
   deleteFile(bucket: string, key: string): Promise<void>;
}
