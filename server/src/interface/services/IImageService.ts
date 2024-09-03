export default interface IImageService {
    uploadFile(bucket: string, key: string, body: Buffer, contentType: string): Promise<{ url: string }>;
    generatePreSignedUrl(bucket: string, key: string, expiresIn: number): Promise<string>;
}
