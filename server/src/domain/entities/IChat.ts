export default interface IChat {
    readonly _id?: string;
    readonly doctorId?: string;
    readonly patientId?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly doctorName?: string;
    readonly patientName?: string;
    readonly doctorProfile?:string;
    readonly patientProfile?:string;
}

export interface IChatWithNotSeenCount extends IChat{
    notSeenMessages?:number;
}