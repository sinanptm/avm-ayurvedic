export default interface IChat {
    readonly _id?: string;
    readonly doctorId?: string;
    readonly patientId?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}