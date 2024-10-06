export default interface IChatBotMessage {
    readonly _id?: string;
    readonly patientId?: string;
    readonly message?: string;
    readonly isBotMessage?: boolean;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
