import IDoctor from "../../domain/entities/IDoctor";

export default interface IDoctorRepository{
    findByEmail(email:string):Promise<IDoctor|null>;
    findByID(id:string):Promise<IDoctor|null>;
    findByEmailWithCredentials(email:string):Promise<IDoctor|null>
    create(doctor:IDoctor):Promise<void>;
    findByIdAndUpdate(doctor:IDoctor):Promise<void>;
}