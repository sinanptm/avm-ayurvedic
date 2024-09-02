export default interface IImageService {
    uploadFile(bucket: string, key: string, body: Buffer, contentType: string): Promise<{url:string}>;
}
