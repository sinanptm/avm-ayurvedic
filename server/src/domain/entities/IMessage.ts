export default interface IMessage {
    readonly _id?: string;
    readonly chatId?: string;
    readonly senderId?:string;
    readonly receiverId?:string;
    readonly message?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}